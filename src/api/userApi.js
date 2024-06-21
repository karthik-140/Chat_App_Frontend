import { rootApi } from "./emptyApi";

const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'user/signup',
        method: 'POST',
        body: data
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: data
      })
    })
  })
})

export const {
  useSignupMutation,
  useLoginMutation,
} = userApi
