import { z } from "zod";

const projectBaseSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  details: z.string().min(1),
  userId: z.string().uuid(),
});

const dateFieldsSchema = z.object({
  publishedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
});

export const projectSchema = projectBaseSchema.extend({
  ...dateFieldsSchema.shape,
});

export const dbProjectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  details: z.string().min(1),
  published_at: z.string().nullable().optional(),
  deleted_at: z.string().nullable().optional(),
  user_id: z.string().uuid(),
});

export const createProjectDtoSchema = projectBaseSchema.pick({
  title: true,
  details: true,
  userId: true,
});

export const updateProjectDtoSchema = projectSchema
  .pick({
    title: true,
    details: true,
    publishedAt: true,
    deletedAt: true,
  })
  .partial();

export type Project = z.infer<typeof projectSchema>;
export type DbProject = z.infer<typeof dbProjectSchema>;
export type CreateProjectDto = z.infer<typeof createProjectDtoSchema>;
export type UpdateProjectDto = z.infer<typeof updateProjectDtoSchema>;

export const validateProject = (data: unknown): Project =>
  projectSchema.parse(data);

export const validateDbProject = (data: unknown): DbProject =>
  dbProjectSchema.parse(data);

export const validateCreateProjectDto = (data: unknown): CreateProjectDto =>
  createProjectDtoSchema.parse(data);

export const validateUpdateProjectDto = (data: unknown): UpdateProjectDto =>
  updateProjectDtoSchema.parse(data);

export const dbProjectToProject = (dbProject: DbProject): Project => {
  const project: Project = {
    ...dbProject,
    publishedAt: dbProject.published_at
      ? new Date(dbProject.published_at)
      : undefined,
    deletedAt: dbProject.deleted_at ? new Date(dbProject.deleted_at) : undefined,
    userId: dbProject.user_id,
  };
  return validateProject(project);
};

export const projectToDbProject = (project: Project): DbProject => {
  const dbProject: DbProject = {
    id: project.id,
    title: project.title,
    details: project.details,
    published_at: project.publishedAt?.toISOString() ?? null,
    deleted_at: project.deletedAt?.toISOString() ?? null,
    user_id: project.userId,
  };
  return validateDbProject(dbProject);
};
