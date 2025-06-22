import React, { useState } from "react";
import AdminEvents from "./AdminEvents";
import AdminServices from "./AdminServices";
import AdminPeople from "./AdminPeople";
const AdminDashboard = () => {
  const [section, setSection] = useState("events");

  const buttons = [
    { id: "events", label: "Add Event" },
    // { id: "services", label: "Add Service" },
    { id: "people", label: "Add Member" },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E1] p-6">
      <h1 className="text-3xl font-bold text-[#DC143C] text-center mb-8">
        Admin Dashboard
      </h1>

      {/* Button group */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setSection(btn.id)}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-all duration-200 tracking-wide
              ${
                section === btn.id
                  ? "bg-[#DC143C] text-white shadow-md"
                  : "bg-[#FFB71B] text-[#6B4226] hover:bg-[#F4C95D]"
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Section rendering */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto border border-[#F4C95D]">
        {section === "events" && <AdminEvents />}
        {/* {section === "services" && <AdminServices />} */}
        {section === "people" && <AdminPeople />}
      </div>
    </div>
  );
};

export default AdminDashboard;
