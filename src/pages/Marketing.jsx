import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarqueeRow from "../components/Marqueerow";
import FeaturesSection from "../components/Featuredsection";
import HowItWorksSection from "../components/HowitWorks";
import BentoGrid from "../components/BentoGrid";
import FAQ from "../components/Faq";

import MarketingBg from "../assets/domain/marketingbg.svg";
import MarketPlace  from "../pages/MarketPlace"
const Marketing = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
      

      <div className="relative mx-auto max-w-360 rounded-3xl sm:rounded-[40px] overflow-hidden bg-white/90 border border-slate-200 shadow-sm">
    
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-10 sm:pt-16">
          
        
          

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 max-w-4xl leading-[1.15] mt-10">
               Aultum  <br className="hidden sm:block" />
            <span className="relative inline-block text-red-600">
               All in One CRM, Automation & AI Ready Platform 

          
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-red-200 -z-10 block" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-slate-500 font-medium">
               Aultum combines marketing tools, CRM, communication, automation, and operations in one system.  
          </p>

        
          <div className="mt-8 w-full max-w-5xl overflow-hidden text-slate-900">
             <div className="relative w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <MarqueeRow />
             </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
            <Link
              to="/get-started"
              className="group inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-red-600 px-6 sm:px-8 text-sm sm:text-base font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:scale-[1.02] hover:bg-red-700"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Start free ✦ Upgrade only when you&apos;re ready
            </p>
          </div>

          <div className="mt-12 w-220 max-w-6xl px-2 sm:px-6 pb-10 sm:pb-16 ">
            <div className="relative rounded-xl sm:rounded-2xl bg-slate-50 ring-1 ring-slate-900/5 shadow-2xl overflow-hidden group">

              <div className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-3 bg-white border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200 group-hover:bg-red-400 transition-colors"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200 group-hover:bg-green-400 transition-colors"></div>
                </div>
                <div className="hidden sm:block mx-auto w-1/3 h-5 bg-slate-50 rounded-md border border-slate-100"></div>
              </div>
              
              <img
                src={MarketingBg}
                alt="Platform Preview"
                className="w-full h-auto object-cover bg-white
                "
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-40 bg-linear-to-t from-white via-white/80 to-transparent" />
        </div>
      </div>
      <div className="mt-15 "><MarketPlace/></div>
  


  



      <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-8">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center">
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900">
      Get started with brands from ₹9999 per/month
    </h2>
  </div>
        <FeaturesSection />
        <HowItWorksSection />
        <BentoGrid />
        <FAQ />
      </div>
    </div>
  );
};

export default Marketing;