import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBanners } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const Hero = () => {
  const { t } = useTranslation();
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
    <section className="relative min-h-[500px] sm:min-h-[600px] lg:h-[800px] overflow-hidden bg-[#B8A89C]">
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
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-[#C4B5A8]" />
      )}

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center relative z-10">
        <div className="max-w-full lg:max-w-[700px] py-12 sm:py-16 lg:py-0">
          {/* Main Heading */}
          <h1
            data-aos="fade-up"
            className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[50px] font-bold text-[#8F491A] mb-4 sm:mb-5 leading-[1.2]"
          >
            {t("hero.title")}
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-[14px] sm:text-[15px] lg:text-[16px] text-[#384258] mb-6 sm:mb-8 leading-[1.6] max-w-full sm:max-w-[500px]"
          >
            {t("hero.description")}
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Link
              to="/calculate-project"
              className="inline-flex items-center justify-center border-[2px] px-6 sm:px-8 lg:px-[32px] py-3 sm:py-4 lg:py-[18px] text-[15px] sm:text-[16px] lg:text-[18px] bg-[#5D5D5D] hover:bg-[#5a5a5a] text-white font-semibold rounded-full transition-all shadow-md active:scale-95 touch-manipulation"
            >
              {t("hero.calculateBtn")}
            </Link>
            <button
              onClick={() => {
                const consultationForm =
                  document.querySelector("#consultation-form");
                if (consultationForm) {
                  consultationForm.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
              className="inline-flex items-center justify-center border-[2px] px-6 sm:px-8 lg:px-[32px] py-3 sm:py-4 lg:py-[18px] text-[15px] sm:text-[16px] lg:text-[18px] bg-[#B8956A] hover:bg-[#A8855A] text-white font-semibold rounded-full transition-all shadow-md active:scale-95 touch-manipulation"
            >
              {t("hero.consultBtn")}
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

      {/* Dots Navigation */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all touch-manipulation ${
                index === currentIndex
                  ? "bg-[#FFB380] w-8"
                  : "bg-white/40 w-2 hover:bg-white/60 active:bg-white/80"
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
