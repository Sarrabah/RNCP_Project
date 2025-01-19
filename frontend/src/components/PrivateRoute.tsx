import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthentificated: Boolean =
    localStorage.getItem("isAuthentificated") === "true";
  return isAuthentificated ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
