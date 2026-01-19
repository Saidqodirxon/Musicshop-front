import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import Services from "../../components/home/Services";
import ConsultationForm from "../../components/home/ConsultationForm";
import Footer from "../../components/home/Footer";
import WhatWeDo from "../../components/home/WhatWeDo";

function Main() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // Static services data with images from public folder
  const data = [
    {
      id: 1,
      image: "/1.png",
      title: {
        ru: "Оснащение официального зала для государственных выступлений",
        uz: "Davlat chiqishlari uchun rasmiy zalning jihozlanishi",
        en: "Equipping an official hall for government performances",
      },
      points: [
        {
          ru: "Разработан государственного мероприятия",
          uz: "Davlat tadbirini ishlab chiqish",
          en: "Development of a government event",
        },
        {
          ru: "Обеспечила звуковую и видеопроекцию под любой при высокой загрузке зала",
          uz: "Har qanday yuqori zal yuklanishi bilan ovoz va video proyeksiyasini ta'minladi",
          en: "Provided sound and video projection for any high hall load",
        },
        {
          ru: "Musicshop.uz поставили и настроили профессиональное аудиооборудование с учётом акустики помещения",
          uz: "Musicshop.uz xona akustikasini hisobga olgan holda professional audio jihozlarini yetkazib berdi va sozladi",
          en: "Musicshop.uz supplied and configured professional audio equipment taking into account room acoustics",
        },
      ],
      result: {
        ru: "Зал получил надёжную звуковую систему, полностью соответствующую требованиям официальных мероприятий",
        uz: "Zal rasmiy tadbirlar talablariga to'liq javob beradigan ishonchli ovoz tizimini oldi",
        en: "The hall received a reliable sound system that fully meets the requirements of official events",
      },
    },
    {
      id: 2,
      image: "/2.png",
      title: {
        ru: "Техническое оснащение зала для межведомственных совещаний",
        uz: "Idoralararo yig'ilishlar uchun zalni texnik jihozlash",
        en: "Technical equipment of the hall for interdepartmental meetings",
      },
      points: [
        {
          ru: "Оснащенный зал для межведомственных встреч и рабочих совещаний",
          uz: "Idoralararo uchrashuvlar va ish yig'ilishlari uchun jihozlangan zal",
          en: "Equipped hall for interdepartmental meetings and working meetings",
        },
        {
          ru: "Организована качественное звуковое сопровождение для больших количества спикеров",
          uz: "Ko'p sonli ma'ruzachilar uchun sifatli ovozli hamrohlik tashkil etildi",
          en: "Organized high-quality sound support for a large number of speakers",
        },
        {
          ru: "Были подобраны и установлены профессиональные микрофоны и аудиосистемы, обеспечивающие стабильную работу",
          uz: "Barqaror ishlashni ta'minlaydigan professional mikrofonlar va audio tizimlar tanlandi va o'rnatildi",
          en: "Professional microphones and audio systems were selected and installed to ensure stable operation",
        },
      ],
      result: {
        ru: "Система успела используется для крупных совещаний и обеспечивает чистоту и разборчивость речи для всех участников",
        uz: "Tizim katta yig'ilishlar uchun muvaffaqiyatli ishlatiladi va barcha ishtirokchilar uchun nutqning tozaligi va aniqligini ta'minlaydi",
        en: "The system is successfully used for large meetings and ensures clarity and intelligibility of speech for all participants",
      },
    },
    {
      id: 3,
      image: "/3.png",
      title: {
        ru: "Оснащение официального зала для государственных выступлений",
        uz: "Davlat chiqishlari uchun rasmiy zalning jihozlanishi",
        en: "Equipping an official hall for government performances",
      },
      points: [
        {
          ru: "Официальный зал для государственных совещаний и публичных выступлений",
          uz: "Davlat yig'ilishlari va ommaviy chiqishlar uchun rasmiy zal",
          en: "Official hall for government meetings and public speeches",
        },
        {
          ru: "Обеспечить безупречное качество звука и высокую надёжность системы",
          uz: "Benuqson ovoz sifatini va tizimning yuqori ishonchliligini ta'minlash",
          en: "Ensure impeccable sound quality and high system reliability",
        },
        {
          ru: "Было поставлено и настроено профессиональное аудиооборудование, проведено тестирование перед вводом в эксплуатацию",
          uz: "Professional audio jihozlar yetkazib berildi va sozlandi, foydalanishga topshirishdan oldin sinov o'tkazildi",
          en: "Professional audio equipment was supplied and configured, testing was carried out before commissioning",
        },
      ],
      result: {
        ru: "Зал успешно используется для официальных мероприятий, обеспечивая чёткую и разборчивую речь для всех участников",
        uz: "Zal rasmiy tadbirlar uchun muvaffaqiyatli ishlatiladi va barcha ishtirokchilar uchun aniq va tushunarli nutqni ta'minlaydi",
        en: "The hall is successfully used for official events, providing clear and intelligible speech for all participants",
      },
    },
  ];

  return (
    <div className="bg-[#ECDFD2]">
      <Navbar />
      <div className="pt-[64px] sm:pt-[100px]">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] py-8 sm:py-12 lg:py-20">
          <h1
            data-aos="fade-up"
            className="text-[20px] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-8 sm:mb-12 lg:mb-16"
          >
            {t("pages.services.title")}
          </h1>

          <div className="space-y-16 sm:space-y-24 lg:space-y-32">
            {data.map((item, index) => (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-20 items-center"
              >
                {/* Image Section */}
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-xl sm:shadow-2xl aspect-[4/3] touch-manipulation active:scale-[0.99] transition-transform">
                    <img
                      src={item.image}
                      alt={item.title?.[lang] || item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div
                  className={`space-y-4 sm:space-y-6 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <h2 className="text-[16px] sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] leading-tight">
                    {item.title?.[lang] || item.title}
                  </h2>
                  <div className="space-y-3 sm:space-y-4 text-[#333333] text-[13px] sm:text-sm md:text-base lg:text-lg leading-relaxed">
                    {/* Render points array if exists (static data format) */}
                    {item.points && item.points.length > 0 ? (
                      <>
                        {item.points.map((point, idx) => (
                          <p key={idx} className="whitespace-pre-wrap">
                            {point?.[lang] || point}
                          </p>
                        ))}
                      </>
                    ) : (
                      <>
                        {/* Render API data format */}
                        <p className="whitespace-pre-wrap">
                          {item.description?.[lang] || item.description}
                        </p>

                        {item.solution && (
                          <div>
                            <p className="text-[13px] sm:text-sm md:text-base lg:text-lg">
                              {item.solution?.[lang] || item.solution}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {item.result && (
                      <div>
                        <h4 className="font-bold text-[#1A1A1A] mb-1 text-[13px] sm:text-base md:text-lg">
                          {lang === "ru"
                            ? "Результат:"
                            : lang === "uz"
                              ? "Natija:"
                              : "Result:"}
                        </h4>
                        <p className="text-[13px] sm:text-sm md:text-base lg:text-lg">
                          {item.result?.[lang] || item.result}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <ConsultationForm />
        <WhatWeDo />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
