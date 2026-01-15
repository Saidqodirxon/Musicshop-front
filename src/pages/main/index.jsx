import React from "react";
import Navbar from "../../components/navbar/navbar";
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
  return (
    <>
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
