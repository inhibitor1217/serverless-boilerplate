import Router from "@koa/router";
import { Context } from "koa";

const routes = new Router();

routes.get("/", async (ctx: Context) => {
  const { APP_NAME, APP_STAGE, APP_VERSION } = process.env;

  ctx.status = 200;
  ctx.body = {
    msg: `${APP_NAME}-${APP_STAGE}@${APP_VERSION} server is alive! :)`,
  };
});

export default routes;
