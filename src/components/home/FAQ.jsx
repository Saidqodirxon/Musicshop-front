import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getFAQ } from "../../services/api";
import { Plus, Minus } from "lucide-react";

const FAQ = () => {
  const { i18n } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const lang = i18n.language;

  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const data = await getFAQ();
        setFaqs(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQ();
  }, []);

  // Split FAQs into two columns
  const leftFaqs = faqs.filter((_, i) => i % 2 === 0);
  const rightFaqs = faqs.filter((_, i) => i % 2 === 1);

  const FAQItem = ({ faq, index, actualIndex }) => (
    <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:bg-[#F9F7F4]">
      <button
        onClick={() =>
          setOpenIndex(openIndex === actualIndex ? null : actualIndex)
        }
        className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 touch-manipulation active:scale-[0.99] transition-transform"
      >
        <span className="text-[15px] sm:text-[17px] text-[#2D3748] font-semibold leading-[1.5]">
          {faq.title?.[lang] ||
            faq.title?.ru ||
            faq.title ||
            faq.question?.[lang] ||
            faq.question?.ru ||
            faq.question}
        </span>
        <div className="flex-shrink-0">
          {openIndex === actualIndex ? (
            <Minus
              className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#718096]"
              strokeWidth={1.5}
            />
          ) : (
            <Plus
              className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[#718096]"
              strokeWidth={1.5}
            />
          )}
        </div>
      </button>

      {openIndex === actualIndex && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-5">
          {faq.description?.[lang] ||
          faq.description?.ru ||
          faq.description ||
          faq.answer?.[lang] ||
          faq.answer?.ru ||
          faq.answer ? (
            <p className="text-[14px] sm:text-[15px] text-[#718096] leading-[1.7] mb-3">
              {faq.description?.[lang] ||
                faq.description?.ru ||
                faq.description ||
                faq.answer?.[lang] ||
                faq.answer?.ru ||
                faq.answer}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-24 bg-[#E8DDD0]">
        <div
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{ maxWidth: "1400px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-16 sm:h-20 bg-white/50 rounded-xl sm:rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-24 bg-[#E8DDD0]">
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: "1400px" }}
      >
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#8F4E24] uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 font-bold">
            {lang === "ru"
              ? "ОТВЕТЫ НА ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ"
              : lang === "uz"
                ? "KO'P SO'RALADIGAN SAVOLLARGA JAVOBLAR"
                : "ANSWERS TO FREQUENTLY ASKED QUESTIONS"}
          </p>
          <h2 className="text-[28px] sm:text-[34px] lg:text-[42px] font-bold text-[#1A1A1A] leading-[1.2]">
            {lang === "ru"
              ? "Нажмите по вопросу, чтобы получить ответ"
              : lang === "uz"
                ? "Javob olish uchun savolni bosing"
                : "Click on a question to get an answer"}
          </h2>
        </div>

        {/* FAQ Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-5">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-5">
            {leftFaqs.map((faq, index) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                index={index}
                actualIndex={index * 2}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-5">
            {rightFaqs.map((faq, index) => (
              <FAQItem
                key={faq._id}
                faq={faq}
                index={index}
                actualIndex={index * 2 + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
