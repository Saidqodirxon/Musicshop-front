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

  const [currentLang, setCurrentLang] = useState(() => {
    const stored = localStorage.getItem("i18nextLng");
    return stored || "ru";
  });

  // Sync with i18n
  useEffect(() => {
    const syncLang = i18n.language || "ru";
    setCurrentLang(syncLang);
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
    console.log("🌐 Language change initiated:", langCode);

    // Update state
    setCurrentLang(langCode);
    setIsOpen(false);

    // Save to localStorage
    localStorage.setItem("i18nextLng", langCode);

    // Change i18n language
    i18n
      .changeLanguage(langCode)
      .then(() => {
        console.log("✅ i18n language changed to:", langCode);
        console.log("Current i18n language:", i18n.language);
      })
      .catch((error) => {
        console.error("❌ Error changing language:", error);
      });
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
            <span className="text-[14px] ">{lang.label}</span>
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
        className="w-[100px] flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E2D5C8] hover:border-[#D4A574] transition-colors"
      >
        <img
          src={currentLanguage.flag}
          alt={currentLanguage.label}
          className="w-[20px] h-[20px] object-cover rounded-sm"
        />
        <span className="text-[14px] font-bold text-[#fff] ">
          {currentLanguage.label}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#fff] transition-transform duration-200  ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 rounded-lg shadow-lg border border-[#E2D5C8] overflow-hidden w-[100px] z-[9999]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                selectLanguage(lang.code);
              }}
              className={`w-full px-4 py-2.5 text-left text-[14px] font-bold hover:bg-[#F5EDE4] transition-colors flex items-center gap-3 ${
                currentLang === lang.code
                  ? "text-[#D4A574]  border-[#F5EDE4]"
                  : "text-[#4A5568]"
              }`}
            >
              <img
                src={lang.flag}
                alt={lang.label}
                className="w-[20px] h-[20px] object-cover rounded-sm"
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
