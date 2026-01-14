import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ServicesMain = () => {
  const [services, setServices] = useState([]);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || "ru";

  useEffect(() => {
    axios
      .get(
        "https://back.fasadmaster.uz/services?is_visible=true&page[limit]=10000000000"
      )
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
      });
  }, [currentLang]); // ⬅️ Til o‘zgarganda qayta chaqiradi

  const getName = (service) => {
    return service[`name_${currentLang}`] || service.name_uz;
  };

  const getDescriptionLines = (service) => {
    const desc =
      service[`description_${currentLang}`] || service.description_uz;
    return desc.split(/\\n|\\r\\n|\\r|\n/).filter((line) => line.trim() !== "");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {services.map((service) => (
        <div
          key={service._id}
          className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row md:items-center md:gap-6"
        >
          <div className="md:w-1/2">
            <img
              src={service.image[0]?.url}
              alt={getName(service)}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex justify-center mt-4 md:mt-2">
              <Link
                to={`/services`}
                className="bg-[#71914B] hover:bg-[#72914bb0] text-white px-8 py-2 rounded-full transition"
              >
                {t("catalog.more")}
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold text-[#71914B]">
              {getName(service)}
            </h2>
            <p className="text-gray-700 mt-2">
              {t("narxi")}: {Number(service.price).toLocaleString()}{" "}
              {t("summ2")}
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
              {getDescriptionLines(service).map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesMain;
