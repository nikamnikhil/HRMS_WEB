import { EnvironmentOutlined, LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Row, Typography } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MyButton from '../../components/basic/button';
import MyCheckBox from '../../components/basic/checkbox';
import MyDatePicker from '../../components/basic/date-picker';
import MyInput from '../../components/basic/input';
import MyInputNumber from '../../components/basic/input-number';
import MyInputPassword from '../../components/basic/input-password';
import MySelect from '../../components/basic/select';
import { useLocale } from '../../locales';
import {
    emailValidator,
    validateButRequired,
    validateName,
    validatePassword,
    validatePhoneNumber,
    validateStrongPassword,
} from '../../utils/rules';
import { useUserDetailsQuery } from './duck/userManagement';

const { Text } = Typography;

const AddNewUser: React.FC = () => {
    const { userId } = useSelector((state: any) => state.userManagement);
    const { data, isLoading } = useUserDetailsQuery({ userId: userId });
    const navigat = useNavigate();
    const { formatMessage } = useLocale();

    console.log('data', data);

    const onFinish = (values: any) => {
        console.log('Received values:', values);
    };

    // {
    //     "accountInformation": {
    //         "email": "ajitshah1672@yahoo.com"
    //     },
    //     "personalInformation": {
    //         "firstName": "Ajit",
    //         "lastName": "Shah",
    //         "middleName": "kumar",
    //         "membershipID": "",
    //         "gender": 0,
    //         "dob": null,
    //         "isActive": true
    //     },
    //     "contactInformation": {
    //         "addressLine1": "1 Lis Court",
    //         "addressLine2": "",
    //         "city": "Sayreville",
    //         "state": 31,
    //         "zipcode": "11111",
    //         "homePhone": "null",
    //         "cellPhone": "7328873864",
    //         "alternateEmail": ""
    //     },
    //     "classes": "4,6,1,2,3,5,7,8,9,10",
    //     "roles": "28ae8711-5df3-47a2-bbb0-140f84d400f6,6b518dcb-3f10-42f4-8a10-b187296cc402,c35dc863-fc9d-4284-a1f4-e275f93b4a48,f0cf0c68-f5e3-4883-bd35-8181fbccf66d"
    // }

    const initialValue = {
        username: data?.accountInformation?.email,
    };

    return (
        <Card
            className="card-main"
            title={formatMessage({ id: 'app.userManagement.edituser' })}
            loading={isLoading}
            extra={
                <MyButton type="primary" onClick={() => navigat('/user-management')}>
                    Back
                </MyButton>
            }
        >
            <Form name="editUserForm" initialValues={initialValue} onFinish={onFinish} layout="vertical">
                <div className="line">
                    <Text strong>User Information</Text>
                </div>
                <Row gutter={16} style={{ padding: '20px' }}>
                    <Col xs={24} sm={6}>
                        <Form.Item
                            label="Email"
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
                            <MyInput placeholder="Email" autoComplete="new-user" prefix={<MailOutlined />} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="line">
                    <Text strong>Personal Information</Text>
                </div>
                <Row gutter={16} style={{ padding: '20px' }}>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                { required: true, message: 'Please enter your first name!' },
                                { max: 50, message: 'First name cannot exceed 50 characters!' },
                                { validator: validateName },
                            ]}
                        >
                            <MyInput placeholder="First Name" prefix={<UserOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Middle Name"
                            name="middleName"
                            rules={[
                                { max: 50, message: 'Middle name cannot exceed 50 characters!' },
                                { validator: validateButRequired },
                            ]}
                        >
                            <MyInput placeholder="Middle Name" prefix={<UserOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[
                                { required: true, message: 'Please enter your last name!' },
                                { max: 50, message: 'Last name cannot exceed 50 characters!' },
                                { validator: validateName },
                            ]}
                        >
                            <MyInput placeholder="Last Name" prefix={<UserOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item label="Date Of Brith" name="dob">
                            <MyDatePicker />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item label="Gander" name="Gander">
                            <MySelect
                                placeholder="Select your state"
                                // options={StateList ?? []}
                                // suffixIcon={<GlobalOutlined />}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="line">
                    <Text strong>Contact Information</Text>
                </div>
                <Row gutter={16} style={{ padding: '20px' }}>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Home Number"
                            name="homephone"
                            rules={[
                                { required: true, message: 'Please enter your phone number!' },
                                { validator: validatePhoneNumber },
                            ]}
                        >
                            <MyInput placeholder="Phone Number" prefix={<PhoneOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                { required: true, message: 'Please enter your phone number!' },
                                { validator: validatePhoneNumber },
                            ]}
                        >
                            <MyInput placeholder="Phone Number" prefix={<PhoneOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Alernate Email"
                            name="alernateemail"
                            rules={[
                                { max: 100, message: 'Email address cannot exceed 100 characters!' },
                                { validator: emailValidator },
                            ]}
                        >
                            <MyInput placeholder="Alernate Email" prefix={<MailOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Zip Code"
                            name="zipcode"
                            rules={[{ pattern: /^\d{1,6}$/, message: 'Zip code must be maximum 6 digits!' }]}
                        >
                            <MyInputNumber
                                placeholder="Zip Code"
                                prefix={<EnvironmentOutlined />}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Address Line 2"
                            name="addressLine1"
                            rules={[{ required: true, message: 'Please enter your Address Line 1!' }]}
                        >
                            <MyInput placeholder="Address Line 1" prefix={<EnvironmentOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4}>
                        <Form.Item
                            label="Address Line 1"
                            name="addressLine2"
                            rules={[{ required: true, message: 'Please enter your Address Line 2!' }]}
                        >
                            <MyInput placeholder="Address Line 1" prefix={<EnvironmentOutlined />} />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="line">
                    <Text strong>Roles</Text>
                </div>
                <Row gutter={[16, 16]} style={{ padding: '20px' }}>
                    <Col xs={24} sm={4}>
                        <MyCheckBox />
                    </Col>
                    <Col xs={24} sm={4}>
                        <MyCheckBox />
                    </Col>
                    <Col xs={24} sm={4}>
                        <MyCheckBox />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default AddNewUser;
