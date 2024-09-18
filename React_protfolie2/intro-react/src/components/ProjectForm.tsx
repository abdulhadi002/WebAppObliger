import React, { useState } from 'react';

interface ProjectFormProps {
  onAddProject: (project: { title: string; details: string; imageUrl: string }) => void;
}

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project Title"
        required
      />
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Project Details"
        required
      ></textarea>
      <input
        type="file"
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
      />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default ProjectForm;
