import type { FC } from 'react';

import { ReactComponent as DashboardSvg } from '../../assets/menu/dashboard.svg';
import { ReactComponent as GuideSvg } from '../../assets/menu/guide.svg';
import { ReactComponent as PermissionSvg } from '../../assets/menu/permission.svg';
import { ReactComponent as UserManagementSvg } from '../../assets/menu/usermanagement.svg';
import { ReactComponent as SettingSvg } from '../../assets/menu/setting.svg';

interface CustomIconProps {
    type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
    const { type } = props;
    let com = <GuideSvg />;

    if (type === 'permission') {
        com = <PermissionSvg />;
    } else if (type === 'dashboard') {
        com = <DashboardSvg />;
    } else if (type === 'usermanagement') {
        com = <UserManagementSvg />;
    } else if (type === 'setting') {
        com = <SettingSvg />;
    } else {
        com = <GuideSvg />;
    }

    return <span className="anticon">{com}</span>;
};
