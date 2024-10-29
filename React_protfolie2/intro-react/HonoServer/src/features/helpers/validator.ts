import type { Entries } from "../../types";
import type { Project } from "../types";
import { createProject } from "../mappers";

export const isValidProject = (data: Partial<Project>): boolean => {
  const project = createProject(data);

  return (Object.entries(project) as Entries<Partial<Project>>).every(
    (entry) => {
      if (!entry) return false;

      const [key, value] = entry;

      switch (key) {
        case "title":
          return value && value.length > 3;
        case "details":
          return value && value.length > 0;
        default:
          return true;
      }
    }
  );
};
