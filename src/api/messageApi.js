import { rootApi } from "./emptyApi";

const messageApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: 'messages/sendMessage',
        method: 'POST',
        body: data,
        // prepareHeaders: (headers) => {
        //   headers.set("Content-Type", "multipart/form-data")
        //   return headers
        // },
      }),
      // invalidatesTags: ['message']
    }),
    getMessages: builder.query({
      query: ({ groupId, messageId }) => ({
        url: `messages/getMessages?groupId=${groupId}&messageId=${messageId}`,
      }),
      // providesTags: ['message']
    }),
    uploadImage: builder.mutation({
      query: ({groupId, formData}) => ({
        url: `messages/uploadFile?groupId=${groupId}`,
        method: 'POST',
        body: formData
      })
    })
  })
})

export const {
  useSendMessageMutation,
  useLazyGetMessagesQuery,
  useUploadImageMutation,
} = messageApi
