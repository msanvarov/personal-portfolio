"use client";
import { Bio } from "@/components/bio.component";
import { Capabilities } from "@/components/capabilities.component";
import { Contact } from "@/components/contact.component";
import { CV } from "@/components/cv.component";
import { HeroBanner } from "@/components/hero-banner.component";
import { LeftNavbar } from "@/components/layout";
import { Offerings } from "@/components/offerings.component";
import { Portfolio } from "@/components/portfolio.component";
import AOS from "aos";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Lightbox.option({
    //   resizeDuration: 200,
    //   fadeDuration: 600,
    //   imageFadeDuration: 600,
    //   wrapAround: true,
    // });
  }, []);
  return (
    // TODO: Prep for CMS
    <>
      {/* for mobile */}
      <LeftNavbar />
      <HeroBanner />
      <Bio />
      <CV />
      <Offerings />
      <Capabilities />
      <Portfolio />
      {/* <Testimonials /> */}
      <Contact />
    </>
  );
}
