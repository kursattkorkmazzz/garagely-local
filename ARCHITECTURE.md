# Garagely — Feature Architecture

## Philosophy

Garagely is **local-first, backend-ready**. All data lives on-device today (SQLite + file system). The architecture is deliberately designed so the data layer can be swapped for a remote REST/GraphQL API without touching a single line of business logic or UI code.

The key enabler is the **Repository Pattern**: every feature defines an abstract interface for its data needs. Today a SQLite class implements that interface; tomorrow an API client can replace it by implementing the same interface.

---

## Data Flow

```
Screen / Component
    ↓  imports hook only
Feature Hook          (owns loading, error, re-fetch state)
    ↓  calls service
Service               (business logic, validation, cross-feature orchestration)
    ↓  calls via registry
Repository Interface  (abstract contract — never changes)
    ↓  implemented by
Local Implementation  (SQLite / AsyncStorage / file system)
  OR
Remote Implementation (REST API client — future)
```

**Rules (strictly enforced):**
- UI components and screens **only** import from a feature's `hooks/` or barrel `index.ts`
- Services **only** depend on abstract repository interfaces (accessed via a registry function)
- Repositories **never** import from another feature's service
- Cross-feature operations (e.g. vehicle creation confirming an asset) live in the **calling service**, not the repository
- `features/common` exports are available to all features

---

## Per-Feature Folder Structure

```
features/{feature}/
├── constants/                        # Enums, lookup tables, error codes
│   └── index.ts
├── entity/                           # Pure TypeScript domain types (zero deps)
│   ├── {feature}.entity.ts
│   └── index.ts
├── dto/                              # Zod-validated input/output contracts
│   ├── create-{feature}.dto.ts
│   ├── update-{feature}.dto.ts       # add as needed
│   └── index.ts
├── repository/
│   ├── {feature}.repository.ts       # Abstract class — the contract
│   ├── {feature}.repository.registry.ts  # Returns the active implementation
│   ├── params/                       # Internal param types for repository methods
│   │   ├── create-{feature}.params.ts
│   │   └── index.ts
│   └── local/                        # Local (SQLite / file system) implementations
│       └── sqlite-{feature}.repository.ts
│   └── remote/                       # Future: REST API implementations (empty dir ok)
├── service/
│   └── {feature}.service.ts          # Business logic; uses repository via registry
├── hooks/                            # React hooks — the only thing screens import
│   ├── use-{feature}s.ts             # Paginated list
│   ├── use-{feature}.ts              # Single item by ID
│   ├── use-create-{feature}.ts
│   ├── use-update-{feature}.ts       # add as needed
│   └── use-delete-{feature}.ts
└── index.ts                          # Public barrel: re-exports entity types, dto types, hooks
```

---

## Shared Common Feature

Value objects (Money, Distance, Date, Volume) and pagination utilities are shared across features.

```
features/common/
├── entity/
│   ├── date.entity.ts
│   ├── distance.entity.ts
│   ├── money.entity.ts
│   ├── volume.entity.ts
│   └── index.ts
├── dto/                              # Zod validators for value objects
│   ├── date.dto.ts                   # DateDtoValidator, DateDto
│   ├── distance.dto.ts               # DistanceDtoValidator, DistanceDto
│   ├── money.dto.ts                  # MoneyDtoValidator, MoneyDto
│   ├── volume.dto.ts                 # VolumeDtoValidator, VolumeDto
│   └── index.ts
├── repository/
│   ├── params/
│   │   ├── create-date.params.ts
│   │   ├── create-distance.params.ts
│   │   ├── create-money.params.ts
│   │   ├── create-volume.params.ts
│   │   └── index.ts
│   ├── date.repository.ts
│   ├── distance.repository.ts
│   ├── money.repository.ts
│   ├── volume.repository.ts
│   └── local/
│       ├── sqlite-date.repository.ts
│       ├── sqlite-distance.repository.ts
│       ├── sqlite-money.repository.ts
│       └── sqlite-volume.repository.ts
├── pagination/
│   ├── pagination.types.ts
│   ├── pagination.utils.ts
│   └── index.ts
└── index.ts
```

---

## Key Patterns

### 1. Repository Registry

Replaces hard-coded `new SqliteXxxRepository()` in services with a single injectable point:

```typescript
// features/vehicle/repository/vehicle.repository.registry.ts
import { VehicleRepository } from "./vehicle.repository";
import { SqliteVehicleRepository } from "./local/sqlite-vehicle.repository";

let _instance: VehicleRepository | null = null;

export function getVehicleRepository(): VehicleRepository {
  if (!_instance) {
    // Swap this line to switch to a remote implementation:
    // _instance = new ApiVehicleRepository(getApiClient());
    _instance = new SqliteVehicleRepository();
  }
  return _instance;
}

// Call this in tests to inject a mock
export function setVehicleRepository(repo: VehicleRepository): void {
  _instance = repo;
}
```

