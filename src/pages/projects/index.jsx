import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import HowWeWork from "../../components/home/HowWeWork";
import Cases from "../../components/home/Cases";
import { getProducts } from "../../services/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const allProducts = await getProducts();
        // Filter for top products or just take first few if none marked
        const topOnes = allProducts.filter(p => p.isTopProduct || p.isTop).slice(0, 10);
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

  const getImageSrc = (images) => {
    const image = Array.isArray(images) ? images[0] : images;
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  return (
    <div className="bg-[#ECDFD2] min-h-screen">
      <Navbar />

      {/* Top Products Carousel */}
      <section className="py-12 lg:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-10">Топ товары</h2>

          <div className="relative group">
            {/* Navigation Arrows */}
            {products.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 w-12 h-12 bg-[#F0F7FF] rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#2A3342]"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 w-12 h-12 bg-[#F0F7FF] rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all text-[#2A3342]"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden px-1">
              <div
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{ transform: `translateX(-${currentIdx * (100 / (window.innerWidth < 1024 ? 1 : 3))}%)` }}
              >
                {loading ? (
                  [1, 2, 3].map(i => (
                    <div key={i} className="min-w-[100%] lg:min-w-[calc(33.333%-1rem)] bg-white rounded-3xl h-[500px] animate-pulse"></div>
                  ))
                ) : (
                  products.map((product) => (
                    <div
                      key={product._id}
                      className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[413px] lg:w-[413px] h-auto lg:h-[554px] bg-white rounded-[12px] border border-[#EDD9CD] overflow-hidden flex flex-col group/card relative"
                    >
                      {/* Image */}
                      <div className="h-[250px] lg:h-[270px] overflow-hidden">
                        <img
                          src={getImageSrc(product.images || product.image)}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5 lg:p-7 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 line-clamp-2 leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[#5C5C5C] text-sm lg:text-base leading-relaxed mb-6 line-clamp-3 lg:line-clamp-4 flex-grow">
                          {product.description}
                        </p>

                        <div className="space-y-4 pt-2">
                          <p className={`font-semibold text-sm ${product.inStock ? 'text-green-600' : 'text-[#8F491A]'}`}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                          </p>
                          <button className="w-full py-4 bg-[#8F491A] text-white rounded-[12px] font-bold text-base hover:bg-[#723A15] transition-all hover:scale-[1.02] active:scale-95 shadow-lg">
                            Написать
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Cases />
      <HowWeWork />
      <Footer />
    </div>
  );
}

export default Main;
