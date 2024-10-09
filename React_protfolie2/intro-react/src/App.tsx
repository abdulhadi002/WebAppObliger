import React, { useState, useEffect } from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import { z } from 'zod';

type Project = {
  title: string;
  details: string;
  imageUrl: string;
  publishedAt: string;
};

const ZodSkjema = z.object({
  project_name: z.string(),
  decsription: z.string(),
  image_src: z.string().url(),
  publishedAt: z.string().datetime(),
});

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
          publishedAt: proj.publishedAt,
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
          publishedAt: newProject.publishedAt,
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
      <section className="all-projects">
        <ProjectList projects={projects} />
      </section>
    </>
  );
};

export default App;
