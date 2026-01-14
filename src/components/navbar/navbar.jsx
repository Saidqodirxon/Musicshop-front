import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem("language")?.toUpperCase() || "RU"
  );
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isLangOpen && !e.target.closest(".lang-dropdown")) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isLangOpen]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang.toLowerCase());
    setIsLangOpen(false);
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const links = [
    {
      name: language === "RU" ? "Главная" : language === "UZ" ? "Bosh sahifa" : "Home",
      path: "/",
    },
    {
      name: language === "RU" ? "Услуги" : language === "UZ" ? "Xizmatlar" : "Services",
      path: "/services",
    },
    {
      name: language === "RU" ? "Кейсы" : language === "UZ" ? "Keyslar" : "Cases",
      path: "/cases",
    },
    {
      name: language === "RU" ? "О компании" : language === "UZ" ? "Kompaniya haqida" : "About",
      path: "/about",
    },
    {
      name: language === "RU" ? "Товары" : language === "UZ" ? "Mahsulotlar" : "Products",
      path: "/products",
    },
    {
      name: language === "RU" ? "Контакты" : language === "UZ" ? "Aloqa" : "Contacts",
      path: "/contacts",
    },
  ];

  return (
    <nav className="bg-[#F5E6D3] sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2.5 border-b border-[#E5D5C3]">
          <div className="flex items-center gap-6 text-sm">
            <a
              href="tel:+998909982800"
              className="text-[#5C4033] hover:text-[#8B4513] transition-colors font-medium"
            >
              +998 90 998 28 00
            </a>
            <a
              href="mailto:Supersite.uz@gmail.com"
              className="text-[#5C4033] hover:text-[#8B4513] transition-colors hidden sm:inline"
            >
              Supersite.uz@gmail.com
            </a>
          </div>

          {/* Language Selector */}
          <div className="relative lang-dropdown">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-2 py-1 text-[#5C4033] hover:text-[#8B4513] transition-colors text-sm font-medium"
            >
              <span className="text-base">🇷🇺</span>
              <span>{language}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isLangOpen && (
              <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-xl border border-[#E5D5C3] overflow-hidden min-w-[100px] z-50">
                {["RU", "UZ", "EN"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full px-3 py-2 text-left text-sm hover:bg-[#F5E6D3]/50 transition-colors flex items-center gap-2 ${language === lang ? "text-[#8B4513] font-medium bg-[#F5E6D3]/30" : "text-gray-700"
                      }`}
                  >
                    <span className="text-base">{lang === "RU" ? "🇷🇺" : lang === "UZ" ? "🇺🇿" : "🇬🇧"}</span>
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center">
              <img src="/logo.png" alt="Music shop.uz" className="w-full h-full object-cover" />
            </div>
            <span className="text-lg font-bold text-[#5C4033] hidden sm:block">
              Music shop.uz
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-xl text-[15px] font-semibold transition-all duration-200 whitespace-nowrap ${isActive(link.path)
                    ? "bg-[#FFB380] text-[#5C4033] shadow-sm"
                    : "bg-white text-[#5C4033] hover:bg-[#FFB380]/60"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/calculate-project"
              className="ml-2 px-5 py-2 rounded-xl text-[15px] font-semibold bg-[#FFB380] hover:bg-[#FF9F66] text-[#5C4033] transition-all shadow-sm whitespace-nowrap"
            >
              {language === "RU" ? "Рассчитать проект" : language === "UZ" ? "Loyihani hisoblash" : "Calculate project"}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#5C4033]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(link.path)
                    ? "bg-[#FFB380] text-[#5C4033]"
                    : "bg-white text-[#5C4033] hover:bg-[#FFB380]/60"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/calculate-project"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium bg-[#FFB380] text-[#5C4033] text-center"
            >
              {language === "RU" ? "Рассчитать проект" : language === "UZ" ? "Loyihani hisoblash" : "Calculate project"}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
