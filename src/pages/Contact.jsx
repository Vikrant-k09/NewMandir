import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "8894538942"; // मंदिर का व्हाट्सएप नंबर
    const predefinedText = `🙏 जय बाबा वीर बलुकी जी 🙏\n\n👤 नाम: ${formData.name}\n💬 संदेश: ${formData.message}\n\nकृपया जब समय मिले, उत्तर दें। धन्यवाद! 🙏`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(predefinedText)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-[#FFF8E1] min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#DC143C] mb-3">
          📞 संपर्क करें
        </h1>
        <p className="text-center text-[#6B4226] mb-8 text-lg">
          हमें आपसे सुनकर खुशी होगी! नीचे फ़ॉर्म भरें और हमें व्हाट्सएप पर संदेश भेजें।
        </p>

        <form
          onSubmit={handleWhatsAppSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6 transition-all duration-300"
        >
          <div>
            <label className="block text-lg font-semibold text-[#6B4226] mb-1" htmlFor="name">
              🙋‍♂️ आपका नाम
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="अपना नाम दर्ज करें"
              className="w-full p-3 border border-[#FFD580] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C] transition"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-[#6B4226] mb-1" htmlFor="message">
              📝 आपका संदेश
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="अपना मैसेज लिखें"
              rows="4"
              className="w-full p-3 border border-[#FFD580] rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC143C] transition"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] text-white text-lg font-semibold py-3 rounded-md hover:bg-[#128C7E] transition duration-300 flex items-center justify-center gap-2"
          >
            📲 WhatsApp पर भेजें
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
