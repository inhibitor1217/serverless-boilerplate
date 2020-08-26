import { PoolClient } from "pg";

export interface ContextState {
  client?: PoolClient;
}
