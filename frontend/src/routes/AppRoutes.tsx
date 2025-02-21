import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Homepage from "../pages/Home/HomePage";
import WelcomePage from "../pages/WelcomePage";
import NavBar from "../components/NavBar";
import { Layout } from "antd";
import Sidebar from "../components/SideBar";
import CategoryPage from "../pages/CategoryPage";
import QuotePage from "../pages/QuoteRequest/QuoteRequestPage";
import ProductDetail from "../components/ProductDetail";
import Basket from "../pages/BasketPage";
import PrivateRoute from "../components/PrivateRoute";
import QuoteRequestProductsPage from "../pages/QuoteRequestProductsPage";

const { Content } = Layout;
const AppRoutes = () => {
  const location = useLocation();
  const hideLayoutPaths: string[] = ["/login", "/register", "/"];
  const hideLayout: boolean = hideLayoutPaths.includes(location.pathname);

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
              path="/quoterequestlist"
              element={
                <PrivateRoute>
                  <QuotePage />
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
            <Route
              path="/quoterequestproducts/:id"
              element={
                <PrivateRoute>
                  <QuoteRequestProductsPage />
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
