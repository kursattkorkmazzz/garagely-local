# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garagely is an Expo React Native mobile app for personal vehicle garage management. It tracks vehicles, maintenance records, and related expenses with local-first data storage. The architecture is designed to be backend-ready — see `ARCHITECTURE.md` for the full design.

## Development Commands

```bash
npm start          # Start Expo dev server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run in web browser
npm run lint       # Run ESLint
```

### Drizzle Database

```bash
npx drizzle-kit generate   # Generate migrations from schema changes
npx drizzle-kit push       # Push schema directly to database (dev only)
npx drizzle-kit studio     # Open Drizzle Studio (also available via expo-drizzle-studio-plugin in dev)
```

## Architecture

See `ARCHITECTURE.md` for the full design. Summary below.

### Data Flow (strict — do not break this chain)

```
Screen / Component  →  Feature Hook  →  Service  →  Repository (via registry)  →  SQLite / API
```

- **Screens** only import from a feature's `hooks/` or barrel `index.ts`
- **Services** call repositories via the registry function (never `new ConcreteRepo()` directly)
- **Repositories** never import from another feature's service
- **Cross-feature operations** (e.g. confirming an asset during vehicle save) happen in the **service layer**

### Feature Module Structure

Every feature in `features/` follows this layout:

```
features/{feature}/
├── constants/        # Enums, error codes, lookup tables
├── entity/           # Pure TypeScript domain types (no framework deps)
├── dto/              # Zod-validated input contracts (CreateXxxDto, UpdateXxxDto)
├── repository/
│   ├── {feature}.repository.ts              # Abstract class — the contract
│   ├── {feature}.repository.registry.ts     # Returns the active implementation
│   ├── params/                              # Internal param types
│   └── local/                              # SQLite / file system implementations
│       └── sqlite-{feature}.repository.ts
│   └── remote/                             # Future: REST API implementations
├── service/
│   └── {feature}.service.ts                # Business logic; uses repository via registry
├── hooks/            # React hooks — the ONLY thing screens import
│   ├── use-{feature}s.ts
│   ├── use-{feature}.ts
│   ├── use-create-{feature}.ts
│   └── use-delete-{feature}.ts
└── index.ts          # Public barrel: entity types + dto types + hooks only
```

### Repository Registry Pattern

Use a registry function — never instantiate concrete repositories directly in services:

```typescript
// features/vehicle/repository/vehicle.repository.registry.ts
let _instance: VehicleRepository | null = null;

export function getVehicleRepository(): VehicleRepository {
  if (!_instance) _instance = new SqliteVehicleRepository();
  // To swap to remote: _instance = new ApiVehicleRepository(getApiClient());
  return _instance;
}

export function setVehicleRepository(repo: VehicleRepository): void {
  _instance = repo; // used in tests
}
```

### Hooks Layer

UI screens never call services directly. Hooks own loading/error state:

```typescript
export function useCreateVehicle() {
  const [isLoading, setIsLoading] = useState(false);
  const createVehicle = async (data: CreateVehicleDto) => {
    setIsLoading(true);
    try { return await VehicleService.addVehicle(data); }
    finally { setIsLoading(false); }
  };
  return { createVehicle, isLoading };
}
```

### Asset Lifecycle — PENDING / CONFIRMED

Assets (images, files) are uploaded immediately when selected in a form, before the parent entity is saved. This creates a two-phase lifecycle managed via the `asset_references` table.

**States:** `PENDING` → uploaded, waiting to be linked | `CONFIRMED` → linked to a persisted entity

**`db/schemas/asset-reference.schema.ts`** — tracks which entity owns which asset:
```
asset_references(id, assetId, ownerType, ownerId)
  e.g. (uuid, "abc123", "vehicle", "veh456")
```

**How it works:**
- Upload → `AssetService.saveAsset()` → status=PENDING, no reference row yet
- Entity save (e.g. vehicle) → repository transaction inserts into `asset_references` AND sets status=CONFIRMED, atomically
- Entity delete → repository deletes from `asset_references`, then service deletes the file + asset record
- Startup cleanup → `AssetService.cleanupPendingAssets()` deletes PENDING assets NOT present in `asset_references` via SQL subquery — **no ID list in memory, scales to any number of features**

**Adding a new feature that uses assets:** just insert/delete rows in `asset_references` with your feature's `ownerType`. The cleanup query handles it automatically.

### Feature Isolation Rules

| Allowed | Not Allowed |
|---|---|
| Feature imports from `features/common` | Repository imports another feature's **service** |
| Service calls another feature's service | Screen calls a service directly |
| Repository imports DB schemas from other features | Service instantiates `new ConcreteRepository()` |
| Hook calls its own feature's service | `constants/` exports Zod validators |
| `constants/` exports enums | — |

### `constants/` vs `features/common/dto/`

- `constants/` — app-wide **enums only**: `Currency`, `DistanceUnit`, `VolumeUnit`, `Language`, `ThemeType`, `Timezone`, storage keys
- `features/common/dto/` — Zod **validators** for shared value objects: `MoneyDtoValidator`, `DistanceDtoValidator`, `DateDtoValidator`, `VolumeDtoValidator`

### Routing

- Uses Expo Router with file-based routing in `app/`
- Dashboard tabs defined in `app/(dashboard)/_layout.tsx`
- Root layout (`app/_layout.tsx`) handles app initialization: i18n, database, theme provider, and Zustand store hydration

### State Management

- **Zustand** store in `store/store.ts` with slice pattern (`store/slices/`)
- User preferences (theme, language, currency, units) persisted via AsyncStorage

### Database

- **Drizzle ORM** with **expo-sqlite** for local SQLite storage
- Schemas in `db/schemas/` — use `BaseSchema` from `db/helpers/base.schema.ts` for standard id/timestamps
- Migrations in `db/migrations/` — generated by drizzle-kit
- Database instance via `getGaragelyDatabase()` from `db/database.ts` (synchronous — do not `await` it)
- Common value-object schemas in `db/schemas/commons/`

### Internationalization

- **i18next** with EN and TR locales
- Translations in `i18n/locales/{lang}/{namespace}.json`
- Namespaces: common, garage, vehicle, settings, theme, language, currency, distance, volume
- Use `useI18n()` hook from `hooks/use-i18n.ts`
- **No hardcoded English strings in screens** — always use translation keys

### Theming

- Theme context in `theme/theme-context.tsx` with light/dark/system modes
- Design tokens in `theme/tokens/` (colors, spacing, radius, typography)
- Use `useTheme()` hook for current theme and `useThemedStylesheet()` for styled components

### UI Components

- Shared components in `components/ui/` prefixed with `App*` (AppButton, AppInput, AppText, etc.)
- Feature-specific components in `components/{feature}/`

## Adding a New Feature

1. Follow the folder structure above
2. Create the DB schema in `db/schemas/{feature}.schema.ts` extending `BaseSchema`
3. Run `npx drizzle-kit generate` to create the migration
4. Add a repository registry file
5. Expose feature functionality only through hooks
6. Add i18n keys for both `en` and `tr` locales
7. Export entity types, dto types, and hooks from `index.ts` — do not export service or repository classes

## Path Aliases

Use `@/` for absolute imports from project root (configured in tsconfig.json).

## Key Dependencies

- **zod** for DTO validation
- **dayjs** for date handling
- **lucide-react-native** for icons
- **react-native-toast-message** for notifications
- **formik** for forms
