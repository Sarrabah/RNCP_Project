import React from 'react';
import SearchBar from './SearchBar';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/Homepage.css';
import artcreapro from '../assets/art-crea-pro.png';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';
import { useBasketContext } from '../context/BasketContext';
import { Badge } from 'antd';

const NavBar: React.FC = () => {
  const { basket } = useBasketContext();
  let totalBasketItems = 0;
  for (const item of basket) {
    totalBasketItems = totalBasketItems + item.quantity;
  }

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
          <Badge count={totalBasketItems} style={{ backgroundColor: 'black' }}>
            <ShoppingCartOutlined style={{ fontSize: '20px' }} />
          </Badge>
        </Link>
      </div>
    </Header>
  );
};
export default NavBar;
