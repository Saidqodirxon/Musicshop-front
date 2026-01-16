import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import FAQ from "../../components/home/FAQ";
import { getReviews, submitApplication } from "../../services/api";
import { Star } from "lucide-react";

function CalculateProjectPage() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    objectType: "",
    area: "",
    height: "",
    otherArea: "",
    equipment: [],
    name: "",
    phone: "",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const objectTypes = [
    { key: "conference", label: t("pages.calculate.object_types.conference") },
    { key: "classroom", label: t("pages.calculate.object_types.classroom") },
    { key: "meeting", label: t("pages.calculate.object_types.meeting") },
    { key: "government", label: t("pages.calculate.object_types.government") },
    { key: "concert", label: t("pages.calculate.object_types.concert") },
    { key: "other", label: t("pages.calculate.object_types.other") },
  ];

  const equipmentTypes = [
    { key: "audio", label: t("pages.calculate.equipment_types.audio") },
    { key: "video", label: t("pages.calculate.equipment_types.video") },
    {
      key: "microphones",
      label: t("pages.calculate.equipment_types.microphones"),
    },
    { key: "control", label: t("pages.calculate.equipment_types.control") },
    {
      key: "conference",
      label: t("pages.calculate.equipment_types.conference"),
    },
    { key: "other", label: t("pages.calculate.equipment_types.other") },
  ];

  const toggleEquipment = (equipmentLabel) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.includes(equipmentLabel)
        ? prev.equipment.filter((e) => e !== equipmentLabel)
        : [...prev.equipment, equipmentLabel],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = `
        Тип объекта: ${formData.objectType}
        Площадь: ${formData.area} м2
        Высота: ${formData.height} (опц)
        Доп. площадь: ${formData.otherArea}
        Оборудование: ${formData.equipment.join(", ")}
      `;
      await submitApplication({
        name: formData.name,
        phone: formData.phone,
        message: message,
        type: "calculate_project",
      });
      alert(t("pages.calculate.success_message"));
      setFormData({
        objectType: "",
        area: "",
        height: "",
        otherArea: "",
        equipment: [],
        name: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error submitting calculation:", error);
    }
  };

  return (
    <div className="bg-[#EDD9CD] min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-20 max-w-7xl">
        {/* CALCULATOR CARD */}
        <div className="bg-[#D7C1AF] rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-8 lg:p-16 shadow-xl mb-12 sm:mb-16 md:mb-20 lg:mb-32">
          {/* 1. Object Type */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-6 sm:mb-8">
              {t("pages.calculate.object_type_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {objectTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() =>
                    setFormData({ ...formData, objectType: type.label })
                  }
                  className={`py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all text-center border-2 touch-manipulation active:scale-95 ${
                    formData.objectType === type.label
                      ? "bg-[#8F4E24] text-white border-[#8F4E24]"
                      : "bg-white text-[#8F4E24] border-transparent hover:border-[#8F4E24]"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Room Parameters */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-6 sm:mb-8">
              {t("pages.calculate.contact_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder={t("pages.calculate.area_title")}
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base outline-none text-[#1A1A1A]"
              />
              <input
                type="text"
                placeholder={t("pages.calculate.height_title")}
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base outline-none text-[#1A1A1A]"
              />
              <input
                type="text"
                placeholder={t("pages.calculate.other_area_title")}
                value={formData.otherArea}
                onChange={(e) =>
                  setFormData({ ...formData, otherArea: e.target.value })
                }
                className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base outline-none text-[#1A1A1A]"
              />
            </div>
          </div>

          {/* 3. Equipment Selection */}
          <div className="mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-6 sm:mb-8">
              {t("pages.calculate.equipment_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {equipmentTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => toggleEquipment(type.label)}
                  className={`py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all text-center border-2 touch-manipulation active:scale-95 ${
                    formData.equipment.includes(type.label)
                      ? "bg-[#8F4E24] text-white border-[#8F4E24]"
                      : "bg-white text-[#8F4E24] border-transparent hover:border-[#8F4E24]"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Final Contact Step */}
          <div className="text-center md:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
              {t("pages.calculate.contact_title")}
            </h2>
            <p className="text-sm sm:text-base text-[#5C5C5C] mb-6 sm:mb-8 md:mb-10">
              Мы свяжемся с вами и подготовим предварительный расчет проекта
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <input
                  type="text"
                  placeholder={t("pages.calculate.name_placeholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base outline-none text-[#1A1A1A]"
                />
                <input
                  type="tel"
                  placeholder={t("pages.calculate.phone_placeholder")}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-sm sm:text-base outline-none text-[#1A1A1A]"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto sm:min-w-[400px] md:min-w-[550px] bg-[#8F4E24] hover:bg-[#7a411e] text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-xl hover:scale-[1.02] touch-manipulation active:scale-95"
                >
                  {t("pages.calculate.calculate_button")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <section className="mb-12 sm:mb-16 md:mb-20 lg:mb-32">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8F4E24] mb-2 sm:mb-3 font-bold">
              ОТЗЫВЫ
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight">
              {t("pages.calculate.reviews_title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {(reviews.length > 0 ? reviews : [1, 2, 3]).map((review, idx) => (
              <div
                key={review._id || idx}
                className="bg-white rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-5 sm:p-6 md:p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow flex flex-col border border-[#D7C1AF]/30"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  {review.image && (
                    <img
                      src={review.image}
                      alt={review.clientName}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1A1A1A]">
                      {review.clientName || "Корпоративный клиент"}
                    </h3>
                    {review.company && (
                      <p className="text-[10px] sm:text-xs text-[#5C5C5C] font-semibold uppercase tracking-wider">
                        {review.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stars - Yellow/Golden as per design */}
                <div className="flex gap-1 mb-4 sm:mb-5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={
                        s <= (review.rating || 5)
                          ? "fill-[#FFD700] text-[#FFD700] sm:w-[18px] sm:h-[18px]"
                          : "text-gray-200 sm:w-[18px] sm:h-[18px]"
                      }
                    />
                  ))}
                </div>

                <p className="text-[#5C5C5C] text-xs sm:text-sm lg:text-base leading-relaxed flex-grow">
                  {review.text ||
                    "Обратились в Musicshop.uz для подбора и поставки аудиооборудования. Получили грамотную консультацию и надёжное решение под наши задачи."}
                </p>
              </div>
            ))}
          </div>
        </section>

        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default CalculateProjectPage;
