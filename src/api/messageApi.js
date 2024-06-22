import { rootApi } from "./emptyApi";

const messageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: 'messages/sendMessage',
        method: 'POST',
        body: data
      })
    }),
  })
})

export const {
  useSendMessageMutation,
} = messageApi
