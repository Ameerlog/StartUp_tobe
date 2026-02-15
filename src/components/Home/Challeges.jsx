import React, { useMemo } from "react";
import Marquee from "react-fast-marquee";
import {
  ArrowRight,
  Flame,
  IndianRupee,
  Rocket,
  Shield,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const challengesData = [
  {
    id: 1,
    title: "Startup Validation",
    subtitle: "Idea to proof",
    description: "Validate your startup idea with real users",
    price: "₹999",
    icon: Rocket,
  },
  {
    id: 2,
    title: "Revenue Challenge",
    subtitle: "First 10 customers",
    description: "Get your first paying users",
    price: "₹1,499",
    icon: IndianRupee,
  },
  {
    id: 3,
    title: "Growth Sprint",
    subtitle: "Scale fast",
    description: "Rapid growth strategies & execution",
    price: "₹1,999",
    icon: Flame,
  },
  {
    id: 4,
    title: "Security & Trust",
    subtitle: "Build credibility",
    description: "Compliance, trust & systems",
    price: "₹799",
    icon: Shield,
  },
  {
    id: 5,
    title: "Founder League",
    subtitle: "Elite challenge",
    description: "Compete with top founders",
    price: "₹2,499",
    icon: Trophy,
  },
];

export default function Challenges() {
  const navigate = useNavigate();
  const marqueeData = useMemo(() => [...challengesData, ...challengesData], []);

  return (
    <section className="w-full bg-black py-10 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white">
          Co-Creation
        </h2>

        <button
          onClick={() => navigate("/co-creation")}
          className="rounded-full border border-white bg-white/10 px-6 py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xl transition hover:bg-gray-800"
        >
          Explore Challenges
        </button>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent" />

        <Marquee speed={22} gradient={false} pauseOnHover>
          {marqueeData.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={`${card.id}-${index}`}
                className="shrink-0 w-52 sm:w-56 md:w-60 px-2"
              >
                <div
                  className="
   relative
    group
    h-60 sm:h-64 md:h-72 lg:h-80
    rounded-2xl 
    border border-white/10 
    bg-gray-900/60 
    p-4 sm:p-5 md:p-6 
    flex flex-col
    backdrop-blur-sm
    transition-all duration-300 
    hover:bg-gray-900/80 
    hover:border-white/30
    overflow-hidden
  "
                >
                  {/* Grid number badge */}
                  <span
                    className="
      absolute top-3 right-3 sm:top-4 sm:right-4
      rounded-full 
      border border-white/30 
      bg-white/10 
      px-2.5 py-0.5 sm:px-3 sm:py-1
      text-[10px] sm:text-xs
      font-bold text-white
      group-hover:border-white
      group-hover:text-white
      transition-all duration-300
    "
                  >
                    {card.id.toString().padStart(2, "0")}
                  </span>

                  {/* Icon */}
                  <div
                    className="
     w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14
    rounded-xl 
    bg-white/10 
    border border-white/30 
    flex items-center justify-center 
    mb-4 sm:mb-5 md:mb-6
    transition-all duration-300 
    group-hover:border-white
    "
                  >
                    <Icon
                      className="
       w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
      text-white/40 
      transition-colors duration-300 
      group-hover:text-white
      "
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="
      text-sm sm:text-base md:text-lg
      font-bold text-white 
      mb-1 sm:mb-2 md:mb-3
      group-hover:text-red-50
      transition-colors duration-300
    "
                  >
                    {card.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="
      text-xs sm:text-sm md:text-base
      text-gray-300 
      mb-1 sm:mb-2
      leading-relaxed
    "
                  >
                    {card.subtitle}
                  </p>

                  {/* Description */}
                  {card.desc && (
                    <p
                      className="
        text-[11px] sm:text-xs md:text-sm
        text-gray-500
        tracking-wider
      "
                    >
                      {card.desc}
                    </p>
                  )}

                  {/* Button */}
                  <div
                    className="
      mt-auto pt-3 sm:pt-4 md:pt-5
      shrink-0
    "
                  >
                    <button
                      onClick={() => navigate("/contact")}
                      className="
        w-full 
        rounded-full 
        bg-gray-500 
        hover:bg-gray-600 
        px-4 
        py-2 
        text-[11px] sm:text-xs md:text-sm
        font-semibold text-white 
        transition-all duration-200
        active:scale-[0.98]
        shadow-lg
        cursor-pointer
      "
                    >
                      Book a CoBrother
                    </button>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className="
      absolute inset-0 
      rounded-2xl
      bg-gradient-to-br from-red-500/0 to-red-500/0
      group-hover:from-red-500/5 group-hover:to-transparent
      transition-all duration-300
      pointer-events-none
    "
                  />
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/co-creation")}
          className="flex items-center gap-2 rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-gray-800"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
