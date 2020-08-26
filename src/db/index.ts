import { Pool } from "pg";

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
