import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Homepage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";
import NavBar from "../components/NavBar";
import { Layout } from "antd";
import Sidebar from "../components/SideBar";
import CategoryPage from "../pages/CategoryPage";
import QuoteForm from "../components/QuoteForm";
import QuoteTable from "../components/QuoteTable";
import ProductDetail from "../components/ProductDetail";
import Basket from "../components/Basket";
import PrivateRoute from "../components/PrivateRoute";

const { Content } = Layout;
const AppRoutes = () => {
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/register", "/"];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <Layout>
      {hideLayout === false && <NavBar />}
      <Layout>
        {hideLayout === false && <Sidebar />}
        <Content>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/homepage"
              element={
                <PrivateRoute>
                  <Homepage />
                </PrivateRoute>
              }
            />
            <Route
              path="/category/:category"
              element={
                <PrivateRoute>
                  <CategoryPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/newquoterequest"
              element={
                <PrivateRoute>
                  <QuoteForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/quoterequestlist"
              element={
                <PrivateRoute>
                  <QuoteTable />
                </PrivateRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <PrivateRoute>
                  <ProductDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/basket"
              element={
                <PrivateRoute>
                  <Basket />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppRoutes;
