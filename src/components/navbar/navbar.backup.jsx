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
  const mobileMenuRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle swipe to close
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 50) {
      setIsMenuOpen(false);
    }
  };

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
    <>
      <nav className="bg-[#E8DDD0] sticky top-0 z-50 shadow-sm">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1400px" }}
        >
          {/* Main Row */}
          <div className="flex items-center justify-between py-3 lg:py-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 z-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/logo.png"
                alt="Music shop.uz"
                className="w-[36px] h-[36px] sm:w-[50px] sm:h-[50px] rounded-full object-cover"
              />
              <span className="text-[14px] sm:text-[18px] font-semibold text-[#2D3748] block">
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
          <buttonall duration-200 z-50 relative min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 top-1 w-6 h-0.5 bg-[#2D3748] transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 top-2.5" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 w-6 h-0.5 bg-[#2D3748] transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 w-6 h-0.5 bg-[#2D3748] transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 top-2.5" : ""
                }`}
              />
            </div>: (
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
            Desktop Navigation Links */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center gap-[10px] pb-5">
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
        </div>
      </div>
    </nav>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-[64px] left-0 right-0 bottom-0 bg-[#E8DDD0] z-40 lg:hidden transform transition-transform duration-300 ease-out overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          maxHeight: "calc(100vh - 64px)",
          boxShadow: isMenuOpen ? "0 10px 30px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div className="px-4 py-6">
          {/* Contact Info - Mobile */}
          <div className="flex flex-col gap-3 pb-5 border-b-2 border-[#D4C4B5]/50">
            <a
              href={`tel:${contacts?.phones?.[0] || "+998 90 998 28 00"}`}
              className="text-[16px] text-[#2D3748] font-bold hover:text-[#D4A574] transition-colors active:scale-95 min-h-[44px] flex items-center"
            >
              📞 {contacts?.phones?.[0] || "+998 90 998 28 00"}
            </a>
            <a
              href={`mailto:${contacts?.email || "Supersite.uz@gmail.com"}`}
              className="text-[14px] text-[#718096] hover:text-[#D4A574] transition-colors active:scale-95 min-h-[44px] flex items-center"
            >
              ✉️ {contacts?.email || "Supersite.uz@gmail.com"}
            </a>
          </div>

          {/* Navigation Links - Mobile */}
          <div className="space-y-3 py-5">
            {links.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-5 py-4 rounded-xl text-[16px] font-medium transition-all active:scale-[0.98] min-h-[56px] flex items-center ${
                  isActive(link.path)
                    ? "bg-white text-[#2E2E2E] shadow-lg"
                    : "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E] hover:shadow-lg"
                }`}
                style={{
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/calculate-project"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-5 py-4 rounded-xl text-[16px] font-bold text-center transition-all active:scale-[0.98] min-h-[56px] flex items-center justify-center ${
                isActive("/calculate-project")
                  ? "bg-white text-[#2E2E2E] shadow-lg"
                  : "bg-gradient-to-r from-[#FFC79E] via-[#F0A76D] to-[#E89B64] text-[#2E2E2E] hover:shadow-xl"
              }`}
              style={{
                boxShadow: "0px 4px 12px rgba(232, 155, 100, 0.4)",
              }}
            >
              {currentLang === "ru"
                ? "🎯 Рассчитать проект"
                : currentLang === "uz"
                ? "🎯 Loyihani hisoblash"
                : "🎯 Calculate project"}
            </Link>
          </div>

          {/* Language Selector - Mobile */}
          <div className="pt-5 border-t-2 border-[#D4C4B5]/50">
            <p className="text-[12px] text-[#718096] mb-3 font-medium uppercase tracking-wide">
              {currentLang === "ru"
                ? "Язык"
                : currentLang === "uz"
                ? "Til"
                : "Language"}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language.code)}
                  className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg cursor-pointer transition-all active:scale-95 min-h-[56px] ${
                    currentLang === language.code
                      ? "bg-white shadow-lg ring-2 ring-[#D4A574]"
                      : "bg-[#D4C4B5] hover:bg-[#C4B4A5] hover:shadow-md"
                  }`}
                >
                  <img
                    src={language.flag}
                    alt={language.name}
                    className="w-7 h-5 object-cover rounded-sm shadow-sm"
                  />
                  <span className="text-[13px] font-semibold text-[#2D3748]">
                    {language.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Swipe hint */}
          <div className="mt-6 text-center">
            <p className="text-[11px] text-[#718096]/70 font-medium">
              {currentLang === "ru"
                ? "← Свайпните влево, чтобы закрыть"
                : currentLang === "uz"
                ? "← Yopish uchun chapga suring"
                : "← Swipe left to close"}
            </p>
          </div>
        </div>
      </div>
    </           src={language.flag}
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
