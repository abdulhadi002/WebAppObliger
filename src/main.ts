/*import "./style.css";

interface Project {
  title: string;
  details: string;
  imageUrl: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.querySelector('.all-projects') as HTMLDivElement;
  const projectForm = document.getElementById('create-project-form') as HTMLFormElement;
  let projects: Project[] = [];

  /*const loadProjects = async () => {
    try {
      const response = await fetch('ProjectInfo.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      projects = data.project;
      projects.forEach(proj => displayProject(proj));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchDataFromServer = async () => {
    const response = await fetch("http://localhost:4000/json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
  
    console.log(result);
  
    const id = document.getElementById("json");
    if (!id) return;
    for (const habit of result) {
      const element = document.createElement("p");
      element.textContent = habit.title;
      id.appendChild(element);
    }
  };

  const displayProject = (proj: Project) => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = proj.imageUrl || 'https://via.placeholder.com/150';
    img.alt = 'project image';
    const p = document.createElement('p');
    p.textContent = proj.details;
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = proj.title;

    article.appendChild(img);
    article.appendChild(p);
    article.appendChild(a);
    projectList.appendChild(article);
  };

  projectForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const title = (document.getElementById('name') as HTMLInputElement).value;
    const details = ((event.target as HTMLFormElement).elements.namedItem('description') as HTMLTextAreaElement)?.value;
    const imageInput = document.getElementById('projectImageInput') as HTMLInputElement;
    const imageFile = imageInput.files?.[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const newProject: Project = {
          title,
          details,
          imageUrl: reader.result as string
        };

        projects.push(newProject);
        displayProject(newProject);
        projectForm.reset();
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.error('No image file selected.');
    }
  });

  /*loadProjects();
  fetchDataFromServer();
});*/

/* get og post i json */

import "./style.css";

interface Project {
  title: string;
  details: string;
  imageUrl: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const projectList = document.querySelector('.all-projects') as HTMLDivElement;
  const projectForm = document.getElementById('create-project-form') as HTMLFormElement;
  let projects: Project[] = [];

  const fetchDataFromServer = async () => {
    try {
      const response = await fetch("http://localhost:4000/json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      result.project.forEach((proj: any) => {
        displayProject({
          title: proj.project_name,
          details: proj.description,
          imageUrl: proj.image_src || 'https://via.placeholder.com/100x100'
        });
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const displayProject = (proj: Project) => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    img.src = proj.imageUrl || 'https://via.placeholder.com/100x100';
    img.alt = 'project image';
    const p = document.createElement('p');
    p.textContent = proj.details;
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = proj.title;

    article.appendChild(img);
    article.appendChild(p);
    article.appendChild(a);
    projectList.appendChild(article);
  };

  projectForm.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const title = (document.getElementById('name') as HTMLInputElement).value;
    const details = ((event.target as HTMLFormElement).elements.namedItem('description') as HTMLTextAreaElement)?.value;
    const imageInput = document.getElementById('projectImageInput') as HTMLInputElement;
    const imageFile = imageInput.files?.[0];

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = async () => {
        const newProject = {
          project_name: title,
          description: details,
          image_src: reader.result as string
        };

        try {
          const response = await fetch("http://localhost:4000/json", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProject),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const savedProject = await response.json();

          displayProject({
            title: savedProject.project_name,
            details: savedProject.description,
            imageUrl: savedProject.image_src
          });

          projectForm.reset();
        } catch (error) {
          console.error('Error saving project:', error);
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      console.error('No image file selected.');
    }
  });

  fetchDataFromServer();
});
