import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const Advantages = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="max-w-[1400px] mx-auto px-4 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
          {t("advantages.title_1")}{" "}
          <span className="text-[#71914B]">{t("advantages.title_2")}</span>
        </h2>

        <div className="mt-6 space-y-3 text-gray-700">
          <div>
            <h3 className="text-[#71914B] font-semibold">
              {t("advantages.guarantee.title")}
            </h3>
            <p className="text-sm mt-1">
              {t("advantages.guarantee.description")}
            </p>
          </div>
          <div>
            <h3 className="text-[#71914B] font-semibold">
              {t("advantages.materials.title")}
            </h3>
            <p className="text-sm mt-1">
              {t("advantages.materials.description")}
            </p>
          </div>
          <div>
            <h3 className="text-[#71914B] font-semibold">
              {t("advantages.price.title")}
            </h3>
            <p className="text-sm mt-1">{t("advantages.price.description")}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/projects")}
          className="mt-10   text-white px-8 py-2 rounded-full bg-[#71914B] hover:bg-[#72914bb0] transition"
        >
          {t("advantages.button")}
        </button>
      </div>

      <div>
        <img
          src="/adv.png"
          alt={t("advantages.imageAlt")}
          className="rounded-xl w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Advantages;
