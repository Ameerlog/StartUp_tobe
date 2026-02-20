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
          <div className="rounded-xl border border-white/20 bg-[#0e1422] h-28 sm:h-32 md:h-36 lg:h-40 shrink-0 flex items-center justify-center">
            <div className="h-16 sm:h-20 w-24 sm:w-28 md:w-32 bg-gray-700/50 rounded-lg" />
          </div>

          <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-2.5">
            <div className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-700/50 shrink-0" />
              <div className="h-3 bg-gray-700/50 rounded w-3/4" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-700/50 shrink-0" />
              <div className="h-3 bg-gray-700/50 rounded w-1/2" />
            </div>
            <div className="flex gap-2 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-700/50 shrink-0" />
              <div className="h-3 bg-gray-700/50 rounded w-2/5" />
            </div>
            <div className="flex gap-2 items-start">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-700/50 shrink-0 mt-1" />
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-700/50 rounded w-full" />
                <div className="h-3 bg-gray-700/50 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>

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
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllBrands"
        );

        if (response.ok) {
          const data = await response.json();

          const validBrands = data.filter(
            (brand) => brand.brandDetails?.brandName
          );

          const mapped = validBrands.map((brand) => {
            let logoUrl = brand.brandDetails?.logoUrl || "";
            if (logoUrl.includes("localhost:8080")) {
              logoUrl = logoUrl.replace(
                "localhost:8080",
                "192.168.29.184:8080"
              );
            }

            const ratioMap = {
              FIFTY_FIFTY: "50:50",
              SIXTY_FORTY: "60:40",
              SEVENTY_THIRTY: "70:30",
              EIGHTY_TWENTY: "80:20",
              NINETY_TEN: "90:10",
              NEGOTIABLE: "Negotiable",
            };
            const rawType = brand.brandDetails?.ventureType || "Negotiable";
            const ventureRatio = ratioMap[rawType] || rawType;

            return {
              id: brand.id,
              logo: logoUrl,
              brandName: brand.brandDetails?.brandName || "Unknown",
              dealValue: `₹${(brand.brandDetails?.dealValue || 0).toLocaleString("en-IN")}`,
              ventureType: ventureRatio,
              desc:
                brand.brandDetails?.description || "No description available",
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

  const handleImageError = (cardId) => {
    setImageErrors((prev) => ({ ...prev, [cardId]: true }));
  };

  const skeletonCount = 6;

  // Styles for 2-line clamp
  const twoLineClampStyle = {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
  };

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
                    p-20 sm:p-5 md:p-6 
                    flex flex-col
                    backdrop-blur-sm
                    hover:border-white/30
                    hover:bg-gray-900/80
                    hover:shadow-lg
                    transition-all duration-300
                    overflow-hidden 
                  "
                >
                  <div className="flex-1 flex flex-col min-h-0">

                    <div
                      className="
                      rounded-xl border   
                        h-30 sm:h-32 md:h-36 lg:h-40 
                        shrink-0
                        overflow-hidden
                        flex items-center justify-center
                        p-2
                      "
                    >
                      {card.logo && !imageErrors[`${card.id}-${index}`] ? (
                        <img
                          src={`https://cobrother-api.onrender.com/api/images/${card.logo}`}
                          alt={card.brandName}
                          className="
                            max-w-full max-h-full w-auto h-auto object-contain
                          "
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                          }}
                          loading="lazy"
                          draggable={false}
                          onError={() =>
                            handleImageError(`${card.id}-${index}`)
                          }
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white/20">
                            {card.brandName.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Details List */}
                    <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                      {/* Brand Name */}
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-300 flex gap-1.5 sm:gap-2 items-start">
                        <span className="mt-1 sm:mt-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/60 shrink-0" />
                        <span className="font-medium truncate max-w-full">
                          {card.brandName}
                        </span>
                      </p>

                      {/* Deal Value */}
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-300 flex gap-1.5 sm:gap-2 items-start">
                        <span className="mt-1 sm:mt-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/60 shrink-0" />
                        <span className="font-medium truncate">
                          {card.dealValue}
                        </span>
                      </p>

                      {/* Venture Type */}
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-gray-300 flex gap-1.5 sm:gap-2 items-start">
                        <span className="mt-1 sm:mt-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/60 shrink-0" />
                        <span className="font-medium truncate">
                          {card.ventureType}
                        </span>
                      </p>

                      {/* Description - Exactly 2 lines with ellipsis */}
                      <div
  className="text-[10px] sm:text-[11px] md:text-xs text-gray-300 flex gap-1.5 sm:gap-2 items-start"
  title={card.desc}
>
  <span className="mt-1 sm:mt-1.5 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white/60 shrink-0" />
  <span className="flex-1 truncate">
    {card.desc}
  </span>
</div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="shrink-0">
                    <button
                      onClick={() => navigate("/get-ventures")}
                      className="
                      
                        w-full
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