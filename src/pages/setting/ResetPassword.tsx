import { LockOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, message as $message, Row } from 'antd';
import React from 'react';

import MyInputPassword from '../../components/basic/input-password';
import { userDetails } from '../../hooks/userDetails';
import { validatePassword, validateStrongPassword } from '../../utils/rules';
import { useChangePasswordMutation } from './duck';

const ResetPassword: React.FC = () => {
    const [changePassword, {}] = useChangePasswordMutation();
    const userDetail = userDetails();

    const onFinish = async (values: any) => {
        const body = {
            oldPassword: values?.currentPassword,
            newPassword: values?.password,
            userId: userDetail?.userId,
        };

        const res: any = await changePassword(body);

        if (res?.error?.originalStatus === 200) {
            $message.success(res?.error?.data);
        } else {
            $message.error(res?.error?.data);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                <Card title="Change Password">
                    <Form
                        name="resetPasswordForm"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item
                                    label="Current Password"
                                    name="currentPassword"
                                    rules={[
                                        { required: true, message: 'Please enter your current password!' },
                                        { min: 8, message: 'Password must be at least 8 characters!' },
                                        validateStrongPassword,
                                    ]}
                                >
                                    <MyInputPassword placeholder="Current Password" prefix={<LockOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="New Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter your new password!' },
                                        { min: 8, message: 'Password must be at least 6 characters!' },
                                        validateStrongPassword,
                                    ]}
                                >
                                    <MyInputPassword placeholder="New Password" prefix={<LockOutlined />} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    dependencies={['password']}
                                    rules={[
                                        { required: true, message: 'Please confirm your new password!' },
                                        { min: 8, message: 'Password must be at least 6 characters!' },
                                        validateStrongPassword,
                                        validatePassword,
                                    ]}
                                >
                                    <MyInputPassword placeholder="Confirm Password" prefix={<LockOutlined />} />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-page-form_button">
                                        Change Password
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default ResetPassword;
