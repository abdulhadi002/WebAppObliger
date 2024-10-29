import type { Entries } from "../../types";
import type { DbProject, Project } from "../types";

import { createId } from "../../lib/id";

export const fromDb = (project: DbProject): Project => {
  return {
    id: project.id,
    title: project.title,
    details: project.details,
    imageUrl: project.image_url,
    status: project.status,
    tags: project.tags.split(","),
    isPublic: project.is_public === 1,
    link: project.link,
  };
};

export const createProject = (project: Partial<Project>): Project => {
  return {
    id: project.id ?? createId(),
    title: project.title ?? "",
    details: project.details ?? "",
    imageUrl: project.imageUrl ?? "",
    status: project.status ?? "inProgress",
    tags: project.tags ?? [],
    isPublic: project.isPublic ?? false,
    link: project.link ?? "",
  };
};

export const toDb = (data: Project): DbProject => {
  const project = createProject(data);
  const entries = Object.entries(project) as Entries<Project>;
  const dbProject = {} as DbProject;

  for (const entry of entries) {
    if (!entry) continue;
    const [key, value] = entry;
    switch (key) {
      case "id":
        dbProject.id = value;
        break;
      case "title":
        dbProject.title = value;
        break;
      case "details":
        dbProject.details = value;
        break;
      case "imageUrl":
        dbProject.image_url = value;
        break;
      case "status":
        dbProject.status = value;
        break;
      case "tags":
        dbProject.tags = value?.join(",");
        break;
      case "isPublic":
        dbProject.is_public = value ? 1 : 0;
        break;
      case "link":
        dbProject.link = value;
        break;
      default:
        break;
    }
  }
  return dbProject;
};
