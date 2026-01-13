import React from "react";

const VentureHero = () => {
  return (
    <section className="relative overflow-hidden pb-0 pt-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-500/18 via-indigo-500/10 to-transparent blur-3xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(113,113,122,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-3xl text-center">
            

            <p className="mt-3 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
             Partner with Startuptobe: Let’s Build Together 
            </p>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600">
              Joint Venture opportunities for startups, founders, and innovators. Access tools, branding, and compliance support while we grow together. 
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/apply"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
              >
              Apply for Joint Venture
              </a>
            </div>

           

            <div className="mt-10 flex justify-center">
              <div className="h-px w-72 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VentureHero;
