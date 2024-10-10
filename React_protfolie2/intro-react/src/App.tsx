import React from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import useProjects from './hooks/useProjects';
import Layout from './components/Layout';


const App: React.FC = () => {
  const { projects, addProject } = useProjects();

  return (
    <Layout>
      <ProjectForm onAddProject={addProject} />
      <section className="all-projects">
        <ProjectList projects={projects} />
      </section>
    </Layout>
  );
};

export default App;