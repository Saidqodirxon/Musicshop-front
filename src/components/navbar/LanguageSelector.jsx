import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "ru", label: "Ru", flag: "/icons/ru.svg" },
  { code: "uz", label: "Uz", flag: "/icons/uz.svg" },
  { code: "en", label: "En", flag: "/icons/en.svg" },
];

const LanguageSelector = ({ isMobile = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Get current language
  const getCurrentLang = () => {
    const lang = i18n.language || localStorage.getItem("i18nextLng") || "ru";
    return lang.split("-")[0].toLowerCase();
  };

  const [currentLang, setCurrentLang] = useState(getCurrentLang());

  // Update when i18n changes
  useEffect(() => {
    setCurrentLang(getCurrentLang());
  }, [i18n.language]);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const selectLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("i18nextLng", langCode);
    setCurrentLang(langCode);
    setIsOpen(false);
  };

  const currentLanguage =
    languages.find((l) => l.code === currentLang) || languages[0];

  // Mobile version - show all buttons
  if (isMobile) {
    return (
      <div className="flex items-center gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => selectLanguage(lang.code)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors flex-1 justify-center ${
              currentLang === lang.code
                ? "bg-gradient-to-b from-[#FFC79E] to-[#E89B64] text-[#2E2E2E] border-[#E89B64]"
                : "bg-white text-[#4A5568] border-[#E2D5C8]"
            }`}
          >
            <img
              src={lang.flag}
              alt={lang.label}
              className="w-[20px] h-[14px] object-cover rounded-sm"
            />
            <span className="text-[14px] font-medium">{lang.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Desktop dropdown version
  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#E2D5C8] hover:border-[#D4A574] transition-colors"
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.label}
          className="w-[20px] h-[14px] object-cover rounded-sm"
        />
        <span className="text-[14px] text-[#2D3748] font-medium">
          {currentLanguage.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#718096] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-[#E2D5C8] overflow-hidden w-[100px] z-[9999]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                selectLanguage(lang.code);
              }}
              className={`w-full px-4 py-2.5 text-left text-[14px] hover:bg-[#F5EDE4] transition-colors flex items-center gap-3 ${
                currentLang === lang.code
                  ? "text-[#D4A574] font-medium bg-[#F5EDE4]"
                  : "text-[#4A5568]"
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.label}
                className="w-[20px] h-[14px] object-cover rounded-sm"
              />
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
