import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaPhone,
  FaTelegramPlane,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getContacts } from "../../services/api";

const Footer = () => {
  const [contacts, setContacts] = useState(null);
  const [language, setLanguage] = useState(
    localStorage.getItem("language")?.toUpperCase() || "RU"
  );

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const navLinks = [
    {
      name:
        language === "RU"
          ? "Главная"
          : language === "UZ"
          ? "Bosh sahifa"
          : "Home",
      path: "/",
    },
    {
      name:
        language === "RU"
          ? "Каталог"
          : language === "UZ"
          ? "Katalog"
          : "Catalog",
      path: "/products",
    },
    {
      name:
        language === "RU"
          ? "Проекты"
          : language === "UZ"
          ? "Loyihalar"
          : "Projects",
      path: "/cases",
    },
    {
      name:
        language === "RU"
          ? "Услуги"
          : language === "UZ"
          ? "Xizmatlar"
          : "Services",
      path: "/services",
    },
    {
      name:
        language === "RU"
          ? "О компании"
          : language === "UZ"
          ? "Kompaniya haqida"
          : "About",
      path: "/about",
    },
    {
      name:
        language === "RU"
          ? "Контакты"
          : language === "UZ"
          ? "Aloqa"
          : "Contacts",
      path: "/contacts",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                <img
                  src="/logo.png"
                  alt="Music shop.uz"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-white">
                Music shop.uz
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              {language === "RU"
                ? "Профессиональные AV-решения для бизнеса и организаций"
                : language === "UZ"
                ? "Biznes va tashkilotlar uchun professional AV yechimlari"
                : "Professional AV solutions for business and organizations"}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              <a
                href="https://t.me/musicshop_uzb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#C08552] rounded-full flex items-center justify-center transition-colors"
              >
                <FaTelegramPlane className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${contacts?.email || "musicshop@gmail.uz"}`}
                className="w-10 h-10 bg-white/10 hover:bg-[#C08552] rounded-full flex items-center justify-center transition-colors"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {language === "RU"
                ? "Навигация"
                : language === "UZ"
                ? "Navigatsiya"
                : "Navigation"}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-[#C08552] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {language === "RU"
                ? "Контакты"
                : language === "UZ"
                ? "Aloqa"
                : "Contacts"}
            </h4>
            <ul className="space-y-3">
              {contacts?.phones?.map((phone, index) => (
                <li key={index}>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-[#C08552] transition-colors"
                  >
                    <FaPhone className="w-4 h-4 text-[#C08552]" />
                    {phone}
                  </a>
                </li>
              )) || (
                <li>
                  <a
                    href="tel:+998909982800"
                    className="flex items-center gap-3 text-sm text-white/70 hover:text-[#C08552] transition-colors"
                  >
                    <FaPhone className="w-4 h-4 text-[#C08552]" />
                    +998 90 998 28 00
                  </a>
                </li>
              )}

              <li>
                <a
                  href="https://t.me/musicshop_uzb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#C08552] transition-colors"
                >
                  <FaTelegramPlane className="w-4 h-4 text-[#C08552]" />
                  @musicshop_uzb
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${contacts?.email || "musicshop@gmail.uz"}`}
                  className="flex items-center gap-3 text-sm text-white/70 hover:text-[#C08552] transition-colors"
                >
                  <FaEnvelope className="w-4 h-4 text-[#C08552]" />
                  {contacts?.email || "musicshop@gmail.uz"}
                </a>
              </li>
            </ul>
          </div>

          {/* Address & Working Hours */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">
              {language === "RU"
                ? "Адрес"
                : language === "UZ"
                ? "Manzil"
                : "Address"}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-4 h-4 text-[#C08552] mt-1 flex-shrink-0" />
                <p className="text-sm text-white/70 leading-relaxed">
                  {contacts?.address ||
                    (language === "RU"
                      ? "г. Ташкент, проспект Бунёдкор (дублёр), дом 18А"
                      : language === "UZ"
                      ? "Toshkent sh., Bunyodkor prospekti (dubler), 18A uy"
                      : "Tashkent, Bunyodkor Avenue (doubler), building 18A")}
                </p>
              </div>

              {contacts?.workingHours && (
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-white/10">
                  <svg
                    className="w-4 h-4 text-[#C08552] mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-white/50 mb-1">
                      {language === "RU"
                        ? "Режим работы"
                        : language === "UZ"
                        ? "Ish vaqti"
                        : "Working hours"}
                    </p>
                    <p className="text-sm text-white/70">
                      {contacts.workingHours}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>
              Music_shop © {new Date().getFullYear()}.{" "}
              {language === "RU"
                ? "Все права защищены"
                : language === "UZ"
                ? "Barcha huquqlar himoyalangan"
                : "All rights reserved"}
              .
            </p>
            <p>
              {language === "RU"
                ? "Разработано в"
                : language === "UZ"
                ? "Ishlab chiqilgan"
                : "Developed by"}{" "}
              <a
                href="https://supersite.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C08552] hover:text-[#FFD700] transition-colors font-medium"
              >
                Supersite
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
