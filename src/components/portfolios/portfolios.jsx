import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Portfolios = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://back.fasadmaster.uz/portfolios?is_visible=true&page[limit]=10000"
      )
      .then((res) => {
        setImages(res.data.data);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
        {t("portfolio.title_1")}{" "}
        <span className="text-[#71914B]">{t("portfolio.title_2")}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((item) => (
          <div key={item._id} className="overflow-hidden rounded-xl shadow-sm">
            <img
              src={item.image[0]?.url}
              alt={t("portfolio.imageAlt")}
              className="w-full h-60 object-cover hover:scale-105 transition duration-300 rounded-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolios;
