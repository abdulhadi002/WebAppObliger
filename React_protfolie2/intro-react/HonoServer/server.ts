import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile, writeFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";
import path from "node:path"; // Legger til path for bedre håndtering av filstier

const app = new Hono();

// Full path til JSON-filen for å unngå stirelaterte problemer
const jsonFilePath = path.join(__dirname, "HonoServer", "ProjectInfo.json");

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

// Hente alle prosjekter (GET /json)
app.get("/json", async (c) => {
  try {
    const data = await readFile(jsonFilePath, "utf-8");
    const projects = JSON.parse(data).project;

    return c.json(projects);
  } catch (error) {
    console.error("Failed to read projects:", error);
    return c.text("Failed to fetch projects", 500);
  }
});

// Legge til nytt prosjekt (POST /json)
app.post("/json", async (c) => {
  try {
    // Hent data fra forespørselen
    const newProject = await c.req.json();

    // Les eksisterende prosjekter fra JSON-filen
    const data = await readFile(jsonFilePath, "utf-8");
    const parsedData = JSON.parse(data);

    // Hvis prosjektdata ikke eksisterer, opprett en tom array
    const projects = parsedData.project || [];

    // Generer ny ID og sett publiseringsdato
    newProject.id = projects.length ? projects[projects.length - 1].id + 1 : 1;
    newProject.publishedAt = new Date().toISOString();

    // Default-verdier for manglende felt
    newProject.status = newProject.status || "inProgress";
    newProject.tags = newProject.tags || [];
    newProject.isPublic = newProject.isPublic !== undefined ? newProject.isPublic : false;
    newProject.link = newProject.link || "";

    // Legg til det nye prosjektet i prosjektlisten
    projects.push(newProject);

    // Lagre den oppdaterte listen tilbake til JSON-filen
    await writeFile(jsonFilePath, JSON.stringify({ project: projects }, null, 2), "utf-8");

    // Returner det nye prosjektet som ble lagret
    return c.json(newProject, 201);
  } catch (error) {
    console.error("Failed to save project:", error);
    return c.text("Failed to save project", 500);
  }
});

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
