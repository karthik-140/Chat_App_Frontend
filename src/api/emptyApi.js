import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getToken = () => localStorage.getItem('token')

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/',
    prepareHeaders: (headers, { endpoint }) => {
      const excludedEndpoints = ['signup', 'login']
      if (!excludedEndpoints.includes(endpoint)) {
        const token = getToken()
        if (token) {
          headers.set('Authorization', token)
        }
      }
      return headers
    }
  }),
  tagTypes: ['message', 'group'],
  endpoints: () => ({}),
})
