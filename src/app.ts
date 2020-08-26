import Koa from "koa";
import bodyParser from "koa-bodyparser";
import koaLogger from "koa-logger";
import db from "./middlewares/db";
import logger from "./middlewares/logger";
import routes from "./routes";

const app = new Koa();

app.use(koaLogger());
app.use(logger());
app.use(db);
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());

export default app;
