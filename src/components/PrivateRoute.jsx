import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF8E7]">
        <p className="text-[#872341] text-xl animate-pulse">🔒 Checking access...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/admin" replace />;
};

export default PrivateRoute;
