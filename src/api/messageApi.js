import { rootApi } from "./emptyApi";

const messageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: 'messages/sendMessage',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['message']
    }),
    getMessages: builder.query({
      query: () => ({
        url: 'messages/getMessages',
      }),
      providesTags: ['message']
    }),
  })
})

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
} = messageApi
