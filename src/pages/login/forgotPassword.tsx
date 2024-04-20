import type { ForgotPasswordParams } from '../../interface/user/login';
import type { FC } from 'react';

import './index.scss';

import { MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, message as $message, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import MyInput from '../../components/basic/input';
import { useLocale } from '../../locales';
import { emailValidator } from '../../utils/rules';
import { useForgotPasswordMutation } from './duck/authApi';

const ForgotPassword: FC = () => {
    const { Title } = Typography;
    const navigate = useNavigate();
    const { formatMessage } = useLocale();
    const [forgotPassword, {}] = useForgotPasswordMutation();

    const onFinished = async (form: ForgotPasswordParams) => {
        const body = {
            username: form?.email,
        };
        const result: any = await forgotPassword(body);

        if (result.error) {
            $message.error(result?.error?.data);

            return;
        }

        if (result?.data.success === true) {
            $message.success(result?.data?.message);
            navigate('/login');
        }
    };

    const redirectPage = () => {
        navigate('/login');
    };

    return (
        <div className="login-page">
            <div className="card">
                <Form<ForgotPasswordParams> onFinish={onFinished} className="login-page-form">
                    <div style={{ padding: '16px' }}>
                        <img
                            className="logo-image"
                            src="https://timetrack.jainpathshala.org/images/logo.png"
                            alt="logo"
                            width={'220px'}
                            height={'70px'}
                        ></img>
                        <Title level={4}>Forgot Password</Title>
                    </div>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                // label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: formatMessage({
                                            id: 'gloabal.tips.enterUsernameMessage',
                                        }),
                                    },
                                    { max: 100, message: 'Email address cannot exceed 100 characters!' },
                                    { validator: emailValidator },
                                ]}
                                labelCol={{ span: 24 }}
                            >
                                <MyInput placeholder="Email" autoComplete="new-user" prefix={<MailOutlined />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item>
                                <Button htmlType="submit" type="primary" className="login-page-form_button">
                                    SEND EMAIL
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    className="login-page-form_button"
                                    onClick={() => redirectPage()}
                                >
                                    CANCEL
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPassword;
