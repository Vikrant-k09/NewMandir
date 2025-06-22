import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const AdminEvents = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    const data = snapshot.docs.map((docSnap) => {
      const event = docSnap.data();
      return {
        id: docSnap.id,
        ...event,
        date: event.date?.toDate().toISOString().split("T")[0] || "",
      };
    });
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const [year, month, day] = date.split("-");
      const firebaseDate = Timestamp.fromDate(new Date(year, month - 1, day));

      if (editId) {
        await updateDoc(doc(db, "events", editId), {
          title,
          description,
          date: firebaseDate,
        });
        setMessage("Event updated successfully!");
      } else {
        await addDoc(collection(db, "events"), {
          title,
          description,
          date: firebaseDate,
          createdAt: serverTimestamp(),
        });
        setMessage("Event added successfully!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setEditId(null);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteDoc(doc(db, "events", id));
      fetchEvents();
      setMessage("Event deleted.");
    }
  };

  return (
    <div className="bg-[#FFF8E1] min-h-screen p-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-8 w-full max-w-lg mx-auto border border-[#F4C95D]"
      >
        <h2 className="text-2xl mb-4 font-bold text-[#DC143C] text-center">
          {editId ? "Edit Event" : "Add New Event"}
        </h2>

        <label className="block text-[#6B4226] text-sm font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="e.g. Ram Navami Celebration"
          className="border border-[#F4C95D] rounded w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-[#6B4226] text-sm font-semibold mb-1">
          Description
        </label>
        <textarea
          placeholder="Event description"
          className="border border-[#F4C95D] rounded w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="block text-[#6B4226] text-sm font-semibold mb-1">
          Date
        </label>
        <input
          type="date"
          className="border border-[#F4C95D] rounded w-full py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          type="submit"
          className="bg-[#DC143C] hover:bg-[#b01033] text-white font-bold py-2 px-4 rounded w-full transition-all duration-200"
        >
          {editId ? "Update Event" : "Add Event"}
        </button>

        {message && (
          <p className="mt-4 text-center text-[#6B4226] font-medium">
            {message}
          </p>
        )}
      </form>

      {/* Events List */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center text-[#DC143C]">
          Current Events
        </h3>

        {events.length === 0 ? (
          <p className="text-center text-[#6B4226] italic">
            No events found. Add one above ⬆️
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-md p-4 border border-[#F4C95D]"
              >
                <h4 className="text-lg font-bold text-[#6B4226]">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm text-[#6B4226] mt-1">📅 {event.date}</p>
                <div className="flex justify-end gap-4 mt-3">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-sm text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
