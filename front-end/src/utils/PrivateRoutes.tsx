import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../context/auth-context";
const PrivateRoutes = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
