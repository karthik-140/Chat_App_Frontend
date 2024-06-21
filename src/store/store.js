import { configureStore } from "@reduxjs/toolkit";

import { rootApi } from "../api/emptyApi";

const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rootApi.middleware,
    )
})

export default store
