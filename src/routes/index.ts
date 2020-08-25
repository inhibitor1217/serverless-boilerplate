import Router from "@koa/router";
import { Context } from "koa";

import { getBuildStr } from "../utils/misc";

const routes = new Router();

routes.get("/", async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = {
    msg: `${getBuildStr()} server is alive! :)`,
  };
});

export default routes;
