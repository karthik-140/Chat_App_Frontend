export const url =
  process.env.REACT_APP_MODE === "development"
    ? process.env.REACT_APP_BACKEND_DOMAIN_DEV_URL
    : process.env.REACT_APP_BACKEND_DOMAIN_PROD_URL;
