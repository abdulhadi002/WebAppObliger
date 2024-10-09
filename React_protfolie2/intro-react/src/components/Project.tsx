import React from 'react';

type ProjectProps = {
  title: string;
  details: string;
  imageUrl: string;
  publishedAt: string;
};

const Project: React.FC<ProjectProps> = ({ title, details, imageUrl, publishedAt }) => {
  return (
    <article>
      <img src={imageUrl} alt="project" />
      <p>{publishedAt}</p>
      <p>{details}</p>
      <a href="#">{title}</a>
    </article>
  );
};

export default Project;
