import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const prefix = 'https://hrms-webapi-mysql-dev.jainpathshala.org/api';

export const rtkConfig = fetchBaseQuery({
    baseUrl: prefix + '/',

    prepareHeaders: headers => {
        const userToken = localStorage.getItem('userData');

        if (userToken) {
            const userData = JSON.parse(userToken);
            // eslint-disable-next-line newline-after-var
            const token = userData.data.token;
            headers.set('Authorization', `Bearer ${token}`);
            // eslint-disable-next-line padding-line-between-statements
            return headers;
        } else {
            console.error('User token not found!');
        }
    },
    credentials: 'include',
});
