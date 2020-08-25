import dotenv from "dotenv";
import path from "path";

const { APP_STAGE } = process.env;

export function loadEnv() {
  if (APP_STAGE === "local") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
  }
}
