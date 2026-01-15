import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Mic,
  Volume2,
  Calendar,
  School,
  Briefcase,
  Building2,
  Wrench,
  Shield,
} from "lucide-react";

const WhatWeDo = () => {
  const { i18n } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language;

  const icons = [
    Mic,
    Volume2,
    Calendar,
    School,
    Briefcase,
    Building2,
    Wrench,
    Shield,
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/what-we-do`
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
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 max-w-[1400px] bg-gradient-to-t to-[#FFFFFF] from-[#E89B64] rounded-3xl p-10 md:p-16">
        <div className="text-sm text-[#D4A574] uppercase tracking-wide mb-2 font-semibold">
          {lang === "ru"
            ? "ЧЕМ МЫ ЗАНИМАЕМСЯ"
            : lang === "uz"
            ? "BIZ NIMA BILAN SHUG'ULLANAMIZ"
            : "WHAT WE DO"}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-12">
          {lang === "ru"
            ? "Мы создаем пространства, где удобно общаться, работать и проводить мероприятия"
            : lang === "uz"
            ? "Biz muloqot qilish, ishlash va tadbirlar o'tkazish uchun qulay bo'lgan joylar yaratamiz"
            : "We create spaces where it is convenient to communicate, work and hold events"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={item._id || index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#E8A572] to-[#D4A574] rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold mb-2 text-[#3D3D3D]">
                  {item.title?.[lang] || item.title?.ru || ""}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description?.[lang] || item.description?.ru || ""}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
