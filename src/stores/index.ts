import { configureStore } from '@reduxjs/toolkit';

import { authApi } from '../pages/login/duck/authApi';
import { userSettingApi } from '../pages/setting/duck';
import { userManagementApi } from '../pages/userManagement/duck/userManagement';
import { masterApi } from './masterApi';
import rootReducer from './rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userManagementApi.middleware,
            userSettingApi.middleware,
            masterApi.middleware,
        ),
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

export type AppStore = typeof store;
