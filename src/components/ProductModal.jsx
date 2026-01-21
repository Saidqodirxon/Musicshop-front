import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function ProductModal({ product, isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "ru";

  if (!isOpen || !product) return null;

  const getImageSrc = (images) => {
    const img = Array.isArray(images) ? images[0] : images;
    if (!img) return "";
    if (img.startsWith("http")) return img;
    return `${API_URL}${img}`;
  };

  const getLocalizedText = (text) => {
    if (typeof text === "object" && text !== null) {
      return text[currentLang] || text.ru || text.uz || text.en || "";
    }
    return text || "";
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
        >
          <X className="w-6 h-6 text-[#814F25]" />
        </button>

        {/* Product Images */}
        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-gray-100">
          <img
            src={getImageSrc(product.images || product.image)}
            alt={getLocalizedText(product.name)}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="p-6 sm:p-8 lg:p-10">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1A1A] mb-4">
            {getLocalizedText(product.name)}
          </h2>

          {/* Category */}
          {product.category && (
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-[#ECDFD2] text-[#814F25] rounded-full text-sm font-semibold">
                {getLocalizedText(product.category.name || product.category)}
              </span>
            </div>
          )}

          {/* Price */}
          {product.price && (
            <div className="mb-6">
              <p className="text-3xl font-bold text-[#814F25]">
                {product.price.toLocaleString()} {t("pages.products.currency") || "UZS"}
              </p>
            </div>
          )}

          {/* Stock Status */}
          <div className="mb-6">
            <p
              className={`inline-block px-4 py-2 rounded-lg font-semibold text-sm ${
                product.inStock
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.inStock
                ? t("pages.products.in_stock")
                : t("pages.products.out_of_stock")}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">
              {t("pages.products.description") || "Tavsif"}
            </h3>
            <p className="text-[#5C5C5C] text-base lg:text-lg leading-relaxed whitespace-pre-line">
              {getLocalizedText(product.description)}
            </p>
          </div>

          {/* Additional Images */}
          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                {t("pages.products.gallery") || "Rasmlar"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {product.images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-100"
                  >
                    <img
                      src={img.startsWith("http") ? img : `${API_URL}${img}`}
                      alt={`${getLocalizedText(product.name)} ${idx + 2}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contacts"
              className="flex-1 py-4 bg-[#814F25] text-white rounded-xl font-bold text-base sm:text-lg hover:bg-[#6D421E] transition-all hover:scale-[1.02] active:scale-95 shadow-lg text-center"
            >
              {t("pages.products.contact") || "Bog'lanish"}
            </a>
            <button
              onClick={onClose}
              className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-300 transition-all hover:scale-[1.02] active:scale-95 text-center"
            >
              {t("pages.products.close") || "Yopish"}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default ProductModal;
