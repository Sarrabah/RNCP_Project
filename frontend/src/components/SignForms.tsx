import type React from "react";
import { Button, Form, Input, Typography, Row, Col, Card, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import type {
  SignFormsProps,
  SignInFormData,
  SignUpFormData,
} from "../types/types";
import { validateEmail, validatePassword } from "../utils/validators";
import "../styles/signForms.css";

const { Title } = Typography;

const SignForms: React.FC<SignFormsProps> = ({ activeForm, onFormChange }) => {
  const [signInForm] = Form.useForm();
  const [signUpForm] = Form.useForm();

  const onFinishSignIn = (values: SignInFormData) => {
    console.log("Sign in values:", values);
    message.success("Sign in successful!");
  };

  const onFinishSignUp = (values: SignUpFormData) => {
    console.log("Sign up values:", values);
    message.success("Sign up successful!");
  };

  const onSignInFailed = (errorInfo: any) => {
    console.log("Sign in failed:", errorInfo);
    message.error("Please check your credentials");
  };

  const onSignUpFailed = (errorInfo: any) => {
    console.log("Sign up failed:", errorInfo);
    message.error("Please check your information");
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
                      { validator: validateEmail },
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
                  form={signUpForm}
                  name="signup"
                  onFinish={onFinishSignUp}
                  onFinishFailed={onSignUpFailed}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { required: true, message: "Please input your name!" },
                      {
                        min: 2,
                        message: "Name must be at least 2 characters!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Enter your name"
                      className="form-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { validator: validateEmail },
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
