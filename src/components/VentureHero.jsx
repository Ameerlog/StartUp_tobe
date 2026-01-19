import React from "react";
import { ArrowRight } from "lucide-react";

const VentureHero = () => {
  return (
    <section className="relative w-full bg-[#F8F9FA] overflow-hidden">

      {/* grid background */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-20 text-center z-10">

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-slate-900">
          Partner with PreUnicorns
        </h1>

        <p className="mt-3 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
          Joint Venture opportunities for startups, founders, and innovators.
          <br className="hidden sm:block" />
          <span className="text-slate-900">
            Build, scale, and grow together with full support.
          </span>
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href="/apply"
            className="group flex items-center gap-2 rounded-full bg-slate-900 text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-red-600 hover:shadow-red-600/30 hover:scale-105 transition-all duration-300"
          >
            Apply for Joint Venture
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="h-px w-72 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

      </div>
    </section>
  );
};

export default VentureHero;
