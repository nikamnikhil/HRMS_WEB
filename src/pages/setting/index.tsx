import { Card, Col, Row, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React from 'react';

import ResetPassword from './ResetPassword';
import UserProfile from './UserProfile';

const UserSetting: React.FC = () => {
    return (
        <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={24} xl={24}>
                <Card className="card-main" title="User Setting">
                    <Tabs className="responsive-tabs" tabPosition="left" style={{ minHeight: '200px' }}>
                        <TabPane tab="User Profile" key="userProfile">
                            <UserProfile />
                        </TabPane>
                        <TabPane tab="Reset Password" key="resetPassword">
                            <ResetPassword />
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
        </Row>
    );
};

export default UserSetting;
