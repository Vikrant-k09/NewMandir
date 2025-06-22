import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
// src/main.jsx or App.jsx
import { AuthProvider } from "./context/AuthContext";

<AuthProvider>
  <App />
</AuthProvider>



ReactDOM.createRoot(document.getElementById("root")).render(

  <BrowserRouter>

    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
  
);
