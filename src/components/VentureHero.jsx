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

       

        <div className="mt-12 flex justify-center">
          <div className="h-px w-72 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

      </div>
    </section>
  );
};

export default VentureHero;
