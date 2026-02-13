import React, { useRef, useState, useEffect } from "react";
import { jvMarqueeCards } from "../../data/jointVenture";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JointVenture() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const idleTimerRef = useRef(null);

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

  const duplicatedCards = [...jvMarqueeCards, ...jvMarqueeCards];

  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Co-Venture
        </h2>

        <button
          onClick={() => navigate("/coventure-form")}
          className="group flex items-center gap-2 rounded-full border border-white bg-white/10 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-gray-800 active:scale-[0.98] mt-4"
        >
          List Your CoVenture
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
          className={`absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2
            rounded-full border border-white/20 bg-white/10 backdrop-blur-xl
            p-2 sm:p-3 transition-all duration-300
            ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2
            rounded-full border border-white/20 bg-white/10 backdrop-blur-xl
            p-2 sm:p-3 transition-all duration-300
            ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-4 sm:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="shrink-0 w-65 sm:w-75 md:w-85 lg:w-95 px-2 sm:px-3 md:px-4"
            >
              <div className="h-70 sm:h-85 md:h-90 lg:h-95 rounded-xl sm:rounded-2xl border border-white/20 bg-gray-900/60 p-4 sm:p-5 md:p-6 flex flex-col backdrop-blur-sm hover:border-white/30 hover:bg-gray-900/80 transition-all duration-300">

                <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="h-10 sm:h-12 md:h-14 lg:h-[60px] flex items-center shrink-0">
                    <img
                      src={card.logo}
                      alt="JV Brand Logo"
                      className="h-25 max-w-full object-contain"
                      draggable={false}
                    />
                  </div>

                  <div className="h-[48px] sm:h-[54px] md:h-[60px] mt-3 sm:mt-4 overflow-hidden">
                    <p className="text-xs sm:text-[13px] md:text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {card.desc}
                    </p>
                  </div>

                  <div className="h-[80px] sm:h-[90px] md:h-[100px] mt-3 sm:mt-4 space-y-1 sm:space-y-1.5 overflow-hidden">
                    {card.details.slice(0, 3).map((item, index) => (
                      <p
                        key={index}
                        className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 flex gap-1.5 sm:gap-2"
                      >
                        <span className="mt-1 sm:mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white/60 shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <button
                    onClick={() => navigate("/get-ventures")}
                    className="w-full rounded-full bg-gray-600 hover:bg-gray-500 px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs md:text-sm font-medium text-white transition active:scale-[0.98]"
                  >
                    Get Coventure
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center px-4">
        <button
          onClick={() => navigate("/venture")}
          className="flex items-center gap-2 rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-gray-800"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
