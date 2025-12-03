import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { url } from "../config/AppConfig";
const url =
  process.env.REACT_APP_MODE === "development"
    ? process.env.REACT_APP_BACKEND_DOMAIN_DEV_URL
    : process.env.REACT_APP_BACKEND_DOMAIN_PROD_URL;

const getToken = () => localStorage.getItem("token");

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers, { endpoint }) => {
      const excludedEndpoints = ["signup", "login"];
      if (!excludedEndpoints.includes(endpoint)) {
        const token = getToken();
        if (token) {
          headers.set("Authorization", token);
        }
      }
      return headers;
    },
  }),
  tagTypes: [
    // 'message',
    "group",
  ],
  endpoints: () => ({}),
});
