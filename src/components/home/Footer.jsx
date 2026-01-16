import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Phone, Send } from "lucide-react";

const Footer = () => {
  const { i18n } = useTranslation();
  const [contacts, setContacts] = useState(null);
  const lang = i18n.language;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/contacts`
        );
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  return (
    <footer className="bg-[#D0B298]">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16"
        style={{ maxWidth: "1400px" }}
      >
        <div className="flex flex-col md:flex-row justify-between gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 lg:mb-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <img
                src="/logo.png"
                alt="Music Shop"
                className="w-10 h-10 sm:w-[50px] sm:h-[50px] rounded-full object-cover"
              />
              <span className="text-[16px] sm:text-[18px] font-semibold text-[#2D3748]">
                Music shop.uz
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-shrink-0">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#2D3748] mb-4 sm:mb-5">
              {lang === "ru"
                ? "Главная"
                : lang === "uz"
                ? "Bosh sahifa"
                : "Home"}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                >
                  {lang === "ru"
                    ? "Каталог"
                    : lang === "uz"
                    ? "Katalog"
                    : "Catalog"}
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                >
                  {lang === "ru"
                    ? "Проекты"
                    : lang === "uz"
                    ? "Loyihalar"
                    : "Projects"}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                >
                  {lang === "ru"
                    ? "Услуги"
                    : lang === "uz"
                    ? "Xizmatlar"
                    : "Services"}
                </Link>
              </li>
              <li>
                <Link
                  to="/products?category=piano"
                  className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                >
                  {lang === "ru"
                    ? "Пианино"
                    : lang === "uz"
                    ? "Pianino"
                    : "Piano"}
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                >
                  {lang === "ru"
                    ? "Новости"
                    : lang === "uz"
                    ? "Yangiliklar"
                    : "News"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="flex-shrink-0">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#2D3748] mb-4 sm:mb-5">
              {lang === "ru"
                ? "Контакты"
                : lang === "uz"
                ? "Kontaktlar"
                : "Contacts"}
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {contacts?.phones && contacts.phones.length > 0 ? (
                contacts.phones.slice(0, 3).map((phone, index) => (
                  <li key={index} className="flex items-center gap-2 sm:gap-3">
                    <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#4A5568] flex-shrink-0" />
                    <a
                      href={`tel:${phone.replace(/[\s()\-]/g, "")}`}
                      className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                    >
                      {phone}
                    </a>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2 sm:gap-3">
                  <Phone className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#4A5568] flex-shrink-0" />
                  <a
                    href="tel:+998909982800"
                    className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                  >
                    +998 90 998 28 00
                  </a>
                </li>
              )}
              {contacts?.telegram && (
                <li className="flex items-center gap-2 sm:gap-3">
                  <Send className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#4A5568] flex-shrink-0" />
                  <a
                    href={
                      contacts.telegram.startsWith("http")
                        ? contacts.telegram
                        : `https://t.me/${contacts.telegram.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                  >
                    {contacts.telegram}
                  </a>
                </li>
              )}
              {contacts?.email && (
                <li className="pl-6 sm:pl-[30px]">
                  <a
                    href={`mailto:${contacts.email}`}
                    className="text-[14px] sm:text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors touch-manipulation"
                  >
                    {contacts.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Address */}
          <div className="flex-shrink-0 max-w-full md:max-w-[220px]">
            <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#2D3748] mb-4 sm:mb-5">
              {lang === "ru" ? "Адрес" : lang === "uz" ? "Manzil" : "Address"}
            </h3>
            <p className="text-[14px] sm:text-[15px] text-[#4A5568] leading-[1.7]">
              {contacts?.address?.[lang] ||
                contacts?.address?.ru ||
                (lang === "ru"
                  ? "г. Ташкент, проспект Бунёдкор (дублёр), дом 18А"
                  : lang === "uz"
                  ? "Toshkent sh., Bunyodkor prospekti (dubler), 18A uy"
                  : "Tashkent, Bunyodkor Avenue (doubler), house 18A")}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4C4B5] pt-6 sm:pt-8">
          <p className="text-[13px] sm:text-[14px] text-[#718096] text-center sm:text-right">
            Music_shop @ 2025.{" "}
            {lang === "ru"
              ? "Все права защищены."
              : lang === "uz"
              ? "Barcha huquqlar himoyalangan."
              : "All rights reserved."}{" "}
            |{" "}
            {lang === "ru"
              ? "Разработано в"
              : lang === "uz"
              ? "Ishlab chiqildi"
              : "Developed by"}{" "}
            <a
              href="https://supersite.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2D3748] hover:underline"
            >
              Supersite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
