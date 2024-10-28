export type Project = {
  id: string;
  title: string;
  details: string;
  imageUrl: string;
  status: string;
  tags: string[];
  isPublic: boolean;
  link: string;
};

export type DbProject = {
  id: string;
  title: string;
  details: string;
  image_url: string;
  status: string;
  tags: string;
  is_public: number;
  link: string;
};

export type CreateProjectDto = Pick<
  Project,
  "title" | "details" | "imageUrl" | "status" | "tags" | "isPublic" | "link"
>;

export type UpdateProjectDto = Partial<
  Pick<Project, "title" | "details" | "status" | "tags" | "isPublic" | "link">
>;

export const projectFields: (keyof Project)[] = [
  "id",
  "title",
  "details",
  "imageUrl",
  "status",
  "tags",
  "isPublic",
  "link",
];

export type ProjectKeys = keyof Project;
