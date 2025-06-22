import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials or network issue.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF8E1] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white border border-[#F4C95D] p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-[#DC143C] mb-6 text-center">
          🔐 Admin Login
        </h2>

        <label className="block text-[#6B4226] text-sm mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-[#F4C95D] rounded focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          required
        />

        <label className="block text-[#6B4226] text-sm mb-1">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-[#F4C95D] rounded focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          required
        />

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-[#DC143C] hover:bg-[#c11235] text-white font-semibold py-2 rounded transition duration-200"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
