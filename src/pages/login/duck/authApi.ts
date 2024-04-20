import { createApi } from '@reduxjs/toolkit/query/react';

import { ForgotPasswordParams } from '../../../interface/user/login';
import { rtkConfig } from '../../../stores/rtkConfig';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: rtkConfig,
    tagTypes: ['auth'],
    endpoints: builder => ({
        login: builder.mutation({
            query: (arg: any) => {
                return {
                    url: '/UserManagement/ValidateUser',
                    body: arg,
                    method: 'post',
                };
            },
        }),
        forgotPassword: builder.mutation({
            query: (arg: { username: string }) => {
                return {
                    url: '/UserManagement/ForgotPassword',
                    body: arg,
                    method: 'post',
                };
            },
        }),
        logout: builder.mutation({
            query: () => {
                return {
                    url: '/UserManagement/Logout',
                    method: 'post',
                };
            },
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation, useForgotPasswordMutation } = authApi;
