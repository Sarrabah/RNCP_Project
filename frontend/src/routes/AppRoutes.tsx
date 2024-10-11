import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import Homepage from '../pages/HomePage';
import Welcomepage from '../pages/Welcomepage';
import NavBar from '../components/NavBar';
import { Layout } from 'antd';
import Sidebar from '../components/SideBar';
import CategoryPage from '../pages/CategoryPage';

const { Content } = Layout;
const AppRoutes = () => {
  const location = useLocation();
  const hideLayoutPaths = ['/login', '/register', '/'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <Layout>
      {hideLayout == false && <NavBar />}
      <Layout>
        {hideLayout == false && <Sidebar />}
        <Content>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/" element={<Welcomepage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppRoutes;
