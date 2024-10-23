import React from 'react';
import Project from './Project';
import { ProjectProps } from './Project';

type ProjectListProps = {
  projects: ProjectProps[];
  deleteProject: (id: number) => void;
};

const ProjectList: React.FC<ProjectListProps> = ({ projects, deleteProject }) => {
  return (
    <>
      {projects.map((proj) => (
        <div key={proj.id} className="project-item">
          <Project 
            {...proj} 
            deleteProject={deleteProject}
          />
        </div>
      ))}
    </>
  );
};

export default ProjectList;
