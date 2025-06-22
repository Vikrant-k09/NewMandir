import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const servicesRef = collection(db, "services");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(servicesRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setMessage("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!newService.title || !newService.description || !newService.icon) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editId) {
        await updateDoc(doc(db, "services", editId), newService);
        setMessage("Service updated successfully!");
      } else {
        await addDoc(servicesRef, newService);
        setMessage("Service added successfully!");
      }

      setNewService({ title: "", description: "", icon: "" });
      setEditId(null);
      fetchServices();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    }
  };

  const handleEdit = (service) => {
    setNewService({
      title: service.title,
      description: service.description,
      icon: service.icon,
    });
    setEditId(service.id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "services", id));
      setMessage("Service deleted.");
      fetchServices();
    } catch (error) {
      console.error("Error deleting:", error);
      setMessage("Failed to delete.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8E1]">
        <div className="w-16 h-16 border-4 border-dashed border-[#DC143C] rounded-full animate-spin mb-4" />
        <p className="text-[#6B4226] text-lg font-medium animate-pulse">
          🙏 Fetching divine services...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#FFF8E1]">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#DC143C]">
        Manage Services
      </h2>

      <div className="bg-white rounded shadow p-6 mb-8 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? "Edit Service" : "Add New Service"}
        </h3>

        <input
          type="text"
          placeholder="Service Title"
          value={newService.title}
          onChange={(e) =>
            setNewService({ ...newService, title: e.target.value })
          }
          className="border border-[#F4C95D] p-2 w-full rounded mb-3"
        />
        <input
          type="text"
          placeholder="Service Description"
          value={newService.description}
          onChange={(e) =>
            setNewService({ ...newService, description: e.target.value })
          }
          className="border border-[#F4C95D] p-2 w-full rounded mb-3"
        />
        <input
          type="text"
          placeholder="Icon URL"
          value={newService.icon}
          onChange={(e) =>
            setNewService({ ...newService, icon: e.target.value })
          }
          className="border border-[#F4C95D] p-2 w-full rounded mb-4"
        />
        <button
          onClick={handleAddOrUpdate}
          className={`${
            editId ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded w-full`}
        >
          {editId ? "Update Service" : "Add Service"}
        </button>

        {message && (
          <p className="mt-4 text-center text-[#6B4226] font-medium">{message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white border rounded shadow p-4 text-center">
            <img
              src={service.icon}
              alt={service.title}
              className="w-20 h-20 mx-auto mb-2 object-contain"
            />
            <h4 className="text-lg font-bold mb-1 text-[#6B4226]">{service.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminServices;
