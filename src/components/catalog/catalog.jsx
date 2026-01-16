import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const [categories, setCategories] = useState([]);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || "ru";
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://back.fasadmaster.uz/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
      });
  }, [currentLang]); // Til o‘zgarsa qayta render

  const getCategoryName = (category) => {
    return category[`name_${currentLang}`] || category.name_r;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16 mt-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
        {t("catalog.title_1")}{" "}
        <span className="text-[#71914B]">{t("catalog.title_2")}</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <img
              src={cat.image?.url}
              alt={getCategoryName(cat)}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <p className="font-medium text-gray-700 text-sm md:text-base mb-4">
              {getCategoryName(cat)}
            </p>
            <Link
              to={`/services/${cat._id}`}
              className=" bg-[#71914B] hover:bg-[#72914bb0] text-white px-4 py-1 text-sm rounded-full  transition"
            >
              {t("catalog.more")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
