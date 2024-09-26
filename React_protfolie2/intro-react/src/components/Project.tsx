import React from 'react';

type ProjectProps = {
  title: string;
  details: string;
  imageUrl: string;
};

const Project: React.FC<ProjectProps> = ({ title, details, imageUrl }) => {
  return (
    <article>
      <img src={imageUrl} alt="project" />
      <p>{details}</p>
      <a href="#">{title}</a>
    </article>
  );
};

export default Project;
