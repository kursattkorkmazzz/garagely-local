# Garagely — Implementation Plan

This document is the authoritative roadmap for bringing the codebase to the target architecture described in `ARCHITECTURE.md`. Each phase is self-contained and safe to merge independently.

---

## Phase 0 — Architecture Documentation ✅

**Goal:** Establish the architecture contract before touching code.

- [x] Create `ARCHITECTURE.md`
- [x] Create `IMPLEMENTATION_PLAN.md` (this file)
- [x] Update `CLAUDE.md` with new conventions

---

## Phase 1 — Structural Cleanup

**Goal:** Fix naming issues and relocate misplaced files. Zero logic changes.

### 1.1 Fix directory typo
- Rename `features/asset/contants/` → `features/asset/constants/`
- Update imports in `features/asset/service/asset.service.ts`:
  - `@/features/asset/contants/asset-status` → `@/features/asset/constants/asset-status`
  - `@/features/asset/contants/mime-types` → `@/features/asset/constants/mime-types`

### 1.2 Move DTO validators out of `constants/` into `features/common/dto/`

The global `constants/` folder holds enums. Zod validators for domain value objects belong in `features/common/dto/`.

Create `features/common/dto/` with four files:

**`features/common/dto/money.dto.ts`**
```typescript
import { Currencies } from "@/constants";
import z from "zod";

export const MoneyDtoValidator = z.object({
  amount: z.int().min(0),
  currency: z.enum(Currencies),
});
export type MoneyDto = z.infer<typeof MoneyDtoValidator>;
```

**`features/common/dto/distance.dto.ts`**
```typescript
import { DistanceUnits } from "@/constants";
import z from "zod";

export const DistanceDtoValidator = z.object({
  amount: z.int().min(0),
  unit: z.enum(DistanceUnits),
});
export type DistanceDto = z.infer<typeof DistanceDtoValidator>;
```

**`features/common/dto/date.dto.ts`**
```typescript
import { Timezones } from "@/constants";
import z from "zod";

export const DateDtoValidator = z.object({
  date: z.int(),
  timezone: z.enum(Timezones),
});
export type DateDto = z.infer<typeof DateDtoValidator>;
```

**`features/common/dto/volume.dto.ts`**
```typescript
import { VolumeUnits } from "@/constants";
import z from "zod";

export const VolumeDtoValidator = z.object({
  amount: z.int().min(0),     // NOTE: was "value" in old code — align with Money/Distance
  unit: z.enum(VolumeUnits),
});
export type VolumeDto = z.infer<typeof VolumeDtoValidator>;
```

**`features/common/dto/index.ts`** — barrel export of all four.

Then remove the validator/type exports from:
- `constants/currency.ts` — keep `Currencies`, `Currency`
- `constants/distance.ts` — keep `DistanceUnits`, `DistanceUnit`
- `constants/timezone.ts` — keep `Timezones`, `Timezone`
- `constants/volume.ts` — keep `VolumeUnits`, `VolumeUnit`

Update `features/common/index.ts` to `export * from "./dto"`.

Update all import sites:
- `features/vehicle/service/dto/create-vehicle.dto.ts` — change `from "@/constants"` to `from "@/features/common"`
- `features/vehicle/repository/params/create-vehicle.params.ts` — same change

### 1.3 Fix `VolumeUnits` enum value

`constants/volume.ts` declares `LITER: "L"` (uppercase) but `db/schemas/commons/volume.schema.ts` uses `["l", "gal"]` (lowercase). Align to lowercase:

```typescript
export const VolumeUnits = {
  LITER: "l",     // was "L"
  GALLON: "gal",
} as const;
```

### 1.4 Move feature DTOs to top-level `dto/` folder

Current: `features/{feature}/service/dto/` — these live inside the service folder.  
Target: `features/{feature}/dto/` — DTOs are a feature-level concern, not service-level.

- Move `features/vehicle/service/dto/create-vehicle.dto.ts` → `features/vehicle/dto/create-vehicle.dto.ts`
- Move `features/asset/service/dto/create-asset.dto.ts` → `features/asset/dto/create-asset.dto.ts`
- Move `features/user-preferences/service/dto/upsert-user-preferences.dto.ts` → `features/user-preferences/dto/upsert-user-preferences.dto.ts`
- Update all import paths in the corresponding service files

---

## Phase 2 — Complete `features/common`

**Goal:** Add the missing `VolumeEntity` and volume repository so `features/common` fully covers all four shared value objects.

### 2.1 Add `VolumeEntity`

**`features/common/entity/volume.entity.ts`**
```typescript
import { VolumeUnit } from "@/constants";

export type VolumeEntity = {
  id: string;
  amount: number;
  unit: VolumeUnit;
  created_at: Date;
  updated_at: Date | null;
};
```

Export from `features/common/entity/index.ts`.

### 2.2 Add volume repository params

**`features/common/repository/params/create-volume.params.ts`**
```typescript
import { VolumeUnit } from "@/constants";
export type CreateVolumeParams = { amount: number; unit: VolumeUnit };
```

