import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "";

function ProductCard({
  product,
  onOpenModal,
  onCategoryClick,
  className = "",
}) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "ru";

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

  // Get category name from populated category object
  const getCategoryName = () => {
    if (!product.category) return null;
    if (typeof product.category === "object" && product.category.name) {
      if (typeof product.category.name === "object") {
        return (
          product.category.name[currentLang] ||
          product.category.name.ru ||
          product.category.name.uz ||
          ""
        );
      }
      return product.category.name;
    }
    return null;
  };

  const getCategoryId = () => {
    if (!product.category) return null;
    return typeof product.category === "object"
      ? product.category._id
      : product.category;
  };

  const handleCategoryClick = (e) => {
    e.stopPropagation();
    const categoryId = getCategoryId();
    if (categoryId && onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  const categoryName = getCategoryName();

  return (
    <div
      onClick={() => onOpenModal(product)}
      className={`h-auto lg:h-[700px] bg-white rounded-[2.5rem] sm:rounded-[12px] border border-[#EDD9CD] overflow-hidden flex flex-col group/card cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${className}`}
    >
      {/* Image */}
      <div className="relative h-[220px] lg:h-[400px] overflow-hidden bg-white">
        <img
          src={getImageSrc(product.images || product.image)}
          alt={getLocalizedText(product.name)}
          className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
        />
        {/* Category Badge */}
        {categoryName && (
          <button
            onClick={handleCategoryClick}
            className="absolute top-4 left-4 px-3 py-1.5 bg-[#814F25]/90 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#6D421E] transition-colors shadow-md"
          >
            {categoryName}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col flex-grow">
        {/* Category link in content (optional, for mobile visibility) */}
        {categoryName && (
          <button
            onClick={handleCategoryClick}
            className="self-start mb-2 text-xs text-[#814F25] font-medium hover:underline"
          >
            {categoryName}
          </button>
        )}
        <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3 sm:mb-4 leading-tight line-clamp-2">
          {getLocalizedText(product.name)}
        </h3>
        <p className="text-[#5C5C5C] text-sm lg:text-base leading-relaxed mb-4 sm:mb-6 md:mb-8 flex-grow line-clamp-3 sm:line-clamp-4">
          {getLocalizedText(product.description)}
        </p>

        {/* Price */}
        {product.price && (
          <p className="text-2xl font-bold text-[#814F25] mb-3">
            {product.price.toLocaleString()}{" "}
            {t("pages.products.currency") || "UZS"}
          </p>
        )}

        <div className="mt-auto space-y-3 sm:space-y-4 md:space-y-6">
          <p
            className={`font-semibold text-xs sm:text-sm ${
              product.inStock ? "text-green-600" : "text-[#8F491A]"
            }`}
          >
            {product.inStock
              ? t("pages.products.in_stock")
              : t("pages.products.out_of_stock")}
          </p>
          <button className="w-full py-3 sm:py-4 bg-[#814F25] text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-[#6D421E] transition-all hover:scale-[1.02] active:scale-95 shadow-md touch-manipulation">
            {t("pages.products.view_details") || "Batafsil"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
