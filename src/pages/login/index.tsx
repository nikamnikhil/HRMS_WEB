import type { LoginParams } from '../../interface/user/login';

import './index.scss';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, message as $message, Row, Typography } from 'antd';
import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MyInput from '../../components/basic/input';
import MyInputPassword from '../../components/basic/input-password';
import { LocaleFormatter, useLocale } from '../../locales';
import { setUserItem } from '../../stores/user.store';
import { emailValidator } from '../../utils/rules';
import { useLoginMutation } from './duck/authApi';

const LoginForm: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formatMessage } = useLocale();
    const [login] = useLoginMutation();

    const onFinished = async (form: LoginParams) => {
        const result: any = await login(form);
        const { data } = result;

        if (result?.error) {
            $message.error(result?.error?.data?.message);
        }

        if (result?.data?.success === true) {
            $message.success('User login successfully');
            localStorage.setItem('t', data?.token);
            localStorage.setItem('username', data?.token);
            localStorage.setItem('userData', JSON.stringify(data));
            dispatch(
                setUserItem({
                    logged: true,
                    username: result?.data?.token,
                }),
            );
            navigate('/dashboard');
        }
    };

    const redirectPage = () => {
        navigate('/forgot-password');
    };

    const { Link, Title } = Typography;

    return (
        <div className="login-page">
            <div className="card">
                <Form<LoginParams> onFinish={onFinished} className="login-page-form" layout="vertical">
                    <Row>
                        <Col span={24} className="logo-image">
                            <img
                                src="https://timetrack.jainpathshala.org/images/logo.png"
                                alt="logo"
                                width={'220px'}
                                height={'70px'}
                            ></img>
                        </Col>
                        <Col span={24}>
                            <Title level={3}>Login</Title>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                // label="Email"
                                name="username"
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
                            >
                                <MyInput placeholder="Email" autoComplete="new-user" prefix={<MailOutlined />} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                // label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: formatMessage({
                                            id: 'gloabal.tips.enterPasswordMessage',
                                        }),
                                    },
                                ]}
                            >
                                <MyInputPassword
                                    placeholder={formatMessage({
                                        id: 'gloabal.tips.password',
                                    })}
                                    autoComplete="new-password"
                                    prefix={<LockOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button htmlType="submit" type="primary" className="login-page-form_button">
                                    <LocaleFormatter id="gloabal.tips.login" />
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Link onClick={() => redirectPage()}>Forgot password?</Link>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
