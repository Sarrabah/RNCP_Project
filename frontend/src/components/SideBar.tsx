import React from 'react';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  FormOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/es/menu/SubMenu';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="80" width={250}>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <a href="/homepage"> Home</a>
        </Menu.Item>

        <SubMenu
          key="2"
          icon={<AppstoreOutlined />}
          title="Products by category"
        >
          <Menu.Item key="2.1">
            <a href="/category/furniture">Furniture</a>
          </Menu.Item>

          <Menu.Item key="2.2">
            <a href="/category/bathroom">Bathroom</a>
          </Menu.Item>
          <Menu.Item key="2.3">
            <a href="/category/door">Door</a>
          </Menu.Item>
          <Menu.Item key="2.4">
            <a href="/category/floor">Floor</a>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="3" icon={<FormOutlined />}>
          <a href="/newquoterequest">Create new quote request</a>
        </Menu.Item>
        <Menu.Item key="4" icon={<OrderedListOutlined />}>
          <a href="/quoterequestlist">Quote requests list </a>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
