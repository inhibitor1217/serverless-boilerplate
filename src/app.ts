import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import routes from "./routes";
import db from "./middlewares/db";

const app = new Koa();

app.use(logger());
app.use(db);
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());

export default app;
