import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [contacts, setContacts] = useState(null);
  const location = useLocation();

  // Get current language safely
  const getCurrentLang = useCallback(() => {
    const storedLang = localStorage.getItem("i18nextLng");
    const currentLang = i18n.language || storedLang || "ru";
    // Handle cases like "ru-RU" -> "ru"
    return currentLang.split("-")[0].toLowerCase();
  }, [i18n.language]);

  const [currentLang, setCurrentLang] = useState(getCurrentLang());

  useEffect(() => {
    setCurrentLang(getCurrentLang());
  }, [i18n.language, getCurrentLang]);

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

  // Click outside to close dropdown - use ref approach
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLanguageChange = async (langCode) => {
    try {
      await i18n.changeLanguage(langCode);
      localStorage.setItem("i18nextLng", langCode);
      setCurrentLang(langCode);
      setIsLangOpen(false);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

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

  const languages = [
    { code: "ru", label: "Ru", flag: "/icons/ru.svg" },
    { code: "uz", label: "Uz", flag: "/icons/uz.svg" },
    { code: "en", label: "En", flag: "/icons/en.svg" },
  ];

  const getCurrentFlag = () => {
    const lang = languages.find((l) => l.code === currentLang);
    return lang ? lang.flag : "/icons/ru.svg";
  };

  const getCurrentLabel = () => {
    const lang = languages.find((l) => l.code === currentLang);
    return lang ? lang.label : "Ru";
  };

  return (
    <nav className="bg-[#E8DDD0] sticky top-0 z-50">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "1400px" }}
      >
        {/* Main Row - Logo, Menu, Contact Info */}
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
              className="text-[15px] text-[#2D3748] font-medium hover:text-[#D4A574] transition-colors"
            >
              {contacts?.phones?.[0] || "+998 90 998 28 00"}
            </a>
            <a
              href={`mailto:${contacts?.email || "Supersite.uz@gmail.com"}`}
              className="text-[15px] text-[#718096] hover:text-[#D4A574] transition-colors"
            >
              {contacts?.email || "Supersite.uz@gmail.com"}
            </a>

            {/* Language Selector - Desktop */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E2D5C8] hover:border-[#D4A574] transition-colors cursor-pointer"
              >
                <img
                  src={getCurrentFlag()}
                  alt={getCurrentLabel()}
                  className="w-[20px] h-[14px] object-cover rounded-sm"
                />
                <span className="text-[14px] text-[#2D3748] font-medium">
                  {getCurrentLabel()}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#718096] transition-transform duration-200 ${
                    isLangOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLangOpen && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-[#E2D5C8] overflow-hidden w-[100px] z-[100]">
                  <div
                    className={`px-4 py-2.5 text-[14px] hover:bg-[#F5EDE4] transition-colors flex items-center gap-3 cursor-pointer ${
                      currentLang === "ru"
                        ? "text-[#D4A574] font-medium bg-[#F5EDE4]"
                        : "text-[#4A5568]"
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleLanguageChange("ru");
                    }}
                  >
                    <img
                      src="/icons/ru.svg"
                      alt="Ru"
                      className="w-[20px] h-[14px] object-cover rounded-sm"
                    />
                    <span>Ru</span>
                  </div>
                  <div
                    className={`px-4 py-2.5 text-[14px] hover:bg-[#F5EDE4] transition-colors flex items-center gap-3 cursor-pointer ${
                      currentLang === "uz"
                        ? "text-[#D4A574] font-medium bg-[#F5EDE4]"
                        : "text-[#4A5568]"
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleLanguageChange("uz");
                    }}
                  >
                    <img
                      src="/icons/uz.svg"
                      alt="Uz"
                      className="w-[20px] h-[14px] object-cover rounded-sm"
                    />
                    <span>Uz</span>
                  </div>
                  <div
                    className={`px-4 py-2.5 text-[14px] hover:bg-[#F5EDE4] transition-colors flex items-center gap-3 cursor-pointer ${
                      currentLang === "en"
                        ? "text-[#D4A574] font-medium bg-[#F5EDE4]"
                        : "text-[#4A5568]"
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleLanguageChange("en");
                    }}
                  >
                    <img
                      src="/icons/en.svg"
                      alt="En"
                      className="w-[20px] h-[14px] object-cover rounded-sm"
                    />
                    <span>En</span>
                  </div>
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
              style={{
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
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
            style={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
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
            isMenuOpen ? "max-h-[600px] opacity-100 pb-6" : "max-h-0 opacity-0"
          }`}
        >
          {/* Contact Info - Mobile */}
          <div className="flex flex-col gap-2 pb-4 border-b border-[#D4C4B5]">
            <a
              href={`tel:${contacts?.phones?.[0] || "+998 90 998 28 00"}`}
              className="text-[15px] text-[#2D3748] font-medium"
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
                style={{
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
                }}
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
              style={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
              }}
            >
              {currentLang === "ru"
                ? "Рассчитать проект"
                : currentLang === "uz"
                ? "Loyihani hisoblash"
                : "Calculate project"}
            </Link>
          </div>

          {/* Language Selector - Mobile */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#D4C4B5]">
            {languages.map((langItem) => (
              <button
                key={langItem.code}
                onClick={() => handleLanguageChange(langItem.code)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors flex-1 justify-center ${
                  currentLang === langItem.code
                    ? "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E] border-[#E89B64]"
                    : "bg-white text-[#4A5568] border-[#E2D5C8]"
                }`}
              >
                <img
                  src={langItem.flag}
                  alt={langItem.label}
                  className="w-[20px] h-[14px] object-cover rounded-sm"
                />
                <span className="text-[14px] font-medium">
                  {langItem.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
