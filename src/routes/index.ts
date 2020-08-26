import Router from "@koa/router";
import { ParameterizedContext } from "koa";
import { ContextState } from "../types/koa";
import { getBuildStr } from "../utils/misc";

const routes = new Router();

routes.get("/", async (ctx: ParameterizedContext<ContextState>) => {
  // Use custom logging as follows
  ctx.state.logger.debug("HEARTBEAT");

  ctx.status = 200;
  ctx.body = {
    msg: `${getBuildStr()} server is alive! :)`,
  };
});

export default routes;
