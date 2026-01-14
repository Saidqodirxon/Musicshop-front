import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";

const Contacts = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: "", phone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://back.fasadmaster.uz/contacts", formData);
      toast.success(t("contacts.success"));
      setFormData({ name: "", phone: "" });
    } catch (error) {
      toast.error(t("contacts.error"));
    }
  };

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat py-20 px-4 text-white"
      style={{ backgroundImage: "url('/contacts.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Kontent */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold leading-relaxed">
            {t("contacts.title")}
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-xl space-y-4 text-white"
        >
          <p className="font-medium">{t("contacts.subtitle")}</p>
          <input
            type="text"
            name="name"
            placeholder={t("contacts.namePlaceholder")}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded bg-inherit"
          />
          <PhoneInput
            country={"uz"}
            value={formData.phone}
            onChange={handlePhoneChange}
            inputClass="!w-full !h-12 !pl-14 !pr-4 !border !border-gray-300 !rounded focus:!outline-none !bg-inherit"
            containerClass="!w-full"
            buttonClass="!bg-white !border-r !border-gray-300 !rounded-l !text-black"
            specialLabel=""
            enableSearch
            placeholder={t("contact_form.phone")}
          />
          <button
            type="submit"
            className="w-full  bg-[#71914B] hover:bg-[#72914bb0] text-white py-2 rounded transition"
          >
            {t("contacts.button")}
          </button>
          <p className="text-xs text-white mt-2">{t("contacts.privacy")}</p>
        </form>
      </div>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default Contacts;
