import { useState, useEffect, useCallback } from 'react';
import { getProjects, addProject as addProjectService } from '../services/api';

export type Project = {
  title: string;
  details: string;
  imageUrl: string;
  publishedAt: string;
};

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = async (newProject: Project) => {
    try {
      setLoading(true);
      await addProjectService(newProject);
      setProjects((prevProjects) => [...prevProjects, newProject]);
    } catch (err) {
      setError('Failed to add project');
      console.error(err);
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
  };
};

export default useProjects;