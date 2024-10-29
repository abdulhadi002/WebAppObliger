import React from 'react';
import Layout from './components/Layout';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import useProjects from './hooks/useProjects';

const PortfolioPage: React.FC = () => {

  const { projects, addProject, deleteProject, loading, error } = useProjects();


  const handleAddProject = (newProject: any) => {
    addProject(newProject);
  };

  return (
    <Layout>
      <h1>My Portfolio</h1>

      {error && <p>Error: {error}</p>}

      {loading && <p>Loading...</p>}

      <ProjectForm onAddProject={handleAddProject} />

      <section className="all-projects">
        <ProjectList 
          projects={projects} 
          deleteProject={deleteProject}
        />
      </section>
    </Layout>
  );
};

export default PortfolioPage;
