export const getBuildStr = () => {
  const { APP_NAME, APP_STAGE, APP_VERSION } = process.env;
  return `${APP_NAME}@${APP_VERSION}-${APP_STAGE}`;
};
