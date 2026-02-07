import React, { useRef, useState, useEffect } from "react";
import { complianceServices } from "../data/compliance";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Building2,
  Receipt,
  Factory,
  Globe,
  Store,
  ShieldCheck,
  FileText,
} from "lucide-react";

const serviceIcons = {
  "Business Name Registration": Building2,
  "GST Services": Receipt,
  "DIN & Director Services": Factory,
  "MSME / Udyam": Factory,
  "Import Export Code (IEC)": Globe,
  "Trade & Local Licenses": Store,
  "Brand & Digital Compliance": ShieldCheck,
  "Annual & Basic Filings": FileText,
};

export default function ComplianceCards({ variant = "dark" }) {
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
      left: dir === "left" ? -380 : 380,
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

  const duplicatedServices = [...complianceServices, ...complianceServices];

  return (
    <section className={`w-full pt-8 pb-16 relative overflow-hidden ${theme.section}`}>
      <h2 className={`text-center text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold ${theme.heading}`}>
        Compliance Services
      </h2>

      <div
        className="relative mt-6"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r ${theme.fadeFrom} to-transparent`}
        />
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l ${theme.fadeFrom} to-transparent`}
        />

        <button
          onClick={() => handleScroll("left")}
          className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border backdrop-blur-xl p-2 transition-all
            ${theme.navButton}
            ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => handleScroll("right")}
          className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border backdrop-blur-xl p-2 transition-all
            ${theme.navButton}
            ${showButtons ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {duplicatedServices.map((service, index) => {
            const Icon = serviceIcons[service.name];

            return (
              <div key={`${service.id}-${index}`} className="shrink-0 w-[380px] px-5">
                <div
                  className={`min-h-75 rounded-[20px] border ${theme.cardBorder} ${theme.cardBg}
                  p-6 flex flex-col backdrop-blur-sm transition-all
                  hover:border-white/30 hover:bg-gray-900/80`}
                >
                  <div className="flex-1 flex gap-6">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-400 font-semibold group-hover:text-white">
                        {service.name}
                      </h3>

                      <p className="mt-1 text-gray-400 text-sm">
                        Starting at {service.price}
                      </p>

                      <div className="mt-4 space-y-2">
                        {service.points.map((point, i) => (
                          <p key={i} className="text-sm text-gray-400 flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
                            {point}
                          </p>
                        ))}
                      </div>
                    </div>

                    {Icon && (
                      <div className="pt-1">
                        <div className="h-14 w-14 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-white/30" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => navigate("/compliance")}
                      className="w-full rounded-full bg-gray-600 hover:bg-gray-500 px-4 py-2 text-sm font-medium text-white transition-all"
                    >
                      Get Started
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
          onClick={() => navigate("/compliance")}
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
