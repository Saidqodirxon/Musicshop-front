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
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() =>
          setOpenIndex(openIndex === actualIndex ? null : actualIndex)
        }
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
      >
        <span className="text-[17px] text-[#2D3748] font-normal leading-[1.5]">
          {faq.question?.[lang] || faq.question?.ru || faq.question}
        </span>
        <div className="flex-shrink-0">
          {openIndex === actualIndex ? (
            <Minus
              className="w-[22px] h-[22px] text-[#718096]"
              strokeWidth={1.5}
            />
          ) : (
            <Plus
              className="w-[22px] h-[22px] text-[#718096]"
              strokeWidth={1.5}
            />
          )}
        </div>
      </button>

      {openIndex === actualIndex && (
        <div className="px-6 pb-5 text-[15px] text-[#718096] leading-[1.7]">
          {faq.answer?.[lang] || faq.answer?.ru || faq.answer}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <section className="py-24 bg-[#E8DDD0]">
        <div className="mx-auto px-8" style={{ maxWidth: "1400px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-20 bg-white/50 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#E8DDD0]">
      <div className="mx-auto px-8" style={{ maxWidth: "1400px" }}>
        {/* Section Header */}
        <div className="mb-12">
          <p className="text-[14px] text-[#B8936D] uppercase tracking-[0.2em] mb-4 font-semibold">
            {lang === "ru"
              ? "ОТВЕТЫ НА ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ"
              : lang === "uz"
              ? "KO'P SO'RALADIGAN SAVOLLARGA JAVOBLAR"
              : "ANSWERS TO FREQUENTLY ASKED QUESTIONS"}
          </p>
          <h2 className="text-[40px] font-bold text-[#2D3748] leading-[1.2]">
            {lang === "ru"
              ? "Нажмите по вопросу, чтобы получить на"
              : lang === "uz"
              ? "Javob olish uchun savolni"
              : "Click on a question to get"}
            <br />
            {lang === "ru"
              ? "него ответ"
              : lang === "uz"
              ? "bosing"
              : "an answer"}
          </h2>
        </div>

        {/* FAQ Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          {/* Left Column */}
          <div className="space-y-5">
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
          <div className="space-y-5">
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
