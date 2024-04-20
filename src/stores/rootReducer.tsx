import { combineReducers } from '@reduxjs/toolkit';

import { authApi } from '../pages/login/duck/authApi';
import { userSettingApi } from '../pages/setting/duck';
import { userManagementApi } from '../pages/userManagement/duck/userManagement';
import userManagementSlice from '../pages/userManagement/duck/userManagementSlice';
import globalReducer from './global.store';
import { masterApi } from './masterApi';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
    user: userReducer,
    tagsView: tagsViewReducer,
    global: globalReducer,
    userManagement: userManagementSlice,
    [authApi.reducerPath]: authApi.reducer,
    [userManagementApi.reducerPath]: userManagementApi.reducer,
    [userSettingApi.reducerPath]: userSettingApi.reducer,
    [masterApi.reducerPath]: masterApi.reducer,
});

export default rootReducer;
