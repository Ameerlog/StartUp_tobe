import React from "react";
import { Link } from "react-router-dom";
import MarqueeRow from "../components/Marqueerow";
import FeaturesSection from "../components/Featuredsection";
import HowItWorksSection from "../components/HowitWorks";
import BentoGrid from "../components/BentoGrid";
import FAQ from "../components/Faq";
import MarketPlace from "../pages/MarketPlace";

import MarketingBg from "../assets/icons/marketing1.svg";
import AultumLogo from "../assets/domain/aultumlogo.png";

const Marketing = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/70" />
        <div className="absolute top-0 left-1/4 w-96 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-24 sm:pt-30">
        <div className="text-center flex flex-col items-center">
          <img
            src={AultumLogo}
            alt="Aultum"
            className="w-20 h-20 object-contain mb-6 scale-250"
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-4xl">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              AI-Powered operations
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              for modern business
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-neutral-400">
            Aultum combines marketing tools, CRM, communication, automation, and
            operations in one unified system.
          </p>

          <div className="mt-8">
            <Link
              to="https://aultum.com/"
              className="relative inline-flex items-center overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
              <span className="relative px-6 py-3 text-sm font-semibold text-white">
                Start Using Aultum →
              </span>
            </Link>
          </div>

          <div className="mt-10 w-full max-w-5xl overflow-hidden">
            <div className="relative mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <MarqueeRow />
            </div>
          </div>

          <p className="mt-8 text-xs sm:text-sm text-neutral-500">
            Start free ✦ Upgrade only when you&apos;re ready
          </p>
        </div>

        <div className="mt-16 sm:mt-20 w-full max-w-6xl mx-auto px-2 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-800/70 bg-neutral-900/70 backdrop-blur-xl shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/60 bg-neutral-950/60">
              <span className="h-3 w-3 rounded-full bg-neutral-700" />
              <span className="h-3 w-3 rounded-full bg-neutral-700" />
              <span className="h-3 w-3 rounded-full bg-neutral-700" />
            </div>

            <img
              src={MarketingBg}
              alt="Marketing Preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <section className="relative z-10 mt-14 sm:mt-16">
        <MarketPlace />
      </section>

      <section className="relative z-10 mt-14 sm:mt-16 pb-10 sm:pb-14 px-4 sm:px-6">
        <div className="mx-auto max-w-6xl text-center mb-10 sm:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Get started with brands
            </span>
            <span className="block mt-3 text-xl sm:text-2xl text-neutral-400 font-medium">
              from {"\u20B9"}9999 / month
            </span>
          </h2>
        </div>

        <div className="space-y-14 sm:space-y-18 lg:space-y-20">
          <FeaturesSection />
          <HowItWorksSection />
          <BentoGrid />
          <FAQ />
        </div>
      </section>
    </section>
  );
};

export default Marketing;