import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import Homepage from '../pages/HomePage';
import Welcomepage from '../pages/Welcomepage';
import NavBar from '../components/NavBar';
import { Layout } from 'antd';
import Sidebar from '../components/SideBar';

const { Content } = Layout;
const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <NavBar />
        <Layout>
          <Sidebar />
          <Content style={{ marginTop: '2px', padding: '0 24px' }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/homepage" element={<Homepage />} />
              <Route path="/" element={<Welcomepage />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
