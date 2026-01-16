import { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name || "No name",
        phone: formData.phone, // <-- aynan 'phone' bo'lishi kerak
      };
      await axios.post("https://back.fasadmaster.uz/contacts", payload);
      toast.success(t("contacts.success"));
      setSubmitted(true);
      setFormData({ name: "", phone: "" });
    } catch (err) {
      console.error("Xatolik:", err);
      toast.error(t("contacts.error"));
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <h2 className="text-[#71914B] text-2xl font-bold mb-4">
            {t("contact_form.short_about")}
          </h2>
          <p className="text-gray-700 text-sm leading-7">
            {t("contact_form.company_description")}
          </p>
        </div>

        <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-800 text-lg font-medium mb-4">
            {t("contact_form.form_heading")}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder={t("contact_form.name")}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded"
            />
            <PhoneInput
              country={"uz"}
              value={formData.phone}
              onChange={handlePhoneChange}
              inputClass="!w-full !h-12 !pl-14 !pr-4 !border !border-gray-300 !rounded focus:!outline-none"
              containerClass="!w-full"
              buttonClass="!bg-white !border-r !border-gray-300 !rounded-l"
              specialLabel=""
              enableSearch
              placeholder={t("contact_form.phone")}
            />

            <button
              type="submit"
              className="w-full  bg-[#71914B] hover:bg-[#72914bb0] text-white font-bold py-3 rounded transition"
            >
              {t("contact_form.send")}
            </button>
            <p className="text-xs text-gray-500 text-center">
              {t("contact_form.privacy")}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
