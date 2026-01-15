import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const ObjectTypes = () => {
  const { i18n } = useTranslation();
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
      <div className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-sm text-[#8F491A] uppercase tracking-wide mb-2 font-semibold">
          {lang === "ru"
            ? "ДЛЯ КОГО МЫ РАБОТАЕМ"
            : lang === "uz"
            ? "BIZ KIM UCHUN ISHLAYMIZ"
            : "WHO WE WORK FOR"}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-12">
          {lang === "ru"
            ? "Мы понимаем задачи каждого типа объектов и предлагаем готовые решения под ключ."
            : lang === "uz"
            ? "Biz har bir ob'ekt turining vazifalarini tushunamiz va kalitga tayyor yechimlarni taklif qilamiz."
            : "We understand the tasks of each type of facility and offer turnkey solutions."}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {items.map((item, index) => {
            const imageUrl = item.image;
            return (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <h3 className="text-xl font-bold mb-3 text-[#3D3D3D]">
                      {item.title?.[lang] || item.title?.ru || ""}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.description?.[lang] || item.description?.ru || ""}
                    </p>
                  </div>
                  <div className="md:w-1/2 h-64 md:h-auto min-h-[240px] p-5">
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
