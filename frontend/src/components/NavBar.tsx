import React from 'react';
import SearchBar from './SearchBar';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Homepage.css';
import artcreapro from '../assets/art-crea-pro.png';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <Header className="navbar">
      <Link to="/homepage">
        <img src={artcreapro} alt="Brand" className="logo" />
      </Link>
      <SearchBar />
      <div className="icons">
        <Link to="/profile">
          <UserOutlined />
        </Link>
        <Link to="/basket">
          <ShoppingCartOutlined />
        </Link>
      </div>
    </Header>
  );
};
export default NavBar;
