import fs from "node:fs/promises";
import { join } from "node:path";
import type { DB } from "./db";
import type { Project } from "../features/types/index";

export const seed = async (db: DB) => {
  const path = join(import.meta.dirname, "data.json");
  const file = await fs.readFile(path, "utf-8");
  const { projects } = JSON.parse(file) as {
    projects: Project[];
  };

  const insertProject = db.prepare(`
  INSERT INTO projects (id, title, details, image_url, status, tags, is_public, link)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
        project.link
      );
    }
  })();
};
