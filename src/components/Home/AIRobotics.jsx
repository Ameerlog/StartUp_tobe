import React, { useRef, useState, useEffect } from "react";
import { aiRoboticsData } from "../../data/aiRobotics";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIRobotics() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 1.2;

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
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const duplicatedCards = [...aiRoboticsData, ...aiRoboticsData];

  return (
    <section className="w-full bg-black py-10 sm:py-12 md:py-16 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white">
          Co-Operation
        </h2>

        <button className="rounded-full border border-white bg-white/10 px-6 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-gray-800 hover:border-white/30">
          Partner With Us
        </button>
      </div>

      <div
        className="relative mt-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-20 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-20 bg-gradient-to-l from-black to-transparent" />

        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-white/10 p-2 sm:p-3 backdrop-blur-xl transition-all ${
            showButtons
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/20 bg-white/10 p-2 sm:p-3 backdrop-blur-xl transition-all ${
            showButtons
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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
                className="shrink-0 w-56 sm:w-64 md:w-72 lg:w-80 px-2 sm:px-3"
              >
                <div className="group h-64 sm:h-72 md:h-80 rounded-2xl border border-white/30 bg-gray-900/60 p-4 sm:p-5 flex flex-col backdrop-blur-sm transition-all hover:bg-gray-900/80">
                  <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-xs text-gray-400">
                    {card.id.toString().padStart(2, "0")}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-white/40 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm text-gray-300 mb-1">{card.subtitle}</p>

                  {card.desc && (
                    <p className="text-xs text-gray-500">{card.desc}</p>
                  )}

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => navigate("/ai")}
                      className="w-full rounded-full bg-gray-600 hover:bg-gray-500 px-4 py-2 text-xs font-semibold text-white transition-all active:scale-[0.98]"
                    >
                      Schedule a Visit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/ai")}
          className="flex items-center gap-2 rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition-all hover:bg-gray-800"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
