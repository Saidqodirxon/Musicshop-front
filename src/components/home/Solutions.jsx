import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getWhoWeWorkFor } from "../../services/api";

const Solutions = () => {
  const { t } = useTranslation();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const data = await getWhoWeWorkFor();
        setSolutions(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching solutions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-[#F5E6D3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-white/50 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-[#F5E6D3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#8B4513] mb-3 font-bold">
            {t("solutions.sectionTitle")}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] leading-tight max-w-[1400px]">
            {t("solutions.sectionSubtitle")}
          </h2>
        </div>

        {/* Solutions Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutions.map((solution) => (
            <div
              key={solution._id}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-[#E5D5C3]"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-[#5C5C5C] leading-relaxed">
                    {solution.description}
                  </p>
                </div>
                {solution.image && (
                  <div className="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
