export const getBuildStr = (): string => {
  const { APP_NAME, APP_STAGE, APP_VERSION, TEST_ENV } = process.env;
  if (APP_STAGE !== 'test') {
    return `${APP_NAME || 'undefined'}@${APP_VERSION || 'undefined'}-${
      APP_STAGE || 'undefined'
    }`;
  }
  return `${APP_NAME || 'undefined'}@${APP_VERSION || 'undefined'}-${
    TEST_ENV || 'undefined'
  }`;
};
