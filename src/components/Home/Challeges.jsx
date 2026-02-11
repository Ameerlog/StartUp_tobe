import React from "react";
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
  const  marqueeData =[...challengesData, ...challengesData];
  const navigate = useNavigate();

  return (
    <section className="w-full bg-black py-10 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white">
          Co-Creation
        </h2>

        <button
          onClick={() => navigate("/co-creation")}
          className="
            rounded-full
            border border-white/30
            bg-white/10
            px-6 py-3
            text-xs sm:text-sm
            font-bold text-white
            backdrop-blur-xl
            transition-all
            hover:bg-gray-800
          "
        >
          Explore Challenges
        </button>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent" />

        <Marquee speed={22} gradient={false} pauseOnHover>
          {marqueeData.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.id} className="shrink-0 w-52 sm:w-56 md:w-60 px-2">
                <div
                  className="
                    relative
                    group
                    h-60
                    rounded-2xl
                    border border-white/30
                    bg-gray-900/60
                    p-4
                    flex flex-col
                    backdrop-blur-sm
                    transition-all
                    hover:bg-gray-900/80
                  "
                >
                  <span
                    className="
                      absolute top-3 right-3
                      rounded-full
                      border border-white/30
                      bg-white/10
                      px-2.5 py-0.5
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    {card.price}
                  </span>

                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center mb-4 group-hover:border-white">
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1">
                    {card.title}
                  </h3>

                  <p className="text-xs text-gray-300 mb-1">{card.subtitle}</p>

                  <p className="text-[11px] text-gray-500">
                    {card.description}
                  </p>

                  <div className="mt-auto pt-3">
                    <button
                      onClick={() => navigate("/co-creation")}
                      className="
                        w-full
                        rounded-full
                        bg-gray-600 hover:bg-gray-500
                        px-4 py-2
                        text-[11px]
                        font-semibold text-white
                        transition-all
                        active:scale-[0.98]
                      "
                    >
                      Join Challenge
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/co-creation")}
          className="
            flex items-center gap-2
            rounded-full
            border border-white/30
            bg-white/10
            px-6 py-3
            text-sm font-bold text-white
            backdrop-blur-xl
            transition-all
            hover:bg-gray-800
          "
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
