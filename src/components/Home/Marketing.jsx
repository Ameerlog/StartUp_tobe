import React, { useRef, useState, useEffect } from "react";
import { Market } from "../../data/marketing";
import { ArrowRight, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Skeleton Card
const MarketingCardSkeleton = () => {
  return (
    <div className="shrink-0 w-64 sm:w-72 px-2">
      <div className="h-[320px] rounded-2xl border border-white/10 bg-[#0A0A0A] p-2 flex flex-col">
        <div className="h-32 rounded-xl bg-white/5 animate-pulse mx-auto w-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-white/10 animate-pulse" />
        </div>

        <div className="p-3 flex flex-col flex-1 gap-3">
          <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse mx-auto" />
          <div className="h-16 bg-white/5 rounded-lg animate-pulse" />
          <div className="mt-auto h-10 w-full bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default function Marketing() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const touchStartRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  const duplicatedMarket = [...Market, ...Market];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Smooth Infinite Marquee
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loading || Market.length === 0) return;

    let scrollSpeed = 0.6; // smooth speed
    let animationId;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += scrollSpeed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, loading]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
    if (loading) return;
    setIsPaused(true);
    resetIdleTimer();
  };

  const handleMouseLeave = () => {
    if (loading) return;
    resetIdleTimer();
  };

  const handleTouchStart = (e) => {
    if (loading) return;
    touchStartRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (loading || touchStartRef.current === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (Math.abs(diff) > 30) {
      handleScroll(diff > 0 ? "right" : "left");
    }

    touchStartRef.current = null;
    resetIdleTimer();
  };

  const handleScroll = (dir) => {
    if (!scrollRef.current || loading) return;

    setIsPaused(true);
    resetIdleTimer();

    const cardWidth = 280;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-12 relative overflow-hidden bg-[#09090b]">
      {/* Header */}
      <div className="text-center px-4 flex flex-col items-center gap-4 mb-8 relative z-20">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white">
          Co-Marketing
        </h2>

        <button
          onClick={() =>
            window.open("https://aultum.com/", "_blank", "noopener,noreferrer")
          }
          className="group flex items-center gap-2 rounded-full border border-white bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/20 active:scale-[0.98]"
        >
          Get Aultum Automation
        </button>
      </div>

      {/* Carousel */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-gradient-to-l from-black to-transparent" />

        {/* Navigation */}
        {!loading && Market.length > 0 && (
          <>
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleScroll("right")}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-black/60 p-3 text-white backdrop-blur-xl transition-all hover:bg-white hover:text-black hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Scroll Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-8 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            [...Array(5)].map((_, index) => (
              <MarketingCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : Market.length === 0 ? (
            <div className="w-full text-center py-20">
              <p className="text-zinc-400">
                No marketing services available at the moment.
              </p>
            </div>
          ) : (
            duplicatedMarket.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={`${card.id}-${index}`}
                  className="shrink-0 w-64 sm:w-72 px-2"
                >
                  <div className="group relative h-[320px] rounded-2xl border border-white/10 bg-[#111] bg-opacity-60 backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
                    
                    {/* Icon Section */}
                    <div className="relative h-32 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-4 border-b border-white/5">
                      <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:border-white/50 group-hover:bg-white/20 transition-all duration-300">
                        {Icon && (
                          <Icon className="w-8 h-8 text-white/70 group-hover:text-white transition-colors duration-300" />
                        )}
                      </div>

                      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded">
                        <p className="text-[9px] font-bold text-emerald-400 uppercase">
                          Popular
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-base font-bold text-white mb-3 text-center line-clamp-2 min-h-[2.5rem]">
                        {card.title}
                      </h3>

                      <div className="bg-white/5 rounded-lg p-3 border border-white/5 mb-4">
                        <div className="flex items-center justify-center gap-1 text-zinc-400 text-[9px] uppercase tracking-wider mb-1">
                          <Tag className="w-3 h-3" /> Price
                        </div>
                        <div className="text-white font-bold text-xl text-center whitespace-nowrap">
                          ₹ {card.price}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <button
                          onClick={() => navigate("/contact")}
                          className="w-full flex items-center justify-center gap-2 rounded-full bg-gray-600 text-white py-2.5 text-xs font-bold uppercase tracking-wider transition-transform active:scale-[0.98] hover:bg-gray-500"
                        >
                          Book a CoBrother
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/marketing")}
          className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-gray-800 hover:border-white/40 active:scale-[0.98]"
        >
          View All Services
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}