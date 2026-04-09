import { defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "expo",
  dialect: "sqlite",
  schema: "./db/schemas/**/*.schema.ts",
  out: "./db/migrations",
});
