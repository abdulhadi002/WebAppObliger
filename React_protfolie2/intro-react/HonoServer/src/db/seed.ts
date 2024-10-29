import fs from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { DB } from "./db";
import type { Project } from "../features/types/index";

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
      INSERT INTO projects (id, title, details, image_url, status, tags, is_public, link, published_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.transaction(() => {
      for (const project of projects) {
        insertProject.run(
          project.id,
          project.title,
          project.details,
          project.imageUrl,
          project.status,
          project.tags.join(","),
          project.isPublic ? 1 : 0,
          project.link,
          new Date().toISOString()
        );
      }
    })();
  } catch (error) {
    console.error("Feil ved lesing eller parsing av data.json:", error);
  }
};
