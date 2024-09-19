import React from 'react';
import SearchBar from './SearchBar';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Homepage.css';
import artcreapro from '../assets/art-crea-pro.png';

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <img src={artcreapro} alt="Brand" className="logo" />
      <SearchBar />
      <div className="icons">
        <UserOutlined className="icon" />
        <ShoppingCartOutlined className="icon" />
      </div>
    </div>
  );
};
export default NavBar;
