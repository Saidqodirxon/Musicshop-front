import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18n";
import UzIcon from "../../assets/icons/uz.svg";
import RuIcon from "../../assets/icons/ru.svg";
import EnIcon from "../../assets/icons/en.svg";
import phone from "../../assets/icons/phone.svg";
import menu from "/menu.svg";
import x from "/x.svg";
import logo from "/logo.png";

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("i18nextLng") || "ru"
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  const pages = [
    { key: "home", url: "/" },
    { key: "about_us", url: "/about" },
    { key: "portfolio", url: "/projects" },
    { key: "services", url: "/services" },
    { key: "contacts", url: "/contacts" },
  ];

  const languages = [
    { value: "uz", icon: UzIcon },
    { value: "ru", icon: RuIcon },
    { value: "en", icon: EnIcon },
  ];

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <img src={menu} alt="menu" className="w-6 h-6" />
      </button>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 280,
            height: "100vh",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
            gap: 2,
            paddingY: 2,
            paddingX: 2,
            position: "relative",
          }}
        >
          {/* ❌ Close */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3"
          >
            <img src={x} alt="close" className="w-6 h-6" />
          </button>

          {/* 🔝 Top section */}
          <div className="flex flex-col items-center mt-8">
            <img src={logo} alt="Logo" className="w-[150px] mb-6" />
            <nav className="flex flex-col gap-4 w-full text-center">
              {pages.map((page) => (
                <Link
                  to={page.url}
                  key={page.url}
                  onClick={() => setOpen(false)}
                  className="text-[#000] font-medium hover:text-[#71914B]"
                >
                  {t(`links.${page.key}`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* 📞 Telefon va 🌐 Til */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <a
              href="tel:+998993062020"
              className="flex items-center gap-2 bg-white  border-[#ccc] px-4 py-2 rounded-md"
            >
              <img src={phone} alt="phone" className="w-5" />
              +998 99 306 20 20
            </a>
            <div className="flex gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value)}
                  className={`p-1 rounded-full border ${
                    language === lang.value
                      ? "border-[#71914B]"
                      : "border-transparent"
                  }`}
                >
                  <img src={lang.icon} alt={lang.value} className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        </Box>
      </Drawer>
    </>
  );
}
