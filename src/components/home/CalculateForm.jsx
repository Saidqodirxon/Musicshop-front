import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitApplication } from "../../services/api";

const CalculateForm = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitApplication({
        ...formData,
        type: "calculation",
      });
      alert(
        lang === "ru"
          ? "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
          : lang === "uz"
          ? "Ariza muvaffaqiyatli yuborildi! Biz tez orada siz bilan bog'lanamiz."
          : "Application sent successfully! We will contact you soon."
      );
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        lang === "ru"
          ? "Ошибка при отправке заявки. Попробуйте еще раз."
          : lang === "uz"
          ? "Arizani yuborishda xatolik. Qayta urinib ko'ring."
          : "Error sending application. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="bg-[#D7C1AF] rounded-2xl p-10">
          <h2 className="text-2xl font-bold text-[#8B5A3C] mb-8">
            {lang === "ru"
              ? "Рассчитаем решение под ваш объект"
              : lang === "uz"
              ? "Sizning ob'ektingiz uchun yechimni hisoblaymiz"
              : "We'll calculate a solution for your facility"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="text"
              placeholder={
                lang === "ru"
                  ? "Введите имя"
                  : lang === "uz"
                  ? "Ismingizni kiriting"
                  : "Enter your name"
              }
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-[33%] h-[85px] rounded-lg bg-white text-[#333333] text-center placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#B8936D] transition-all text-[20px]"
            />
            <input
              type="tel"
              placeholder="+998 (00) 000-00-00"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              className="w-[33%] h-[85px] rounded-lg bg-white text-[#333333] text-center placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#B8936D] transition-all text-[20px]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-[33%] h-[85px] bg-gradient-to-l to-[#B97D55] from-[#8F491A] text-white font-semibold rounded-lg transition-all disabled:cursor-not-allowed text-[20px]"
            >
              {loading
                ? lang === "ru"
                  ? "Отправка..."
                  : lang === "uz"
                  ? "Yuborilmoqda..."
                  : "Sending..."
                : lang === "ru"
                ? "Получить расчет"
                : lang === "uz"
                ? "Hisob-kitob olish"
                : "Get calculation"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CalculateForm;
