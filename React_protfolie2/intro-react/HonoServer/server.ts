import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  try {
    const data = await readFile("./HonoServer/ProjectInfo.json", "utf-8");
    const parsedData = JSON.parse(data);

    const projects = parsedData.project || [];
    
    return c.json({ success: true, project: projects });
  } catch (error) {
    console.error("Error reading project data:", error);
    return c.json({ success: false, error: "Error reading data" }, 500);
  }
});

app.post("/json", async (c) => {
  try {
    const newProject = await c.req.json();

    const data = await readFile("./HonoServer/ProjectInfo.json", "utf-8");
    const parsedData = JSON.parse(data);
    const projects = parsedData.project || [];

    newProject.id = projects.length ? projects[projects.length - 1].id + 1 : 1;
    newProject.publishedAt = new Date().toISOString();

    newProject.status = newProject.status || "inProgress";
    newProject.tags = newProject.tags || [];
    newProject.isPublic = newProject.isPublic !== undefined ? newProject.isPublic : false;
    newProject.link = newProject.link || "";

    projects.push(newProject);

    await writeFile("./HonoServer/ProjectInfo.json", JSON.stringify({ project: projects }, null, 2), "utf-8");

    return c.json(newProject, 201);
  } catch (error) {
    console.error("Failed to save project:", error);
    return c.text("Failed to save project", 500);
  }
});

app.delete("/json/:id", async (c) => {
  try {
    const projectId = Number(c.req.param("id"));
    console.log(`Attempting to delete project with ID: ${projectId}`);

    if (isNaN(projectId)) {
      console.log("Invalid project ID");
      return c.text("Invalid project ID", 400);
    }

    const data = await readFile("./HonoServer/ProjectInfo.json", "utf-8");
    const parsedData = JSON.parse(data);
    let projects = parsedData.project || [];

    const projectToDelete = projects.find((project) => project.id === projectId);

    if (!projectToDelete) {
      console.log("Project not found");
      return c.text("Project not found", 404);
    }

    projects = projects.filter((project) => project.id !== projectId);

    await writeFile("./HonoServer/ProjectInfo.json", JSON.stringify({ project: projects }, null, 2), "utf-8");

    console.log(`Deleted project with ID: ${projectId}`);

    return c.text("Project deleted", 200);
  } catch (error) {
    console.error("Failed to delete project:", error);
    return c.text("Failed to delete project", 500);
  }
});


const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
