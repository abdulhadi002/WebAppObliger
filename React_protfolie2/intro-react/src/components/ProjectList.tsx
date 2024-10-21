import React from 'react';
import Project, { ProjectProps } from './Project';

type ProjectListProps = {
  projects: ProjectProps[];
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
          status={proj.status}
          tags={proj.tags}
          isPublic={proj.isPublic}
          link={proj.link}
        />
      ))}
    </>
  );
};

export default ProjectList;
