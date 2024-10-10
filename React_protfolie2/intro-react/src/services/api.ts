
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
    return result.project.map((proj: any) => ({
      title: proj.project_name,
      details: proj.description,
      imageUrl: proj.image_src || 'https://via.placeholder.com/100x100',
      publishedAt: proj.publishedAt,
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