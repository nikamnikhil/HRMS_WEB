import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { useSelector } from 'react-redux';

import LoginForm from '../pages/login';

const PrivateRoute: FC<RouteProps> = props => {
    const { logged } = useSelector((state: any) => state.user);

    return logged ? (props.element as React.ReactElement) : <LoginForm />;
};

export default PrivateRoute;
