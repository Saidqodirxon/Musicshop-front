import { useState, useEffect } from "react";
import { getHowWeWork } from "../../services/api";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

const HowWeWork = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const data = await getHowWeWork();
        setSteps(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching how we work:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSteps();
  }, []);

  const getImageSrc = (image) => {
    if (!image) return "";
    if (image.startsWith("http")) return image;
    return `${API_URL}${image}`;
  };

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-[#F5E6D3]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="space-y-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-white/50 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-[#F5E6D3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#8B4513] mb-3 font-bold">
            КАК МЫ РАБОТАЕМ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] leading-tight max-w-4xl">
            Мы предлагаем комплексный подход к реализации проектов
          </h2>
        </div>

        {/* Steps - Zigzag Layout */}
        <div className="space-y-16 lg:space-y-20">
          {steps.map((step, index) => (
            <div
              key={step._id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-md aspect-[4/3]">
                  {step.image ? (
                    <img
                      src={getImageSrc(step.image)}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#E5D5C3] to-[#D5C5B3] flex items-center justify-center">
                      <span className="text-6xl font-bold text-white opacity-20">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-base text-[#5C5C5C] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
