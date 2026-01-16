import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Check } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const Cases = () => {
  const { i18n } = useTranslation();
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language;

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cases`
        );
        setCases(response.data);
        if (response.data.length > 0) {
          setSelectedCase(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const getImageSrc = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-[#E8DDD0]">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <div className="text-center">Загрузка...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#E8DDD0]">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "1400px" }}
      >
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-xs sm:text-sm lg:text-[15px] text-[#B8936D] uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-3 sm:mb-4 font-semibold">
            {lang === "ru" ? "КЕЙСЫ" : lang === "uz" ? "KEYSLAR" : "CASES"}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-[#2D3748] mb-3 sm:mb-4 leading-[1.2]">
            {lang === "ru"
              ? "Готовые AV- решения под разные задачи и бюджеты"
              : lang === "uz"
              ? "Turli vazifalar va byudjetlar uchun tayyor AV yechimlari"
              : "Ready AV solutions for different tasks and budgets"}
          </h2>
          <p className="text-sm sm:text-base lg:text-[18px] text-[#718096] font-normal leading-[1.6]">
            {lang === "ru"
              ? "Выберите подходящий пакет или закажите индивидуальный расчет под"
              : lang === "uz"
              ? "Mos to'plamni tanlang yoki ob'ektingiz uchun individual"
              : "Choose a suitable package or order an individual calculation"}
            <br />
            {lang === "ru"
              ? "ваш объект"
              : lang === "uz"
              ? "hisob-kitob buyurtma qiling"
              : "for your facility"}
          </p>
        </div>

        {/* Cases Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-0">
          {/* Left Side - Cases List */}
          <div className="lg:w-[360px] flex-shrink-0">
            {cases.map((caseItem, index) => (
              <button
                key={caseItem._id}
                onClick={() => setSelectedCase(caseItem)}
                className={`w-full text-left py-4 sm:py-5 border-b border-[#D4C4B5] transition-all flex items-center gap-3 sm:gap-5 touch-manipulation active:scale-95 ${
                  selectedCase?._id === caseItem._id ? "" : "opacity-50"
                }`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    selectedCase?._id === caseItem._id
                      ? "bg-[#D4A574]"
                      : "bg-[#C4B5A5]"
                  }`}
                >
                  <Check
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="text-base sm:text-lg text-[#2D3748] font-normal">
                  {caseItem.title?.[lang] || caseItem.title?.ru || ""}
                </span>
              </button>
            ))}
          </div>

          {/* Right Side - Selected Case Details */}
          {selectedCase && (
            <div className="flex-1 lg:ml-16 max-w-full lg:max-w-[750px]">
              {/* Title */}
              <p className="text-base sm:text-[17px] text-[#2D3748] mb-4 sm:mb-5 font-normal italic">
                {selectedCase.title?.[lang] || selectedCase.title?.ru || ""}
              </p>

              {/* Image + Description Row */}
              <div className="flex flex-col md:flex-row justify-between gap-6 sm:gap-8">
                {/* Image */}
                <div className="w-full md:w-[300px] flex-shrink-0">
                  {selectedCase.image ? (
                    <img
                      src={getImageSrc(selectedCase.image)}
                      alt={selectedCase.title?.[lang] || selectedCase.title?.ru}
                      className="w-full h-[220px] sm:h-[250px] md:h-[280px] object-cover rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-[220px] sm:h-[250px] md:h-[280px] bg-gray-200 flex items-center justify-center rounded-xl">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>

                {/* Description Texts + Buttons */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4 sm:space-y-5">
                    <p className="text-sm sm:text-base text-[#4A5568] leading-[1.7] font-normal">
                      {lang === "ru"
                        ? "Плохая слышимость и сложности с онлайн-встречами—"
                        : lang === "uz"
                        ? "Yomon eshitish va onlayn uchrashuvlarda qiyinchiliklar—"
                        : "Poor hearing and difficulties with online meetings—"}
                    </p>
                    <p className="text-sm sm:text-base text-[#4A5568] leading-[1.7] font-normal">
                      {selectedCase.description?.[lang] ||
                        selectedCase.description?.ru ||
                        (lang === "ru"
                          ? "Спроектирована и установлена AV- система с микрофонами и видеосвязью Zoom."
                          : lang === "uz"
                          ? "Mikrofonlar va Zoom video aloqasi bilan AV tizimi loyihalangan va o'rnatilgan."
                          : "Designed and installed AV system with microphones and Zoom video communication.")}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-6 sm:mt-8">
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#6B6B6B] hover:bg-[#555555] text-white text-sm sm:text-[15px] font-medium rounded-lg transition-all active:scale-95 touch-manipulation">
                      {lang === "ru"
                        ? "Рассчитать проект"
                        : lang === "uz"
                        ? "Loyihani hisoblash"
                        : "Calculate project"}
                    </button>
                    <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#D4A574] hover:bg-[#C49564] text-white text-sm sm:text-[15px] font-medium rounded-lg transition-all active:scale-95 touch-manipulation">
                      {lang === "ru"
                        ? "Получить консультацию"
                        : lang === "uz"
                        ? "Konsultatsiya olish"
                        : "Get consultation"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cases;
