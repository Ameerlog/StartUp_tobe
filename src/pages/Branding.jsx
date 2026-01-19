import React from "react";
import MarketPlace from "./MarketPlace";

function CTAButtons() {
  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <a
        href="/pricing"
        className="group inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-slate-900/20 hover:bg-red-600 hover:shadow-red-600/30 hover:scale-105 transition-all duration-300"
      >
        Get Started
      </a>

     
    </div>
  );
}

export default function Branding() {
  return (
    <main className="relative min-h-screen bg-[#F8F9FA] text-slate-900">


      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />


      <section className="relative pt-25 pb-10 text-center z-10">
        <div className="mx-auto max-w-4xl px-4">

          <h1 className="mt-2 text-5xl sm:text-6xl font-bold tracking-tighter">
            Branding
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500 font-medium leading-relaxed">
            We provide premium domains, branded merchandise, and memorable numbers
            to help businesses and individuals build a strong, unique identity.
          </p>

          <CTAButtons />

      

          <div className="mt-8 flex justify-center">
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
        </div>
      </section>

      {/* MARKETPLACE */}
      <section className="relative z-10">
        <MarketPlace />
      </section>

    </main>
  );
}