**Service usage:**
```typescript
import { getVehicleRepository } from "../repository/vehicle.repository.registry";

export class VehicleService {
  static async addVehicle(data: CreateVehicleDto): Promise<VehicleEntity> {
    const validated = CreateVehicleDtoValidator.parse(data);
    const repo = getVehicleRepository();
    return repo.save(validated);
  }
}
```

### 2. Hooks Layer

Screens never call services directly. A hook owns async state and re-fetch logic:

```typescript
// features/vehicle/hooks/use-create-vehicle.ts
import { useState, useCallback } from "react";
import { VehicleService } from "../service/vehicle.service";
import { CreateVehicleDto } from "../dto";

export function useCreateVehicle() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createVehicle = useCallback(async (data: CreateVehicleDto) => {
    setIsLoading(true);
    setError(null);
    try {
      return await VehicleService.addVehicle(data);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { createVehicle, isLoading, error };
}
```

**Screen usage:**
```typescript
const { createVehicle, isLoading } = useCreateVehicle();
```

### 3. DTO Validation

Every service entry point validates input with Zod before passing to the repository:

```typescript
export const CreateVehicleDtoValidator = z.object({
  brand: z.string().nonempty().max(30),
  // ...
});

export type CreateVehicleDto = z.infer<typeof CreateVehicleDtoValidator>;
```

DTOs live in the feature's `dto/` folder. Shared value-object DTOs (Money, Distance, Date, Volume) live in `features/common/dto/`.

### 4. Cross-Feature Operations

When a vehicle is saved, its cover image asset must be confirmed. This coordination happens in `VehicleService` — not in the repository:

```typescript
// VehicleService.addVehicle()
const repo = getVehicleRepository();

if (data.coverImageId) {
  const exists = await AssetService.assetExists(data.coverImageId);
  if (!exists) throw new GaragelyError(VehicleErrorCodes.COVER_IMAGE_NOT_FOUND);
}

const vehicle = await repo.save(data);

if (data.coverImageId) {
  await AssetService.confirmAsset(data.coverImageId);
}

return vehicle;
```

### 5. Migrating to a Remote Backend

When a real API is available:

1. Create `features/{feature}/repository/remote/api-{feature}.repository.ts` implementing the same abstract class
2. Update `features/{feature}/repository/{feature}.repository.registry.ts` to return the new implementation
3. Nothing else changes

---

## Current Feature Inventory

| Feature | Purpose | Storage |
|---|---|---|
| `vehicle` | Core domain — vehicle CRUD | SQLite |
| `asset` | File/image management | SQLite + file system |
| `user-preferences` | App settings (theme, language, units) | AsyncStorage |
| `common` | Shared value objects, pagination | SQLite |

---

## Global Constants vs Feature Constants

| Location | What goes here |
|---|---|
| `constants/` | App-wide enums with **no** Zod logic: `Currency`, `DistanceUnit`, `VolumeUnit`, `Language`, `ThemeType`, `Timezone`, storage keys |
| `features/common/dto/` | Zod validators for shared value objects (MoneyDto, DistanceDto, DateDto, VolumeDto) |
| `features/{feature}/constants/` | Feature-specific enums: `FuelType`, `BodyType`, `AssetStatus`, etc. |

---

## Adding a New Feature — Checklist

```
[ ] Create features/{feature}/constants/index.ts
[ ] Create features/{feature}/entity/{feature}.entity.ts
[ ] Create features/{feature}/dto/create-{feature}.dto.ts  (Zod validator + inferred type)
[ ] Create features/{feature}/repository/{feature}.repository.ts  (abstract class)
[ ] Create features/{feature}/repository/params/create-{feature}.params.ts
[ ] Create features/{feature}/repository/local/sqlite-{feature}.repository.ts
[ ] Create features/{feature}/repository/{feature}.repository.registry.ts
[ ] Add DB schema to db/schemas/{feature}.schema.ts  (extend BaseSchema)
[ ] Run: npx drizzle-kit generate  (creates migration)
[ ] Create features/{feature}/service/{feature}.service.ts  (uses registry)
[ ] Create features/{feature}/hooks/use-{feature}s.ts  (list)
[ ] Create features/{feature}/hooks/use-create-{feature}.ts
[ ] Create features/{feature}/index.ts  (barrel: entity types + dto types + hooks)
[ ] Add i18n keys to i18n/locales/en/{feature}.json and i18n/locales/tr/{feature}.json
```
