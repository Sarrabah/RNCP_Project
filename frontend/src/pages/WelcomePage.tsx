import type React from "react";
import { lazy, Suspense, useState } from "react";
import { Col, ConfigProvider, Row } from "antd";

import "../design-tokens/_variables.css";
import "../styles/welcomepage.css";

import Description from "../components/Description";
import Footer from "../components/Footer";
import { Header } from "antd/es/layout/layout";
import logo from "../assets/logo.svg";

const SignForms = lazy(() => import("../components/SignForms"));

const WelcomePage: React.FC = () => {
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
    <ConfigProvider>
      <div className="welcome">
        <Header
          style={{
            background: "#fff",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px", // increase height
            boxShadow: "0 2px 8px #f0f1f2",
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Row justify="center" align="middle" style={{ width: "100%" }}>
            <Col>
              <img
                src={logo}
                alt="Art Crea Pro Logo"
                style={{
                  marginTop: "28px",
                  height: "80px", // bigger logo
                  objectFit: "contain",
                }}
              />
            </Col>
          </Row>
        </Header>
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
