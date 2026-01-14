import React from "react";
import { useTranslation } from "react-i18next";

const AboutMain = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 ">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        {t("about.title_1")}{" "}
        <span className="text-[#71914B]">{t("about.title_2")}</span>
      </h2>
      <p className="text-sm md:text-base text-gray-700 mb-6">
        {t("about.paragraph_1")}
      </p>
      <p className="text-sm md:text-base text-gray-700 mb-6">
        {t("about.paragraph_2")}
      </p>
      <p className="text-sm md:text-base text-gray-700 mb-6">
        {t("about.paragraph_3")}
      </p>
      <p className="text-sm md:text-base text-gray-700">
        {t("about.paragraph_4")}
      </p>
    </div>
  );
};

export default AboutMain;
