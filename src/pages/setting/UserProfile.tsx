import { EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import React, { useCallback, useMemo } from 'react';

import MyInput from '../../components/basic/input';
import MyInputNumber from '../../components/basic/input-number';
import MySelect from '../../components/basic/select';
import { State } from '../../hooks/masterData';
import { userDetails } from '../../hooks/userDetails';
import { emailValidator, validateButRequired, validateName, validatePhoneNumber } from '../../utils/rules';
import { useUserProfileDetailsQuery, useUserProfilUpdateMutation } from './duck';

const UserProfile: React.FC = () => {
    const userData = userDetails();
    const { data: stateList, isLoading: stateLoading } = State();
    const { userId } = userData;
    const { data, isLoading } = useUserProfileDetailsQuery({ userID: userId });
    const [userProfilUpdate, {}] = useUserProfilUpdateMutation();

    const initialValue = {
        firstName: data?.firstName,
        middleName: data?.middleName,
        lastName: data?.lastName,
        email: data?.email,
        alernateemail: data?.alternateEmail,
        phone: data?.cellPhone,
        addressLine1: data?.addressLine1,
        addressLine2: data?.addressLine2,
        city: data?.city,
        state: data?.stateID,
        zipcode: Number(data?.zipcode),
    };

    const onFinish = useCallback(async (value: any) => {
        const data = {
            userID: userId,
            firstName: value?.firstName,
            middleName: value?.middleName,
            lastName: value?.lastName,
            alternateEmail: value?.alernateemail,
            cellPhone: value?.phone,
            addressLine1: value?.addressLine1,
            addressLine2: value?.addressLine2,
            city: value?.city,
            zipcode: String(value?.zipcode),
            stateID: value?.state,
        };

        const result = await userProfilUpdate(data);

        console.log('result', result);
    }, []);

    const StateList = useMemo(() => {
        return stateList?.flatMap((el: any) => {
            return {
                value: el?.value,
                label: el?.name,
            };
        });
    }, [stateLoading]);

    return (
        <Card title="My Profile" loading={isLoading}>
            <Form name="userProfileForm" initialValues={initialValue} onFinish={onFinish} layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={8} lg={6}>
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
                    <Col xs={24} sm={24} md={8} lg={6}>
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
                    <Col xs={24} sm={24} md={8} lg={6}>
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
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Form.Item label="Email" name="email">
                            <MyInput placeholder="Email" prefix={<MailOutlined />} disabled />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
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
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                { required: true },
                                { validator: validatePhoneNumber },
                            ]}
                        >
                            <MyInput placeholder="Phone Number" prefix={<PhoneOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Form.Item
                            label="Address Line 1"
                            name="addressLine1"
                            rules={[{ required: true, message: 'Please enter your Address Line 1!' }]}
                        >
                            <MyInput placeholder="Address Line 1" prefix={<EnvironmentOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Form.Item label="Address Line 2" name="addressLine2">
                            <MyInput placeholder="Address Line 2" prefix={<EnvironmentOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[
                                { required: true, message: 'Please enter your city!' },
                                { max: 50, message: 'City cannot exceed 50 characters!' },
                                { validator: validateName },
                            ]}
                        >
                            <MyInput placeholder="City" prefix={<EnvironmentOutlined />} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
                        <Form.Item label="State" name="state">
                            <MySelect
                                placeholder="Select your state"
                                options={StateList ?? []}
                                // suffixIcon={<GlobalOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={6}>
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
                    <Col span={24}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update Profile
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};

export default UserProfile;
