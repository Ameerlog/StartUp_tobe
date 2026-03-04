import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Globe,
  Tag,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DomainCardSkeleton = () => {
  return (
    <div className="shrink-0 w-64 sm:w-72 px-3">
      <div className="h-[380px] rounded-2xl border border-white/10 bg-[#0A0A0A] p-2 flex flex-col">
        <div className="h-32 rounded-xl bg-white/5 animate-pulse mx-auto w-full" />
        <div className="p-3 flex flex-col flex-1 gap-3">
          <div className="flex justify-between items-start">
            <div className="h-5 w-32 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-12 bg-white/10 rounded-full animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1 flex-1">
            <div className="h-full bg-white/5 rounded-lg animate-pulse" />
            <div className="h-full bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="h-9 w-full bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

/* ================= Glow Card Wrapper ================= */
const GlowCard = ({ children, className }) => {
  const ref = React.useRef(null);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top } = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--gx", `${e.clientX - left}px`);
    ref.current.style.setProperty("--gy", `${e.clientY - top}px`);
  };
  return (
    <div
      ref={ref}
      className={`relative group/glow ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
};

export default function Domains() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const resumeTimer = useRef(null);

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchDomains = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllDomains",
        );

        if (response.ok) {
          const data = await response.json();

          const mapped = data.map((domain) => ({
            id: domain.id,
            name: domain.domainName || "Domain",
            extension: domain.domainExtension || ".com",
            price: domain.askingPrice
              ? `₹${domain.askingPrice.toLocaleString("en-IN")}`
              : "TBA",
            logo: domain.logo || "",
          }));

          setDomains(mapped);
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDomains();
  }, []);

  const duplicatedDomains = [...domains, ...domains];

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loading || domains.length === 0) return;

    let animationId;
    const speed = 0.6;

    const animate = () => {
      if (!isPaused) {
        container.scrollLeft += speed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused, loading, domains]);

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;

    setIsPaused(true);

    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    const cardWidth = 280;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });

    resumeTimer.current = setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  return (
    <section className="w-full py-12 relative overflow-hidden bg-[#09090b]">
      <div className="text-center px-4 flex flex-col items-center gap-4 mb-8 relative z-20">
        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white">
          Co-Branding
        </h2>

        <button
          onClick={() => navigate("/domain-form")}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/30 px-7 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-all duration-300 hover:scale-[1.03] hover:border-white/60 hover:shadow-[0_0_28px_rgba(139,92,246,0.7)] active:scale-[0.98]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative">Resell your Domain</span>
        </button>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          if (resumeTimer.current) clearTimeout(resumeTimer.current);
          resumeTimer.current = setTimeout(() => setIsPaused(false), 1000);
        }}
      >
        {/* Left Button */}
        {!loading && domains.length > 0 && (
          <button
            onClick={() => scrollByAmount("left")}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 rounded-full bg-violet-600/20 border border-violet-500/40 backdrop-blur-md p-2 sm:p-2.5 text-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.35)] transition-all duration-300 hover:bg-violet-600/40 hover:text-violet-200 hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
          </button>
        )}

        {/* Right Button */}
        {!loading && domains.length > 0 && (
          <button
            onClick={() => scrollByAmount("right")}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 rounded-full bg-violet-600/20 border border-violet-500/40 backdrop-blur-md p-2 sm:p-2.5 text-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.35)] transition-all duration-300 hover:bg-violet-600/40 hover:text-violet-200 hover:scale-110 hover:shadow-[0_0_22px_rgba(139,92,246,0.65)] active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronsRight
              className="w-5 h-5 sm:w-6 sm:h-6"
              strokeWidth={2.5}
            />
          </button>
        )}

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#09090b] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#09090b] to-transparent" />

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-8 py-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading
            ? [...Array(5)].map((_, index) => (
                <DomainCardSkeleton key={index} />
              ))
            : duplicatedDomains.map((card, index) => (
                <GlowCard
                  key={`${card.id}-${index}`}
                  className="shrink-0 w-64 sm:w-72 px-3"
                >
                  <div
                    className="group h-[350px] rounded-2xl border border-white/10 bg-[#111] backdrop-blur-md flex flex-col overflow-hidden transition hover:-translate-y-1 hover:border-white/30 hover:shadow-xl cursor-pointer"
                    onClick={() => navigate(`/marketplace/domain/${card.id}`)}
                  >
                    <div className="h-32 flex items-center justify-center border-b border-white/5 p-4 shrink-0">
                      {card.logo && !imageErrors[`${card.id}-${index}`] ? (
                        <img
                          src={`https://cobrother-api.onrender.com/api/images/${card.logo}`}
                          alt={card.name}
                          className="max-h-full object-contain"
                          onError={() =>
                            handleImageError(`${card.id}-${index}`)
                          }
                        />
                      ) : (
                        <span className="text-4xl font-black text-white/10">
                          {card.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="p-4 flex flex-col flex-1 gap-3">
                      <h3 className="text-lg font-bold text-white truncate">
                        {card.name}
                      </h3>

                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col justify-center group-hover:border-white/20 transition-colors duration-300">
                          <div className="text-xs text-zinc-400 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            Price
                          </div>
                          <div className="text-white font-bold text-sm truncate mt-1">
                            {card.price}
                          </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-2 border border-white/5 flex flex-col justify-center group-hover:border-white/20 transition-colors duration-300">
                          <div className="text-xs text-zinc-400 flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Extension
                          </div>
                          <div className="text-white font-bold text-sm truncate mt-1">
                            {card.extension}
                          </div>
                        </div>
                      </div>

                      <button className="mt-auto w-full bg-gray-600 text-white rounded-full py-2 text-xs font-bold hover:bg-gray-500 transition">
                        {" "}
                        Make it Yours
                      </button>
                    </div>
                  </div>
                </GlowCard>
              ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/branding")}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-purple-500/40 bg-purple-500/5 px-8 py-2.5 text-sm font-bold text-purple-300 backdrop-blur-md shadow-[0_0_16px_rgba(139,92,246,0.2)] transition-all duration-300 hover:border-blue-400/60 hover:text-white active:scale-[0.97]"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:via-blue-600/20 group-hover:to-pink-600/20 transition-all duration-300" />
          <span className="relative">View All Domains</span>
          <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
