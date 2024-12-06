import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ userData, children }) {
  if (!userData) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
