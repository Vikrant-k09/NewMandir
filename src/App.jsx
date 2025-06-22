import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import AdminServices from "./pages/AdminServices";
import AdminLogin from "./pages/AdminLogin"; 
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";

import AdminPeople from "./pages/AdminPeople";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/services" element={<Services />} />
      
        <Route path="/contact" element={<Contact />} />
   
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <PrivateRoute>
              <AdminEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateRoute>
              <AdminServices />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/admin/people"
          element={
            <PrivateRoute>
              <AdminPeople />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
