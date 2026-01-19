import React from "react";
import Marquee from "react-fast-marquee";
import { Market } from "../../data/marketing";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Marketing() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Marketing
        </h2>
        <button
          className="
            rounded-full
            border border-white
            bg-white/10
            px-6 md:px-8
            py-2.5 md:py-3
            text-xs sm:text-sm
            font-bold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-red-400
            hover:text-red-400
            hover:bg-white/20
            active:scale-[0.98]
          "
        >
          List your Products
        </button>
      </div>

      <div className="relative mt-6 sm:mt-8 md:mt-10">
        {/* Left Gradient */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent" />
        
        {/* Right Gradient */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent" />

        <Marquee
          speed={24}
          gradient={false}
          pauseOnHover
          autoFill
        >
          {Market.map((card) => {
            const Icon = card.icon;

            return (
              <div key={card.id} className="shrink-0 px-3 sm:px-4">
                <div
                  className="
                    group
                    w-56 sm:w-64 md:w-72
                    rounded-xl sm:rounded-2xl
                    border border-white/20
                    bg-gray-900/60
                    backdrop-blur-sm
                    p-4 sm:p-5 md:p-6
                    flex flex-col
                    transition-all duration-300
                    hover:border-red-400/50
                    hover:bg-gray-900/80
                    hover:shadow-lg
                    hover:shadow-red-500/10
                  "
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div 
                      className="
                        w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18
                        rounded-xl sm:rounded-2xl
                        bg-gradient-to-br from-red-500/20 to-red-600/10
                        border border-red-500/20
                        flex items-center justify-center
                        group-hover:border-red-400/40
                        group-hover:from-red-500/30
                        transition-all duration-300
                      "
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-white text-center mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                    {card.title}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center justify-center mb-4">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      ₹ {card.price}
                    </p>
                  </div>

                  {/* Explore Button */}
                  <button
                    className="
                      w-full
                      rounded-full
                      bg-gradient-to-r from-red-600 to-red-500
                      hover:from-red-500 hover:to-red-400
                      px-4 sm:px-5
                      py-2.5 sm:py-3
                      text-xs sm:text-sm
                      font-bold text-white
                      shadow-lg hover:shadow-red-500/25
                      active:scale-[0.98]
                      transition-all duration-200
                      flex items-center justify-center gap-2
                    "
                  >
                    Schedule a Visit
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center px-4">
        <button
          className="
            group
            flex items-center gap-2
            rounded-full
            border border-white/30
            bg-white/10
            px-6 md:px-8
            py-2.5 md:py-3
            text-xs sm:text-sm
            font-semibold text-white
            backdrop-blur-xl
            transition-all duration-300
            hover:border-red-400
            hover:text-red-400
            hover:bg-white/20
            active:scale-[0.98]
          "
          onClick={()=>navigate('/marketing')}
        >
          View All
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}