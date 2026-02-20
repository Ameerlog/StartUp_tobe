import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JointVentureCardSkeleton = () => {
  return (
    <div
      className="
        shrink-0 
        w-65 sm:w-75 md:w-85 lg:w-95 
        px-2 sm:px-3 md:px-4
      "
    >
      <div
        className="
          h-70 sm:h-85 md:h-90 lg:h-95
          rounded-xl sm:rounded-2xl 
          border border-white/20 
          bg-gray-900/60 
          p-4 sm:p-5 md:p-6 
          flex flex-col
          backdrop-blur-sm
        "
      >
        <div className="flex-1 flex flex-col overflow-hidden animate-pulse">
          <div className="h-10 sm:h-12 md:h-14 lg:h-[60px] flex items-center shrink-0">
            <div className="h-8 sm:h-10 md:h-12 w-24 sm:w-28 md:w-32 bg-gray-700/50 rounded-lg" />
          </div>

          <div className="h-[48px] sm:h-[54px] md:h-[60px] mt-3 sm:mt-4 space-y-2">
            <div className="h-3 sm:h-3.5 bg-gray-700/50 rounded w-full" />
            <div className="h-3 sm:h-3.5 bg-gray-700/50 rounded w-5/6" />
            <div className="h-3 sm:h-3.5 bg-gray-700/50 rounded w-4/6" />
          </div>

          <div className="h-[80px] sm:h-[90px] md:h-[100px] mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex gap-1.5 sm:gap-2 items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-700/50 shrink-0" />
                <div
                  className="h-2.5 sm:h-3 bg-gray-700/50 rounded"
                  style={{ width: `${70 - index * 15}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto pt-4 shrink-0">
          <div className="w-full h-9 sm:h-10 bg-gray-700/50 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default function JointVenture() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const touchStartRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const truncateText = (text, maxLength = 73) => {
    if (!text) return "No description";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllBrands",
        );

        if (response.ok) {
          const data = await response.json();

          // Filter out empty brands
          const validBrands = data.filter(
            (brand) => brand.brandDetails?.brandName,
          );

          // Map to card format
          const mapped = validBrands.map((brand) => {
            let logoUrl = brand.brandDetails?.logoUrl || "";
            if (logoUrl.includes("localhost:8080")) {
              logoUrl = logoUrl.replace(
                "localhost:8080",
                "192.168.29.184:8080",
              );
            }

            return {
              id: brand.id,
              logo: logoUrl,
              desc: truncateText(brand.brandDetails?.description, 73),
              details: [
                brand.brandDetails?.brandName || "Unknown",
                `₹${(brand.brandDetails?.dealValue || 0).toLocaleString("en-IN")}`,
                "Get Venture",
              ],
            };
          });

          setBrands(mapped);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const duplicatedBrands = [...brands, ...brands];

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loading || brands.length === 0) return;

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
  }, [isPaused, loading, brands.length]);

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
    if (Math.abs(diff) > 50) {
      handleScroll(diff > 0 ? "right" : "left");
    }
    touchStartRef.current = null;
    resetIdleTimer();
  };

  const handleScroll = (dir) => {
    if (!scrollRef.current || loading) return;
    setIsPaused(true);
    resetIdleTimer();

    const firstCard = scrollRef.current.querySelector(":scope > div");
    const scrollAmount = firstCard ? firstCard.offsetWidth : 330;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const skeletonCount = 6;

  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Co-Venture
        </h2>

        <button
          onClick={() => navigate("/coventure-form")}
          className="
            group
            flex items-center gap-2
            rounded-full
            border border-white
            bg-white/10
            px-5 sm:px-6 md:px-8
            py-2.5 sm:py-3
            text-xs sm:text-sm
            font-bold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-white/30
            hover:text-white
            hover:bg-gray-800
            active:scale-[0.98]
            mt-4
          "
        >
          List Your Venture
        </button>
      </div>

      <div
        className="relative mt-6 sm:mt-8 md:mt-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="
            pointer-events-none absolute left-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-gradient-to-r from-black to-transparent
          "
        />

        <div
          className="
            pointer-events-none absolute right-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-gradient-to-l from-black to-transparent
          "
        />

        {!loading && brands.length > 0 && (
          <>
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-1 sm:left-2 md:left-4 top-1/2 z-20 -translate-y-1/2
                rounded-full border backdrop-blur-xl
                p-1.5 sm:p-2 md:p-3 transition-all duration-300
                border-white/20 bg-white/10 text-white hover:bg-white/20
                opacity-80 hover:opacity-100 active:scale-95
              "
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => handleScroll("right")}
              className="absolute right-1 sm:right-2 md:right-4 top-1/2 z-20 -translate-y-1/2
                rounded-full border backdrop-blur-xl
                p-1.5 sm:p-2 md:p-3 transition-all duration-300
                border-white/20 bg-white/10 text-white hover:bg-white/20
                opacity-80 hover:opacity-100 active:scale-95
              "
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-2 sm:px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {loading ? (
            [...Array(skeletonCount)].map((_, index) => (
              <JointVentureCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : brands.length === 0 ? (
            <div className="text-center py-16 w-full">
              <p className="text-white/60">
                No brands available yet. Be the first to list!
              </p>
            </div>
          ) : (
            duplicatedBrands.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="
                  shrink-0 
                  w-65 sm:w-75 md:w-85 lg:w-95 
                  px-2 sm:px-3 md:px-4
                "
              >
                <div
                  className="
                    h-70 sm:h-85 md:h-90 lg:h-95
                    rounded-xl sm:rounded-2xl 
                    border border-white/20 
                    bg-gray-900/60 
                    p-4 sm:p-5 md:p-6 
                    flex flex-col
                    backdrop-blur-sm
                    hover:border-white/30
                    hover:bg-gray-900/80
                    hover:shadow-lg
                    transition-all duration-300
                  "
                >
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="h-10 sm:h-12 md:h-14 lg:h-[60px] flex items-center shrink-0">
                      <img
                        src={`https://cobrother-api.onrender.com/api/images/${card.logo}`}
                        alt={card.logo}
                        className="h-50 max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>

                    <div className="h-[48px] sm:h-[54px] md:h-[60px] mt-3 sm:mt-4 overflow-hidden">
                      <p
                        className="
                          text-xs sm:text-[13px] md:text-sm 
                          text-gray-300 
                          leading-relaxed
                          line-clamp-3
                        "
                      >
                        {card.desc}
                      </p>
                    </div>

                    <div className="h-[80px] sm:h-[90px] md:h-[100px] mt-3 sm:mt-4 space-y-1 sm:space-y-1.5 overflow-hidden">
                      {card.details.slice(0, 3).map((item, idx) => (
                        <p
                          key={idx}
                          className="
                            text-[10px] sm:text-[11px] md:text-xs 
                            text-gray-400 
                            flex gap-1.5 sm:gap-2
                          "
                        >
                          <span
                            className="
                              mt-1 sm:mt-1.5 
                              h-1 w-1 sm:h-1.5 sm:w-1.5 
                              rounded-full bg-white/60 
                              shrink-0
                            "
                          />
                          <span className="line-clamp-1">{item}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div
                    className="
                      mt-auto pt-4
                      flex flex-col sm:flex-row 
                      gap-2 sm:gap-2.5 md:gap-3
                      shrink-0 cursor-pointer
                    "
                  >
                    <button
                      onClick={() => navigate("/get-ventures")}
                      className="
                        w-full sm:flex-1 
                        rounded-full 
                        bg-gray-600 hover:bg-gray-500
                        px-3 sm:px-4 
                        py-2 sm:py-2.5 
                        text-[10px] sm:text-xs md:text-sm 
                        font-medium text-white 
                        shadow-lg hover:shadow-white-500/25
                        active:scale-[0.98]
                        transition-all duration-200
                        cursor-pointer
                      "
                    >
                      Get Coventure
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex justify-center px-4">
        <button
          onClick={() => navigate("/venture")}
          className="
            group 
            flex items-center gap-2
            rounded-full
            border border-white
            bg-white/10
            px-5 sm:px-6 md:px-8 
            py-2.5 sm:py-3
            text-xs sm:text-sm 
            font-semibold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-white/30
            hover:text-white
            hover:bg-gray-800
            active:scale-[0.98]
            cursor-pointer
          "
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
