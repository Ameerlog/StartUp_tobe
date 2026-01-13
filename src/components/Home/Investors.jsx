import React from "react";
import MarqueeRow from "../../components/Marquee";
import { investorCards } from "../../data/investors";
import { ArrowRight } from "lucide-react";

export default function Investors() {
  return (
    <section className="w-full bg-black py-5 relative">

      <h2 className="ml-10 text-[28px] md:text-[32px] text-white px-6 max-w-[1400px] mx-auto font-bold">
       Investors
      </h2>


      <div className="relative mt-5">
   
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-black to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-black to-transparent" />

        <div className="mx-auto max-w-[1400px] px-6 overflow-hidden space-y-10">

          <MarqueeRow
            data={investorCards}
            speed={25}
            renderItem={(card) => (
              <div className="shrink-0 w-[360px] px-6">
                <div className="group h-[320px] rounded-[20px] border border-white/20 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:border-gray-600/50">

                  <div className="h-[200px] flex items-center justify-center bg-white/10 rounded-[14px] backdrop-blur-sm border border-white/20 group-hover:border-gray-600/30 transition-all duration-300">
                    <img
                      src={card.src}
                      alt={card.company}
                      className="max-h-[160px] max-w-[160px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      draggable={false}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <h3 className="text-[20px] font-bold text-white tracking-tight group-hover:text-red-400 transition-colors duration-300">
                      {card.company}
                    </h3>

                    <p className="mt-2 text-[15px] text-gray-400 font-medium group-hover:text-red-300 transition-colors duration-300">
                      {card.founder}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />

          <MarqueeRow
            data={investorCards}
            speed={25}
            direction="right"
            renderItem={(card) => (
              <div className="shrink-0 w-[360px] px-6">
                <div className="group h-[320px] rounded-[20px] border border-white/20 bg-gray-900/50 p-6 backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:border-gray-600/50">
                  
                  <div className="h-[200px] flex items-center justify-center bg-white/10 rounded-[14px] backdrop-blur-sm border border-white/20 group-hover:border-gray-600/30 transition-all duration-300">
                    <img
                      src={card.src}
                      alt={card.company}
                      className="max-h-[160px] max-w-[160px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      draggable={false}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <h3 className="text-[20px] font-bold text-white tracking-tight group-hover:text-red-400 transition-colors duration-300">
                      {card.company}
                    </h3>

                    <p className="mt-2 text-[15px] text-gray-400 font-medium group-hover:text-red-300 transition-colors duration-300">
                      {card.founder}
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
         <div className="mt-14 flex justify-center">
            <button
              className="
                group flex items-center gap-2
                rounded-full
                border border-white/30
                bg-white/10
                
                px-8 py-3
                text-sm font-bold text-white
                backdrop-blur-xl
                transition-all duration-300
                hover:border-red-400
                hover:text-red-400
                hover:bg-white/20
              "
            >
              View All
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
