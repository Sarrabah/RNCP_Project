import React from 'react';
import SearchBar from './SearchBar';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Homepage.css';
import artcreapro from '../assets/art-crea-pro.png';
import { Header } from 'antd/es/layout/layout';

const NavBar: React.FC = () => {
  return (
    <Header className="navbar">
      <a href="/homepage">
        <img src={artcreapro} alt="Brand" className="logo" />
      </a>
      <SearchBar />
      <div className="icons">
        <UserOutlined />
        <ShoppingCartOutlined />
      </div>
    </Header>
  );
};
export default NavBar;
