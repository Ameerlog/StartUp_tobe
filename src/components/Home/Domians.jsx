import React from "react";
import MarqueeRow from "../../components/Marquee";
import { domainCards } from "../../data/domain";
import { ArrowRight } from "lucide-react";

export default function Domains() {
  return (
    <section className="w-full bg-black pt-8 pb-16 relative">
      <h2 className="m-0 text-[28px] md:text-[32px] text-white px-6 font-bold">
        Domains for Sale
      </h2>

      <div className="relative mt-4">

        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

        <MarqueeRow
          data={domainCards}
          speed={25}
          renderItem={(card) => {
            const { id, title, price, src, theme } = card;
            return (
              <div key={id} className="shrink-0 w-[320px] px-6">
                <div className="group h-[340px] rounded-[20px] border-2 border-white/20 bg-gray-900/60 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 overflow-hidden flex flex-col">
                  
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[20px] font-bold text-white leading-tight group-hover:text-red-400 transition-colors duration-300">
                        {title}
                      </h3>

                      <span className="rounded-full border-2 border-white/30 bg-white/10 px-3 py-1.5 text-[14px] font-bold text-white backdrop-blur-sm">
                        {price}
                      </span>
                    </div>

                    <div className="mt-6 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                      <div className="h-[140px] w-full p-4 flex items-center justify-center relative">
                        <img
                          src={src}
                          alt={title}
                          className="w-[140px] h-[80px] object-contain"
                          draggable={false}
                        />

                        <div className="absolute right-4 bottom-4 text-red-600 text-xs font-bold tracking-wider">
                          .com
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button className="rounded-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-8 py-3 text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-600/25 transform hover:-translate-y-0.5 w-fit">
                        Buy Now →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
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
    </section>
  );
}
