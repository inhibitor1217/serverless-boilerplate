import dotenv from 'dotenv';
import path from 'path';
import { SSM } from 'aws-sdk';

export function loadEnv(): void {
  const { APP_STAGE, TEST_ENV } = process.env;

  if (APP_STAGE === 'local') {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
  } else if (APP_STAGE === 'test') {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.test') });
    if (TEST_ENV === 'local') {
      process.env.HOST = `localhost:${process.env.PORT || 7007}`;
    } else if (TEST_ENV === 'beta') {
      // process.env.HOST =
      //   "https://<api-gateway>.execute-api.ap-northeast-2.amazonaws.com/release/";
    } else if (TEST_ENV === 'release') {
      // process.env.HOST =
      //   "https://<api-gateway>.execute-api.ap-northeast-2.amazonaws.com/release/";
    }
  }
}

export const getSsmVariable: (
  key: string
) => Promise<string | undefined> = (() => {
  const ssm = new SSM();
  let parameters: SSM.ParameterList | undefined;
  const selector = (key: string) =>
    parameters?.find((param) => param.Name?.includes(key))?.Value;

  return async (key: string) => {
    if (!parameters) {
      const { APP_NAME, APP_STAGE } = process.env;
      if (APP_NAME && APP_STAGE) {
        const { Parameters } = await ssm
          .getParametersByPath({
            Path: `/${APP_NAME}-${APP_STAGE}`,
            WithDecryption: true,
          })
          .promise();
        parameters = Parameters;
      }
    }

    return selector(key);
  };
})();
