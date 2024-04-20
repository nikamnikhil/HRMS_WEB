import { createApi } from '@reduxjs/toolkit/query/react';

import { rtkConfig } from '../../../stores/rtkConfig';

export const userManagementApi = createApi({
    reducerPath: 'userManagementApi',
    baseQuery: rtkConfig,
    tagTypes: ['userManagement'],
    endpoints: builder => ({
        userList: builder.query({
            query: arg => {
                return {
                    url: '/UserManagement/UserList',
                    params: arg,
                };
            },
            providesTags: ['userManagement'],
        }),
        userDelete: builder.mutation({
            query: arg => {
                return {
                    url: `/UserManagement/DeleteUserByUserId?userId=${arg.userId}`,
                    method: 'delete',
                };
            },
            invalidatesTags: ['userManagement'],
        }),
        userLockUnLock: builder.mutation({
            query: arg => {
                return {
                    url: '/UserManagement/LockUnlockUser',
                    body: arg,
                    method: 'patch',
                };
            },
            invalidatesTags: ['userManagement'],
        }),
        userResetPassword: builder.mutation({
            query: arg => {
                return {
                    url: '/UserManagement/ResetPassword',
                    body: arg,
                    method: 'patch',
                }
            }
        }),
        addUser: builder.mutation({
            query: arg => {
                return {
                    url: '/User/AddUser',
                    body: arg,
                    method: 'post',
                };
            },
            invalidatesTags: ['userManagement'],
        }),
        userDetails: builder.query({
            query: arg => {
                return {
                    url: '/UserManagement/DetailUser',
                    params: arg,
                };
            },
        }),
        editUserDetails: builder.mutation({
            query: arg => {
                return {
                    url: '/UserManagement/EditUser',
                    body: arg,
                    method: 'delete',
                };
            },
            invalidatesTags: ['userManagement'],
        }),
    }),
});

export const {
    useUserListQuery,
    useUserDeleteMutation,
    useUserDetailsQuery,
    useUserLockUnLockMutation,
    useUserResetPasswordMutation,
} = userManagementApi;
