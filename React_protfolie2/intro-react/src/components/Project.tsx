import React from 'react';

export type ProjectProps = {
  id: number;
  title: string;
  details: string;
  imageUrl: string;
  publishedAt: string;
  status: string;
  tags: string[];
  isPublic: boolean;
  link: string;
  deleteProject: (id: number) => void;
};

const Project: React.FC<ProjectProps> = ({ id, title, details, imageUrl, publishedAt, status, tags, isPublic, link, deleteProject }) => {

  const handleDelete = () => {
    console.log(`Deleting project with ID: ${id}`);
    deleteProject(id);
  };

  return (
    <article>
      <img src={imageUrl} alt="project" />
      <h2><strong>Name:</strong> {title}</h2>
      <p><strong>Description:</strong> {details}</p>
      <p><strong>publishedAt:</strong> {publishedAt}</p>
      <section>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Tags:</strong> {tags.length > 0 ? tags.join(', ') : 'No tags available'}</p>
        <p><strong>Public:</strong> {isPublic ? 'Yes' : 'No'}</p>
        {link && (
          <p>
            <strong>External Link:</strong> <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </p>
        )}
      </section>

      <button onClick={handleDelete} className="delete-button">
        Delete Project
      </button>
    </article>
  );
};

export default Project;
