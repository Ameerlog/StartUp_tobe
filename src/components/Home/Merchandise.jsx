import React from "react";
import MarqueeRow from "../../components/Marquee";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ChallengesMarquee({ challenges }) {
  const navigate = useNavigate();

  return (
    <section className="w-full py-10 sm:py-12 md:py-16 relative overflow-hidden bg-black">

      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white">
          Challenges Waiting for Solutions
        </h2>

        <button
          className="
            group flex items-center gap-2 rounded-full
            border border-white bg-white/10
            px-5 sm:px-6 md:px-8 py-2.5 sm:py-3
            text-xs sm:text-sm font-bold text-white
            backdrop-blur-xl transition-all duration-300
            hover:border-white/30 hover:bg-gray-800
            active:scale-[0.98]
          "
        >
          Start Solving
        </button>
      </div>

      <div className="relative mt-6 sm:mt-10">
    
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-linear-to-r from-black to-transparent" />
      
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-linear-to-l from-black to-transparent" />

        <MarqueeRow
          data={challenges}
          speed={25}
          renderItem={(item) => (
            <div
              key={item.title}
              className="
                shrink-0
                w-[260px] sm:w-[300px] md:w-[320px]
                px-3
              "
            >
              <div
                className="
                  group
                  h-[360px]
                  rounded-2xl
                  border border-white/20
                  bg-gray-900/60
                  backdrop-blur-sm
                  flex flex-col
                  transition-all duration-300
                  hover:border-white/30
                  hover:bg-gray-900/80
                "
              >
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  {/* Category + Reward */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white whitespace-nowrap">
                      {item.category}
                    </span>

                    <span className="text-xs sm:text-sm font-bold text-purple-400 whitespace-nowrap">
                      {item.reward}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-white leading-tight group-hover:text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                    {item.desc}
                  </p>

                  {/* CTA */}
                  <div className="mt-auto pt-6 flex justify-end">
                    <button
                      onClick={() => navigate("/challenges")}
                      className="
                        rounded-full
                        bg-gray-600 hover:bg-gray-500
                        px-4 sm:px-6
                        py-2 sm:py-2.5
                        text-xs sm:text-sm
                        font-bold text-white
                        transition-all
                        hover:-translate-y-0.5
                        active:scale-[0.98]
                      "
                    >
                      Join Challenge →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        />

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center px-4">
          <button
            onClick={() => navigate("/challenges")}
            className="
              group flex items-center gap-2 rounded-full
              border border-white bg-white/10
              px-6 py-3 text-sm font-bold text-white
              backdrop-blur-xl transition-all duration-300
              hover:border-white/30 hover:bg-gray-800
              active:scale-[0.98]
            "
          >
            Browse All Challenges
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
