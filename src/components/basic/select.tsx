import type { FC } from 'react';

import './index.scss';

import { Select } from 'antd';

// import { SelectProps, SelectValue } from 'antd/es/select';
// const MySelect = <T extends SelectValue = SelectValue>({ children, ...props }: SelectProps<T>) => {
//   return <Select<T> {...props}>{children}</Select>;
// };

const BaseSelect: FC = props => {
    return <Select {...props} size="large" className="my-select" />;
};

const MySelect = Object.assign(Select, BaseSelect);

export default MySelect;
