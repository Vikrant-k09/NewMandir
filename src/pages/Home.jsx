import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#FFF8E1] min-h-screen py-10">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#DC143C] mb-4 drop-shadow">
            जय बाबा वीर बुलाकी जी 🚩
          </h1>
          <p className="text-lg md:text-xl text-[#6B4226] max-w-3xl mx-auto leading-relaxed">
            <strong>श्री बाबा वीर बुलाकी जी</strong> के पावन धाम में आपका हार्दिक स्वागत है। यहाँ
            <strong> भक्ति, साधना </strong> एवं
            <strong> तांत्रिक सिद्धि </strong> के माध्यम से आध्यात्मिक ज्ञान और ईश्वरीय कृपा प्राप्त होती है।
            हमारे मंदिर में <strong>हवन, पूजा-पाठ, साधना</strong> एवं
            <strong> विशेष तांत्रिक अनुष्ठान</strong> का आयोजन किया जाता है।
          </p>

          <div className="mt-8">
            <Link
              to="/events"
              className="bg-[#DC143C] hover:bg-[#B22222] text-white font-semibold py-3 px-8 rounded-full text-lg transition-shadow shadow-md hover:shadow-xl"
            >
              आगामी आयोजन देखें
            </Link>
          </div>
        </section>

        {/* Image Section */}
        <section className="flex justify-center mb-16">
          <img
            src="/images/Home_Page.jpg"
            alt="Veer Bulaki Mandir"
            className="rounded-xl shadow-lg max-w-4xl w-full object-cover"
          />
        </section>

        {/* Spiritual Journey Section */}
        <section className="text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DC143C] mb-4">
            हमारी आध्यात्मिक यात्रा ✨
          </h2>
          <p className="text-lg md:text-xl text-[#6B4226] max-w-3xl mx-auto leading-relaxed mb-4">
            हम <strong>तंत्र साधना, भक्ति और संस्कृति</strong> के माध्यम से
            आध्यात्मिक जागरूकता और आत्मज्ञान का प्रसार करते हैं। यहाँ आने वाले
            श्रद्धालु <strong>मनोकामना पूर्ति, शांति और दिव्य ऊर्जा</strong> प्राप्त करते हैं।
          </p>
          <p className="text-lg md:text-xl text-[#6B4226] font-semibold max-w-2xl mx-auto">
            हमारा मार्ग <strong>सत्य, श्रद्धा और सेवा</strong> पर आधारित है।
            <br />
            <span className="text-[#DC143C]">
              हम अंधविश्वास और पाखंडवाद को नहीं बढ़ावा देते।
            </span>
          </p>
        </section>

        {/* Teachings Section */}
        <section className="text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#DC143C] mb-4">
            बाबा वीर बुलाकी जी की शिक्षाएँ 📖
          </h2>
          <p className="text-lg md:text-xl text-[#6B4226] max-w-4xl mx-auto leading-relaxed">
            बाबा वीर बुलाकी जी हमें <strong>भक्ति, अनुशासन, तांत्रिक विद्या</strong> एवं
            <strong> आत्मशुद्धि</strong> का संदेश देते हैं। उनकी शिक्षाएँ जीवन के कठिन मार्गों पर
            <strong> साहस और मार्गदर्शन</strong> प्रदान करती हैं। हमारे मंदिर में नियमित रूप से
            <strong> सत्संग, अनुष्ठान</strong> एवं <strong>विशेष पूजा-पाठ</strong> का आयोजन होता है।
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
