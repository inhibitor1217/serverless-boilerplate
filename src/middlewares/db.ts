import { Middleware, Next, ParameterizedContext } from "koa";
import { PoolClient } from "pg";
import pool from "../db";
import { ContextState } from ".";

const db: Middleware<ContextState> = async (
  ctx: ParameterizedContext<ContextState>,
  next: Next
) => {
  const client: PoolClient = await pool.connect();
  ctx.state.client = client;
  await next();
  client.release();
};

export default db;
