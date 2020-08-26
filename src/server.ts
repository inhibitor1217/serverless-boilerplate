import { loadEnv } from './config';
import app from './app';

loadEnv();

const { PORT } = process.env;

app.listen(PORT);
