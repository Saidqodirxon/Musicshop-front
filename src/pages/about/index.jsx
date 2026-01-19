import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import { getAbout, getNews } from "../../services/api";
import { X } from "lucide-react";

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [aboutData, setAboutData] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [about, newsData] = await Promise.all([getAbout(), getNews()]);
      setAboutData(about);
      setNews(newsData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${API_URL}${url}`;
  };

  const openModal = (newsItem) => {
    setSelectedNews(newsItem);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
    document.body.style.overflow = "";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECDFD2] flex items-center justify-center">
        <div className="animate-pulse text-lg sm:text-xl font-bold">
          {t("pages.about.loading")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECDFD2] pt-[64px] sm:pt-[100px]">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-8 sm:py-12 lg:py-20">
        {/* SIDE-BY-SIDE HERO IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-16 lg:mb-24">
          <div
            data-aos="fade-right"
            className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-lg sm:shadow-xl aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px] touch-manipulation active:scale-[0.99] transition-transform"
          >
            <img
              src={getImageSrc(aboutData?.banner)}
              alt="О компании - баннер"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          {/* <div
            data-aos="fade-left"
            className="rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-lg sm:shadow-xl aspect-[4/3] md:aspect-auto md:h-[400px] lg:h-[500px] touch-manipulation active:scale-[0.99] transition-transform"
          >
            <img
              src={getImageSrc(aboutData?.image)}
              alt="О компании - основное"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div> */}
        </div>

        {/* COMPANY INFO & DESCRIPTION */}
        <div
          data-aos="fade-up"
          className="max-w-[1400px] mb-12 sm:mb-20 lg:mb-32"
        >
          <h1 className="text-[24px] sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight mb-6 sm:mb-8 lg:mb-10 transition-colors hover:text-[#B1530A]">
            {aboutData?.mainText}
          </h1>

          <div className="space-y-5 sm:space-y-8 text-[#333333] text-[14px] sm:text-base lg:text-[20px] leading-relaxed max-w-[1400px]">
            <p className="whitespace-pre-line">{aboutData?.additionalText}</p>
          </div>
        </div>

        {/* 4 Small Images Grid - More compact and filled */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-12 sm:mb-20 lg:mb-32">
          {aboutData?.images?.slice(0, 4).map((img, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl sm:rounded-[2rem] overflow-hidden shadow-md sm:shadow-lg border-2 border-white/20 touch-manipulation active:scale-95 transition-transform"
            >
              <img
                src={getImageSrc(img)}
                alt={`О компании галерея ${idx + 1}`}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-110"
              />
            </div>
          ))}
        </div>

        {/* NEWS SECTION */}
        <section className="mb-12 sm:mb-20">
          <h2
            data-aos="fade-up"
            className="text-[20px] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-8 sm:mb-12"
          >
            {lang === "ru" ? "Новости" : lang === "uz" ? "Yangiliklar" : "News"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
            {news.slice(0, 2).map((item) => (
              <div
                key={item._id}
                onClick={() => openModal(item)}
                className="bg-white/40 rounded-2xl sm:rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col group/news touch-manipulation active:scale-[0.99] transition-all cursor-pointer hover:shadow-xl"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={getImageSrc(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/news:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5 lg:p-7 flex flex-col flex-grow">
                  <h3 className="text-[#1A1A1A] text-[15px] sm:text-lg lg:text-xl font-bold leading-snug mb-3 sm:mb-4 group-hover/news:text-[#B1530A] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[#666666] text-[13px] sm:text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 line-clamp-3 flex-grow">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto text-[11px] sm:text-xs lg:text-sm text-[#777777]">
                    <span>
                      {new Date(item.date || item.createdAt).toLocaleDateString(
                        lang === "ru"
                          ? "ru-RU"
                          : lang === "uz"
                            ? "uz-UZ"
                            : "en-US"
                      )}
                    </span>
                    <span className="text-[#B1530A] font-semibold group-hover/news:underline">
                      {lang === "ru"
                        ? "Читать далее"
                        : lang === "uz"
                          ? "Batafsil"
                          : "Read more"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* NEWS MODAL */}
      {isModalOpen && selectedNews && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="sticky top-4 right-4 ml-auto mr-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-all z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A]" />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 lg:p-10 -mt-14">
              <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8">
                <img
                  src={getImageSrc(selectedNews.image)}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-[20px] sm:text-2xl lg:text-3xl font-bold text-[#1A1A1A]">
                  {selectedNews.title}
                </h2>
              </div>

              <div className="text-[12px] sm:text-sm lg:text-base text-[#999999] mb-6 sm:mb-8 pb-4 border-b border-gray-200">
                {new Date(
                  selectedNews.date || selectedNews.createdAt
                ).toLocaleDateString(
                  lang === "ru" ? "ru-RU" : lang === "uz" ? "uz-UZ" : "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>

              <div className="text-[14px] sm:text-base lg:text-lg text-[#333333] leading-relaxed space-y-4 whitespace-pre-line">
                {selectedNews.content || selectedNews.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
