import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url, getToken } from "../config/AppConfig";

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
