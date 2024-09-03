import "./style.css";

// Assuming the data.json content is embedded directly into the script
const projectData = {
    "project": [
        {
            "id": 1,
            "project-name": "Web Development Project",
            "description": "A project to develop a responsive website.",
            "Image-scr": "https://via.placeholder.com/150" // Placeholder image URL
        }
    ]
};

const fetchDataFromJson = () => {
  const result = projectData.project;

  console.log("Fetched project data:", result);

  const allProjectsSection = document.querySelector(".all-projects");
  if (!allProjectsSection) {
    console.error("Error: Could not find the '.all-projects' section in the HTML.");
    return;
  }

  for (const project of result) {
    console.log("Adding project:", project);

    // Create project container
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project-container");

    // Project title
    const titleElement = document.createElement("h3");
    titleElement.textContent = project["project-name"];
    projectContainer.appendChild(titleElement);

    // Project description
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = project.description;
    projectContainer.appendChild(descriptionElement);

    // Project image
    const imageElement = document.createElement("img");
    imageElement.src = project["Image-scr"] || "https://via.placeholder.com/150";
    imageElement.alt = project["project-name"];
    projectContainer.appendChild(imageElement);

    allProjectsSection.appendChild(projectContainer);
  }
};

// Execute the function to load data
fetchDataFromJson();
