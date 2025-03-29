// /src/routes.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import EditUser from "./components/EditUser";
import NotFound from "./pages/NotFound";

// Private route wrapper to protect authenticated routes
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated

  return (
    <Router>
      <Routes>
        {/* Redirect to Dashboard if authenticated, else go to Login */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        
        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        
        {/* Edit User Route - Protected */}
        <Route
          path="/edit/:id"
          element={<PrivateRoute element={<EditUser />} />}
        />
        
        {/* 404 - Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