Export from `features/common/repository/params/index.ts`.

### 2.3 Add abstract `VolumeRepository`

**`features/common/repository/volume.repository.ts`** — mirrors `money.repository.ts` pattern:
```typescript
import { VolumeEntity } from "../entity/volume.entity";
import { CreateVolumeParams } from "./params";

export abstract class VolumeRepository {
  abstract save(params: CreateVolumeParams): Promise<VolumeEntity>;
  abstract findById(id: string): Promise<VolumeEntity | null>;
  abstract delete(id: string): Promise<void>;
}
```

### 2.4 Add SQLite implementation

**`features/common/repository/local/sqlite-volume.repository.ts`** — mirrors `sqlite-money.repository.ts`, using `VolumeSchema` from `@/db/schemas/commons/volume.schema`.

Export both classes from `features/common/repository/index.ts`.

---

## Phase 3 — Repository Registry

**Goal:** Decouple services from concrete implementations. Makes swapping to a remote backend a one-line change per feature.

For each feature (`vehicle`, `asset`, `user-preferences`), create a registry file:

**`features/vehicle/repository/vehicle.repository.registry.ts`**
```typescript
import { VehicleRepository } from "./vehicle.repository";
import { SqliteVehicleRepository } from "./local/sqlite-vehicle.repository";

let _instance: VehicleRepository | null = null;

export function getVehicleRepository(): VehicleRepository {
  if (!_instance) _instance = new SqliteVehicleRepository();
  return _instance;
}

export function setVehicleRepository(repo: VehicleRepository): void {
  _instance = repo;
}
```

Repeat for `asset` and `user-preferences` features.

Update each service to call the registry instead of `new ConcreteRepository()`:
- `VehicleService` → `getVehicleRepository()`
- `AssetService` → `getAssetRepository()`, `getStorageRepository()`
- `UserPreferencesService` → `getUserPreferencesRepository()`

Move concrete repository files into `local/` subfolder:
- `features/vehicle/repository/sqlite-vehicle.repository.ts` → `features/vehicle/repository/local/sqlite-vehicle.repository.ts`
- `features/asset/repository/sqlite-asset.repository.ts` → `features/asset/repository/local/sqlite-asset.repository.ts`
- `features/asset/repository/file-system-storage.repository.ts` → `features/asset/repository/local/file-system-storage.repository.ts`

---

## Phase 4 — Fix Cross-Feature Dependency

**Goal:** Remove `AssetService` from `SqliteVehicleRepository`. Repositories must not call other feature services.

### Changes to `features/vehicle/repository/local/sqlite-vehicle.repository.ts`
- Remove `import { AssetService }` 
- Remove the asset existence check (lines that call `AssetService.assetExists`)
- Remove the asset confirmation call (lines that call `AssetService.confirmAsset`)

### Changes to `features/vehicle/service/vehicle.service.ts`
Move the asset lifecycle management here, wrapping the repository save:

```typescript
static async addVehicle(data: CreateVehicleDto): Promise<VehicleEntity> {
  const validated = CreateVehicleDtoValidator.parse(data);
  const repo = getVehicleRepository();

  // Validate cover image exists before writing anything
  if (validated.coverImageId) {
    const exists = await AssetService.assetExists(validated.coverImageId);
    if (!exists) throw new GaragelyError(VehicleErrorCodes.COVER_IMAGE_NOT_FOUND);
  }

  const vehicle = await repo.save(validated);

  // Confirm asset now that vehicle is persisted
  if (validated.coverImageId) {
    await AssetService.confirmAsset(validated.coverImageId);
  }

  return vehicle;
}
```

---

## Phase 5 — Fix Unnecessary `await` on Synchronous Function

`getGaragelyDatabase()` is synchronous but two repository files use `await` on it.

Files to fix:
- `features/vehicle/repository/local/sqlite-vehicle.repository.ts` — change all `const db = await getGaragelyDatabase()` → `const db = getGaragelyDatabase()`
- `features/asset/repository/local/sqlite-asset.repository.ts` — same change

---

## Phase 6 — Hooks Layer

**Goal:** UI screens never call services directly. Each feature exposes React hooks.

### Vehicle hooks

**`features/vehicle/hooks/use-vehicles.ts`** — paginated list with loading state  
**`features/vehicle/hooks/use-vehicle.ts`** — single vehicle by ID  
**`features/vehicle/hooks/use-create-vehicle.ts`** — wraps `VehicleService.addVehicle`  
**`features/vehicle/hooks/use-delete-vehicle.ts`** — wraps `VehicleService.deleteVehicle`

### Asset hooks

**`features/asset/hooks/use-upload-asset.ts`** — wraps `AssetService.saveAsset` with progress state  
**`features/asset/hooks/use-delete-asset.ts`** — wraps `AssetService.deleteAsset`

### Update `index.ts` barrels

