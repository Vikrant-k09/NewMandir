import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'services'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-[#FFF8E1] min-h-screen py-10">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-[#DC143C] mb-6 drop-shadow">
          मंदिर सेवाएँ
        </h1>
        <p className="text-lg text-[#6B4226] mb-12 leading-relaxed max-w-3xl mx-auto">
          हमारे मंदिर में आध्यात्मिक उन्नति के लिए कई सेवाएं प्रदान की जाती हैं — 
          <strong> पूजा, हवन, तांत्रिक अनुष्ठान, आशीर्वाद कार्यक्रम</strong> और बहुत कुछ।
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-12 h-12 border-4 border-dashed border-[#DC143C] rounded-full animate-spin mb-4"></div>
            <p className="text-[#872341] text-lg font-medium animate-pulse">
              🪔 सेवाएँ लोड हो रही हैं...
            </p>
          </div>
        ) : services.length === 0 ? (
          <p className="text-lg text-[#6B4226]">कोई सेवा उपलब्ध नहीं है।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 w-full max-w-[380px]"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={service.icon || "/images/default-icon.png"}
                    alt={service.title}
                    className="w-20 h-20 rounded-full object-cover border border-[#DC143C] p-1"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#DC143C] mb-2">{service.title}</h3>
                <p className="text-md text-[#6B4226]">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
