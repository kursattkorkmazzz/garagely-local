import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { Paths } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import migrations from "./migrations/migrations";
//TODO: Remove export at the production build.
export const expoDB = SQLite.openDatabaseSync(
  "garagely.db",
  undefined,
  Paths.document.info().uri + "database",
);

const GaragelyDatabase = drizzle(expoDB, {
  casing: "snake_case",
  logger: false,
});

export function getGaragelyDatabase() {
  return GaragelyDatabase;
}

export async function initializeGaragelyDatabase() {
  await migrate(GaragelyDatabase, migrations);
  return GaragelyDatabase;
}
