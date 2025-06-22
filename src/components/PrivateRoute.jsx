import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF8E7]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-dashed border-[#872341] rounded-full animate-spin mb-3"></div>
          <p className="text-[#872341] font-medium animate-pulse">Checking access...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
