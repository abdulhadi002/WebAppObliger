import type { DB } from "./db";

export const createTables = async (db: DB) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      details TEXT,
      image_url TEXT,
      published_at TEXT,
      status TEXT,
      tags TEXT,
      is_public INTEGER,
      link TEXT
    );
  `);
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
  `);
};
