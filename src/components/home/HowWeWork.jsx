import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const HowWeWork = () => {
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/how-we-work`
        );
        setSteps(response.data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching how we work:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  const getImageSrc = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-[#8F491A] font-medium">
            {t("loading")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs text-[#B8936D] uppercase tracking-wider mb-3 font-semibold">
            {lang === "ru"
              ? "КАК МЫ РАБОТАЕМ"
              : lang === "uz"
              ? "BIZ QANDAY ISHLAYMIZ"
              : "HOW WE WORK"}
          </p>
          <h2 className="text-3xl font-bold text-[#3D3D3D]">
            {lang === "ru"
              ? "Берем проект полностью на себя- от идеи до стабильной работы системы"
              : lang === "uz"
              ? "Loyihani to'liq o'zimizga olamiz - g'oyadan tizimning barqaror ishlashigacha"
              : "We take the project completely on ourselves - from idea to stable system operation"}
          </h2>
        </div>
      </div>

      {/* Steps - Zebra Pattern */}
      <div className="space-y-0">
        {steps.map((step, index) => (
          <div
            key={step._id}
            className={`py-12 ${
              index % 2 === 0 ? "bg-[#D7C1AF]" : "bg-[#ECDFD2"
            }`}
          >
            <div
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center max-w-[1400px] mx-auto px-4`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  {step.image ? (
                    <img
                      src={getImageSrc(step.image)}
                      alt={step.title?.[lang] || step.title?.ru || ""}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-400">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-bold text-[#3D3D3D] mb-4">
                  {step.title?.[lang] || step.title?.ru || ""}
                </h3>
                <div className="space-y-2">
                  {step.description?.[lang]?.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className="text-sm text-[#666666] leading-relaxed"
                    >
                      {line}
                    </p>
                  )) || (
                    <p className="text-sm text-[#666666] leading-relaxed">
                      {step.description?.ru || ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;
