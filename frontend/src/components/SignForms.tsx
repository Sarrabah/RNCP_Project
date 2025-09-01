import type React from "react";
import {
  Button,
  Form,
  Input,
  Typography,
  Row,
  Col,
  Card,
  message,
  notification,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import type {
  SignFormsProps,
  SignInFormData,
  SignUpFormData,
} from "../types/types";
import { validatePassword } from "../utils/validators";
import "../styles/signForms.css";
import { NavigateFunction, useNavigate } from "react-router-dom";

const { Title } = Typography;

const SignForms: React.FC<SignFormsProps> = ({ activeForm, onFormChange }) => {
  const [signInForm] = Form.useForm();

  const onFinishSignIn = (values: SignInFormData) => {
    console.log("Sign in values:", values);
    message.success("Sign in successful!");
  };

  const navigate: NavigateFunction = useNavigate();
  const addUser = async (values: SignUpFormData) => {
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

  const onSignInFailed = (errorInfo: any) => {
    console.log("Sign in failed:", errorInfo);
    message.error("Please check your credentials");
  };

  const switchToSignUp = () => {
    onFormChange("signup");
  };

  const switchToSignIn = () => {
    onFormChange("signin");
  };

  return (
    <section
      className="forms-section-fullscreen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-title"
    >
      <div className="forms-container">
        <Row gutter={[48, 48]} justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Card className="form-card-fullscreen">
              <div className="form-header">
                <Title level={2} className="form-title-center" id="form-title">
                  {activeForm === "signin" ? "Welcome Back" : "Create Account"}
                </Title>
                <div className="header-spacer"></div>
              </div>

              {activeForm === "signin" ? (
                <Form
                  form={signInForm}
                  name="signin"
                  onFinish={onFinishSignIn}
                  onFinishFailed={onSignInFailed}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                      className="form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      { validator: validatePassword },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                      className="form-input"
                    />
                  </Form.Item>

                  <div className="forgot-password">
                    <Button type="link" className="forgot-link">
                      Forgot password?
                    </Button>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      className="submit-btn"
                    >
                      Sign in
                    </Button>
                  </Form.Item>

                  <div className="form-switch">
                    <span className="switch-text">Don't have an account? </span>
                    <Button
                      type="link"
                      onClick={switchToSignUp}
                      className="switch-link"
                    >
                      Sign up
                    </Button>
                  </div>
                </Form>
              ) : (
                <Form
                  name="signup"
                  onFinish={addUser}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="First name"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="First_name"
                      className="form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Last name"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Last_name"
                      className="form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      {
                        type: "email",
                        message: "The input is not a valid email address!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Enter your email"
                      className="form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      { validator: validatePassword },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Enter your password"
                      className="form-input"
                    />
                  </Form.Item>
                  <Form.Item label="Adress" name="adress">
                    <Input
                      prefix={<HomeOutlined />}
                      placeholder="Adress"
                      className="site-form-item-icon"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Region code"
                    name="region_code"
                    rules={[
                      {
                        required: true,
                        message: "Please put here your Region Code! ",
                      },
                    ]}
                  >
                    <Input
                      prefix={<HomeOutlined />}
                      placeholder="Region_code"
                      className="site-form-item-icon"
                    />
                  </Form.Item>
                  <Form.Item label="Phone number" name="phone_number">
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
                      block
                      size="large"
                      className="submit-btn signup-btn"
                    >
                      Sign up
                    </Button>
                  </Form.Item>

                  <div className="form-switch">
                    <span className="switch-text">
                      Already have an account?{" "}
                    </span>
                    <Button
                      type="link"
                      onClick={switchToSignIn}
                      className="switch-link"
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SignForms;
