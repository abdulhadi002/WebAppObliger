import React from 'react';
import Project from './Project';

type Project = {
  title: string;
  details: string;
  imageUrl: string;
};

type ProjectListProps = {
  projects: Project[];
};

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <>
      {projects.map((proj, index) => (
        <Project
          key={index}
          title={proj.title}
          details={proj.details}
          imageUrl={proj.imageUrl}
        />
      ))}
    </>
  );
};

export default ProjectList;
