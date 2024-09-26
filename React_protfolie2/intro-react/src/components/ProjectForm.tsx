import React, { useState } from 'react';

type ProjectFormProps = {
  onAddProject: (project: { title: string; details: string; imageUrl: string }) => void;
};

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject }) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && details) {
      onAddProject({ title, details, imageUrl });
      setTitle('');
      setDetails('');
      setImageUrl('');
    }
  };

  return (
    <form id="create-project-form" onSubmit={handleSubmit}>
      <button type="submit" id="submit-button">Create</button><br />
      <label htmlFor="name" id="name-label">Name for your project</label><br />
      <input
        type="text"
        name="name"
        id="name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      /><br />
      <label htmlFor="description" id="description-label">Description</label><br />
      <textarea
        name="description"
        id="description"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Project Details"
        required
      ></textarea><br />
      <label htmlFor="projectImageInput" id="image-label">Select an image:</label><br />
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
  );
};

export default ProjectForm;
