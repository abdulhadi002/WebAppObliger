import React from 'react';

export type ProjectProps = {
  id: number;
  title: string;
  details: string;
  image_url: string;
  published_at: string;
  status: string;
  tags: string[];
  is_public: boolean;
  link: string;
  deleteProject: (id: number) => void;
};

const Project: React.FC<ProjectProps> = ({ id, title, details, image_url, published_at, status, tags, is_public, link, deleteProject }) => {

  const handleDelete = () => {
    console.log(`Deleting project with ID: ${id}`);
    deleteProject(id);
  };

  return (
    <article>
      <img src={image_url} alt="project" />
      <h2><strong>Name:</strong> {title}</h2>
      <p><strong>Description:</strong> {details}</p>
      <p><strong>publishedAt:</strong> {published_at}</p>
      <section>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Tags:</strong> {tags.length > 0 ? tags.join(', ') : 'No tags available'}</p>
        <p><strong>Public:</strong> {is_public ? 'Yes' : 'No'}</p>
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
