import { drizzle } from "drizzle-orm/expo-sqlite";

import SQLite from "expo-sqlite";

//TODO: Remove export at the production build.
export const expoDB = SQLite.openDatabaseSync("garagely.db");

const GaragelyDatabase = drizzle(expoDB, {
  casing: "snake_case",
  logger: false,
});

export function getGaragelyDatabase() {
  return GaragelyDatabase;
}

export function initializeGaragelyDatabase() {
  return GaragelyDatabase;
}
