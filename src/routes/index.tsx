// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import Dashboard from '../pages/dashboard';
import LayoutPage from '../pages/layout';
import LoginPage from '../pages/login';
import WrapperRouteComponent from './config';

const NotFound = lazy(() => import('../pages/404'));
const UserManagement = lazy(() => import('../pages/userManagement'));
const AddUser = lazy(() => import('../pages/userManagement/addNewUser'));
const EditUser = lazy(() => import('../pages/userManagement/editUser'));
const ForgotPassword = lazy(() => import('../pages/login/forgotPassword'));
const UserSetting = lazy(() => import('../pages/setting'));

const routeList: RouteObject[] = [
    {
        path: '/',
        element: <LoginPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/',
        element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
        children: [
            {
                path: '',
                element: <Navigate to="dashboard" />,
            },
            {
                path: 'dashboard',
                element: <WrapperRouteComponent element={<Dashboard />} titleId="title.dashboard" />,
            },
            {
                path: 'user-management',
                element: <WrapperRouteComponent element={<UserManagement />} titleId="title.usermanagement" />,
            },
            {
                path: 'settings',
                element: <WrapperRouteComponent element={<UserSetting />} titleId="title.setting" />,
            },
            {
                path: 'user-management/add-user',
                element: <WrapperRouteComponent element={<AddUser />} titleId="title.usermanagement.add" />,
            },
            {
                path: 'user-management/edit-user',
                element: <WrapperRouteComponent element={<EditUser />} titleId="title.usermanagement.Edit" />,
            },
            {
                path: '*',
                element: <WrapperRouteComponent element={<NotFound />} titleId="title.notFount" />,
            },
        ],
    },
];

const RenderRouter: FC = () => {
    const element = useRoutes(routeList);

    return element;
};

export default RenderRouter;
