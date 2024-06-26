import { rootApi } from "./emptyApi";

const messageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: 'messages/sendMessage',
        method: 'POST',
        body: data,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data")
          return headers
        },
      }),
      // invalidatesTags: ['message']
    }),
    getMessages: builder.query({
      query: ({ groupId, messageId }) => ({
        url: `messages/getMessages?groupId=${groupId}&messageId=${messageId}`,
      }),
      // providesTags: ['message']
    }),
  })
})

export const {
  useSendMessageMutation,
  useLazyGetMessagesQuery,
} = messageApi
