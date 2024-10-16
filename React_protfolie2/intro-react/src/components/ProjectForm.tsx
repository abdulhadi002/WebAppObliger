import React, { useState } from 'react';
import { format } from 'date-fns';

type ProjectFormProps = {
  onAddProject: (project: {
    title: string;
    details: string;
    imageUrl: string;
    publishedAt: string;
    status: string;
    tags: string;
    isPublic: boolean;
    link: string;
  }) => void;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && details) {
      const publishedAt = format(new Date(), "'Date: 'yyyy-MM-dd' Time: 'HH:mm:ss");
      const isPublicBoolean = isPublic.toLowerCase() === 'yes';
      onAddProject({ title, details, imageUrl, publishedAt, status, tags, isPublic: isPublicBoolean, link });
      setTitle('');
      setDetails('');
      setImageUrl('');
      setStatus('');
      setTags('');
      setIsPublic('');
      setLink('');
    }
  };

  return (
    <section>
      <form id="create-project-form" onSubmit={handleSubmit}>
      <button type="submit" id="submit-button">Create</button>
        <label htmlFor="name" id="name-label">Name for your project:</label><br />
        <input
          type="text"
          name="name"
          id="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
          required
        /><br />

        <label htmlFor="description" id="description-label">Description:</label><br />
        <textarea
          name="description"
          id="description"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Project Details"
          required
        ></textarea><br />

        <label htmlFor="status" id="status-label">Status:</label><br />
        <input
          type="text"
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="e.g. inProgress, completed"
        /><br />

        <label htmlFor="tags" id="tags-label">Tags (comma separated):</label><br />
        <input
          type="text"
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. Typescript, React"
        /><br />

        <label htmlFor="public" id="public-label">Public:</label>
        <input
          type="text"
          name="public"
          id="public"
          value={isPublic}
          onChange={(e) => setIsPublic(e.target.value)}
          placeholder='YES or NO'
        /><br />

        <label htmlFor="link" id="link-label">External Link:</label><br />
        <input
          type="url"
          name="link"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="e.g. https://github.com/abdulhadi002/WebAppObliger.git"
        /><br />

        <label htmlFor="projectImageInput" id="image-label">Select an image:</label><br />
        <button className='showall'>Show All Projects</button>
        <input
          type="file"
          id="projectImageInput"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setImageUrl(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
        /><br />
      </form>
    </section>
  );
};

export default ProjectForm;