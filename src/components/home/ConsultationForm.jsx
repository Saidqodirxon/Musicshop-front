import { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitApplication } from "../../services/api";

const ConsultationForm = () => {
  const { t } = useTranslation();
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
      alert(t("consultationForm.successMessage"));
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("consultationForm.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="bg-[#D7C1AF] rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-12">
          <div className="mx-auto">
            {/* Header */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2E2E2E] mb-2 sm:mb-3 leading-tight">
              {t("consultationForm.title")}
            </h2>
            <p className="text-sm sm:text-base text-[#616060] mb-6 sm:mb-8 max-w-lg">
              {t("consultationForm.description")}
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch"
            >
              <input
                type="text"
                placeholder={t("consultationForm.namePlaceholder")}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full sm:w-[33%] h-12 sm:h-16 lg:h-[85px] rounded-lg bg-white text-[#333333] px-4 text-left sm:text-center placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#B8936D] transition-all text-base sm:text-lg lg:text-[20px] touch-manipulation"
              />
              <input
                type="tel"
                placeholder={t("consultationForm.phonePlaceholder")}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full sm:w-[33%] h-12 sm:h-16 lg:h-[85px] rounded-lg bg-white text-[#333333] px-4 text-left sm:text-center placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#B8936D] transition-all text-base sm:text-lg lg:text-[20px] touch-manipulation"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-[33%] h-12 sm:h-16 lg:h-[85px] bg-gradient-to-l to-[#B97D55] from-[#8F491A] hover:shadow-lg text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg lg:text-[20px] active:scale-95 touch-manipulation"
              >
                {loading ? t("consultationForm.sending") : t("consultationForm.callButton")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
