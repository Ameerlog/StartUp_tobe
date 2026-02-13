import React, { useRef, useState, useEffect } from "react";
import { Market } from "../../data/marketing";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Marketing() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const speed = 1;

    const animate = () => {
      if (!isPaused && container) {
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

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

  const handleMouseLeave = () => {
    resetIdleTimer();
  };

  const handleScroll = (dir) => {
    if (!scrollRef.current) return;

    setIsPaused(true);
    setShowButtons(true);
    resetIdleTimer();

    const scrollAmount = 330;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const duplicatedCards = [...Market, ...Market];

  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Marketing
        </h2>

        <button
          onClick={() =>
            window.open("https://aultum.com/", "_blank", "noopener,noreferrer")
          }
          className="rounded-full border border-white bg-white/10 px-6 md:px-8 py-2.5 md:py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-gray-800 active:scale-[0.98]"
        >
          Get Aultum Automation
        </button>
      </div>

      <div
        className="relative mt-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent" />

        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl p-2 sm:p-3 transition-all duration-300 ${
            showButtons
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl p-2 sm:p-3 transition-all duration-300 ${
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
                className="shrink-0 px-3 sm:px-4 w-56 sm:w-64 md:w-72"
              >
                <div className="group rounded-xl sm:rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur-sm p-4 sm:p-5 md:p-6 flex flex-col transition-all duration-300 hover:border-white/30 hover:bg-gray-900/80 hover:shadow-lg">

                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-xl sm:rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:border-white">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-white/70 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white text-center mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {card.title}
                  </h3>

                  <div className="flex items-center justify-center mb-4">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      ₹ {card.price}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/contact")}
                    className="w-full rounded-full bg-gray-600 hover:bg-gray-500 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    Book a CoBrother
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center px-4">
        <button
          onClick={() => navigate("/marketing")}
          className="flex items-center gap-2 rounded-full border border-white bg-white/10 px-6 md:px-8 py-2.5 md:py-3 text-xs sm:text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-gray-800 active:scale-[0.98]"
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
