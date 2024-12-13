import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  FormOutlined,
  OrderedListOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="80" width={250}>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/homepage"> Home</Link>
        </Menu.Item>

        <SubMenu
          key="2"
          icon={<AppstoreOutlined />}
          title="Products by category"
        >
          <Menu.Item key="2.1">
            <Link to="/category/furniture">Furniture</Link>
          </Menu.Item>

          <Menu.Item key="2.2">
            <Link to="/category/bathroom">Bathroom</Link>
          </Menu.Item>
          <Menu.Item key="2.3">
            <Link to="/category/door">Door</Link>
          </Menu.Item>
          <Menu.Item key="2.4">
            <Link to="/category/floor">Floor</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="3" icon={<FormOutlined />}>
          <Link to="/newquoterequest">Create new quote request</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<OrderedListOutlined />}>
          <Link to="/quoterequestlist">Quote requests list </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
