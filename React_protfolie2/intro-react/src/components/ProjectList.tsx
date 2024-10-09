import React from 'react';
import Project from './Project';
import { format } from 'date-fns';

type Project = {
  title: string;
  details: string;
  imageUrl: string;
  publishedAt: string;
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
          publishedAt={proj.publishedAt}
        />
      ))}
    </>
  );
};

export default ProjectList;