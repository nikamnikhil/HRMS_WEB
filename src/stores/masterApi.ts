import { createApi } from '@reduxjs/toolkit/query/react';

import { rtkConfig } from './rtkConfig';

export const masterApi = createApi({
    reducerPath: 'masterApi',
    baseQuery: rtkConfig,
    tagTypes: ['MasterApi'],
    endpoints: builder => ({
        masterData: builder.query({
            query: arg => {
                return {
                    url: '/Master/GetData',
                    params: arg,
                };
            },
        }),
    }),
});

export const { useMasterDataQuery } = masterApi;
