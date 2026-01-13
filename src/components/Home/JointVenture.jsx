import React from "react";
import Marquee from "react-fast-marquee";
import { jvMarqueeCards } from "../../data/jointVenture";
import { ArrowRight } from "lucide-react";

export default function JointVenture() {
  return (
    <section className="w-full bg-black pt-8 pb-16 relative">
   
      <h2 className="ml-10 text-[28px] md:text-[32px] text-white font-bold">
        Joint Venture 
     
      </h2>

      <div className="relative mt-4">
     
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

        <Marquee speed={25} gradient={false}  pauseOnHover={true} >
          {jvMarqueeCards.map((card) => (
            <div key={card.id} className="shrink-0 w-[380px] px-5">
              <div className="h-full rounded-[20px] border border-white/20 bg-gray-900/50 p-6 flex flex-col justify-between backdrop-blur-sm">

                <div>

                  <div className="h-[70px] flex items-center">
                    <img
                      src={card.logo}
                      alt="JV Brand Logo"
                      className="h-full object-contain"
                    />
                  </div>

                  <p className="mt-4 text-[14px] text-gray-300 leading-relaxed">
                    {card.desc}
                  </p>

                  <div className="mt-4 space-y-2">
                    {card.details.map((item, index) => (
                      <p
                        key={index}
                        className="text-[13px] text-gray-400 flex items-start gap-2"
                      >
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-red-400" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>


                <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-full border border-white/40 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 hover:border-white/60 backdrop-blur-sm transition-all">
                    View Details
                  </button>

                  <button className="flex-1 rounded-full bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg hover:shadow-red-500/25">
                    Partner (JV)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
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
    </section>
  );
}
