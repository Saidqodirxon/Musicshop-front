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
      // normalize phone to +998XXXXXXXXX before sending
      const digits = (formData.phone || "").replace(/\D/g, "");
      const local = digits.startsWith("998") ? digits.slice(3) : digits;
      const normalizedPhone = `+998${local}`;

      await submitApplication({
        ...formData,
        phone: normalizedPhone,
        type: "consultation",
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

  // format phone to +998 XX XXX XX XX while typing
  const formatPhoneForDisplay = (value) => {
    const digits = value.replace(/\D/g, "");
    let local = digits;
    if (local.startsWith("998")) local = local.slice(3);
    if (local.startsWith("0")) local = local.slice(1);
    local = local.slice(0, 9); // max 9 local digits

    const parts = [];
    if (local.length > 0) parts.push(local.slice(0, Math.min(2, local.length)));
    if (local.length > 2) parts.push(local.slice(2, Math.min(5, local.length)));
    if (local.length > 5) parts.push(local.slice(5, Math.min(7, local.length)));
    if (local.length > 7) parts.push(local.slice(7, 9));

    return parts.length ? `+998 ${parts.join(" ")}` : "+998 ";
  };

  return (
    <section className="py-12 sm:py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div
          data-aos="fade-up"
          className="bg-[#D7C1AF] rounded-lg sm:rounded-xl lg:rounded-2xl p-6 sm:p-8 lg:p-10"
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#8B5A3C] mb-6 sm:mb-8 leading-tight">
            {lang === "ru"
              ? "Рассчитаем решение под ваш объект"
              : lang === "uz"
                ? "Sizning ob'ektingiz uchun yechimni hisoblaymiz"
                : "We'll calculate a solution for your facility"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
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
              className="w-full sm:w-[33%] h-12 sm:h-16 lg:h-[85px] rounded-lg bg-white text-[#333333] px-4 text-left sm:text-center placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#B8936D] transition-all text-base sm:text-lg lg:text-[20px] touch-manipulation"
            />
            <input
              type="tel"
              placeholder="+998 XX XXX XX XX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: formatPhoneForDisplay(e.target.value),
                })
              }
              required
              className="w-full sm:w-[33%] h-12 sm:h-16 lg:h-[85px] rounded-lg bg-white text-[#333333] px-4 text-left sm:text-center placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#B8936D] transition-all text-base sm:text-lg lg:text-[20px] touch-manipulation"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-[33%] h-12 sm:h-16 lg:h-[85px] bg-gradient-to-l to-[#B97D55] from-[#8F491A] hover:shadow-lg text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg lg:text-[20px] active:scale-95 touch-manipulation"
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
