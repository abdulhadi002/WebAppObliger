import 'dotenv/config';
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import db, { type DB } from "./src/db/db";
import { setup } from "./src/db/setup";
import { makeLogger, type Logger } from "./src/lib/logger";
import { type ServerEnv, env } from "./src/lib/env";
import { handleError } from "./src/lib/error";
import { projectService } from "./src/features/service";
import { createProjectController } from "./src/features/controller";

export type ServiceContext = {
  db: DB;
  logger: Logger;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  };
};

const makeApp = async (
  database: DB = db,
  logger: Logger = makeLogger({ logLevel: env.LOG_LEVEL, env: env.NODE_ENV })
) => {
  await setup(database);

  const app = new Hono<HonoEnv>();

  app.use(
    "/*",
    cors({
      origin: env.FRONTEND_URL,
      allowMethods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      allowHeaders: ["Content-Type"],
      maxAge: 600,
      credentials: true,
    })
  );

  app.use(prettyJSON());

  app.use("*", async (c, next) => {
    c.set("services", {
      logger,
      db: database,
    });
    await next();
  });

  const projectController = createProjectController(projectService);
  app.route("/json", projectController);

  app.onError((err, c) => handleError(err, c));

  return app;
};

const app = await makeApp();

const port = env.PORT || 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
