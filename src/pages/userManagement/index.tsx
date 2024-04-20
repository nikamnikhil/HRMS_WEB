import type { AppDispatch } from '../../stores';
import type { TableProps } from 'antd';
import type { ColProps } from 'antd/es/col';

import { DeleteOutlined, EditOutlined, LockOutlined, ReloadOutlined, UnlockOutlined } from '@ant-design/icons';
import { Card, Col, message as $message, Row, Space, Spin, Tag, Tooltip } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MyButton from '../../components/basic/button';
import MyModal from '../../components/basic/modal';
import MyTable from '../../components/core/table';
import { useLocale } from '../../locales';
import {
    useUserDeleteMutation,
    useUserListQuery,
    useUserLockUnLockMutation,
    useUserResetPasswordMutation,
} from './duck/userManagement';
import { setUserId } from './duck/userManagementSlice';

const wrapperCol: ColProps = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12,
};

interface DataType {
    key: string;
    fullName: string;
    userName: string;
    roles: string;
    class: string[];
}

interface UserData {
    userID: string;
    lockoutEnabled?: boolean;
}
interface UserID {
    userID: string;
}

const UserManagement: React.FC = () => {
    const navigat = useNavigate();
    const [userDelete] = useUserDeleteMutation();
    const [userLockUnLock] = useUserLockUnLockMutation();
    const [userResetPassword] = useUserResetPasswordMutation();
    const { data: userList, isLoading } = useUserListQuery({ name: '' });
    const [open, setOpen] = useState(false);
    const [openReset, setOpenReset] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [arrow, setArrow] = useState('Show');
    const [lockedData, setLockedData] = useState<UserData>({} as UserData);
    const [selectedUserId, setSelectedUserId] = useState<UserID>({} as UserID);
    const dispatch = useDispatch<AppDispatch>();

    const { formatMessage } = useLocale();

    const handleEdit = useCallback((id: string) => {
        dispatch(setUserId(id));
        navigat('edit-user');
    }, []);

    const handleDeleteOk = () => {
        setOpenDelete(false);
        handleDeleteUser(selectedUserId);
    };

    const handleOk = () => {
        setOpen(false);
        handleLockUser(lockedData);
    };

    const handleResetOk = () => {
        setOpenReset(false);
        handleResetPassword(selectedUserId);
    };

    const handleCancel = () => {
        setOpen(false);
        setOpenReset(false);
        setOpenDelete(false);
    };

    const handleDelete = async (id: UserID) => {
        setSelectedUserId(id);
    };

    const handleDeleteUser = useCallback(async (selectedUserId: UserID) => {
        const result: any = await userDelete({ userId: selectedUserId });

        if (result?.error) {
            $message.error(result?.error?.data);
            setSelectedUserId({} as UserID);

            return;
        }

        if (result?.data?.success === true) {
            $message.success(result?.data?.message);
        } else {
            $message.error(result?.data?.message);
        }

        setSelectedUserId({} as UserID);
    }, []);

    const handleLockUserModal = (record: UserData) => {
        setLockedData(record);
    };

    const handleLockUser = useCallback(async (lockedData: UserData) => {
        const result: any = await userLockUnLock({ userID: lockedData.userID, isLocked: !lockedData.lockoutEnabled });

        if (result?.error) {
            $message.error(result?.error?.data);
            setLockedData({} as UserData);

            return;
        }

        if (result?.data?.success === true) {
            $message.success(result?.data?.message);
        } else {
            $message.error(result?.data?.message);
        }

        setLockedData({} as UserData);
    }, []);

    const handleResetModal = (id: UserID) => {
        setSelectedUserId(id);
    };

    const handleResetPassword = useCallback(async (selectedUserId: UserID) => {
        const result: any = await userResetPassword({ userId: selectedUserId });

        if (result?.error) {
            $message.error(result?.error?.data);
            setSelectedUserId({} as UserID);

            return;
        }

        if (result?.data?.success === true) {
            $message.success(result?.data?.message);
        } else {
            $message.error(result?.data?.message);
        }

        setSelectedUserId({} as UserID);
    }, []);

    const mergedArrow = useMemo(() => {
        if (arrow === 'Hide') {
            return false;
        }

        if (arrow === 'Show') {
            return true;
        }

        return {
            pointAtCenter: true,
        };
    }, [arrow]);

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            width: 200,
            render: text => <a>{text}</a>,
            sorter: (a, b) => a.fullName.localeCompare(b.fullName),
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            width: 200,
            sorter: (a, b) => a.userName.localeCompare(b.userName),
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            width: 320,
            render: row => {
                const color = 'green';

                return (
                    <>
                        <Tag color={color}>{row?.toUpperCase()}</Tag>
                    </>
                );
            },
            sorter: (a, b) => a.roles.localeCompare(b.roles),
        },
        {
            title: '',
            key: 'action',
            width: 200,
            render: (_: any, record: any) => {
                return (
                    <Space size="middle">
                        <Tooltip placement="topLeft" title="Edit User" arrow={mergedArrow}>
                            <EditOutlined
                                style={{ cursor: 'pointer', color: 'blue' }}
                                onClick={() => handleEdit(record.userID)}
                            />
                        </Tooltip>
                        <Tooltip
                            placement="topLeft"
                            title={record.roles.includes('Parent') ? 'Can not Delete Parent' : 'Delete User'}
                            arrow={mergedArrow}
                        >
                            <DeleteOutlined
                                style={{
                                    cursor: record.roles.includes('Parent') ? 'not-allowed' : 'pointer',
                                    color: 'red',
                                }}
                                onClick={() => {
                                    if (record.roles.includes('Parent')) {
                                    } else {
                                        setOpenDelete(true);
                                        handleDelete(record.userID);
                                    }
                                }}
                            />
                        </Tooltip>
                        {record?.lockoutEnabled === true ? (
                            <Tooltip placement="topLeft" title="Lock" arrow={mergedArrow}>
                                <UnlockOutlined
                                    style={{ cursor: 'pointer', color: 'green' }}
                                    onClick={() => {
                                        setOpen(true);
                                        handleLockUserModal(record);
                                    }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip placement="topLeft" title="UnLock" arrow={mergedArrow}>
                                <LockOutlined
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => {
                                        setOpen(true);
                                        handleLockUserModal(record);
                                    }}
                                />
                            </Tooltip>
                        )}

                        <Tooltip
                            placement="topLeft"
                            title={record?.lockoutEnabled === true ? 'Reset Password' : 'Contact Admin'}
                            arrow={mergedArrow}
                        >
                            <ReloadOutlined
                                disabled={record?.lockoutEnabled === true}
                                style={{
                                    cursor: record?.lockoutEnabled === true ? 'pointer' : 'not-allowed',
                                    color: 'black',
                                }}
                                onClick={() => {
                                    if (record.lockoutEnabled === true) {
                                        setOpenReset(true);
                                        handleResetModal(record.userID);
                                    }
                                }}
                            />
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    return (
        <Card
            className="card-main"
            title={formatMessage({ id: 'app.userManagement.overview.title' })}
            extra={
                <MyButton type="primary" onClick={() => navigat('add-user')}>
                    Add New User
                </MyButton>
            }
        >
            <Row gutter={24}>
                <Col>
                    <MyTable
                        columns={columns}
                        dataSource={userList?.data ?? []}
                        loading={{
                            indicator: (
                                <div>
                                    <Spin />
                                </div>
                            ),
                            spinning: isLoading,
                        }}
                    />
                </Col>
            </Row>

            <MyModal
                open={openDelete}
                onOk={handleDeleteOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn /> <OkBtn />
                    </>
                )}
                title={'Are you sure you want to delete this User ?'}
            />
            <MyModal
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn /> <OkBtn />
                    </>
                )}
                title={
                    lockedData.lockoutEnabled === true ? 'Do you want to lock a user' : 'Do you want to unlock a user'
                }
            />
            <MyModal
                open={openReset}
                onOk={handleResetOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn /> <OkBtn />
                    </>
                )}
                title={' Do you want to reset a user password? '}
                children={
                    <p>
                        If the user's password is reset, a new password will be sent to their registered email address.
                    </p>
                }
            />
        </Card>
    );
};

export default UserManagement;
