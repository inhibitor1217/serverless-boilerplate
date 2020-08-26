import dotenv from "dotenv";
import path from "path";
import { SSM } from "aws-sdk";

const { APP_STAGE } = process.env;

export function loadEnv() {
  if (APP_STAGE === "local") {
    dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

    process.env.HOST = `localhost:${process.env.PORT}`;
  }
}

export const getSsmVariable: (
  key: string
) => Promise<string | undefined> = (() => {
  const ssm = new SSM();
  let parameters: SSM.ParameterList | undefined = undefined;
  const selector = (key: string) =>
    parameters?.find((param) => param.Name?.includes(key))?.Value;

  return async (key: string) => {
    if (!parameters) {
      const { APP_NAME, APP_STAGE } = process.env;
      const { Parameters } = await ssm
        .getParametersByPath({
          Path: `/${APP_NAME}-${APP_STAGE}`,
          WithDecryption: true,
        })
        .promise();
      parameters = Parameters;
    }

    return selector(key);
  };
})();
