import type { FC } from 'react';

import { Input } from 'antd';

const BaseInput: FC<any> = props => {
    return <Input {...props} size="large" />;
};

const MyInput = Object.assign(Input, BaseInput);

export default MyInput;
