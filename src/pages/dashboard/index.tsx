import type { ColProps } from 'antd';
import type { FC } from 'react';

import './index.scss';

import { Card, Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import { useLocale } from '../../locales';

const wrapperCol: ColProps = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 12,
};

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);
  const { formatMessage } = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Card className="card-main" title={formatMessage({ id: 'app.dashboard.overview.title' })} loading={loading}>
      <Row gutter={20}>
        <Col {...wrapperCol}>
          <h1>{formatMessage({ id: 'app.dashboard.overview.title' })}</h1>
        </Col>
      </Row>
    </Card>
  );
};

export default DashBoardPage;
