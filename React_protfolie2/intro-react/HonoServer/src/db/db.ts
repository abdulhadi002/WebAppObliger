import { env } from "../lib/env";
import { makeLogger } from "../lib/logger";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbFilePath = env.DATABASE_URL.replace(/^file:/, "");
const dbPath = path.dirname(dbFilePath);

if (!fs.existsSync(dbPath)) {
  fs.mkdirSync(dbPath, { recursive: true });
}

export const db = new Database(dbFilePath, {
  verbose: (message: unknown) => makeLogger().info(`${message}`),
});

export type DB = typeof db;

export default db;
