import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/home/Footer";
import { getAbout, getNews } from "../../services/api";
import { Eye } from "lucide-react";

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECDFD2] flex items-center justify-center">
        <div className="animate-pulse text-xl font-bold">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECDFD2]">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-20">
        {/* SIDE-BY-SIDE HERO IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/3] md:aspect-auto md:h-[500px]">
            <img
              src={getImageSrc(aboutData?.banner)}
              alt="О компании - баннер"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-xl aspect-[4/3] md:aspect-auto md:h-[500px]">
            <img
              src={getImageSrc(aboutData?.image)}
              alt="О компании - основное"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* COMPANY INFO & DESCRIPTION */}
        <div className="max-w-5xl mb-20 lg:mb-32">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A] leading-tight mb-10 transition-colors hover:text-[#B1530A]">
            {aboutData?.mainText}
          </h1>

          <div className="space-y-8 text-[#333333] text-base lg:text-lg leading-relaxed max-w-4xl">
            <p className="whitespace-pre-line">
              {aboutData?.additionalText}
            </p>
          </div>
        </div>

        {/* 4 Small Images Grid - More compact and filled */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-20 lg:mb-32">
          {aboutData?.images?.slice(0, 4).map((img, idx) => (
            <div key={idx} className="aspect-square rounded-[2rem] overflow-hidden shadow-lg border-2 border-white/20">
              <img
                src={getImageSrc(img)}
                alt={`О компании галерея ${idx + 1}`}
                className="w-full h-full object-cover transition-all duration-500 hover:scale-110 hover:brightness-110"
              />
            </div>
          ))}
        </div>

        {/* NEWS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {news.slice(0, 2).map((item) => (
            <div key={item._id} className="bg-white/40 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col group/news">
              <div className="aspect-video overflow-hidden">
                <img
                  src={getImageSrc(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/news:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <p className="text-[#333333] text-sm lg:text-base leading-relaxed mb-6 group-hover/news:text-[#B1530A] transition-colors line-clamp-2">
                  {item.title}
                </p>

                <div className="flex items-center gap-6 mt-auto text-xs lg:text-sm text-[#777777]">
                  <span>{new Date(item.date || item.createdAt).toLocaleDateString("ru-RU")}</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {item.views || 549}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
