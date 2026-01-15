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
      <div className="mx-auto px-8 py-16" style={{ maxWidth: "1400px" }}>
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Music Shop"
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <span className="text-[18px] font-semibold text-[#2D3748]">
                Music shop.uz
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-shrink-0">
            <h3 className="text-[16px] font-semibold text-[#2D3748] mb-5">
              {lang === "ru"
                ? "Главная"
                : lang === "uz"
                ? "Bosh sahifa"
                : "Home"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
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
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
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
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
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
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
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
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
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
            <h3 className="text-[16px] font-semibold text-[#2D3748] mb-5">
              {lang === "ru"
                ? "Контакты"
                : lang === "uz"
                ? "Kontaktlar"
                : "Contacts"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="w-[18px] h-[18px] text-[#4A5568]" />
                <a
                  href={`tel:${contacts?.phones?.[0] || "+998 90 998 28 00"}`}
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
                >
                  {contacts?.phones?.[0] || "+998 90 998 28 00"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Send className="w-[18px] h-[18px] text-[#4A5568]" />
                <a
                  href="#"
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
                >
                  musicshop_uzb
                </a>
              </li>
              <li className="pl-[30px]">
                <a
                  href={`mailto:${contacts?.email || "musicshop@gmail.uz"}`}
                  className="text-[15px] text-[#4A5568] hover:text-[#2D3748] transition-colors"
                >
                  {contacts?.email || "musicshop@gmail.uz"}
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="flex-shrink-0 max-w-[220px]">
            <h3 className="text-[16px] font-semibold text-[#2D3748] mb-5">
              {lang === "ru" ? "Адрес" : lang === "uz" ? "Manzil" : "Address"}
            </h3>
            <p className="text-[15px] text-[#4A5568] leading-[1.7]">
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
        <div className="border-t border-[#D4C4B5] pt-8">
          <p className="text-[14px] text-[#718096] text-right">
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
