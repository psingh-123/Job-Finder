import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  // Show loading until user state is loaded
  if (user === undefined) return <div>Loading...</div>;

  if (!user || !user.isAdmin) return <Navigate to="/not-authorized" />;

  return children;
};

export default AdminRoute;
