import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ObjectTypes = () => {
  const { i18n, t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/who-we-work-for`
      );
      const sortedData = response.data.sort((a, b) => a.order - b.order);
      setItems(sortedData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-sm sm:text-base text-[#8F491A] font-medium">
            {t("loading")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 sm:py-14 lg:py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
        <div className="text-[12px] sm:text-[13px] lg:text-sm text-[#8F491A] uppercase tracking-wide mb-2 font-semibold">
          {lang === "ru"
            ? "ДЛЯ КОГО МЫ РАБОТАЕМ"
            : lang === "uz"
            ? "BIZ KIM UCHUN ISHLAYMIZ"
            : "WHO WE WORK FOR"}
        </div>
        <h2 className="text-[22px] sm:text-[28px] md:text-3xl lg:text-4xl font-bold text-[#3D3D3D] mb-8 sm:mb-10 lg:mb-12">
          {lang === "ru"
            ? "Мы понимаем задачи каждого типа объектов и предлагаем готовые решения под ключ."
            : lang === "uz"
            ? "Biz har bir ob'ekt turining vazifalarini tushunamiz va kalitga tayyor yechimlarni taklif qilamiz."
            : "We understand the tasks of each type of facility and offer turnkey solutions."}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
          {items.map((item, index) => {
            const imageUrl = item.image;
            return (
              <div
                key={item._id || index}
                className="bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 touch-manipulation active:scale-[0.99]"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
                    <h3 className="text-[17px] sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-[#3D3D3D]">
                      {item.title?.[lang] || item.title?.ru || ""}
                    </h3>
                    <p className="text-gray-600 text-[13px] sm:text-sm leading-relaxed">
                      {item.description?.[lang] || item.description?.ru || ""}
                    </p>
                  </div>
                  <div className="md:w-1/2 h-48 sm:h-56 md:h-auto min-h-[200px] sm:min-h-[240px] p-4 sm:p-5">
                    <img
                      src={imageUrl}
                      alt={item.title?.[lang] || ""}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ObjectTypes;
