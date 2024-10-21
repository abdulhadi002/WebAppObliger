import React from 'react';

export type ProjectProps = {
  title: string;
  details: string;
  imageUrl: string;
  publishedAt: string;
  status: string;
  tags: string[];
  isPublic: boolean;
  link: string;
};

const Project: React.FC<ProjectProps> = ({ title, details, imageUrl, publishedAt, status, tags, isPublic, link }) => {
  return (
    <article>
      <img src={imageUrl} alt="project" />
      <h2>{title}</h2>
      <p>{publishedAt}</p>
      <p>{details}</p>
      <section>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Tags:</strong> {tags && tags.length > 0 ? tags.join(', ') : 'No tags available'}</p>
        <p><strong>Public:</strong> {isPublic ? 'Yes' : 'No'}</p>
        {link && (
          <p>
            <strong>External Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </p>
        )}
      </section>
    </article>
  );
};

export default Project;
