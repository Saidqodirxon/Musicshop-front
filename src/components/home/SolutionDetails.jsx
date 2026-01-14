import { useState } from "react";
import { Check } from "lucide-react";

const SolutionDetails = () => {
  const whatWeDo = [
    "Проектируем систему под размеры и акустику помещения",
    "Подбираем оборудование под задачи",
    "Настраиваем звук и видео",
    "Интегрируем видеосвязь",
    "Делаем просто управление",
  ];

  const whatIncluded = [
    "Акустические системы",
    "Микрофоны",
    "Усилители и DSP",
    "Экраны/ Проекторы",
    "Системы управления",
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-12 sm:mb-16">
          <p className="text-[#8F491A] font-bold uppercase tracking-wider mb-2 text-sm sm:text-base">
            НАШИ РЕШЕНИЯ
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] max-w-4xl leading-tight">
            Каждая карточка ведет на свою страницу решения
          </h2>
        </div>

        {/* Section 1: What we do */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-20">
          <div className="w-full lg:w-1/3">
            <h3 className="text-[#7D7AA2] text-xl sm:text-2xl font-bold mb-8">
              Что именно мы делаем
            </h3>
            <div className="space-y-6">
              {whatWeDo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[#333333] text-lg font-medium pt-0.5 border-b border-[#D7C1AF] pb-4 w-full">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-2/3 relative">
            {/* Image Composition */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full">
              {/* Main large image */}
              <div className="absolute top-0 right-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-xl z-10">
                <img
                  src="/solution1.png"
                  alt="Camera setup"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Smaller overlay image */}
              <div className="absolute bottom-0 left-0 w-2/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-[#ECDFD2]">
                <img
                  src="/solution2.png"
                  alt="Sound setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: What is included */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl h-[300px] sm:h-[400px]">
              <img
                src="/solution3.png"
                alt="Conference equipment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h3 className="text-[#7D7AA2] text-xl sm:text-2xl font-bold mb-8">
              Что входит в решение
            </h3>
            <div className="space-y-6">
              {whatIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[#333333] text-lg font-medium pt-0.5 border-b border-[#D7C1AF] pb-4 w-full">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionDetails;
