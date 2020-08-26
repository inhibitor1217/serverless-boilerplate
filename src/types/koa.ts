import { PoolClient } from 'pg';
import { Logger } from '../utils/logger';

export interface ContextState {
  client: PoolClient;
  logger: Logger;
}
