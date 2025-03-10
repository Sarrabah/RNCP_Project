import React from "react";
import "../styles/LoginAndRegister.css";
import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="form">
        <h2 className="title">Welcome to Art Créa Pro! </h2>
        <p>
          It is a space dedicated to professionals in the construction and
          interior design sector, to facilitate their task of requesting quotes
          from suppliers.
        </p>
        <div className="link">
          <Link to="/login"> Sign In </Link> or
          <Link to="/register"> Sign Up </Link>
        </div>
      </div>
    </div>
  );
};
export default WelcomePage;
