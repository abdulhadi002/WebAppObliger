import { db, type DB } from "../../db/db";
import type { Project, DbProject } from "../types";

import { fromDb, toDb } from "../mappers";
import type { Result } from "../../types";
import { ResultHandler } from "../../lib/result";

export const createProjectRepository = (db: DB) => {
  const exist = async (id: string): Promise<boolean> => {
    const query = db.prepare(
      "SELECT COUNT(*) as count FROM projects WHERE id = ?"
    );
    const data = query.get(id) as { count: number };
    return data.count > 0;
  };

  const getById = async (id: string): Promise<Result<Project>> => {
    try {
      const project = await exist(id);
      if (!project) return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare("SELECT * FROM projects WHERE id = ?");
      const data = query.get(id) as DbProject;
      return ResultHandler.success(fromDb(data));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const list = async (): Promise<Result<Project[]>> => {
    try {
      const query = db.prepare("SELECT * FROM projects");
      const data = query.all() as DbProject[];
      return ResultHandler.success(data.map((project) => fromDb(project)));
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const create = async (data: Project): Promise<Result<string>> => {
    try {
      const project = toDb(data);
      const query = db.prepare(`
        INSERT INTO projects (id, title, details, image_url, status, tags, is_public, link)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      query.run(
        project.id,
        project.title,
        project.details,
        project.image_url,
        project.status,
        project.tags,
        project.is_public,
        project.link
      );
      return ResultHandler.success(project.id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  const remove = async (id: string): Promise<Result<string>> => {
    try {
      const project = await exist(id);
      if (!project) return ResultHandler.failure("Project not found", "NOT_FOUND");
      const query = db.prepare("DELETE FROM projects WHERE id = ?");
      query.run(id);
      return ResultHandler.success(id);
    } catch (error) {
      return ResultHandler.failure(error, "INTERNAL_SERVER_ERROR");
    }
  };

  return { create, list, getById, remove };
};

export const projectRepository = createProjectRepository(db);

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
