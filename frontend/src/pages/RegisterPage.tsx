import { Button, Form, Input, notification } from "antd";
import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "../styles/Register.css";
import { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate: NavigateFunction = useNavigate();
  const onFinish = () => {
    notification.success({
      message: "Création réussie",
      description: "Login juste now!",
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  return (
    <div className="register-container">
      <Form
        name="register_form"
        initialValues={{ remember: true }}
        className="register-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please put here your adress mail ! " },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="E-mail"
            className="site-form-item-icon"
          />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please put here your user Name! " },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            className="site-form-item-icon"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please put here your password! " },
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
            className="register-form-button"
          >
            Create an account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
