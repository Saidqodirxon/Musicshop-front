import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/navbar";
import SEO from "../../components/SEO";
import Hero from "../../components/home/Hero";
import WhatWeDo from "../../components/home/WhatWeDo";
import ObjectTypes from "../../components/home/ObjectTypes";
import ConsultationForm from "../../components/home/ConsultationForm";
import ProjectExamples from "../../components/home/ProjectExamples";
import CalculateForm from "../../components/home/CalculateForm";
import HowWeWork from "../../components/home/HowWeWork";
import Cases from "../../components/home/Cases";
import FAQ from "../../components/home/FAQ";
import Footer from "../../components/home/Footer";

function Main() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "uz";

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "MusicStore",
    name: "MusicShopUz",
    description:
      currentLang === "uz"
        ? "O'zbekistondagi eng yaxshi musiqa asboblari do'koni"
        : currentLang === "ru"
          ? "Лучший магазин музыкальных инструментов в Узбекистане"
          : "The best music store in Uzbekistan",
    url: "https://music-shop.uz",
    telephone: "+998-XX-XXX-XX-XX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UZ",
      addressLocality: "Tashkent",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.2995",
      longitude: "69.2401",
    },
    image: "https://music-shop.uz/logo.png",
    priceRange: "$$",
  };

  return (
    <>
      <SEO productSchema={homeSchema} />
      <Navbar />
      <Hero />
      <WhatWeDo />
      <ObjectTypes />
      <ConsultationForm />
      <ProjectExamples />
      <CalculateForm />
      <HowWeWork />
      <Cases />
      <FAQ />
      <Footer />
    </>
  );
}

export default Main;
