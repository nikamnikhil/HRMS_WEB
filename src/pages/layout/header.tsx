/* eslint-disable prettier/prettier */
import type { FC } from 'react';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { LocaleFormatter, useLocale } from '../../locales';
import { setUserItem } from '../../stores/user.store';
import { useLogoutMutation } from '../login/duck/authApi';

const { Header } = Layout;

interface HeaderProps {
    collapsed: boolean;
    toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
    const { logged, device } = useSelector((state: any) => state.user);
    const { theme } = useSelector((state: any) => state.global);
    const navigate = useNavigate();
    const token = antTheme.useToken();
    const dispatch = useDispatch();
    const { formatMessage } = useLocale();
    const [logout] = useLogoutMutation();

    const onActionClick = async (action: Action) => {
        switch (action) {
            case 'userInfo':
                return;
            case 'userSetting':
                return;
            case 'logout':
                const res: any = await logout({});
                
                if (res?.data?.success === true) {
                    localStorage.clear();
                    dispatch(
                        setUserItem({
                            logged: false,
                        }),
                    );
                    navigate('/login');
                }

                return;
        }
    };

    const toLogin = () => {
        navigate('/login');
    };

    return (
        <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
            {device !== 'MOBILE' && (
                <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
                    <img
                        src="https://timetrack.jainpathshala.org/images/logo.png"
                        alt="logo"
                        width={'100px'}
                        height={'50x'}
                    ></img>
                </div>
            )}
            <div className="layout-page-header-main">
                <div onClick={toggle}>
                    <span id="sidebar-trigger">
                        {collapsed ? (
                            <MenuUnfoldOutlined style={{ color: '#fff' }} />
                        ) : (
                            <MenuFoldOutlined style={{ color: '#fff' }} />
                        )}
                    </span>
                </div>
                <div className="actions">
                    <Tooltip
                        title={formatMessage({
                            id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
                        })}
                    ></Tooltip>
                    {logged ? (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        icon: <LogoutOutlined />,
                                        label: (
                                            <span onClick={() => onActionClick('logout')}>
                                                <LocaleFormatter id="header.avator.logout" />
                                            </span>
                                        ),
                                    },
                                ],
                            }}
                        >
                            <span className="user-action">
                                <Avatar size="large" icon={<UserAddOutlined />} />
                            </span>
                        </Dropdown>
                    ) : (
                        <span style={{ cursor: 'pointer' }} onClick={toLogin}>
                            {formatMessage({ id: 'gloabal.tips.login' })}
                        </span>
                    )}
                </div>
            </div>
        </Header>
    );
};

export default HeaderComponent;
