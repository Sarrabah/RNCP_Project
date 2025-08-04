import type React from "react";
import { useState } from "react";
import { ConfigProvider, theme } from "antd";
/* import Header from "./components/Header"
import Footer from "./components/Footer"*/
import { useTheme } from "../hooks/useTheme";
/* import "./styles/app.css"
 */ import Description from "../components/Description";

/* const SignForms = lazy(() => import("./components/SignForms"));
 */ const WelcomePage: React.FC = () => {
  const { isDark } = useTheme();
  const [activeForm, setActiveForm] = useState<"signin" | "signup" | null>(
    null,
  );

  const handleSignInClick = () => {
    setActiveForm("signin");
  };

  const handleSignUpClick = () => {
    setActiveForm("signup");
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
      <div className="app">
        {" "}
        {/* The class `app` is enough, `dark-theme` or `light-theme` is no longer needed here */}
        {/*         <Header onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} />
         */}{" "}
        <main aria-hidden={activeForm ? "true" : "false"}>
          <Description
            onSignInClick={handleSignInClick}
            onSignUpClick={handleSignUpClick}
          />
        </main>
      </div>
    </ConfigProvider>
  );
};
export default WelcomePage;
