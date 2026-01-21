import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import Solutions from "../../components/home/Solutions";
import HowWeWork from "../../components/home/HowWeWork";
import ConsultationForm from "../../components/home/ConsultationForm";
import FAQ from "../../components/home/FAQ";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import { getProducts } from "../../services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function ProductsPage() {
  const { t } = useTranslation();
  const [topProducts, setTopProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
        const tops = data.filter(
          (p) => p.isTopProduct === true || p.isTop === true
        );
        setTopProducts(tops);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const nextSlide = () => {
    if (topProducts.length <= itemsPerView) return;
    setCurrentIdx((prev) =>
      prev >= topProducts.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (topProducts.length <= itemsPerView) return;
    setCurrentIdx((prev) =>
      prev <= 0 ? topProducts.length - itemsPerView : prev - 1
    );
  };

  return (
    <div className="bg-[#ECDFD2] min-h-screen font-sans pt-[64px] sm:pt-[100px]">
      <Navbar />
      <div>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-12 lg:py-20">
          {/* Top Products Carousel Section */}
          <section className="mb-24 lg:mb-32">
            <h2
              data-aos="fade-up"
              className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-12"
            >
              {t("pages.products.top_products")}
            </h2>

            <div data-aos="fade-up" data-aos-delay="100" className="relative">
              {/* Navigation Arrows */}
              {topProducts.length > itemsPerView && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#814F25] border border-[#EDD9CD]"
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#814F25] border border-[#EDD9CD]"
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              {/* Slider track container */}
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
                  style={{
                    transform: `translateX(-${
                      currentIdx * (100 / itemsPerView)
                    }%)`,
                  }}
                >
                  {loading ? (
                    [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="min-w-[100%] lg:min-w-[calc(33.333%-1rem)] bg-white rounded-2xl sm:rounded-3xl h-[450px] sm:h-[500px] animate-pulse"
                        style={{
                          width: `calc(${100 / itemsPerView}% - ${
                            itemsPerView === 1 ? 0 : 16
                          }px)`,
                        }}
                      ></div>
                    ))
                  ) : topProducts.length > 0 ? (
                    topProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onOpenModal={handleOpenModal}
                        className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[413px] lg:w-[413px]"
                      />
                    ))
                  ) : (
                    <div className="w-full text-center py-20 text-[#5C5C5C] italic">
                      {t("pages.products.no_products")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Other Sections */}
          <section className="mb-24 lg:mb-32">
            <Solutions />
          </section>

          <section className="mb-24 lg:mb-32">
            <h2
              data-aos="fade-up"
              className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-12"
            >
              {t("pages.products.recommended")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {allProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onOpenModal={handleOpenModal}
                  className="data-aos='fade-up'"
                  data-aos-delay={index * 50}
                />
              ))}
            </div>
          </section>

          <ConsultationForm />

          <HowWeWork />

          <FAQ />
        </main>
        <Footer />
      </div>
      
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default ProductsPage;
