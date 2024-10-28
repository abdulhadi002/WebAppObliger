import type { DB } from "./db";
import { createTables } from "./tables";
import { seed } from "./seed";

export const setup = async (db: DB) => {
  await createTables(db);
  await seed(db);
};
