import { Button, Form, Input, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { LoginPayload } from "../types/types";
import { useBasketContext } from "../context/BasketContext";

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const { setBasket } = useBasketContext();
  const handleLogin = async (values: LoginPayload): Promise<void> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include", // Ensure cookies (session) are included in the request
      });

      if (response.ok) {
        notification.success({
          message: "Login successful",
          description: "Welcome! You are online now!",
        });
        localStorage.setItem("isAuthentificated", "true");
        setBasket([]);

        setTimeout(() => {
          navigate("/homepage");
        }, 2000);
      } else {
        const errorData = await response.json();
        notification.error({
          message: "Login failed",
          description: errorData.error,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "An error occurred while login in! Please try again! ",
      });
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="container">
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        className="form"
        onFinish={handleLogin}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please put your email here!" }]}
        >
          <Input
            prefix={<MailOutlined />}
            className="site-form-item-icon"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please put your password here!" },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            className="site-form-item-icon"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            LOGIN
          </Button>
          <div className="register-link">
            New here ? <Link to="/register">Sign Up</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
