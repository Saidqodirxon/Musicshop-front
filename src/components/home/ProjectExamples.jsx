import React from "react";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";

const ProjectExamples = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const whatWeDo = [
    {
      ru: "Проектируем систему под размеры и акустику помещения",
      uz: "Xona o'lchamlari va akustikasiga mos tizimni loyihalaymiz",
      en: "Design system for room size and acoustics",
    },
    {
      ru: "Подбираем оборудование под задачи",
      uz: "Vazifalar uchun uskunalarni tanlaymiz",
      en: "Select equipment for tasks",
    },
    {
      ru: "Настраиваем звук и видео",
      uz: "Ovoz va videoni sozlaymiz",
      en: "Configure audio and video",
    },
    {
      ru: "Интегрируем видеосвязь",
      uz: "Video aloqani integratsiya qilamiz",
      en: "Integrate video communication",
    },
    {
      ru: "Делаем просто управление",
      uz: "Boshqaruvni oddiy qilamiz",
      en: "Make simple control",
    },
  ];

  const whatIncluded = [
    {
      ru: "Акустические системы",
      uz: "Akustik tizimlar",
      en: "Acoustic systems",
    },
    {
      ru: "Микрофоны",
      uz: "Mikrofonlar",
      en: "Microphones",
    },
    {
      ru: "Усилители и DSP",
      uz: "Kuchaytirgichlar va DSP",
      en: "Amplifiers and DSP",
    },
    {
      ru: "Экраны/ Проекторы",
      uz: "Ekranlar/ Projektorlar",
      en: "Screens/ Projectors",
    },
    {
      ru: "Системы управления",
      uz: "Boshqaruv tizimlari",
      en: "Control systems",
    },
  ];

  return (
    <section className="py-16 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="text-xs text-[#B8936D] uppercase tracking-wider mb-3 font-semibold">
          {lang === "ru"
            ? "НАШИ РЕШЕНИЯ"
            : lang === "uz"
            ? "BIZNING YECHIMLARIMIZ"
            : "OUR SOLUTIONS"}
        </div>
        <h2 className="text-3xl font-bold text-[#3D3D3D] mb-12">
          {lang === "ru"
            ? "Каждая карточка ведет на свою страницу решения"
            : lang === "uz"
            ? "Har bir kartochka o'z yechim sahifasiga olib boradi"
            : "Each card leads to its solution page"}
        </h2>

        {/* Section 1: What we do */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[#666666] mb-6">
              {lang === "ru"
                ? "Что именно мы делаем"
                : lang === "uz"
                ? "Biz aynan nima qilamiz"
                : "What exactly we do"}
            </h3>
            <div className="space-y-3">
              {whatWeDo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#5FA85C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-[#3D3D3D] text-sm leading-relaxed">
                    {item[lang] || item.ru}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[380px]">
            <img
              src="/solution2.png"
              alt="Solution 2"
              className="rounded-xl object-cover w-[520px] h-[320px]"
            />
            <img
              src="/solution1.png"
              alt="Solution 1"
              className="absolute bottom-[20px] left-[-100px]  rounded-lg object-cover w-52 h-36 border-4 border-[#F5EDE4] shadow-xl"
            />
          </div>
        </div>

        {/* Section 2: What's included */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-[320px]">
            <img
              src="/solution3.png"
              alt="Solution 3"
              className="rounded-xl object-cover w-full h-full"
            />
          </div>

          <div>
            <h3 className="text-base font-semibold text-[#666666] mb-6">
              {lang === "ru"
                ? "Что входит в решение"
                : lang === "uz"
                ? "Yechimga nima kiradi"
                : "What's included in solution"}
            </h3>
            <div className="space-y-3">
              {whatIncluded.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#5FA85C] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-[#3D3D3D] text-sm leading-relaxed">
                    {item[lang] || item.ru}
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

export default ProjectExamples;
