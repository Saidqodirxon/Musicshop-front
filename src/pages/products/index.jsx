import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import Solutions from "../../components/home/Solutions";
import HowWeWork from "../../components/home/HowWeWork";
import ConsultationForm from "../../components/home/ConsultationForm";
import FAQ from "../../components/home/FAQ";
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

  const getImageSrc = (images) => {
    const img = Array.isArray(images) ? images[0] : images;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${API_URL}${img}`;
  };

  return (
    <div className="bg-[#ECDFD2] min-h-screen font-sans mt-[64px] sm:mt-[100px]">
      <Navbar />
      <div className="mt-[64px] sm:mt-[80px]">
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
                      <div
                        key={product._id}
                        className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[413px] lg:w-[413px] h-auto lg:h-[650px] bg-white rounded-[2.5rem] sm:rounded-[12px] border border-[#EDD9CD] overflow-hidden flex flex-col group/card relative"
                      >
                        {/* Grey image container matching Figma */}
                        <div className="h-[220px] lg:h-[400px] overflow-hidden">
                          <img
                            src={getImageSrc(product.images || product.image)}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                          />
                        </div>

                        {/* Content Area */}
                        <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col flex-grow">
                          <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-[#5C5C5C] text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 md:mb-8 flex-grow line-clamp-3 sm:line-clamp-4">
                            {product.description}
                          </p>
                          <div className="mt-auto space-y-3 sm:space-y-4 md:space-y-6">
                            <p
                              className={`font-semibold text-xs sm:text-sm ${
                                product.inStock
                                  ? "text-green-600"
                                  : "text-[#8F491A]"
                              }`}
                            >
                              {product.inStock
                                ? t("pages.products.in_stock")
                                : t("pages.products.out_of_stock")}
                            </p>
                            <a
                              href="/contacts"
                              className="block w-full py-3 sm:py-4 bg-[#814F25] text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-[#6D421E] transition-all hover:scale-[1.02] active:scale-95 shadow-md touch-manipulation text-center"
                            >
                              {t("pages.products.contact")}
                            </a>
                          </div>
                        </div>
                      </div>
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
                <div
                  key={product._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col group/rec border border-[#EDD9CD]"
                >
                  <div className="aspect-[4/3] bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <img
                      src={getImageSrc(product.images || product.image)}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover/rec:scale-110"
                    />
                  </div>
                  <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-[#5C5C5C] text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 md:mb-8 line-clamp-3 sm:line-clamp-4 flex-grow">
                      {product.description}
                    </p>
                    <div className="mt-auto space-y-3 sm:space-y-4 md:space-y-6">
                      <p
                        className={`font-semibold text-xs sm:text-sm ${
                          product.inStock ? "text-green-600" : "text-[#8F491A]"
                        }`}
                      >
                        {product.inStock
                          ? t("pages.products.in_stock")
                          : t("pages.products.out_of_stock")}
                      </p>
                      <a
                        href="/contacts"
                        className="block w-full py-3 sm:py-4 bg-[#814F25] text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-[#6D421E] transition-all touch-manipulation active:scale-95 text-center"
                      >
                        {t("pages.products.contact")}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <ConsultationForm />

          <HowWeWork />

          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default ProductsPage;
