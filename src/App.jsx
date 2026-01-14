import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen bg-[#F5EDE4]">
          <div className="text-center">
            <div className="w-16 h-16 border-t-4 border-[#C08552] border-solid rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium">Загрузка...</p>
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
  );
}

export default App;
