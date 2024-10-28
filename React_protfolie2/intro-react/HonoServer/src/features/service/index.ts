import type { Result } from "../../types";
import { projectRepository, type ProjectRepository } from "../repository";
import type { CreateProjectDto, Project, UpdateProjectDto } from "../types";
import { ResultHandler } from "../../lib/result";
import { createProject } from "../mappers";

export const createProjectService = (
  projectRepository: ProjectRepository
) => {
  const getById = async (
    id: string
  ): Promise<Result<Project | undefined>> => {
    return projectRepository.getById(id);
  };

  const list = async (): Promise<Result<Project[]>> => {
    return projectRepository.list();
  };

  const create = async (data: CreateProjectDto): Promise<Result<string>> => {
    const project = createProject(data);
    return projectRepository.create(project);
  };

  const remove = async (id: string): Promise<Result<string>> => {
    return projectRepository.remove(id);
  };

  return {
    list,
    create,
    getById,
    remove,
  };
};

export const projectService = createProjectService(projectRepository);
export type ProjectService = ReturnType<typeof createProjectService>;