Each feature's `index.ts` should re-export:
- Entity types
- DTO types
- All hooks from `hooks/`

Services and repository classes are **not** re-exported from `index.ts` (they're internal).

---

## Phase 7 — Wire UI to Hooks

**Goal:** Connect screens to real data; remove mock data and hardcoded strings.

### 7.1 `app/(dashboard)/garage/vehicles/create.tsx`

Replace the empty `handleSubmit` with a call to `useCreateVehicle`:

```typescript
const { createVehicle } = useCreateVehicle();

const handleSubmit = async (values: VehicleFormValues) => {
  await createVehicle({
    coverImageId: values.coverImageId,
    brand: values.brand,
    model: values.model,
    year: values.year,
    plate: values.plate,
    color: values.color,
    vin: values.vin,
    fuelType: values.fuelType,
    bodyType: values.bodyType,
    transmissionType: values.transmissionType,
    purchaseDate: values.purchaseDate && values.purchaseTimezone
      ? { date: values.purchaseDate, timezone: values.purchaseTimezone }
      : undefined,
    purchasePrice: values.purchasePrice && values.purchaseCurrency
      ? { amount: values.purchasePrice, currency: values.purchaseCurrency }
      : undefined,
    purchaseOdometer: values.purchaseOdometer && values.purchaseOdometerUnit
      ? { amount: values.purchaseOdometer, unit: values.purchaseOdometerUnit }
      : undefined,
  });
  Toast.show({ type: "success", text1: t("messages.addSuccess") });
  router.back();
};
```

### 7.2 `app/(dashboard)/garage/vehicles/index.tsx`

Replace the mock `useState` list with `useVehicles`:

```typescript
const { vehicles, isLoading } = useVehicles();
```

- Show `AppSpinner` while loading
- For `iconImage`: use `AssetService.getAssetUri(vehicle.coverImageId)` when `coverImageId` exists
- Remove `console.log("Clicked: ", item)`

### 7.3 Fix `selectedCoverImageUri` not being set after upload

In `components/vehicle/forms/steps/basic-info-step.tsx`, after `AssetService.saveAsset`:

```typescript
const savedAsset = await AssetService.saveAsset(createAssetDto);
setFieldValue("coverImageId", savedAsset.id);
setFieldValue("selectedCoverImageUri", asset.uri);  // ← add this line
```

---

## Phase 8 — Form Validation

**Goal:** Show field-level validation errors as the user types.

In `components/vehicle/forms/vehicle-form-context.tsx`, add a `validate` function to `<Formik>` that runs the Zod schema and maps errors to Formik's error shape:

```typescript
import { CreateVehicleDtoValidator } from "@/features/vehicle/dto/create-vehicle.dto";

// Inside VehicleFormProvider:
validate={(values) => {
  const result = CreateVehicleDtoValidator.safeParse({
    brand: values.brand,
    model: values.model,
    year: values.year,
    plate: values.plate,
    vin: values.vin || undefined,
  });
  if (result.success) return {};
  return result.error.issues.reduce((acc, issue) => {
    const key = issue.path[0] as string;
    if (!acc[key]) acc[key] = issue.message;
    return acc;
  }, {} as Record<string, string>);
}}
```

---

## Phase 9 — i18n Completeness

**Goal:** No hardcoded English strings in any screen.

### Add to `i18n/locales/en/vehicle.json`
```json
"messages": {
  "addSuccess": "Vehicle added successfully",
  "addError": "Failed to add vehicle"
}
```

### Add to `i18n/locales/tr/vehicle.json`
```json
"messages": {
  "addSuccess": "Araç başarıyla eklendi",
  "addError": "Araç eklenemedi"
}
```

Update `vehicles/create.tsx` to use `t("messages.addSuccess")` and `t("messages.addError")`.

---

## Phase 10 — Future: Remote Backend Migration

When a real API is available, follow these steps per feature:

1. Create `features/{feature}/repository/remote/api-{feature}.repository.ts` implementing the same abstract class
2. Add an API client (e.g. `utils/api-client.ts`) with auth headers, base URL, retry logic
3. Update `features/{feature}/repository/{feature}.repository.registry.ts` to return the API implementation
4. Add a feature flag or environment variable to control local vs remote (optional)
5. No changes to services, hooks, or UI

---

## Progress Tracker

| Phase | Description | Status |
|---|---|---|
| 0 | Architecture documentation | ✅ Done |
| 1 | Structural cleanup | ⬜ Pending |
| 2 | Complete `features/common` | ⬜ Pending |
| 3 | Repository registry | ⬜ Pending |
| 4 | Fix cross-feature dependency | ⬜ Pending |
| 5 | Fix unnecessary `await` | ⬜ Pending |
| 6 | Hooks layer | ⬜ Pending |
| 7 | Wire UI to hooks | ⬜ Pending |
| 8 | Form validation | ⬜ Pending |
| 9 | i18n completeness | ⬜ Pending |
| 10 | Remote backend migration | 🔮 Future |
