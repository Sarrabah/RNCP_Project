import { Button, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate: NavigateFunction = useNavigate();
  const onFinish = () => {
    notification.success({
      message: 'Connexion réussie',
      description: 'Welcome! You are online now!',
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  return (
    <div className="login-container">
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        className="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please put your user name here!' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            className="site-form-item-icon"
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please put your password here!' },
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
