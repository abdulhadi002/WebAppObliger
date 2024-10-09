import React from 'react';
import Layout from './components/Layout';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

const PortfolioPage: React.FC = () => {
  return (
    <Layout>
      <h1>My Portfolio</h1>
      <ProjectForm onAddProject={(project) => {
        console.log(project);
      }} />
      <section className="all-projects">
        <ProjectList projects={[]} /> {}
      </section>
    </Layout>
  );
};

export default PortfolioPage;
