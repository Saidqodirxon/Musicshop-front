import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitApplication } from "../../services/api";

const ContactForm = () => {
  const { t } = useTranslation();
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
      alert(t("contactForm.successMessage"));
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("contactForm.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div
          data-aos="fade-up"
          className="bg-white rounded-[2.5rem] p-8 lg:p-16 shadow-xl"
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8F4E24] mb-3 font-bold">
                {t("contactForm.title")}
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                {t("contactForm.subtitle")}
              </h2>
              <p className="text-base lg:text-lg text-[#5C5C5C]">
                {t("contactForm.description")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder={t("contactForm.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="px-6 lg:px-8 py-4 lg:py-5 rounded-2xl outline-none bg-[#F5EDE4] text-[#1A1A1A] placeholder:text-gray-500 text-base border-2 border-transparent focus:border-[#C08552] transition-all"
                />
                <input
                  type="tel"
                  placeholder={t("contactForm.phonePlaceholder")}
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
                placeholder={t("contactForm.emailPlaceholder")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-6 lg:px-8 py-4 lg:py-5 rounded-2xl outline-none bg-[#F5EDE4] text-[#1A1A1A] placeholder:text-gray-500 text-base border-2 border-transparent focus:border-[#C08552] transition-all"
              />

              <textarea
                placeholder={t("contactForm.messagePlaceholder")}
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
                  {loading
                    ? t("contactForm.sending")
                    : t("contactForm.sendButton")}
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
