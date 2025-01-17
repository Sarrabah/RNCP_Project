import { Button, Form, Input, notification } from "antd";
import React from "react";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import "../styles/Register.css";
import { NavigateFunction } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate: NavigateFunction = useNavigate();
  const addUser = async (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    adress: string;
    region_code: string;
    phone_number: string;
  }) => {
    const {
      first_name,
      last_name,
      email,
      password,
      adress,
      region_code,
      phone_number,
    } = values;
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          adress: adress || null,
          region_code: region_code,
          phone_number: phone_number || null,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit the new user!");
      }

      const data = await response.json();

      notification.success({
        message: "Création réussie",
        description: "Login juste now!",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return data;
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: "Error occured when registering",
      });
      console.error("Error submitting the new user ", error);
    }
  };
  return (
    <div className="register-container">
      <Form
        name="register_form"
        initialValues={{ remember: true }}
        className="register-form"
        onFinish={addUser}
      >
        <Form.Item
          name="first_name"
          rules={[
            { required: true, message: "Please put here your First Name! " },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="First_name"
            className="site-form-item-icon"
          />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[
            { required: true, message: "Please put here your last Name! " },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Last_name"
            className="site-form-item-icon"
          />
        </Form.Item>
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
        <Form.Item name="adress">
          <Input
            prefix={<HomeOutlined />}
            placeholder="Adress"
            className="site-form-item-icon"
          />
        </Form.Item>
        <Form.Item
          name="region_code"
          rules={[
            { required: true, message: "Please put here your Region Code! " },
          ]}
        >
          <Input
            prefix={<HomeOutlined />}
            placeholder="Region_code"
            className="site-form-item-icon"
          />
        </Form.Item>
        <Form.Item name="phone_number">
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Phone_number"
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
