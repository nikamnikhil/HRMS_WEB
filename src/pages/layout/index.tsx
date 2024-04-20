// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import type { MenuList } from '@/interface/layout/menu.interface';
import type { FC } from 'react';

import './index.scss';

import { Drawer, Layout, theme as antTheme } from 'antd';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';

import { setUserItem } from '../../stores/user.store';
import { getFirstPathCode } from '../../utils/getFirstPathCode';
import { getGlobalState } from '../../utils/getGloabal';
import HeaderComponent from './header';
import MenuComponent from './menu';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
    const location = useLocation();
    const [openKey, setOpenkey] = useState<string>();
    const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
    const [menuList] = useState<MenuList>([]);
    const { device, collapsed, newUser } = useSelector(state => state.user);
    const token = antTheme.useToken();

    const isMobile = device === 'MOBILE';
    const dispatch = useDispatch();

    useEffect(() => {
        const code = getFirstPathCode(location.pathname);

        setOpenkey(code);
        setSelectedKey(location.pathname);
    }, [location.pathname]);

    const toggle = () => {
        dispatch(
            setUserItem({
                collapsed: !collapsed,
            }),
        );
    };

    useEffect(() => {
        window.onresize = () => {
            const { device } = getGlobalState();
            const rect = document.body.getBoundingClientRect();
            const needCollapse = rect.width < WIDTH;

            dispatch(
                setUserItem({
                    device,
                    collapsed: needCollapse,
                }),
            );
        };
    }, [dispatch]);

    useEffect(() => {
        newUser;
    }, [newUser]);

    return (
        <Layout className="layout-page">
            <HeaderComponent collapsed={collapsed} toggle={toggle} />
            <Layout>
                {!isMobile ? (
                    <Sider
                        className="layout-page-sider"
                        trigger={null}
                        collapsible
                        style={{ backgroundColor: token.token.colorBgContainer }}
                        collapsedWidth={isMobile ? 0 : 80}
                        collapsed={collapsed}
                        breakpoint="md"
                    >
                        <MenuComponent
                            menuList={menuList}
                            openKey={openKey}
                            onChangeOpenKey={k => setOpenkey(k)}
                            selectedKey={selectedKey}
                            onChangeSelectedKey={k => setSelectedKey(k)}
                        />
                    </Sider>
                ) : (
                    <Drawer
                        width="200"
                        placement="left"
                        bodyStyle={{ padding: 0, height: '100%' }}
                        closable={false}
                        onClose={toggle}
                        open={!collapsed}
                    >
                        <MenuComponent
                            menuList={menuList}
                            openKey={openKey}
                            onChangeOpenKey={k => setOpenkey(k)}
                            selectedKey={selectedKey}
                            onChangeSelectedKey={k => setSelectedKey(k)}
                        />
                    </Drawer>
                )}
                <Content className="layout-page-content">
                    <Suspense fallback={null}>
                        <Outlet />
                    </Suspense>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
