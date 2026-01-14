import { useState } from "react";
import { submitApplication } from "../../services/api";

const ConsultationForm = () => {
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
        type: "consultation",
      });
      alert("Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.");
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ошибка при отправке заявки. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-[#E5D5C3] rounded-3xl p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Header */}
            <p className="text-xs uppercase tracking-widest text-[#8B4513] mb-3 font-bold">
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#1A1A1A] mb-3 leading-tight">
              Оставьте заявку и получите бесплатную консультацию
            </h2>
            <p className="text-base text-[#5C5C5C] mb-10">
              Наши специалисты свяжутся с вами в течение 15 минут
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="text"
                placeholder="Введите имя"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full sm:w-64 px-6 py-3.5 rounded-xl outline-none bg-white text-[#1A1A1A] placeholder:text-gray-400 text-[15px] border border-transparent focus:border-[#FFB380] transition-all"
              />
              <input
                type="tel"
                placeholder="+998 (00) 000-00-00"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full sm:w-64 px-6 py-3.5 rounded-xl outline-none bg-white text-[#1A1A1A] placeholder:text-gray-400 text-[15px] border border-transparent focus:border-[#FFB380] transition-all"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FFB380] hover:bg-[#FF9F66] disabled:bg-gray-400 text-[#5C4033] font-bold text-[15px] rounded-xl transition-all shadow-md disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? "Отправка..." : "Получить консультацию"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
