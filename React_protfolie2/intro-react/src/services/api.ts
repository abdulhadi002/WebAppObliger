const BASE_URL = 'http://localhost:4000';

export const getProjects = async () => {
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

    return projects.map((proj: any) => ({
      id: proj.id,
      title: proj.project_name,
      details: proj.description,
      imageUrl: proj.image_src || 'https://via.placeholder.com/100x100',
      publishedAt: proj.publishedAt,
      status: proj.status || 'inProgress',
      tags: proj.tags || [],
      isPublic: proj.isPublic || false,
      link: proj.link || '',
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addProject = async (newProject: any) => {
  try {
    const response = await fetch(`${BASE_URL}/json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_name: newProject.title,
        description: newProject.details,
        image_src: newProject.imageUrl,
        publishedAt: newProject.publishedAt,
        status: newProject.status || 'inProgress',
        tags: newProject.tags || [],
        isPublic: newProject.isPublic || false,
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


