import React from 'react';
import NavBar from '../components/NavBar';
import DropDownProducts from '../components/DropDownProducts';
import { Divider } from 'antd';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <NavBar />
      <Divider style={{ margin: '0', backgroundColor: '#e0e0e0' }} />
      <DropDownProducts />
      <Divider style={{ margin: '0', backgroundColor: '#e0e0e0' }} />
    </div>
  );
};
export default Homepage;
