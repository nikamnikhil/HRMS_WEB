import type { FC, ReactElement } from 'react';

import { useIntl } from 'react-intl';

import PrivateRoute from './pravateRoute';

export interface WrapperRouteProps {
    titleId: string;
    auth?: boolean;
    element?: any;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
    const { formatMessage } = useIntl();

    if (titleId) {
        document.title = formatMessage({
            id: titleId,
        });
    }

    return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
