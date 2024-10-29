import { ProjectProps } from "../components/Project"

const BASE_URL = 'http://localhost:4000';

export const getProjects = async (): Promise<ProjectProps[]> => {
  try {
    const response = await fetch(`${BASE_URL}/json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    const result = await response.json();
    const projects = result.project || result.data;

    return projects.map((proj: ProjectProps) => ({
      id: proj.id,
      title: proj.title,
      details: proj.details,
      image_url: proj.image_url || 'https://via.placeholder.com/100x100',
      published_at: proj.published_at,
      status: proj.status || 'inProgress',
      tags: proj.tags || [],
      is_public: proj.is_public || false,
      link: proj.link || '',
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addProject = async (newProject: ProjectProps) => {
  try {
    const response = await fetch(`${BASE_URL}/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newProject.title,
        details: newProject.details,
        image_url: newProject.image_url,
        published_at: newProject.published_at,
        status: newProject.status || 'inProgress',
        tags: newProject.tags || [],
        is_public: newProject.is_public || false,
        link: newProject.link || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving project:', error);
    throw error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    console.log(`Attempting to delete project with ID: ${id}`);

    const response = await fetch(`${BASE_URL}/json/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete project with ID: ${id}`);
    }

    console.log(`Successfully deleted project with ID: ${id}`);
    return await response.text();
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    throw error;
  }
};