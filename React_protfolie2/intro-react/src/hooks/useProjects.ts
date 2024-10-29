import { useState, useEffect, useCallback } from 'react';
import { getProjects, addProject as addProjectService, deleteProject as deleteProjectService } from '../services/api';
import { ProjectProps } from '../components/Project';

const useProjects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
      console.log("Fetched projects:", data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error("Error fetching projects:", err); 
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = async (newProject: ProjectProps) => {
    try {
      setLoading(true);
      await addProjectService(newProject);
      setProjects((prevProjects) => [...prevProjects, newProject]);
      console.log("Added new project:", newProject); 
    } catch (err) {
      setError('Failed to add project');
      console.error("Error adding project:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      setLoading(true);
      console.log(`Attempting to delete project with ID: ${id}`); 
      await deleteProjectService(id);
      setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
      console.log(`Successfully deleted project with ID: ${id}`); 
    } catch (err) {
      setError(`Failed to delete project with ID: ${id}`);
      console.error(`Error deleting project with ID ${id}:`, err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    addProject,
    deleteProject,
  };
};

export default useProjects;
