import { useState, useEffect } from "react";
import { getFAQ } from "../../services/api";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-[#ECDFD2]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#ECDFD2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <div className="mb-10 lg:mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8F4E24] mb-3 font-bold">
            FAQ
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight">
            Часто задаваемые вопросы
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-transparent hover:border-[#C08552] transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 lg:px-8 py-5 lg:py-6 text-left flex items-center justify-between hover:bg-[#F5EDE4]/30 transition-colors group"
              >
                <span className="font-bold text-[#1A1A1A] text-base lg:text-lg pr-4 group-hover:text-[#8F4E24] transition-colors">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F5EDE4] group-hover:bg-[#8F4E24] flex items-center justify-center transition-all">
                  <svg
                    className={`w-5 h-5 text-[#8F4E24] group-hover:text-white transition-all ${openIndex === index ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 lg:px-8 pb-5 lg:pb-6 text-[#5C5C5C] text-base leading-relaxed border-t border-[#ECDFD2]">
                  <div className="pt-5 lg:pt-6">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
