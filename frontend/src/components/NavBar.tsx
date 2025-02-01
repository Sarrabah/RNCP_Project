import React from "react";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/Homepage.css";
import artcreapro from "../assets/art-crea-pro.png";
import { Header } from "antd/es/layout/layout";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useBasketContext } from "../context/BasketContext";
import { Badge, Dropdown, MenuProps, message } from "antd";

export const getCSRFToken = (): string | null => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    if (cookie.startsWith("csrftoken=")) {
      return cookie.split("=")[1];
    }
  }
  return null;
};
const NavBar: React.FC = () => {
  const { basket } = useBasketContext();
  let totalBasketItems = 0;
  for (const item of basket) {
    totalBasketItems = totalBasketItems + item.quantity;
  }
  const navigate: NavigateFunction = useNavigate();
  const handleLogout = async (): Promise<any> => {
    try {
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        throw new Error("CSRF token not found. Please refresh the page.");
      }

      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // Include session cookies
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken || "",
        },
      });

      if (response.ok) {
        message.success("Logged out successfully!");
        localStorage.removeItem("isAuthentificated");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        message.error("Failed to logout!");
        throw new Error("Failed to logout!");
      }
    } catch (error) {
      message.error("An error is occured while logging out!");
      console.error("Logout error: ", error);
    }
  };
  const profileMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Logout</span>,
    },
  ];

  return (
    <Header className="navbar">
      <Link to="/homepage">
        <img src={artcreapro} alt="Brand" className="logo" />
      </Link>
      <div className="icons">
        <Dropdown
          menu={{ items: profileMenu }}
          placement="bottomRight"
          trigger={["hover"]}
        >
          <UserOutlined />
        </Dropdown>
        <Link to="/basket">
          <Badge count={totalBasketItems} style={{ backgroundColor: "black" }}>
            <ShoppingCartOutlined style={{ fontSize: "20px" }} />
          </Badge>
        </Link>
      </div>
    </Header>
  );
};
export default NavBar;
