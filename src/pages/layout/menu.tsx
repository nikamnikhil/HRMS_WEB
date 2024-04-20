// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import type { MenuList } from '../../interface/layout/menu.interface';
import type { FC } from 'react';

import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUserItem } from '../../stores/user.store';
import { CustomIcon } from './customIcon';

interface MenuProps {
    menuList: MenuList;
    openKey?: string;
    onChangeOpenKey: (key?: string) => void;
    selectedKey: string;
    onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = props => {
    const { menuList, openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
    const { device, locale } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getTitle = (menu: MenuList[0]) => {
        return (
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <CustomIcon type={menu.icon!} />
                <span>{menu.label[locale]}</span>
            </span>
        );
    };

    const onMenuClick = (path: string) => {
        onChangeSelectedKey(path);
        navigate(path);

        if (device !== 'DESKTOP') {
            dispatch(setUserItem({ collapsed: true }));
        }
    };

    const onOpenChange = (keys: string[]) => {
        const key = keys.pop();

        onChangeOpenKey(key);
    };

    const MenuList: MenuList = [
        {
            code: 'dashboard',
            label: {
                en_US: 'Dashboard',
            },
            icon: 'dashboard',
            path: '/dashboard',
        },
        {
            code: 'User Management',
            label: {
                en_US: 'User Management',
            },
            icon: 'usermanagement',
            path: '/user-management',
        },
        {
            code: 'Setting',
            label: {
                en_US: 'setting',
            },
            icon: 'setting',
            path: '/settings',
        },
    ];

    return (
        <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            openKeys={openKey ? [openKey] : []}
            onOpenChange={onOpenChange}
            onSelect={k => onMenuClick(k.key)}
            className="layout-page-sider-menu text-2"
            items={MenuList.map(menu => {
                return menu.children
                    ? {
                          key: menu.code,
                          label: getTitle(menu),
                          children: menu.children.map(child => ({
                              key: child.path,
                              label: child.label[locale],
                          })),
                      }
                    : {
                          key: menu.path,
                          label: getTitle(menu),
                      };
            })}
        ></Menu>
    );
};

export default MenuComponent;
