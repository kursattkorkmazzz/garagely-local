import { DataSource } from "typeorm";

const GaragelyDatabase = new DataSource({
  type: "expo",
  driver: require("expo-sqlite"),
  database: "garagely.db",
  synchronize: true,

  logging: false,
  maxQueryExecutionTime: 1000,

  invalidWhereValuesBehavior: {
    null: "sql-null",
    undefined: "ignore",
  },

  entities: [],
});

export function getGaragelyDatabase() {
  if (!GaragelyDatabase.isInitialized) {
    throw new Error(
      "GaragelyDatabase is not initialized. Please call initializeGaragelyDatabase() before using it.",
    );
  }
  return GaragelyDatabase;
}

export function initializeGaragelyDatabase() {
  if (GaragelyDatabase.isInitialized) return;
  return GaragelyDatabase.initialize();
}
