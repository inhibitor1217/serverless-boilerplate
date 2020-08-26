import { Middleware, Next, ParameterizedContext } from "koa";
import { PoolClient } from "pg";
import pool from "../db";
import { ContextState } from "../types/koa";
import { schemas } from "../db/config";

const db = (): Middleware<ContextState> => {
  let localDatabaseInitialized = false;
  const { APP_STAGE } = process.env;

  return async (ctx: ParameterizedContext<ContextState>, next: Next) => {
    const client: PoolClient = await pool.connect();

    if (APP_STAGE === "local" && !localDatabaseInitialized) {
      localDatabaseInitialized = true;
      ctx.state.logger.info(`Initializing database schema ...`);
      await Promise.all(
        Object.values(schemas).map((query) => client.query(query))
      );
    }

    ctx.state.client = client;
    return await next();

    client.release();
  };
};

export default db;
