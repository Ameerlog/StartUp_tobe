import React from "react";
import Marquee from "react-fast-marquee";
import { jvMarqueeCards } from "../../data/jointVenture";
import { ArrowRight } from "lucide-react";

export default function JointVenture() {
  return (
    <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden">
 
      <div className="text-center px-4 flex flex-col items-center gap-4">
  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
    Joint Venture
  </h2>

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
     List Your Venture
   
    </button>
</div>

      <div className="relative mt-6 sm:mt-8 md:mt-10">
   
        <div 
          className="
            pointer-events-none absolute left-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-linear-to-r from-black to-transparent
          " 
        />
        

        <div 
          className="
            pointer-events-none absolute right-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-linear-to-l from-black to-transparent
          " 
        />

        <Marquee
          speed={24}
          gradient={false}
          pauseOnHover
          pauseOnClick
          scrollable
        >
          {jvMarqueeCards.map((card) => (
            <div
              key={card.id}
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
                  transition-all duration-300
                "
              >
            
                <div className="flex-1 flex flex-col overflow-hidden">
      
                  <div className="h-10 sm:h-12 md:h-14 lg:h-[60px] flex items-center shrink-0">
                    <img
                      src={card.logo}
                      alt="JV Brand Logo"
                      className="h-full max-w-full object-contain"
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
                    {card.details.slice(0, 3).map((item, index) => (
                      <p
                        key={index}
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
                            rounded-full bg-red-400 
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
                    View Details
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
               Get venture
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>


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
          View All
          <ArrowRight
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}