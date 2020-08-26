import { loadEnv } from "./config";
loadEnv();

import app from "./app";
import { getBuildStr } from "./utils/misc";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`${getBuildStr()} server is running on port ${PORT}!`);
});
