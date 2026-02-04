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
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold ${theme.heading}`}
        >
          Co-Brandings
        </h2>

        <button
        onClick={() => navigate("/domain-form")}
          className={`
            group flex items-center gap-2 rounded-full
            border border-white
            bg-white/10
             ${theme.topButton}
            px-5 sm:px-6 md:px-8 py-2.5 sm:py-3
            text-xs sm:text-sm font-bold
            backdrop-blur-xl transition-all duration-300
            hover:border-white/30
            hover:text-white
            hover:bg-gray-800

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
                className="shrink-0 w-[260px] sm:w-[300px] md:w-[320px] px-3
                 border-white/30 
                
                hover:border-white/30
                hover:bg-gray-900/80
                transition-shadow duration-300
                "
              >
                <div
                  className={`group h-[360px] rounded-2xl border ${theme.cardBorder} ${theme.cardBg}
                  backdrop-blur-sm flex flex-col
                  shadow-white
                   hover:border-white/30
                hover:bg-gray-900/80
                  transition-all duration-300 `}
                >
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    {/* Title + Price */}
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <h3
                        className={`text-base sm:text-lg text-white/50 font-bold leading-tight ${theme.cardTitle} 
                        group-hover:text-white
                        transition-colors flex-1 min-w-0`}
                      >
                        {title}
                      </h3>

                      {/* Responsive Price Pill */}
                      <span
                        className={`
                          shrink-0 
                          rounded-full 
                          border 
                          font-bold 
                          ${theme.priceBadge}
                          
                          /* Mobile - smaller */
                          px-2 py-0.5 text-[10px]
                          
                          /* Small screens */
                          sm:px-2.5 sm:py-1 sm:text-xs
                          
                          /* Medium screens and up */
                          md:px-3 md:py-1 md:text-xs
                          
                          /* Large screens */
                          lg:px-4 lg:py-1.5 lg:text-sm
                          
                          /* Ensure text doesn't wrap */
                          whitespace-nowrap
                          
                          /* Optional: add max-width for very long prices */
                          max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-none
                          truncate
                        `}
                        title={price} /* Show full price on hover if truncated */
                      >
                        {price}
                      </span>
                    </div>

                    {/* Image */}
                    <div
                      className={`mt-4 sm:mt-5 rounded-xl 
                        border 
                        border-white/30
                      bg-[#0e1422]
                        flex-1 flex 
                        items-center 
                        justify-center 
                        relative
                        `}
                    >
                      <img
                        src={src}
                        alt={title}
                        className="w-full h-[180px] sm:h-[200px] object-contain"
                        draggable={false}
                        loading="lazy"
                      />

                      <span
                        className={`absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-[10px] sm:text-xs font-bold ${theme.tld}`}
                      >
                        .com
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-4 sm:mt-6 flex justify-end">
                      <button
                        onClick={() => navigate("/branding")}
                        className="
                        rounded-full 
                        bg-linear-to-r 
                        bg-gray-600 
                        hover:bg-gray-500 
                        px-4 sm:px-6 
                        py-2 sm:py-2.5 
                        text-xs sm:text-sm 
                        font-bold 
                        text-white 
                        shadow-lg 
                        transition-all 
                        hover:-translate-y-0.5 
                        active:scale-[0.98] 
                        cursor-pointer"
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
        <div className="group relative mt-10 flex justify-center px-4">
          <button
            onClick={() => navigate("/branding")}
            className={`
              group flex items-center gap-2 rounded-full
              border-white
              border ${theme.bottomButton}
              px-6 py-3 text-sm font-bold
              backdrop-blur-xl transition-all duration-300
              group-hover:border-white/30
               group-hover:text-white
               hover:bg-gray-800

              active:scale-[0.98]
              cursor-pointer
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