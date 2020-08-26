import { Middleware, Next, ParameterizedContext } from "koa";
import { PoolClient } from "pg";
import db from "../db";
import { ContextState } from "../types/koa";
import { schemas } from "../db/config";

const dbMiddleware = (): Middleware<ContextState> => {
  let localDatabaseInitialized = false;
  const { APP_STAGE } = process.env;

  return async (ctx: ParameterizedContext<ContextState>, next: Next) => {
    const client: PoolClient = await db().then((pool) => pool.connect());

    if (APP_STAGE === "local" && !localDatabaseInitialized) {
      localDatabaseInitialized = true;
      ctx.state.logger.info(`Initializing database schema ...`);
      await Promise.all(
        Object.values(schemas).map((query) => client.query(query))
      );
    }

    ctx.state.client = client;
    const result = await next();

    client.release();

    return result;
  };
};

export default dbMiddleware;
