import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [contacts, setContacts] = useState(null);
  const [currentLang, setCurrentLang] = useState("ru");
  const location = useLocation();
  const dropdownRef = useRef(null);

  const languages = [
    { code: "ru", name: "Ru", flag: "/icons/ru.svg" },
    { code: "uz", name: "Uz", flag: "/icons/uz.svg" },
    { code: "en", name: "En", flag: "/icons/en.svg" },
  ];

  // Initialize language
  useEffect(() => {
    const stored = localStorage.getItem("i18nextLng");
    const browserLang = i18n.language;
    const langToUse = (stored || browserLang || "ru")
      .split("-")[0]
      .toLowerCase();
    setCurrentLang(langToUse);
  }, [i18n.language]);

  const currentLanguage =
    languages.find((l) => l.code === currentLang) || languages[0];

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  // Language change function - FIXED
  const selectLanguage = (code) => {
    console.log("Selected language:", code);
    setCurrentLang(code);
    localStorage.setItem("i18nextLng", code);
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsLangOpen((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  const links = [
    {
      name:
        currentLang === "ru"
          ? "Главная"
          : currentLang === "uz"
          ? "Bosh sahifa"
          : "Home",
      path: "/",
    },
    {
      name:
        currentLang === "ru"
          ? "Услуги"
          : currentLang === "uz"
          ? "Xizmatlar"
          : "Services",
      path: "/services",
    },
    {
      name:
        currentLang === "ru"
          ? "Кейсы"
          : currentLang === "uz"
          ? "Keyslar"
          : "Cases",
      path: "/projects",
    },
    {
      name:
        currentLang === "ru"
          ? "О компании"
          : currentLang === "uz"
          ? "Kompaniya haqida"
          : "About",
      path: "/about",
    },
    {
      name:
        currentLang === "ru"
          ? "Товары"
          : currentLang === "uz"
          ? "Mahsulotlar"
          : "Products",
      path: "/products",
    },
    {
      name:
        currentLang === "ru"
          ? "Контакты"
          : currentLang === "uz"
          ? "Aloqa"
          : "Contacts",
      path: "/contacts",
    },
  ];

  return (
    <nav className="bg-[#E8DDD0] sticky top-0 z-50">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "1400px" }}
      >
        {/* Main Row */}
        <div className="flex items-center justify-between py-3 lg:py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Music shop.uz"
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full object-cover"
            />
            <span className="text-[16px] sm:text-[18px] font-semibold text-[#2D3748] hidden sm:block">
              Music shop.uz
            </span>
          </Link>

          {/* Contact Info + Language - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${contacts?.phones?.[0] || "+998 90 998 28 00"}`}
              className="text-[16px] text-[#2D3748] font-bold hover:text-[#D4A574] transition-colors"
            >
              {contacts?.phones?.[0] || "+998 90 998 28 00"}
            </a>
            <a
              href={`mailto:${contacts?.email || "Supersite.uz@gmail.com"}`}
              className="text-[15px] text-[#718096] hover:text-[#D4A574] transition-colors"
            >
              {contacts?.email || "Supersite.uz@gmail.com"}
            </a>

            {/* Custom Language Selector - Desktop */}
            <div ref={dropdownRef} className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-[8px] cursor-pointer select-none border border-gray-100"
                style={{ boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)" }}
              >
                <img
                  src={currentLanguage.flag}
                  alt={currentLanguage.name}
                  className="w-5 h-3.5 object-cover rounded-[2px]"
                />
                <span className="text-[14px] font-bold text-[#2D3748]">
                  {currentLanguage.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#2D3748] transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Dropdown Menu */}
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden min-w-[100px] z-[9999]">
                  {languages.map((language) => (
                    <div
                      key={language.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        selectLanguage(language.code);
                      }}
                      className={`flex items-center gap-2 px-4 py-2.5 cursor-pointer hover:bg-gray-100 transition-colors ${
                        currentLang === language.code ? "bg-gray-50" : ""
                      }`}
                    >
                      <img
                        src={language.flag}
                        alt={language.name}
                        className="w-5 h-3.5 object-cover rounded-[2px]"
                      />
                      <span className="text-[14px] font-bold text-[#2D3748]">
                        {language.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#2D3748] hover:bg-[#D4C4B5] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Navigation Links Row - Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-[10px] pb-5">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`h-[40px] px-[24px] xl:px-[32px] rounded-[12px] text-[14px] xl:text-[16px] font-medium transition-all flex items-center justify-center whitespace-nowrap ${
                isActive(link.path)
                  ? "bg-white text-[#2E2E2E]"
                  : "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E] border border-[#F3F7FA]"
              }`}
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/calculate-project"
            className={`h-[40px] px-[24px] xl:px-[32px] rounded-[12px] text-[14px] xl:text-[16px] font-medium transition-all flex items-center justify-center whitespace-nowrap ${
              isActive("/calculate-project")
                ? "bg-white text-[#2E2E2E]"
                : "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E] border border-[#F3F7FA]"
            }`}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            {currentLang === "ru"
              ? "Рассчитать проект"
              : currentLang === "uz"
              ? "Loyihani hisoblash"
              : "Calculate project"}
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[700px] opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          {/* Contact Info - Mobile */}
          <div className="flex flex-col gap-2 pb-4 border-b border-[#D4C4B5]">
            <a
              href={`tel:${contacts?.phones?.[0] || "+998 90 998 28 00"}`}
              className="text-[16px] text-[#2D3748] font-bold"
            >
              {contacts?.phones?.[0] || "+998 90 998 28 00"}
            </a>
            <a
              href={`mailto:${contacts?.email || "Supersite.uz@gmail.com"}`}
              className="text-[14px] text-[#718096]"
            >
              {contacts?.email || "Supersite.uz@gmail.com"}
            </a>
          </div>

          {/* Navigation Links - Mobile */}
          <div className="space-y-2 py-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-white text-[#2E2E2E] shadow-sm"
                    : "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E]"
                }`}
                style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)" }}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/calculate-project"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-[15px] font-medium text-center transition-colors ${
                isActive("/calculate-project")
                  ? "bg-white text-[#2E2E2E] shadow-sm"
                  : "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E]"
              }`}
              style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)" }}
            >
              {currentLang === "ru"
                ? "Рассчитать проект"
                : currentLang === "uz"
                ? "Loyihani hisoblash"
                : "Calculate project"}
            </Link>
          </div>

          {/* Language Selector - Mobile (3 buttons) */}
          <div className="pt-4 border-t border-[#D4C4B5]">
            <div className="flex gap-2">
              {languages.map((language) => (
                <div
                  key={language.code}
                  onClick={() => selectLanguage(language.code)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg cursor-pointer transition-colors ${
                    currentLang === language.code
                      ? "bg-white shadow-sm"
                      : "bg-[#D4C4B5] hover:bg-[#C4B4A5]"
                  }`}
                >
                  <img
                    src={language.flag}
                    alt={language.name}
                    className="w-5 h-3.5 object-cover rounded-sm"
                  />
                  <span className="text-[14px] font-medium text-[#2D3748]">
                    {language.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
