import { useState, useEffect } from "react";
import { getCases } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const Cases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getCases();
        setCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const getImageSrc = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  const getDocumentSrc = (document) => {
    if (!document) return "";
    if (document.startsWith("http")) return document;
    return `${API_URL}${document}`;
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-10 lg:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8F4E24] mb-3 font-bold">
            НАШИ КЕЙСЫ
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight max-w-4xl">
            Реализованные проекты и готовые решения
          </h2>
        </div>

        {/* Cases Grid - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {cases.map((caseItem) => (
            <div
              key={caseItem._id}
              className="group bg-[#F5EDE4] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              {caseItem.image && (
                <div className="h-64 lg:h-80 overflow-hidden bg-[#D7C1AF]">
                  <img
                    src={getImageSrc(caseItem.image)}
                    alt={caseItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-8 lg:p-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                  {caseItem.title}
                </h3>
                <p className="text-base text-[#5C5C5C] leading-relaxed mb-6">
                  {caseItem.description}
                </p>

                {/* Download Button */}
                {caseItem.document && (
                  <a
                    href={getDocumentSrc(caseItem.document)}
                    download
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#8F4E24] hover:bg-[#7a411e] text-white font-bold rounded-2xl transition-all hover:scale-[1.02] shadow-md"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Скачать кейс
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;
