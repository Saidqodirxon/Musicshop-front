import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import HomePage from "./pages/main";
import AboutPage from "./pages/about";
import ServicesPage from "./pages/services";
import ProductsPage from "./pages/products";
import ProjectsPage from "./pages/projects";
import CalculateProjectPage from "./pages/calculate-project";
import ContactsPage from "./pages/contacts";
import NotFound from "./pages/404page/404";
import ScrollToTopButton from "./components/scrollTopBtn";
import CallButton from "./components/callBtn";

function App() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
      offset: 50,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [location]);

  return (
    <HelmetProvider>
      <main>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#F5EDE4] to-[#E8DDD0]">
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-[#E8DDD0] rounded-full"></div>
                <div className="absolute inset-0 border-t-4 border-[#B8956A] border-solid rounded-full animate-spin"></div>
              </div>
              <p className="text-[#8F491A] font-semibold text-lg">
                {t("loading")}
              </p>
            </div>
          </div>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/cases" element={<ProjectsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route
                path="/calculate-project"
                element={<CalculateProjectPage />}
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <ScrollToTopButton />
          </>
        )}
      </main>
    </HelmetProvider>
  );
}

export default App;
