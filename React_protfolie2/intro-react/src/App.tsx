import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

type Project = {
  title: string;
  details: string;
  imageUrl: string;
};

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchDataFromServer = async () => {
      try {
        const response = await fetch('http://localhost:4000/json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();

        const fetchedProjects = result.project.map((proj: any) => ({
          title: proj.project_name,
          details: proj.description,
          imageUrl: proj.image_src || 'https://via.placeholder.com/100x100',
        }));

        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchDataFromServer();
  }, []);

  const addProject = async (newProject: Project) => {
    try {
      const response = await fetch('http://localhost:4000/json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_name: newProject.title,
          description: newProject.details,
          image_src: newProject.imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setProjects([...projects, newProject]);
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  return (
    <>
      <h1>Project Manager</h1>
      <ProjectForm onAddProject={addProject} />
      <div className="all-projects">
        <ProjectList projects={projects} />
      </div>
    </>
  );
};

export default App;
