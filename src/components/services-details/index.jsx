import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ServiceByCategoryIdDetails = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [view1, setView1] = useState([]);
  const [view2, setView2] = useState([]);
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language || "ru";

  useEffect(() => {
    axios.get(`https://back.fasadmaster.uz/categories`).then((res) => {
      const cat = res.data.data.find((c) => c._id === id);
      if (cat) setCategoryName(cat[`name_${currentLang}`] || cat.name_uz);
    });

    axios
      .get(`https://back.fasadmaster.uz/services?view=1&categoryId=${id}`)
      .then((res) => setView1(res.data.data));

    axios
      .get(`https://back.fasadmaster.uz/services?view=2&categoryId=${id}`)
      .then((res) => setView2(res.data.data));
  }, [id, currentLang]);

  const getName = (item) => item[`name_${currentLang}`] || item.name_uz;
  const getDescription = (item) =>
    (item[`description_${currentLang}`] || item.description_uz).split(
      /\n|\r\n|\r/
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
        <span className="text-[#71914B]">{categoryName?.toUpperCase()}</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-12">
        {view1.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <img
              src={item.image[0]?.url}
              alt={getName(item)}
              className="w-full h-32 object-cover rounded mb-3"
            />
            <button
              // to={"/contacts"}
              className=" bg-[#71914B] text-white text-sm px-4 py-1 rounded-full mb-2"
            >
              {t("narxi")}: {Number(item.price).toLocaleString()} {t("summ2")}
            </button>
            <p className="font-medium text-gray-700 text-sm md:text-base mb-4">
              {getName(item)}
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              {getDescription(item).map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {view2.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row items-center gap-6 mb-12"
        >
          <div className="w-[50%]">
            <h3 className="text-xl font-semibold text-[#71914B] mb-4">
              {getName(item)}
            </h3>
            <p className="w-[50%] flex flex-wrap text-sm text-gray-700 whitespace-pre-line">
              {item[`description_${currentLang}`] || item.description_uz}
            </p>
          </div>
          <img
            src={item.image[0]?.url}
            alt={getName(item)}
            className="md:w-[50%] w-full rounded-xl object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ServiceByCategoryIdDetails;
