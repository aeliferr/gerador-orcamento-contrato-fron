import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Import your authentication context
import MainLayout from "./MainLayout";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
};

export default PrivateRoute;
