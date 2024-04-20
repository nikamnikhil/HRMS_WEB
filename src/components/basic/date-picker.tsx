import type { FC } from 'react';

import './index.scss';

import { DatePicker } from 'antd';

const BasePicker: FC = props => {
    return <MyDatePicker {...props} size="large" />;
};

const MyDatePicker = Object.assign(DatePicker, BasePicker);

export default MyDatePicker;
