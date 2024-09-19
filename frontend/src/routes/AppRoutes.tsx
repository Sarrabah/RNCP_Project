import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import Homepage from '../pages/HomePage';
import Welcomepage from '../pages/Welcomepage';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<Welcomepage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
