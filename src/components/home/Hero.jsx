import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBanners } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  const getImageSrc = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  if (loading) {
    return (
      <section className="relative h-[700px] bg-[#C4B5A8] animate-pulse" />
    );
  }

  return (
    <section className="relative h-[700px] overflow-hidden bg-[#B8A89C]">
      {/* Background with banners */}
      {banners.length > 0 ? (
        banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={getImageSrc(banner.image)}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0" />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-[#C4B5A8]" />
      )}

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] h-full flex items-center relative z-10">
        <div className="max-w-[700px]">
          {/* Main Heading */}
          <h1 className=" text-[40px] sm:text-[44px] lg:text-[50px] font-bold text-[#8F491A] mb-5 leading-[1.2]">
            Профессиональные AV- решение под ключ для бизнеса и организаций
          </h1>

          {/* Description */}
          <p className="text-[16px] lg:text-[16px] text-[#384258] mb-8 leading-[1.6] max-w-[500px]">
            Проектирование установка и интеграция аудио- и видео систем для
            конференц залов аудиторий и больших пространств
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/calculate-project"
              className="inline-flex items-center justify-center border-[2px] px-[32px] py-[18px] text-[18px] bg-[#5D5D5D] hover:bg-[#5a5a5a] text-white font-semibold rounded-full transition-all shadow-md "
            >
              Рассчитать проект
            </Link>
            <button className="inline-flex items-center justify-center border-[2px] px-[32px] py-[18px] text-[18px] bg-[#B8956A] hover:bg-[#A8855A] text-white font-semibold rounded-full transition-all shadow-md ">
              Получить консультацию
            </button>
          </div>
        </div>

        {/* Right side - Microphone image area */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-end pr-8">
            {/* Microphone image from banner will appear here */}
          </div>
        </div>
      </div>

      {/* Dots Navigation - EXACT: active #FFB380 */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[#FFB380] w-8"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
