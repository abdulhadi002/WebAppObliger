import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { DB } from "./db";
import type { Project } from "../../src/features/types";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const seed = async (db: DB) => {
  const path = join(__dirname, "data.json");
  try {
    const file = await fs.readFile(path, "utf-8");
    console.log("Innholdet av data.json:", file);

    const { projects } = JSON.parse(file) as {
      projects: Project[];
    };

    const insertProject = db.prepare(`
      INSERT INTO projects (id, title, details, image_url, published_at, status, tags, is_public, link)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.transaction(() => {
      for (const project of projects) {
        insertProject.run(
          project.id,
          project.title,
          project.details,
          project.image_url,
          project.published_at || new Date().toISOString(), 
          project.status,
          project.tags.join(","),
          project.is_public ? 1 : 0,
          project.link
        );
      }
    })();
  } catch (error) {
    console.error("Feil ved lesing eller parsing av data.json:", error);
  }
};
