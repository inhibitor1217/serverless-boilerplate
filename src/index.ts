import { loadEnv } from "./config";
loadEnv();

import app from "./app";

const { APP_NAME, APP_STAGE, APP_VERSION, PORT } = process.env;

app.listen(PORT, () => {
  console.log(
    `${APP_NAME}-${APP_STAGE}@${APP_VERSION} server is running on port ${PORT}!`
  );
});
