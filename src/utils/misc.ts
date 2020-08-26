export const getBuildStr = () => {
  const { APP_NAME, APP_STAGE, APP_VERSION, TEST_ENV } = process.env;
  if (APP_STAGE !== "test") {
    return `${APP_NAME}@${APP_VERSION}-${APP_STAGE}`;
  } else {
    return `${APP_NAME}@${APP_VERSION}-${TEST_ENV}`;
  }
};
