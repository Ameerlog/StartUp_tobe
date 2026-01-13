// sections/VipNumbers.jsx
import React from "react";
import MarqueeRow from "../Marquee";
import { vipNumbers } from "../../data/number";

export default function Numbers() {
  return (
    <section className="w-full bg-black pt-8 pb-16 relative">
     
      <h2 className="ml-10 text-[28px] md:text-[32px] text-white">
        VIP Numbers
      </h2>
      
      <div className="relative mt-4">
   
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

        <MarqueeRow
          data={vipNumbers}
          speed={25}
          renderItem={(item) => (
            <div className="shrink-0 w-[350px] px-5 h-[150px]">
              <div className="h-full rounded-[20px] border border-white/20 bg-gray-900/50 p-6 flex flex-col justify-between backdrop-blur-sm">
                
         
                <div className="text-center text-[36px] font-bold">
                  <span className="text-white">{item.prefix}</span>
                  <span className="text-red-400 ml-1">{item.highlight}</span>
                </div>


                <div className="flex justify-end">
                  <button className="rounded-full bg-red-600 hover:bg-red-500 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg hover:shadow-red-500/25 w-fit">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}
