import { useState, useEffect } from "react";
import { getWhatWeDo } from "../../services/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getWhatWeDo();
        setServices(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[#8B4513] mb-3 font-bold">
            ЧТО МЫ ДЕЛАЕМ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1A1A1A] leading-tight max-w-4xl">
            Проектируем, поставляем и монтируем профессиональное аудио, видео и мультимедийное оборудование
          </h2>
        </div>

        {/* Services Grid - 2 rows x 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <div
              key={service._id}
              className="group relative bg-white border-2 border-[#E5D5C3] rounded-2xl p-6 hover:border-[#FFB380] hover:shadow-lg transition-all duration-300"
            >
              {/* Number Badge */}
              <div className="absolute -top-3 -left-3 w-9 h-9 bg-[#8B4513] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-base">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Service Content */}
              <div className="mt-2">
                <h3 className="text-base font-bold text-[#1A1A1A] mb-3 leading-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-[#5C5C5C] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
