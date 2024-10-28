import type { ServerEnv } from "../lib/env";
import type { ServiceContext } from "../app";

type ContextVariables = {
  logger: ReturnType<typeof import("../lib/logger").makeLogger>;
};

export type HonoEnv = {
  Bindings: ServerEnv;
  Variables: {
    services: ServiceContext;
  } & ContextVariables;
};
