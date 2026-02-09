import React, { useRef, useState, useEffect } from "react";
import { jvMarqueeCards } from "../../data/jointVenture";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JointVenture({ variant = "dark" }) {
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
      left: dir === "left" ? -330 : 330,
      behavior: "smooth",
    });
  };

  const theme = {
    section: isDark ? "bg-black" : "bg-white",
    heading: isDark ? "text-white" : "text-zinc-900",
    fadeFrom: isDark ? "from-black" : "from-white",
    cardBg: isDark ? "bg-gray-900/60" : "bg-white",
    cardBorder: isDark ? "border-white/20" : "border-zinc-200",
    navButton: isDark
      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
      : "border-zinc-300 bg-white text-zinc-700",
    bottomButton: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",
  };

  const duplicatedCards = [...jvMarqueeCards, ...jvMarqueeCards];

  return (
    <section
      className={`w-full py-10 sm:py-12 md:py-16 relative overflow-hidden ${theme.section}`}
    >
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold ${theme.heading}`}>
          CoVenture
        </h2>
      </div>

      <div
        className="relative mt-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-20 bg-gradient-to-r ${theme.fadeFrom} to-transparent`}
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-20 bg-gradient-to-l ${theme.fadeFrom} to-transparent`}
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
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="shrink-0 w-65 sm:w-75 md:w-85 px-2 sm:px-3"
            >
              <div
                className={`h-65 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}
                  backdrop-blur-sm p-4 sm:p-5 flex flex-col transition-all
                  hover:border-white/30 hover:bg-gray-900/80`}
              >
                <div className="h-14 flex items-center">
                  <img
                    src={card.logo}
                    alt={card.title}
                    className="h-full object-contain scale-200 ml-5"
                  />
                </div>

                <div className="mt-4 space-y-1">
                  {card.details.slice(0, 3).map((item, i) => (
                    <p key={i} className="text-xs text-gray-400">
                      • {item}
                    </p>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() => navigate("/venture")}
                    className="w-full rounded-full bg-gray-600 hover:bg-gray-500 px-4 py-2 text-xs font-bold text-white transition-all"
                  >
                    Get CoVenture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/venture")}
          className={`flex items-center gap-2 rounded-full border ${theme.bottomButton}
            px-6 py-3 text-sm font-bold backdrop-blur-xl transition-all hover:bg-gray-800`}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
