import React from 'react';
import '../styles/Login.css';
import '../styles/Welcomepage.css';
import { Link } from 'react-router-dom';

const Welcomepage: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="title">Welcome to our site! </h2>
        <p>
          It is a space dedicated to professionals in the construction and
          interior design sector, to facilitate their task of requesting quotes
          from suppliers.
        </p>
        <div className="title">
          <Link to="/login"> Sign In </Link> or
          <Link to="/register"> Sign Up </Link>
        </div>
      </div>
    </div>
  );
};
export default Welcomepage;
