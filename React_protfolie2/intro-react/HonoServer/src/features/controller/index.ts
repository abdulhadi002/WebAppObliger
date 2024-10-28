import { Hono } from "hono";
import { projectService, type ProjectService } from "../service";
import { errorResponse } from "../../lib/error";

import type { HonoEnv } from "../../../server";
import type { Data } from "../../types";

export const createProjectController = (projectService: ProjectService) => {
  const app = new Hono<HonoEnv>();

  app.get("/", async (c) => {
    const result = await projectService.list();
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.get("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.getById(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  app.post("/", async (c) => {
    const data = await c.req.json();
    const result = await projectService.create(data);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json<Data<string>>(result, { status: 201 });
  });

  app.delete("/:id", async (c) => {
    const id = c.req.param("id");
    const result = await projectService.remove(id);
    if (!result.success)
      return errorResponse(c, result.error.code, result.error.message);
    return c.json(result);
  });

  return app;
};
