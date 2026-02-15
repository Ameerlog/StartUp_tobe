import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Skeleton Component for Domain Card
const DomainCardSkeleton = ({ isDark }) => {
  const theme = {
    cardBg: isDark ? "bg-gray-900/60" : "bg-white",
    cardBorder: isDark ? "border-white/20" : "border-zinc-200",
    skeletonBg: isDark ? "bg-gray-700/50" : "bg-zinc-200",
  };

  return (
    <div className="shrink-0 w-65 sm:w-75 md:w-[320px] px-2 sm:px-3">
      <div
        className={`h-85 sm:h-90 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}
          backdrop-blur-sm flex flex-col`}
      >
        <div className="p-4 sm:p-5 flex-1 flex flex-col animate-pulse">
          {/* Domain Name Skeleton */}
          <div className={`h-5 sm:h-6 ${theme.skeletonBg} rounded-md w-3/4`} />

          {/* Logo Area Skeleton */}
          <div
            className={`mt-4 rounded-xl border border-white/30 bg-[#0e1422] flex-1 flex items-center justify-center relative overflow-hidden`}
          >
            <div
              className={`w-full h-40 sm:h-45 md:h-50 ${theme.skeletonBg}`}
            />
            {/* Extension Skeleton */}
            <div
              className={`absolute bottom-2 right-2 mb-15 h-4 w-10 ${theme.skeletonBg} rounded`}
            />
          </div>

          {/* Price Badge Skeleton */}
          <div className="mt-3">
            <div className={`h-7 w-24 ${theme.skeletonBg} rounded-full`} />
          </div>

          {/* Button Skeleton */}
          <div className="mt-auto pt-3 flex justify-end">
            <div className={`h-8 w-28 ${theme.skeletonBg} rounded-full`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Domains({ variant = "dark" }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const isDark = variant === "dark";

  const [isPaused, setIsPaused] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const idleTimerRef = useRef(null);

  // Fetch state
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch domains - skeleton shows until data is loaded
  useEffect(() => {
    const fetchDomains = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllDomains",
        );
        const data = await response.json();
        setDomains(data);
      } catch (error) {
        console.error("Failed to fetch domains:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomains();
  }, []);

  const duplicatedDomains = [...domains, ...domains];

  // Auto-scroll animation - only starts after data is loaded
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isLoading || domains.length === 0) return;

    let scrollSpeed = 1;

    const animate = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isLoading, domains.length]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    idleTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      setShowButtons(false);
    }, 5000);
  };

  const handleMouseEnter = () => {
    if (isLoading) return;
    setIsPaused(true);
    setShowButtons(true);
    resetIdleTimer();
  };

  const handleMouseLeave = () => {
    if (isLoading) return;
    resetIdleTimer();
  };

  const handleScroll = (dir) => {
    if (!scrollRef.current || isLoading) return;

    setIsPaused(true);
    setShowButtons(true);
    resetIdleTimer();

    const scrollAmount = 330;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const theme = {
    section: isDark ? "bg-black" : "bg-white",
    heading: isDark ? "text-white" : "text-zinc-900",
    fadeFrom: isDark ? "from-black" : "from-white",
    cardBg: isDark ? "bg-gray-900/60" : "bg-white",
    cardBorder: isDark ? "border-white/20" : "border-zinc-200",
    cardTitle: isDark ? "text-white" : "text-zinc-900",
    priceBadge: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",
    tld: isDark ? "text-white" : "text-zinc-500",
    bottomButton: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",
    navButton: isDark
      ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
      : "border-zinc-300 bg-white/80 text-zinc-700 hover:bg-white",
  };

  const skeletonCount = 6;

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
          disabled={isLoading}
          className={`
            group flex items-center gap-2 rounded-full
            border border-white
            bg-white/10
            text-white
            px-5 sm:px-6 md:px-8 py-2.5 sm:py-3
            text-xs sm:text-sm font-bold
            backdrop-blur-xl transition-all duration-300
            hover:border-white/30
            hover:text-white
            active:scale-[0.98]
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          Resell your Domain
        </button>
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

        {!isLoading && domains.length > 0 && (
          <>
            <button
              onClick={() => handleScroll("left")}
              className={`absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2
                rounded-full border backdrop-blur-xl
                p-2 sm:p-3 transition-all duration-300
                ${theme.navButton}
                ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
              `}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => handleScroll("right")}
              className={`absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2
                rounded-full border backdrop-blur-xl
                p-2 sm:p-3 transition-all duration-300
                ${theme.navButton}
                ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
              `}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-4 sm:px-8"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {isLoading ? (
            // Skeleton Loading State - Shows until API response is received
            [...Array(skeletonCount)].map((_, index) => (
              <DomainCardSkeleton key={`skeleton-${index}`} isDark={isDark} />
            ))
          ) : domains.length === 0 ? (
            // Empty State
            <div className="w-full text-center py-10">
              <p
                className={`text-lg ${isDark ? "text-gray-400" : "text-zinc-500"}`}
              >
                No domains available at the moment.
              </p>
            </div>
          ) : (
            // Actual Domain Cards - Shows after data is loaded
            duplicatedDomains.map((domain, index) => {
              const displayName = domain.domainName || "Domain";
              const displayExt = domain.domainExtension || ".com";
              const displayPrice = domain.askingPrice
                ? `₹${domain.askingPrice.toLocaleString("en-IN")}`
                : "Price TBA";
              const domainId = domain.slug || domain._id || domain.id;

              return (
                <div
                  key={`${domainId}-${index}`}
                  className="shrink-0 w-65 sm:w-75 md:w-[320px] px-2 sm:px-3"
                >
                  <div
                    className={`group/card h-85 sm:h-90 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}
                      backdrop-blur-sm flex flex-col transition-all duration-300
                      hover:border-white/30 hover:bg-gray-900/80 relative`}
                  >
                    <button
                      onClick={() =>
                        navigate(`/marketplace/domain/${domain.id}`)
                      }
                      className="absolute inset-0 z-10"
                      aria-label={`View ${displayName}`}
                    />
                    <div className="p-4 sm:p-5 flex-1 flex flex-col">
                      <h3
                        className={`text-base sm:text-lg font-bold leading-tight
                          ${theme.cardTitle}`}
                      >
                        {displayName}
                      </h3>

                      <div className="mt-4 rounded-xl border border-white/30 bg-[#0e1422] flex-1 flex items-center justify-center relative">
                        {domain.logo ? (
                          <img
                            src={domain.logo}
                            alt={displayName}
                            className="w-full h-40 sm:h-45 md:h-50 object-contain"
                            draggable={false}
                          />
                        ) : (
                          <div className="text-4xl font-bold text-white/20">
                            {displayName.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                        <span
                          className={`absolute bottom-2 right-2 mb-15 text-xs font-bold ${theme.tld}`}
                        >
                          {displayExt}
                        </span>
                      </div>

                      <div className="mt-3">
                        <span
                          className={`inline-block rounded-full border font-bold ${theme.priceBadge}
                            px-3 py-1 text-xs`}
                        >
                          {displayPrice}
                        </span>
                      </div>

                      <div className="mt-auto pt-3 flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/marketplace/domain/${domain.id}`);
                          }}
                          className="rounded-full bg-gray-600 hover:bg-gray-500
                            px-4 py-2 text-xs font-bold text-white
                            transition-all hover:-translate-y-0.5 relative z-20"
                        >
                          Make it Yours →
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

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/branding")}
          disabled={isLoading}
          className={`flex items-center gap-2 rounded-full
            border ${theme.bottomButton}
            px-6 py-3 text-sm font-bold
            backdrop-blur-xl transition-all
            hover:bg-gray-800
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
