import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const AdminPeople = () => {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPeople = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(db, "people"));
    const data = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const person = docSnap.data();
        let imageURL = person.imageURL;

        if (imageURL?.startsWith("gs://")) {
          try {
            const path = imageURL.replace("gs://mandir-ef670.appspot.com/", "");
            imageURL = await getDownloadURL(ref(storage, path));
          } catch (err) {
            console.error("Error converting gs:// URL:", err);
            imageURL = "";
          }
        }

        return {
          id: docSnap.id,
          ...person,
          imageURL,
        };
      })
    );

    setPeople(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const resetForm = () => {
    setName("");
    setRole("");
    setDescription("");
    setImage(null);
    setEditId(null);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !role || !description) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      let imageURL = "";

      if (image) {
        const storageRef = ref(storage, `people/${image.name}`);
        await uploadBytes(storageRef, image);
        imageURL = await getDownloadURL(storageRef);
      }

      if (editId) {
        await updateDoc(doc(db, "people", editId), {
          name,
          role,
          description,
          ...(imageURL && { imageURL }),
        });
        setMessage("Member updated successfully!");
      } else {
        if (!imageURL) {
          setMessage("Please upload an image.");
          return;
        }

        await addDoc(collection(db, "people"), {
          name,
          role,
          description,
          imageURL,
        });
        setMessage("Member added successfully!");
      }

      resetForm();
      fetchPeople();
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    }
  };

  const startEdit = (person) => {
    setEditId(person.id);
    setName(person.name);
    setRole(person.role);
    setDescription(person.description);
    setImage(null);
    setMessage("");
  };

  const handleDelete = async (person) => {
    if (!window.confirm(`Are you sure you want to delete ${person.name}?`)) return;

    try {
      await deleteDoc(doc(db, "people", person.id));

      if (person.imageURL.includes("firebasestorage.googleapis.com")) {
        const match = person.imageURL.match(/%2Fpeople%2F([^?]+)/);
        if (match && match[1]) {
          const imageName = decodeURIComponent(match[1]);
          await deleteObject(ref(storage, `people/${imageName}`));
        }
      }

      setMessage("Member deleted successfully!");
      fetchPeople();
    } catch (error) {
      console.error("Error deleting member:", error);
      setMessage("Failed to delete member.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#FFF8E1]">
        <div className="w-16 h-16 border-4 border-dashed border-[#DC143C] rounded-full animate-spin mb-4" />
        <p className="text-[#6B4226] text-lg font-medium animate-pulse">
          🧘‍♂️ Fetching divine souls...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFF8E1] min-h-screen">
      <div className="flex justify-between items-center max-w-lg mx-auto mb-4">
        <h2 className="text-3xl font-bold text-[#DC143C]">
          {editId ? "Edit Member" : "Add New Member"}
        </h2>
        {editId && (
          <button
            onClick={resetForm}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add New
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Name"
          className="border border-[#F4C95D] p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role"
          className="border border-[#F4C95D] p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border border-[#F4C95D] p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#FFB71B]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          className="border border-[#F4C95D] p-2 w-full rounded bg-white"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-[#DC143C] text-white px-4 py-2 rounded hover:bg-[#b01034] w-full transition duration-200"
        >
          {editId ? "Update Member" : "Add Member"}
        </button>
        {message && (
          <p className="text-center text-[#6B4226] mt-2 font-medium">
            {message}
          </p>
        )}
      </form>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => (
          <div
            key={person.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition text-center"
          >
            <img
              src={person.imageURL}
              alt={person.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3 border-2 border-[#FFB71B]"
            />
            <h3 className="text-xl font-semibold text-[#6B4226]">{person.name}</h3>
            <p className="text-sm text-[#FFB71B] font-medium">{person.role}</p>
            <p className="text-sm text-[#6B4226] mt-1">{person.description}</p>
            <div className="flex justify-center mt-3 gap-6">
              <button
                onClick={() => startEdit(person)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(person)}
                className="text-sm text-red-600 hover:underline"
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

export default AdminPeople;
