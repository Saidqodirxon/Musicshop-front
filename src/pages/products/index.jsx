import { useState, useEffect } from "react";
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
  const [topProducts, setTopProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
        const tops = data.filter((p) => p.isTopProduct === true || p.isTop === true);
        setTopProducts(tops);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    if (topProducts.length <= 3) return;
    setCurrentIdx((prev) => (prev + 1 >= topProducts.length - 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (topProducts.length <= 3) return;
    setCurrentIdx((prev) => (prev <= 0 ? topProducts.length - 3 : prev - 1));
  };

  const getImageSrc = (images) => {
    const img = Array.isArray(images) ? images[0] : images;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${API_URL}${img}`;
  };

  return (
    <div className="bg-[#ECDFD2] min-h-screen font-sans">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-20">
        {/* Top Products Carousel Section */}
        <section className="mb-24 lg:mb-32">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-12">Топ товары</h2>

          <div className="relative">
            {/* Navigation Arrows */}
            {topProducts.length > 3 && (
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
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{
                  transform: `translateX(-${currentIdx * (100 / (topProducts.length || 1))}%)`,
                  width: `${(topProducts.length / 3) * 100}%`
                }}
              >
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <div key={i} className="basis-1/3 flex-shrink-0 bg-white rounded-[2rem] h-[500px] animate-pulse"></div>
                  ))
                ) : topProducts.length > 0 ? (
                  topProducts.map((product) => (
                    <div
                      key={product._id}
                      style={{ width: `calc(${100 / (topProducts.length || 1)}% - 16px)` }}
                      className="flex-shrink-0 bg-white rounded-[2rem] overflow-hidden flex flex-col group/card shadow-sm hover:shadow-xl transition-all border border-[#EDD9CD]"
                    >
                      {/* Grey image container matching Figma */}
                      <div className="aspect-[4/3] bg-[#F4F4F4] overflow-hidden p-8 flex items-center justify-center">
                        <img
                          src={getImageSrc(product.images || product.image)}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-110"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-8 lg:p-10 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 leading-tight line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-[#5C5C5C] text-sm lg:text-base leading-relaxed mb-8 flex-grow line-clamp-4">
                          {product.description}
                        </p>
                        <div className="mt-auto space-y-6">
                          <p className={`font-semibold text-sm ${product.inStock ? 'text-green-600' : 'text-[#8F491A]'}`}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                          </p>
                          <button className="w-full py-4 bg-[#814F25] text-white rounded-2xl font-bold text-base hover:bg-[#6D421E] transition-all hover:scale-[1.02] active:scale-95 shadow-md">
                            Написать
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-20 text-[#5C5C5C] italic">Топ товары не найдены</div>
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
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-12">Рекомендуем</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {allProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col group/rec border border-[#EDD9CD]"
              >
                <div className="aspect-[4/3] bg-[#F4F4F4] overflow-hidden flex items-center justify-center p-8">
                  <img
                    src={getImageSrc(product.images || product.image)}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover/rec:scale-110"
                  />
                </div>
                <div className="p-8 lg:p-10 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4 leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[#5C5C5C] text-sm lg:text-base leading-relaxed mb-8 line-clamp-4 flex-grow">
                    {product.description}
                  </p>
                  <div className="mt-auto space-y-6">
                    <p className={`font-semibold text-sm ${product.inStock ? 'text-green-600' : 'text-[#8F491A]'}`}>
                      {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </p>
                    <button className="w-full py-4 bg-[#814F25] text-white rounded-2xl font-bold text-base hover:bg-[#6D421E] transition-all">
                      Написать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <HowWeWork />
        <ConsultationForm />

        <div className="mt-24">
          <FAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductsPage;
