import React from "react";
import Marquee from "react-fast-marquee";
import { ArrowRight } from "lucide-react";
import { 
  Wifi, 
  WashingMachine, 
  Palette, 
  ChefHat, 
  Sparkles, 
  Coffee, 
  Cpu, 
  Layers, 
  Bot, 
  Puzzle 
} from "lucide-react";

const aiRoboticsCards = [
  {
    id: 1,
    title: "SMART ACCESS",
    subtitle: "AI-enabled wireless systems",
    desc: "for handles & touch points",
    icon: Wifi,
  },
  {
    id: 2,
    title: "INTELLIGENT LAUNDRY",
    subtitle: "AI logic for washing systems",
    desc: "sorting · detection · efficiency",
    icon: WashingMachine,
  },
  {
    id: 3,
    title: "AI-POWERED MANUFACTURING",
    subtitle: "Color accuracy through vision",
    desc: "detection · correction · control",
    icon: Palette,
  },
  {
    id: 4,
    title: "AUTOMATED COOKING",
    subtitle: "AI control for kitchen systems",
    desc: "timing · temperature · process",
    icon: ChefHat,
  },
  {
    id: 5,
    title: "SMART DISHWASHING",
    subtitle: "AI-driven wash intelligence",
    desc: "sense · adapt · optimize",
    icon: Sparkles,
  },
  {
    id: 6,
    title: "AI COFFEE SYSTEMS",
    subtitle: "Precision intelligence for brewers",
    desc: "consistency · control · quality",
    icon: Coffee,
  },
  {
    id: 7,
    title: "EMBEDDED INTELLIGENCE",
    subtitle: "AI inside existing hardware",
    desc: "no redesign required",
    icon: Cpu,
  },
  {
    id: 8,
    title: "HARDWARE + SOFTWARE",
    subtitle: "We integrate. Not manufacture.",
    desc: "",
    icon: Layers,
  },
  {
    id: 9,
    title: "EVERYDAY ROBOTICS",
    subtitle: "Practical automation for real life",
    desc: "",
    icon: Bot,
  }
];

export default function AIRobotics() {
  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
      {/* Header */}
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
            AI & Robotics
          </h2>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base font-medium tracking-widest uppercase">
          Enablement Only
        </p>

        <button
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
            hover:border-red-400
            hover:text-red-400
            hover:bg-white/20
            active:scale-[0.98]
            mt-4
          "
        >
          Partner With Us
        </button>
      </div>

      {/* Marquee Section */}
      <div className="relative mt-6 sm:mt-8 md:mt-10">
        {/* Left fade */}
        <div 
          className="
            pointer-events-none absolute left-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-gradient-to-r from-black to-transparent
          " 
        />
        
        {/* Right fade */}
        <div 
          className="
            pointer-events-none absolute right-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-gradient-to-l from-black to-transparent
          " 
        />

        <Marquee
          speed={24}
          gradient={false}
          pauseOnHover
          pauseOnClick
        >
          {aiRoboticsCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="
                  shrink-0 
                  w-56 sm:w-64 md:w-72 lg:w-80
                  px-2 sm:px-3 md:px-4
                "
              >
                <div 
                  className="
                    group
                    h-64 sm:h-72 md:h-80 lg:h-88
                    rounded-xl sm:rounded-2xl 
                    border border-white/20 
                    bg-gray-900/60 
                    p-4 sm:p-5 md:p-6 
                    flex flex-col
                    backdrop-blur-sm
                    hover:border-red-400/50
                    hover:bg-gray-900/80
                    transition-all duration-300
                    relative
                    overflow-hidden
                  "
                >
                  {/* Grid number badge */}
                  <div 
                    className="
                      absolute top-3 right-3 sm:top-4 sm:right-4
                      w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8
                      rounded-full
                      bg-white/5
                      border border-white/10
                      flex items-center justify-center
                      text-[9px] sm:text-[10px] md:text-xs
                      text-gray-500
                      font-mono
                      group-hover:border-red-400/30
                      group-hover:text-red-400/70
                      transition-all duration-300
                    "
                  >
                    {card.id.toString().padStart(2, '0')}
                  </div>

                  {/* Icon */}
                  <div 
                    className="
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                      rounded-xl sm:rounded-2xl
                      bg-gradient-to-br from-red-500/20 to-red-600/10
                      border border-red-500/20
                      flex items-center justify-center
                      mb-4 sm:mb-5 md:mb-6
                      group-hover:border-red-400/40
                      group-hover:from-red-500/30
                      transition-all duration-300
                    "
                  >
                    <IconComponent 
                      className="
                        w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7
                        text-red-400
                        group-hover:text-red-300
                        transition-colors duration-300
                      " 
                    />
                  </div>

                  {/* Title */}
                  <h3 
                    className="
                      text-sm sm:text-base md:text-lg
                      font-bold text-white
                      tracking-wide
                      mb-2 sm:mb-3
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
                      leading-relaxed
                      mb-1 sm:mb-2
                    "
                  >
                    {card.subtitle}
                  </p>

                  {/* Description */}
                  {card.desc && (
                    <p 
                      className="
                        text-[10px] sm:text-xs md:text-sm
                        text-gray-500
                        tracking-wider
                      "
                    >
                      {card.desc}
                    </p>
                  )}

                  {/* Buttons */}
                  <div 
                    className="
                      mt-auto pt-4 sm:pt-5
                      flex flex-col sm:flex-row 
                      gap-2 sm:gap-2.5 md:gap-3
                      shrink-0
                    "
                  >
                    <button 
                      className="
                        w-full sm:flex-1 
                        rounded-full 
                        border border-white/40 
                        bg-white/5 
                        px-3 sm:px-4 
                        py-2 sm:py-2.5 
                        text-[10px] sm:text-xs md:text-sm 
                        font-medium text-white 
                        hover:bg-white/10 hover:border-white/60 
                        active:scale-[0.98]
                        transition-all duration-200
                      "
                    >
                      Learn More
                    </button>

                    <button 
                      className="
                        w-full sm:flex-1 
                        rounded-full 
                        bg-red-600 hover:bg-red-500 
                        px-3 sm:px-4 
                        py-2 sm:py-2.5 
                        text-[10px] sm:text-xs md:text-sm 
                        font-medium text-white 
                        shadow-lg hover:shadow-red-500/25
                        active:scale-[0.98]
                        transition-all duration-200
                      "
                    >
                      Get Started
                    </button>
                  </div>

                  {/* Hover glow effect */}
                  <div 
                    className="
                      absolute inset-0 
                      rounded-xl sm:rounded-2xl
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

      {/* Bottom CTA */}
      <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex justify-center px-4">
        <button
          className="
            group 
            flex items-center gap-2
            rounded-full
            border border-white/30
            bg-white/10
            px-5 sm:px-6 md:px-8 
            py-2.5 sm:py-3
            text-xs sm:text-sm 
            font-semibold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-red-400
            hover:text-red-400
            hover:bg-white/20
            active:scale-[0.98]
          "
        >
          View All Capabilities
          <ArrowRight
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}