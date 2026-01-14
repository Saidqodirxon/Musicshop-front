import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Services from "../../components/home/Services";
import ConsultationForm from "../../components/home/ConsultationForm";
import Footer from "../../components/home/Footer";
import { getWhoWeWorkFor } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getWhoWeWorkFor();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    return `${API_URL}${imageUrl}`;
  };

  return (
    <div className="bg-[#ECDFD2]">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 lg:py-20">
        <h1 className="text-3xl font-bold text-[#1A1A1A] mb-12 lg:mb-16">Наши услуги</h1>

        {loading ? (
          <div className="space-y-12 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-gray-200 h-[300px] rounded-2xl"></div>
                <div className="space-y-4 py-4">
                  <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
                  <div className="h-20 bg-gray-200 w-full rounded"></div>
                  <div className="h-20 bg-gray-200 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-24 lg:space-y-32">
            {data.map((item, index) => (
              <div
                key={item._id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
              >
                {/* Image Section */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]">
                    <img
                      src={getImageSrc(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] leading-tight">
                    {item.title}
                  </h2>
                  <div className="space-y-4 text-[#333333] text-sm lg:text-base leading-relaxed">
                    <p className="whitespace-pre-wrap">{item.description}</p>

                    {item.solution && (
                      <div>
                        <p>{item.solution}</p>
                      </div>
                    )}

                    {item.result && (
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-1">Результат:</h4>
                        <p>{item.result}</p>
                      </div>
                    )}

                    {item.document && (
                      <div className="pt-2">
                        <a
                          href={getImageSrc(item.document)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#E09B6B] font-semibold hover:underline"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          Посмотреть документ
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <ConsultationForm />
      <Services />
      <Footer />
    </div>
  );
}

export default Main;
