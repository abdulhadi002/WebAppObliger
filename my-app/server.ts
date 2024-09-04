import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFile } from "node:fs/promises";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";

interface Project {
    id: number;
    project_name: string;
    description: string;
    image_src: string;
}

const app = new Hono()

app.use("/*", cors());

app.use("/statics/*", serveStatic({root: "./"}));

app.get("/json", async (c) => {
    const data = await readFile("./data.json", "utf-8");
    return c.json(JSON.parse(data));
});

const port = 4000;

console.log(`It does WORK on port ${port}`);

serve({
    fetch: app.fetch,
    port
});