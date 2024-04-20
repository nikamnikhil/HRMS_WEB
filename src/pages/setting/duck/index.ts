import { createApi } from '@reduxjs/toolkit/query/react';

import { rtkConfig } from '../../../stores/rtkConfig';

export const userSettingApi = createApi({
    reducerPath: 'userSettingApi',
    baseQuery: rtkConfig,
    tagTypes: ['UserSetting', 'UseDetails'],
    endpoints: builder => ({
        changePassword: builder.mutation({
            query: (arg: any) => {
                return {
                    url: '/User/ChangePassword',
                    body: arg,
                    method: 'post',
                };
            },
        }),
        userProfileDetails: builder.query({
            query: (arg: any) => {
                return {
                    url: '/Profile/DetailUserProfile',
                    params: arg,
                };
            },
            providesTags: ['UseDetails'],
        }),
        userProfilUpdate: builder.mutation({
            query: (arg: any) => {
                return {
                    url: '/Profile/EditUserProfile',
                    body: arg,
                    method: 'put',
                };
            },
            invalidatesTags: ['UseDetails'],
        }),
    }),
});

export const { useChangePasswordMutation, useUserProfileDetailsQuery, useUserProfilUpdateMutation } = userSettingApi;
