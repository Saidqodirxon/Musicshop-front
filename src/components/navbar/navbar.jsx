import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { X, Phone } from "lucide-react";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [contacts, setContacts] = useState(null);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const [hideLinks, setHideLinks] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

  // Fetch contacts
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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  // Handle scroll: hide links on scroll down, show on scroll up; shrink navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY.current;

      if (currentY < 60) {
        // near top -> full navbar
        setHideLinks(false);
        setIsShrunk(false);
      } else if (delta > 5) {
        // scrolling down -> hide links and shrink
        setHideLinks(true);
        setIsShrunk(true);
      } else if (delta < -5) {
        // scrolling up -> show links (and keep shrunk state optional)
        setHideLinks(false);
        setIsShrunk(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const links = [
    { name: t("links.home"), path: "/" },
    { name: t("links.services"), path: "/services" },
    { name: t("links.cases"), path: "/cases" },
    { name: t("links.about_us"), path: "/about" },
    { name: t("links.products"), path: "/products" },
    { name: t("links.contacts"), path: "/contacts" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 pt-4 left-0 right-0 w-full mx-auto z-50 shadow-sm bg-black/40 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div
            className={`flex items-center justify-between transition-all duration-300 ${isShrunk ? "h-14" : "h-20"}`}
          >
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 flex-shrink-0 group"
            >
              <img
                src="/logo.png"
                alt="Music shop.uz"
                className="w-16 h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-md"
              />
              <span className="text-xl font-bold text-[#ffff] group-hover:text-[#D4A574] transition-colors">
                Music shop.uz
              </span>
            </Link>

            {/* Contact + Language */}
            <div className="flex items-center gap-6">
              {contacts?.phones && contacts.phones.length > 0 ? (
                <a
                  href={`tel:${contacts.phones[0].replace(/[\s()\-]/g, "")}`}
                  className="flex items-center gap-2 text-[#ffff] hover:text-[#D4A574] transition-colors group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">
                    {contacts.phones[0]}
                  </span>
                </a>
              ) : (
                <a
                  href="tel:+998909982800"
                  className="flex items-center gap-2 text-[#ffff] hover:text-[#D4A574] transition-colors group"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">
                    +998 90 998 28 00
                  </span>
                </a>
              )}

              <LanguageSelector />
            </div>
          </div>

          {/* Navigation Links */}
          <div
            className={`pb-5 border-[#D4C4B5]/30 transition-all duration-300 overflow-hidden ${hideLinks ? "max-h-0 opacity-0" : "max-h-56 opacity-100"}`}
          >
            <div className="flex items-center justify-center gap-3 pt-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all  hover:text-white ${
                    isActive(link.path)
                      ? " text-[#ffff]"
                      : " text-[#E89B64] hover:from-[#FFD1AE] hover:to-[#F0A76D]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Calculate Project Link */}
              <Link
                to="/calculate-project"
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all  hover:text-white ${
                  isActive("/calculate-project")
                    ? "text-[#ffff]"
                    : " text-[#E89B64] hover:from-[#FFD1AE] hover:to-[#F0A76D]"
                }`}
              >
                {t("links.calculate")}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile: Top Bar with Logo and Menu Button */}
      <div className="lg:hidden bg-black/40 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Music shop.uz"
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
            <span className="text-lg font-bold text-[#ffff]">
              Music shop.uz
            </span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-[#ffff] transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#ffff] transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-[#ffff] transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile: Full Screen Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-[#ffff]" />
          </button>

          {/* Logo */}
          <div className="pt-6 pb-8 text-center border-b border-gray-100">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="inline-block"
            >
              <img
                src="/logo.png"
                alt="Music shop.uz"
                className="w-20 h-20 mx-auto rounded-full object-cover"
              />
              <p className="mt-3 text-xl font-bold text-[#ffff]">
                Music shop.uz
              </p>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col items-center justify-center py-8 space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-medium py-4 px-8 transition-colors ${
                  isActive(link.path)
                    ? "text-[#D4A574] font-bold"
                    : "text-[#ffff] hover:text-[#D4A574]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Calculate Project Link */}
            <Link
              to="/calculate-project"
              onClick={() => setIsMenuOpen(false)}
              className={`text-xl font-medium py-4 px-8 transition-colors ${
                isActive("/calculate-project")
                  ? "text-[#D4A574] font-bold"
                  : "text-[#ffff] hover:text-[#D4A574]"
              }`}
            >
              {t("links.calculate")}
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="pb-8 space-y-4 border-t border-gray-100 pt-6">
            {contacts?.phones && contacts.phones.length > 0 ? (
              <a
                href={`tel:${contacts.phones[0].replace(/[\s()\-]/g, "")}`}
                className="flex items-center justify-center gap-3 text-[#ffff] hover:text-[#D4A574] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg font-semibold">
                  {contacts.phones[0]}
                </span>
              </a>
            ) : (
              <a
                href="tel:+998909982800"
                className="flex items-center justify-center gap-3 text-[#ffff] hover:text-[#D4A574] transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg font-semibold">+998 90 998 28 00</span>
              </a>
            )}

            {/* Language Selector */}
            <div className="px-4">
              <LanguageSelector isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
