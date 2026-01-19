import React from "react";
import MarqueeRow from "../../components/Marquee";
import { domainCards } from "../../data/domain";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Domains({ variant = "dark" }) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  const theme = {
    section: isDark ? "bg-black" : "bg-white",
    heading: isDark ? "text-white" : "text-zinc-900",

    topButton: isDark
      ? "border-white bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",

    fadeFrom: isDark ? "from-black" : "from-white",

    cardBg: isDark ? "bg-gray-900/60" : "bg-white",
    cardBorder: isDark ? "border-white/20" : "border-zinc-200",
    cardTitle: isDark ? "text-white" : "text-zinc-900",

    priceBadge: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",

    imageBox: isDark
      ? "bg-white/10 border-white/20"
      : "bg-zinc-50 border-zinc-200",

    tld: isDark ? "text-white" : "text-zinc-500",

    bottomButton: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",
  };

  return (
    <section
      className={`w-full py-10 sm:py-12 md:py-16 relative overflow-hidden ${theme.section}`}
    >
      {/* Header */}
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold ${theme.heading}`}
        >
          Domains
        </h2>

        <button
          className={`
            group flex items-center gap-2 rounded-full
            border ${theme.topButton}
            px-5 sm:px-6 md:px-8 py-2.5 sm:py-3
            text-xs sm:text-sm font-bold
            backdrop-blur-xl transition-all duration-300
            hover:border-red-400 hover:text-red-400
            active:scale-[0.98]
          `}
        >
          List Domains for Resell
        </button>
      </div>

      {/* Marquee */}
      <div className="relative mt-6 sm:mt-10">
        {/* Left Fade */}
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-linear-to-r ${theme.fadeFrom} to-transparent`}
        />
        {/* Right Fade */}
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-linear-to-l ${theme.fadeFrom} to-transparent`}
        />

        <MarqueeRow
          data={domainCards}
          speed={25}
          renderItem={(card) => {
            const { id, title, price, src } = card;
            return (
              <div
                key={id}
                className="shrink-0 w-[260px] sm:w-[300px] md:w-[320px] px-3"
              >
                <div
                  className={`group h-[360px] rounded-2xl border ${theme.cardBorder} ${theme.cardBg}
                  backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col`}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title + Price */}
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`text-lg font-bold leading-tight ${theme.cardTitle} group-hover:text-red-500 transition-colors`}
                      >
                        {title}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${theme.priceBadge}`}
                      >
                        {price}
                      </span>
                    </div>

                    {/* Image */}
                    <div
                      className={`mt-5 rounded-xl border ${theme.imageBox} flex-1 flex items-center justify-center relative`}
                    >
                      <img
                        src={src}
                        alt={title}
                        className="w-[120px] h-[200px] object-contain"
                        draggable={false}
                        loading="lazy"
                      />

                      <span
                        className={`absolute bottom-3 right-3 text-xs font-bold ${theme.tld}`}
                      >
                        .com
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => navigate("/branding")}
                        className="rounded-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        Make it Yours →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />

        {/* Bottom Button */}
        <div className="mt-10 flex justify-center px-4">
          <button
          onClick={()=> navigate("/branding")}
            className={`
              group flex items-center gap-2 rounded-full
              border ${theme.bottomButton}
              px-6 py-3 text-sm font-bold
              backdrop-blur-xl transition-all duration-300
              hover:border-red-400 hover:text-red-400
              active:scale-[0.98]
            `}
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
