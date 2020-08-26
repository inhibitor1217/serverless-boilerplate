import { Pool } from 'pg';
import { getSsmVariable } from '../config';

const {
  APP_STAGE,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_NAME,
  DB_PASSWORD,
} = process.env;

const getPool = async (): Promise<Pool> => {
  let poolCache: Pool | undefined;

  if (!poolCache) {
    poolCache = new Pool({
      host: DB_HOST,
      port: parseInt(DB_PORT || '', 10) || 5432,
      user: DB_USER,
      database: DB_NAME,
      password:
        APP_STAGE === 'local'
          ? DB_PASSWORD
          : await getSsmVariable('lambda_rds_password'),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }

  return poolCache;
};

export default getPool;
