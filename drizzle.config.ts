import { defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "expo",
  dialect: "sqlite",
  schema: "./db/schemas",
  out: "./db/migrations",
});
