export type Project = {
  id: string;
  title: string;
  details: string;
  image_url: string;
  published_at: string;
  status: string;
  tags: string[];
  is_public: boolean;
  link: string;
};

export type DbProject = {
  id: string;
  title: string;
  details: string;
  image_url: string;
  published_at: string;
  status: string;
  tags: string;
  is_public: number;
  link: string;
};

export type CreateProjectDto = Pick<
  Project,
  "title" | "details" | "image_url" | "published_at" | "status" | "tags" | "is_public" | "link"
>;


export const projectFields: (keyof Project)[] = [
  "id",
  "title",
  "details",
  "image_url",
  "published_at",
  "status",
  "tags",
  "is_public",
  "link",
];

export type ProjectKeys = keyof Project;
