import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <img
          src="/404.png"
          alt={t("notfound.imageAlt")}
          className="max-w-xs md:max-w-md mb-6"
        />
        <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-4">
          {t("notfound.title")}
        </h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#71914B] text-white px-6 py-2 rounded-full hover:bg-[#71914B] transition"
        >
          {t("notfound.button")}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
