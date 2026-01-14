import { useState } from "react";
import { submitApplication } from "../../services/api";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitApplication({
        ...formData,
        type: "contact",
      });
      alert("Сообщение успешно отправлено! Мы ответим вам в ближайшее время.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Ошибка при отправке сообщения. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="bg-white rounded-[2.5rem] p-8 lg:p-16 shadow-xl">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8F4E24] mb-3 font-bold">
                СВЯЖИТЕСЬ С НАМИ
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                Есть вопросы? Напишите нам
              </h2>
              <p className="text-base lg:text-lg text-[#5C5C5C]">
                Заполните форму и мы ответим вам в течение 24 часов
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="px-6 lg:px-8 py-4 lg:py-5 rounded-2xl outline-none bg-[#F5EDE4] text-[#1A1A1A] placeholder:text-gray-500 text-base border-2 border-transparent focus:border-[#C08552] transition-all"
                />
                <input
                  type="tel"
                  placeholder="Телефон *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="px-6 lg:px-8 py-4 lg:py-5 rounded-2xl outline-none bg-[#F5EDE4] text-[#1A1A1A] placeholder:text-gray-500 text-base border-2 border-transparent focus:border-[#C08552] transition-all"
                />
              </div>

              <input
                type="email"
                placeholder="Email (необязательно)"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl outline-none bg-[#F5EDE4] text-[#1A1A1A] placeholder:text-gray-500 text-base border-2 border-transparent focus:border-[#C08552] transition-all"
              />

              <textarea
                placeholder="Ваше сообщение *"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={6}
                className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl outline-none bg-[#F5EDE4] text-[#1A1A1A] placeholder:text-gray-500 text-base resize-none border-2 border-transparent focus:border-[#C08552] transition-all"
              />

              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 lg:px-16 py-4 lg:py-5 bg-[#8F4E24] hover:bg-[#7a411e] disabled:bg-gray-400 text-white font-bold text-base lg:text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg disabled:cursor-not-allowed"
                >
                  {loading ? "Отправка..." : "Отправить сообщение"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
