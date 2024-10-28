import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

import { type DB, db } from "./db/db";
import { makeLogger, type Logger } from "./lib/logger";
import { type ServerEnv, env } from "./lib/env";
import { handleError } from "./lib/error";
import { projectController } from "./features/controller";

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

export const makeApp = (
  database: DB = db,
  logger: Logger = makeLogger({ logLevel: env.LOG_LEVEL, env: env.NODE_ENV })
) => {
  const app = new Hono<HonoEnv>();

  app.use(
    "/*",
    cors({
      origin: `${env.FRONTEND_URL}`,
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

  app.route("/v1/projects", projectController);

  app.onError((err, c) => handleError(err, c));

  return app;
};

const app = makeApp();

export default app;
