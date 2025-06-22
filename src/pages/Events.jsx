import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const currentDate = new Date();

        const upcomingEvents = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            const eventDate = data.date?.toDate(); // Convert Firestore Timestamp
            return {
              id: doc.id,
              ...data,
              date: eventDate,
            };
          })
          .filter((event) => event.date && event.date >= currentDate)
          .sort((a, b) => a.date - b.date);

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="bg-[#FFF8E1] min-h-screen py-10">
      <section className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-[#DC143C] mb-6">आगामी कार्यक्रम</h1>
        <p className="text-lg text-[#6B4226] mb-12 leading-relaxed mx-auto max-w-3xl">
          हमारे मंदिर में होने वाले आगामी धार्मिक और सांस्कृतिक कार्यक्रम देखें। आप सपरिवार आमंत्रित हैं!
        </p>

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <div className="w-12 h-12 border-4 border-dashed border-[#DC143C] rounded-full animate-spin mb-4"></div>
            <p className="text-[#872341] text-lg font-medium animate-pulse">
              🧘‍♂️ कार्यक्रम लोड हो रहे हैं...
            </p>
          </div>
        ) : events.length === 0 ? (
          <p className="mt-10 text-[#6B4226] text-lg">
            🚫 कोई आगामी कार्यक्रम नहीं है। कृपया बाद में पुनः देखें।
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
            {events.map((event) => (
              <article
                key={event.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 w-full max-w-[400px] min-w-[280px]"
              >
                <h3 className="text-2xl font-semibold text-[#DC143C] mb-2">{event.title}</h3>
                <p className="text-md text-[#6B4226] mb-2">
                  📅 {event.date?.toLocaleDateString("hi-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-md text-[#6B4226]">{event.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Events;
