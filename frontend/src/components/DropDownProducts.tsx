import { Button, Dropdown, MenuProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import React from 'react';

const DropDownProducts: React.FC = () => {
  const categories: MenuProps['items'] = [
    {
      key: '1',
      label: 'Quinquillerie de meuble',
    },
    {
      key: '2',
      label: 'Quinquillerie de porte',
    },
  ];

  return (
    <Dropdown menu={{ items: categories }} trigger={['click']}>
      <Button icon={<MenuOutlined />} type="text">
        All products{' '}
      </Button>
    </Dropdown>
  );
};
export default DropDownProducts;
