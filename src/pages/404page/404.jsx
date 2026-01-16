import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";
import Footer from "../../components/home/Footer";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#ECDFD2] to-[#E8DDD0] flex flex-col items-center justify-center px-4 text-center py-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl max-w-[1400px]">
          <div className="mb-8">
            <h1 className="text-[120px] sm:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B8956A] to-[#8F491A] leading-none">
              404
            </h1>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E2E2E] mb-4">
            {t("notfound.title")}
          </h2>
          <p className="text-[#616060] text-base sm:text-lg mb-8 max-w-md mx-auto">
            Kechirasiz, siz qidirayotgan sahifa topilmadi yoki ko'chirilgan
            bo'lishi mumkin.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-[#B8956A] to-[#8F491A] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
          >
            {t("notfound.button")}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
