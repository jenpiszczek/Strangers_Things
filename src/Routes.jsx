import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import SignUp from "./SignUp";
import Home from "./Home";
import Login from "./Login";
import { ProtectedRoute } from "./ProtectedRoute";
import MessageForm from "./MessageForm";
import UserLoader from "./UserLoader";

const AppRoutes = () => {
  const token = sessionStorage.getItem("token");
  const isUserLoggedIn = false;

  return (
    <RouterRoutes>
      {/* Public routes accessible to everyone */}
      <Route path="/signup" element={<SignUp />} />
      {/* Private routes only accessible to logged-in users */}
      <Route path="/home" element={<ProtectedRoute component={Home} />} />
      {/* Public route accessible to everyone */}
      <Route path="/" element={<Login />} />
      <Route
        path="/user"
        element={<ProtectedRoute component={UserLoader} token={token} />}
      />
    </RouterRoutes>
  );
};

export default AppRoutes;