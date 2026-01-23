import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import HowWeWork from "../../components/home/HowWeWork";
import Cases from "../../components/home/Cases";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import { getProducts } from "../../services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function Main() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
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
    const fetchTopProducts = async () => {
      try {
        const allProducts = await getProducts();
        // Filter for top products or just take first few if none marked
        const topOnes = allProducts
          .filter((p) => p.isTopProduct || p.isTop)
          .slice(0, 10);
        setProducts(topOnes.length > 0 ? topOnes : allProducts.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  const nextSlide = () => {
    if (products.length === 0) return;
    setCurrentIdx((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    if (products.length === 0) return;
    setCurrentIdx((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="bg-[#ECDFD2] min-h-screen pt-[64px] sm:pt-[100px] ">
      <Navbar />
      <Cases />

      {/* Top Products Carousel */}
      <section className="py-8 sm:py-12 lg:py-20 overflow-hidden ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <h2
            data-aos="fade-up"
            className="text-[26px] sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-6 sm:mb-8 lg:mb-10"
          >
            {t("pages.products.top_products")}
          </h2>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="relative group"
          >
            {/* Navigation Arrows */}
            {products.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-8 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#F0F7FF] rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#2A3342] touch-manipulation active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-8 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#F0F7FF] rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#2A3342] touch-manipulation active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden px-1">
              <div
                className="flex transition-transform duration-500 ease-out gap-4 sm:gap-6"
                style={{
                  transform: `translateX(-${
                    currentIdx * (100 / (window.innerWidth < 1024 ? 1 : 3))
                  }%)`,
                }}
              >
                {loading
                  ? [1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="min-w-[100%] lg:min-w-[calc(33.333%-1rem)] bg-white rounded-2xl sm:rounded-3xl h-[450px] sm:h-[500px] animate-pulse"
                      ></div>
                    ))
                  : products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onOpenModal={handleOpenModal}
                        className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[413px] lg:w-[413px]"
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowWeWork />
      <Footer />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Main;
