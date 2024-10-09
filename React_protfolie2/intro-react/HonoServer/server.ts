import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  const data = await readFile("./HonoServer/ProjectInfo.json", "utf-8");
  return c.json(JSON.parse(data));
});

app.post("/json", async (c) => {
  try {
    const newProject = await c.req.json();
    const data = await readFile("./HonoServer/ProjectInfo.json", "utf-8");
    const projects = JSON.parse(data).project;

    newProject.id = projects.length ? projects[projects.length - 1].id + 1 : 1;
    newProject.publichedAt = newProject.publichedAt || new Date().toISOString();
    projects.push(newProject);

    await writeFile("./HonoServer/ProjectInfo.json", JSON.stringify({ project: projects }, null, 2));

    return c.json(newProject, 201);
  } catch (error) {
    return c.text("Failed to save project", 500);
  }
});

const port = 4000;

console.log(`It does WORK on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
