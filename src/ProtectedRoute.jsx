import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/"); // Redirect to home page if there's no token
    }
  }, []);
  return <Component {...rest} />;
}