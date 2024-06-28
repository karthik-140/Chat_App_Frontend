import { rootApi } from "./emptyApi";

const groupApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (data) => ({
        url: 'group/createGroup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['group']
    }),
    getAllGroups: builder.query({
      query: () => ({
        url: 'group/getAllGroups',
      }),
      providesTags: ['group']
    }),
    getGroupInfo: builder.query({
      query: ({ groupId }) => ({
        url: `group/groupDetails/${groupId}`
      }),
      providesTags: ['group']
    }),
    addUsers: builder.mutation({
      query: ({ groupId, selectedUsers }) => ({
        url: `group/addUsers/${groupId}`,
        method: 'POST',
        body: selectedUsers
      }),
      invalidatesTags: ['group']
    }),
    removeUserFromGroup: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `group/removeUser?groupId=${groupId}&userId=${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['group']
    }),
    makeUserIsAdmin: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `group/makeIsAdmin?groupId=${groupId}&userId=${userId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['group']
    }),
    existGroup: builder.mutation({
      query: ({ groupId }) => ({
        url: `group/exitGroup?groupId=${groupId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['group']
    })
  })
})

export const {
  useCreateGroupMutation,
  useGetAllGroupsQuery,
  useGetGroupInfoQuery,
  useAddUsersMutation,
  useRemoveUserFromGroupMutation,
  useMakeUserIsAdminMutation,
  useExistGroupMutation,
} = groupApi
