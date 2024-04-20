import type { FC } from 'react';

import { Input } from 'antd';

const InputPassword: FC = props => {
    return <Input.Password {...props} size="large" />;
};

const MyInputPassword = Object.assign(Input.Password, InputPassword);

export default MyInputPassword;
