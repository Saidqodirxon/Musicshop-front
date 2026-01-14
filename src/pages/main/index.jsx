import React from "react";
import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/home/Hero";
import HowWeWork from "../../components/home/HowWeWork";
import Solutions from "../../components/home/Solutions";
import Services from "../../components/home/Services";
import ConsultationForm from "../../components/home/ConsultationForm";
import Cases from "../../components/home/Cases";
import FAQ from "../../components/home/FAQ";
import Footer from "../../components/home/Footer";
import SolutionDetails from "../../components/home/SolutionDetails";
import ContactForm from "../../components/home/ContactForm";
function Main() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Solutions />
      <ConsultationForm />
      <SolutionDetails />
      <ContactForm />
      <HowWeWork />
      <Cases />
      <FAQ />
      <Footer />

    </>
  );
}

export default Main;
