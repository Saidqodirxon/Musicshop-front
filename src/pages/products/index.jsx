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
import SEO from "../../components/SEO";
import { getProducts, getCategories } from "../../services/api";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function ProductsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "ru";
  const [topProducts, setTopProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topSelectedCategory, setTopSelectedCategory] = useState(null);
  const [recommendedSelectedCategory, setRecommendedSelectedCategory] =
    useState(null);
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
      setLoading(true);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setAllProducts(productsData);
        setCategories(categoriesData);
        const tops = productsData.filter(
          (p) => p.isTopProduct === true || p.isTop === true
        );
        setTopProducts(tops);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentLang]);

  // Filter products by category
  const handleTopCategoryFilter = (categoryId) => {
    setTopSelectedCategory(categoryId);
  };

  const clearTopFilter = () => {
    setTopSelectedCategory(null);
  };

  const handleRecommendedCategoryFilter = (categoryId) => {
    setRecommendedSelectedCategory(categoryId);
  };

  const clearRecommendedFilter = () => {
    setRecommendedSelectedCategory(null);
  };

  // Get category name helper
  const getCategoryName = (category) => {
    if (!category) return "";
    if (typeof category === "object" && category.name) {
      if (typeof category.name === "object") {
        return (
          category.name[currentLang] ||
          category.name.ru ||
          category.name.uz ||
          ""
        );
      }
      return category.name;
    }
    return "";
  };

  // Filtered products for top section
  const filteredTopProducts = topSelectedCategory
    ? topProducts.filter((p) => {
        const catId =
          typeof p.category === "object" ? p.category?._id : p.category;
        return catId === topSelectedCategory;
      })
    : topProducts;

  // Filtered products for recommended section
  const filteredRecommendedProducts = recommendedSelectedCategory
    ? allProducts.filter((p) => {
        const catId =
          typeof p.category === "object" ? p.category?._id : p.category;
        return catId === recommendedSelectedCategory;
      })
    : allProducts;

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
    if (filteredTopProducts.length <= itemsPerView) return;
    setCurrentIdx((prev) =>
      prev >= filteredTopProducts.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (filteredTopProducts.length <= itemsPerView) return;
    setCurrentIdx((prev) =>
      prev <= 0 ? filteredTopProducts.length - itemsPerView : prev - 1
    );
  };

  // Generate product keywords for SEO
  const generateProductKeywords = () => {
    const productNames = allProducts
      .map((p) => {
        if (typeof p.name === "object") {
          return p.name[currentLang] || p.name.ru || p.name.uz || "";
        }
        return p.name || "";
      })
      .filter(Boolean)
      .slice(0, 10)
      .join(", ");

    const categoryNames = categories
      .map((c) => {
        if (typeof c.name === "object") {
          return c.name[currentLang] || c.name.ru || c.name.uz || "";
        }
        return c.name || "";
      })
      .filter(Boolean)
      .join(", ");

    const baseKeywords =
      currentLang === "uz"
        ? "musiqa asboblari, gitara, klaviatura, zarb asboblari, audio jihozlar"
        : currentLang === "ru"
          ? "музыкальные инструменты, гитара, синтезатор, ударные инструменты, аудиооборудование"
          : "musical instruments, guitar, keyboard, percussion, audio equipment";

    return `${baseKeywords}, ${categoryNames}, ${productNames}`;
  };

  // Generate structured data for products
  const generateProductsSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name:
        currentLang === "uz"
          ? "MusicShopUz Mahsulotlari"
          : currentLang === "ru"
            ? "Продукция MusicShopUz"
            : "MusicShopUz Products",
      description:
        currentLang === "uz"
          ? "Musiqa asboblari va jihozlarining to'liq katalogi"
          : currentLang === "ru"
            ? "Полный каталог музыкальных инструментов и оборудования"
            : "Complete catalog of musical instruments and equipment",
      itemListElement: topProducts.slice(0, 10).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name:
            typeof product.name === "object"
              ? product.name[currentLang] || product.name.ru || product.name.uz
              : product.name,
          description:
            typeof product.description === "object"
              ? product.description[currentLang] ||
                product.description.ru ||
                product.description.uz
              : product.description,
          image: product.images?.[0]
            ? `${API_URL}${product.images[0]}`
            : `${API_URL}/logo.png`,
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "UZS",
          },
        },
      })),
    };
  };

  const seoTitle =
    currentLang === "uz"
      ? "Mahsulotlar - Musiqa Asboblari va Jihozlari"
      : currentLang === "ru"
        ? "Продукция - Музыкальные инструменты и оборудование"
        : "Products - Musical Instruments and Equipment";

  const seoDescription =
    currentLang === "uz"
      ? `Musiqa asboblari va jihozlarining keng tanlovi. ${allProducts.length}+ mahsulot. Gitara, klaviatura, zarb asboblari, audio jihozlar. Professional xizmat va sifatli mahsulotlar.`
      : currentLang === "ru"
        ? `Широкий выбор музыкальных инструментов и оборудования. ${allProducts.length}+ товаров. Гитары, клавишные, ударные инструменты, аудиооборудование. Профессиональное обслуживание и качественные товары.`
        : `Wide selection of musical instruments and equipment. ${allProducts.length}+ products. Guitars, keyboards, percussion, audio equipment. Professional service and quality products.`;

  return (
    <div className="bg-[#ECDFD2] min-h-screen font-sans pt-[64px] sm:pt-[120px]">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={generateProductKeywords()}
        url="/products"
        productSchema={generateProductsSchema()}
      />
      <Navbar />
      <div>
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-12 lg:py-20">
          {/* Top Products Carousel Section */}
          <section className="mb-24 lg:mb-32">
            <h2
              data-aos="fade-up"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-6 lg:mb-8"
            >
              {t("pages.products.top_products")}
            </h2>

            {/* Category Filter for Top Products */}
            <div
              data-aos="fade-up"
              className="w-full overflow-x-auto scrollbar-hide mb-6 lg:mb-8"
            >
              <div className="flex gap-2 lg:gap-3 pb-2 lg:pb-0 min-w-max lg:min-w-0 lg:flex-wrap">
                <button
                  onClick={clearTopFilter}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    !topSelectedCategory
                      ? "bg-[#814F25] text-white shadow-md"
                      : "bg-white text-[#814F25] border border-[#814F25]/20 hover:bg-[#814F25] hover:text-white"
                  }`}
                >
                  {t("pages.products.all")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleTopCategoryFilter(cat._id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      topSelectedCategory === cat._id
                        ? "bg-[#814F25] text-white shadow-md"
                        : "bg-white text-[#814F25] border border-[#814F25]/20 hover:bg-[#814F25] hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filter Badge for Top Products */}
            {topSelectedCategory && (
              <div
                data-aos="fade-up"
                className="mb-6 flex flex-wrap items-center gap-2"
              >
                <span className="text-[#5C5C5C] text-sm">
                  {t("pages.products.filtered_by")}:
                </span>
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#814F25] text-white rounded-full text-xs sm:text-sm font-medium shadow-md">
                  {categories.find((c) => c._id === topSelectedCategory)?.name}
                  <button
                    onClick={clearTopFilter}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label="Clear filter"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </span>
              </div>
            )}

            <div data-aos="fade-up" data-aos-delay="100" className="relative">
              {/* Navigation Arrows */}
              {filteredTopProducts.length > itemsPerView && (
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
                  ) : filteredTopProducts.length > 0 ? (
                    filteredTopProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onOpenModal={handleOpenModal}
                        onCategoryClick={handleTopCategoryFilter}
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
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-6 lg:mb-8"
            >
              {t("pages.products.recommended")}
            </h2>

            {/* Category Filter - horizontal scroll on mobile */}
            <div
              data-aos="fade-up"
              className="w-full overflow-x-auto scrollbar-hide mb-8 lg:mb-12"
            >
              <div className="flex gap-2 lg:gap-3 pb-2 lg:pb-0 min-w-max lg:min-w-0 lg:flex-wrap">
                <button
                  onClick={clearRecommendedFilter}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    !recommendedSelectedCategory
                      ? "bg-[#814F25] text-white shadow-md"
                      : "bg-white text-[#814F25] border border-[#814F25]/20 hover:bg-[#814F25] hover:text-white"
                  }`}
                >
                  {t("pages.products.all")}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => handleRecommendedCategoryFilter(cat._id)}
                    className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      recommendedSelectedCategory === cat._id
                        ? "bg-[#814F25] text-white shadow-md"
                        : "bg-white text-[#814F25] border border-[#814F25]/20 hover:bg-[#814F25] hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filter Badge */}
            {recommendedSelectedCategory && (
              <div
                data-aos="fade-up"
                className="mb-6 flex flex-wrap items-center gap-2"
              >
                <span className="text-[#5C5C5C] text-sm">
                  {t("pages.products.filtered_by")}:
                </span>
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#814F25] text-white rounded-full text-xs sm:text-sm font-medium shadow-md">
                  {
                    categories.find(
                      (c) => c._id === recommendedSelectedCategory
                    )?.name
                  }
                  <button
                    onClick={clearRecommendedFilter}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label="Clear filter"
                  >
                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {filteredRecommendedProducts.length > 0 ? (
                filteredRecommendedProducts.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onOpenModal={handleOpenModal}
                    onCategoryClick={handleRecommendedCategoryFilter}
                    className="data-aos='fade-up'"
                    data-aos-delay={index * 50}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 lg:py-20 text-[#5C5C5C] text-sm lg:text-base">
                  {t("pages.products.no_products_in_category")}
                </div>
              )}
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
