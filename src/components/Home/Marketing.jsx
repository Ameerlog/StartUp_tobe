import React, { useRef, useState, useEffect } from "react";
import { Market } from "../../data/marketing";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Marketing({ variant = "dark" }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const idleTimerRef = useRef(null);

  const isDark = variant === "dark";
  const [isPaused, setIsPaused] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 1;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused]);

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setShowButtons(false);
    }, 3000);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    setShowButtons(true);
    resetIdleTimer();
  };

  const handleMouseLeave = () => resetIdleTimer();

  const handleScroll = (dir) => {
    if (!scrollRef.current) return;

    setIsPaused(true);
    setShowButtons(true);
    resetIdleTimer();

    scrollRef.current.scrollBy({
      left: dir === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  const theme = {
    section: isDark ? "bg-black" : "bg-white",
    heading: isDark ? "text-white" : "text-zinc-900",
    fadeFrom: isDark ? "from-black" : "from-white",
    cardBg: isDark ? "bg-gray-900/60" : "bg-white",
    cardBorder: isDark ? "border-white/10" : "border-zinc-200",
    navButton:
      "border-white/20 bg-white/10 text-white hover:bg-white/20",
    bottomButton:
      "border-white bg-white/10 text-white hover:bg-gray-800",
  };

  const duplicatedCards = [...Market, ...Market];

  return (
    <section
      className={`w-full py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden ${theme.section}`}
    >
      <div className="text-center px-4">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold ${theme.heading}`}>
          Marketing
        </h2>
      </div>

      <div
        className="relative mt-6 sm:mt-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r ${theme.fadeFrom} to-transparent`}
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l ${theme.fadeFrom} to-transparent`}
        />

        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2
            rounded-full border backdrop-blur-xl p-2 sm:p-3 transition-all
            ${theme.navButton}
            ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2
            rounded-full border backdrop-blur-xl p-2 sm:p-3 transition-all
            ${theme.navButton}
            ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-4 sm:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={`${card.id}-${index}`}
                className="shrink-0 px-3 sm:px-4"
              >
                <div
                  className={`
                    group
                    w-56 sm:w-64 md:w-72
                    rounded-xl sm:rounded-2xl
                    border ${theme.cardBorder}
                    ${theme.cardBg}
                    backdrop-blur-sm
                    p-4 sm:p-5 md:p-6
                    flex flex-col
                    transition-all duration-300
                    hover:border-white/30
                    hover:bg-gray-900/80
                  `}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white text-center mb-3 min-h-[2.5rem]">
                    {card.title}
                  </h3>

                  <p className="text-xl sm:text-2xl font-bold text-white text-center mb-4">
                    ₹ {card.price}
                  </p>

                  <button
                    onClick={() => navigate("/marketing")}
                    className="mt-auto w-full rounded-full bg-gray-600 hover:bg-gray-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition-all"
                  >
                    Schedule a Visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 sm:mt-10 flex justify-center px-4">
        <button
          onClick={() => navigate("/marketing")}
          className={`flex items-center gap-2 rounded-full border ${theme.bottomButton}
            px-6 md:px-8 py-2.5 md:py-3 text-xs sm:text-sm font-semibold
            backdrop-blur-xl transition-all active:scale-[0.98]`}
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
