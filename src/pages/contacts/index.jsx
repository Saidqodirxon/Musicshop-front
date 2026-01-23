import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import { getContacts, submitApplication } from "../../services/api";
import {
  FaPhoneAlt,
  FaTelegramPlane,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const ContactsPage = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const formatPhoneForDisplay = (value) => {
    const digits = value.replace(/\D/g, "");
    let local = digits;
    if (local.startsWith("998")) local = local.slice(3);
    if (local.startsWith("0")) local = local.slice(1);
    local = local.slice(0, 9);

    const parts = [];
    if (local.length > 0) parts.push(local.slice(0, Math.min(2, local.length)));
    if (local.length > 2) parts.push(local.slice(2, Math.min(5, local.length)));
    if (local.length > 5) parts.push(local.slice(5, Math.min(7, local.length)));
    if (local.length > 7) parts.push(local.slice(7, 9));

    return parts.length ? `+998 ${parts.join(" ")}` : "+998 ";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData({ ...formData, phone: formatPhoneForDisplay(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e, type = "feedback") => {
    if (e) e.preventDefault();
    try {
      const digits = (formData.phone || "").replace(/\D/g, "");
      const local = digits.startsWith("998") ? digits.slice(3) : digits;
      const normalizedPhone = `+998${local}`;

      await submitApplication({ ...formData, phone: normalizedPhone, type });
      alert(t("pages.contacts.success_message"));
      setFormData({ name: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#EDD9CD] pt-[64px] sm:pt-[120px]">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-8 sm:py-12 lg:py-20">
        {/* TOP CONTACT INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24">
          {/* Address */}
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4">
              <FaMapMarkerAlt className="w-6 h-6 sm:w-8 sm:h-8 text-[#A16D40]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#A16D40] mb-2 uppercase tracking-wide">
              {t("pages.contacts.address")}
            </h3>
            <p className="text-gray-700 max-w-[200px]">
              {contacts?.address ||
                "Узбекистан, г. Ташкент, Чиланзарский р-н дублер 18А"}
            </p>
          </div>

          {/* E-mail */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4">
              <FaEnvelope className="w-6 h-6 sm:w-8 sm:h-8 text-[#A16D40]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#A16D40] mb-2 uppercase tracking-wide">
              {t("pages.contacts.email")}
            </h3>
            <p className="text-gray-700">
              {contacts?.email || "Supersite.uz@gmail.com"}
            </p>
          </div>

          {/* Телефон */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4">
              <FaPhoneAlt className="w-6 h-6 sm:w-8 sm:h-8 text-[#A16D40]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#A16D40] mb-2 uppercase tracking-wide">
              {t("pages.contacts.phone")}
            </h3>
            <p className="text-lg sm:text-xl font-bold text-gray-800">
              {contacts?.phone || "+998909982800"}
            </p>
          </div>

          {/* Время */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4">
              <FaClock className="w-6 h-6 sm:w-8 sm:h-8 text-[#A16D40]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#A16D40] mb-2 uppercase tracking-wide">
              {t("pages.contacts.work_time")}
            </h3>
            <p className="text-gray-700">
              {contacts?.workingHours || "9.00 19.00 Пн-Вс"}
            </p>
          </div>
        </div>

        {/* COMBINED CONTACT CARD */}
        <div className="bg-[#D7C1AF] rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 lg:p-12 shadow-xl flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left: Feedback Form */}
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-6 sm:mb-8">
              {t("pages.contacts.contact_form_title")}
            </h2>

            <form className="space-y-4 sm:space-y-6">
              {/* Row 1: Name, Phone, and Order Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("pages.contacts.name_placeholder")}
                  className="flex-1 bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none text-[#1A1A1A] placeholder:text-gray-400"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+998 XX XXX XX XX"
                  className="flex-1 bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base outline-none text-[#1A1A1A] placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "call_order")}
                  className="bg-[#8F4E24] hover:bg-[#7a411e] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all whitespace-nowrap touch-manipulation active:scale-95"
                >
                  {t("pages.contacts.send_button")}
                </button>
              </div>

              {/* Row 2: Textarea */}
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t("pages.contacts.message_placeholder")}
                  className="w-full bg-white rounded-lg sm:rounded-xl px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base outline-none text-[#1A1A1A] placeholder:text-gray-400 resize-none"
                />
              </div>

              {/* Footer: Socials and Send Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex items-center gap-6 sm:gap-8">
                  <a
                    href="#"
                    className="text-[#1A1A1A] hover:text-[#8F4E24] transition-colors touch-manipulation active:scale-95"
                  >
                    <FaTelegramPlane className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>
                  <a
                    href="#"
                    className="text-[#1A1A1A] hover:text-[#8F4E24] transition-colors touch-manipulation active:scale-95"
                  >
                    <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>
                  <a
                    href="#"
                    className="text-[#1A1A1A] hover:text-[#8F4E24] transition-colors touch-manipulation active:scale-95"
                  >
                    <FaFacebookF className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>
                  <a
                    href="#"
                    className="text-[#1A1A1A] hover:text-[#8F4E24] transition-colors touch-manipulation active:scale-95"
                  >
                    <FaYoutube className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "feedback")}
                  className="bg-[#5C5C5C] hover:bg-[#4d4d4d] text-white w-full sm:w-64 py-3 sm:py-4 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold transition-all shadow-lg touch-manipulation active:scale-95"
                >
                  {t("pages.contacts.send_button")}
                </button>
              </div>
            </form>
          </div>

          {/* Right: Map */}
          <div className="lg:w-1/2 h-[400px] sm:h-[450px] md:h-[500px] lg:min-h-full">
            <div className="w-full h-full rounded-xl sm:rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-inner bg-gray-200">
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                }}
              >
                <a
                  href="https://yandex.uz/maps/org/220628754996/?utm_medium=mapframe&utm_source=maps"
                  style={{
                    color: "#eee",
                    fontSize: "12px",
                    position: "absolute",
                    top: "0px",
                  }}
                >
                  Musicshop.Uz
                </a>
                <a
                  href="https://yandex.uz/maps/10335/tashkent/category/music_store/184105910/?utm_medium=mapframe&utm_source=maps"
                  style={{
                    color: "#eee",
                    fontSize: "12px",
                    position: "absolute",
                    top: "14px",
                  }}
                >
                  Musiqa do‘koni Toshkentda
                </a>
                <iframe
                  src="https://yandex.uz/map-widget/v1/org/220628754996/?ll=69.203826%2C41.273450&z=18"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  style={{ position: "relative", border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactsPage;
