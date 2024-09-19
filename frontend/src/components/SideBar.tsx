import React from 'react';
import { Layout, Menu } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';
const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250}>
        <Menu theme="dark">
          <Menu.Item key="1">
            <a href="/homepage"> Home</a>
          </Menu.Item>
          <SubMenu key="2" title="Products by category">
            <Menu.Item key="2.1">
              <a href="/category/furniture">Furniture Hardware</a>
            </Menu.Item>
            <Menu.Item key="2.2">
              <a href="/category/bathroom">Bathroom Hardware</a>
            </Menu.Item>
            <Menu.Item key="2.3">
              <a href="/category/door">Door Hardware</a>
            </Menu.Item>
            <Menu.Item key="2.4">
              <a href="/category/floor">Floor Covering</a>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3">Create new quote requests</Menu.Item>
          <Menu.Item key="4">Quote requests list</Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Sidebar;