import type React from "react";
import { lazy, Suspense, useState } from "react";
import { Button, ConfigProvider, Space, theme, Typography } from "antd";
import { useTheme } from "../hooks/useTheme";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

import "../design-tokens/_variables.css";
import "../styles/welcomepage.css";

import Description from "../components/Description";
import Footer from "../components/Footer";

const { Title } = Typography;
const SignForms = lazy(() => import("../components/SignForms"));

const WelcomePage: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  const [activeForm, setActiveForm] = useState<"signin" | "signup" | null>(
    null,
  );

  const handleSignInClick = () => {
    setActiveForm("signin");
  };

  const handleSignUpClick = () => {
    setActiveForm("signup");
  };
  const handleCloseForm = () => {
    setActiveForm(null);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#06b6d4", // Primary color (Ant Design's accent color)
          colorBgBase: isDark ? "#0f172a" : "#f8fafc", // Base background for components if needed
          colorTextBase: isDark ? "#ffffff" : "#0f172a", // Base text color for components
          colorBgContainer: isDark ? "#1e293b" : "#ffffff", // Background for cards/containers
          colorBorder: isDark
            ? "rgba(255, 255, 255, 0.2)"
            : "rgba(15, 23, 42, 0.2)", // Border color
        },
      }}
    >
      <div className="welcome">
        <header className="header">
          <div className="header-content">
            <Title level={1}>Art Créa Pro</Title>
            <Space size="middle">
              <Button
                type="text"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                icon={isDark ? <SunOutlined /> : <MoonOutlined />}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              />
            </Space>
          </div>
        </header>
        <main aria-hidden={activeForm ? "true" : "false"}>
          <Description
            onSignInClick={handleSignInClick}
            onSignUpClick={handleSignUpClick}
          />
          {activeForm && (
            <Suspense fallback={<div>Loading form...</div>}>
              {" "}
              {/* Provide a fallback UI */}
              <SignForms
                activeForm={activeForm}
                onFormChange={setActiveForm}
                onCloseForm={handleCloseForm}
              />
            </Suspense>
          )}
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default WelcomePage;
