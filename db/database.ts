import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync("garagely.db");
  return db;
}

export async function initDatabase(): Promise<void> {
  const database = await getDatabase();

  // Create vehicles table
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      color TEXT,
      plate TEXT NOT NULL,
      vin TEXT,
      fuel_type TEXT,
      transmission_type TEXT,
      body_type TEXT,
      purchase_date TEXT,
      purchase_price_amount REAL,
      purchase_price_currency TEXT,
      purchase_distance_value REAL,
      purchase_distance_unit TEXT,
      cover_image_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // Create assets table (for images)
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS assets (
      id TEXT PRIMARY KEY NOT NULL,
      owner_type TEXT NOT NULL,
      owner_id TEXT NOT NULL,
      asset_type TEXT NOT NULL,
      file_path TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      width INTEGER,
      height INTEGER,
      created_at TEXT NOT NULL
    );
  `);

  console.log("Database initialized");
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
