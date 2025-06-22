// src/pages/About.jsx

import React, { useEffect, useState } from 'react';
import StaffCard from '../components/StaffCard';
import { db, storage } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

const About = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'people'));
        const peopleData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();
            let imageUrl = data.imageURL;

            if (imageUrl?.startsWith("gs://")) {
              try {
                const path = imageUrl.replace("gs://mandir-ef670.appspot.com/", "");
                imageUrl = await getDownloadURL(ref(storage, path));
              } catch (error) {
                console.error("Error fetching image URL:", error);
                imageUrl = "";
              }
            }

            return {
              id: doc.id,
              name: data.name,
              role: data.role,
              description: data.description,
              image: imageUrl,
            };
          })
        );

        const sorted = peopleData.sort((a, b) => parseInt(a.id) - parseInt(b.id));
        setStaff(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch staff:", err);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#FFF8E1]">
        <div className="w-12 h-12 border-4 border-dashed border-[#872341] rounded-full animate-spin mb-4" />
        <p className="text-[#872341] text-lg font-medium animate-pulse">
          🧘‍♂️ Preparing your spiritual session...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8E1] min-h-screen py-10">
      <div className="container mx-auto px-6 text-center">
        {/* शीर्षक अनुभाग */}
        <h1 className="text-4xl font-bold text-[#DC143C] mb-6">हमारे बारे में</h1>
        <p className="text-lg text-[#6B4226] mb-6 leading-relaxed max-w-3xl mx-auto">
          हमारे मंदिर में आपका स्वागत है! हमारा उद्देश्य आध्यात्मिक विकास, सामुदायिक एकता और शांति के लिए एक स्थान प्रदान करना है।
          भक्ति और आत्मज्ञान की इस यात्रा में हमारे साथ जुड़ें। हमारा मंदिर प्रार्थना, ध्यान और दिव्य उत्सवों का स्थान है।
        </p>

        {/* स्टाफ अनुभाग */}
        <h2 className="text-3xl font-semibold text-[#DC143C] mb-8">हमारी समर्पित टीम</h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {staff.map((member, index) => (
            <StaffCard key={index} staff={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
