import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarqueeRow from "../components/Marqueerow";
import FeaturesSection from "../components/Featuredsection";
import HowItWorksSection from "../components/HowitWorks";
import BentoGrid from "../components/BentoGrid";
import FAQ from "../components/Faq";
import HeroImage from  "../assets/domain/jointventure.png";
const Marketing = () => {
  return (
    <div className="min-h-screen bg-[#faf7ff] px-1.5 sm:px-2 lg:px-3 py-1.5 sm:py-2">
     <div className="relative mx-auto max-w-360 min-h-[calc(90vh-1rem)] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
     
      <img
        src={HeroImage}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />

  
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4 pt-10 sm:pt-14 mt-24">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white">
          One marketplace for startups-to-be
        </h1>

        <p className="mt-6 max-w-3xl text-white/70 text-base sm:text-lg">
          From domains and branding to SaaS tools, automation, and operations —
          everything you need to launch and grow, in one place.
        </p>

        <MarqueeRow />

        <div className="mt-8 sm:mt-10 w-full max-w-2xl flex flex-col items-center gap-4 sm:gap-6">
          <Link
            to="/get-started"
            className="inline-flex h-12 sm:h-14 min-w-35 items-center justify-center rounded-4xl bg-white text-black px-5 sm:px-8 text-sm sm:text-base font-bold shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-black/40"
          >
            Get Started
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <p className="text-sm sm:text-base text-white/50">
            Start free ✦ Upgrade only when you&apos;re ready
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-4 -bottom-12 mx-auto h-40 sm:h-56 max-w-6xl rounded-[36px] bg-linear-to-r from-white/5 via-white/10 to-white/5 blur-2xl"
        />
      </div>
    </div>

      <FeaturesSection />
      
      <HowItWorksSection/>
      <BentoGrid/>
      <FAQ/>
    </div>
  );
};

export default Marketing;
