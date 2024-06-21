import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: () => ({}),
})
