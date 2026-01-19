// sections/VipNumbers.jsx
import React from "react";
import MarqueeRow from "../Marquee";
import { vipNumbers } from "../../data/number";
import { ArrowRight } from "lucide-react";
import  { useNavigate } from "react-router-dom";
export default function Numbers() {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-black pt-8 pb-16 relative">
     
       <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
       Business Numbers
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
            List  Numbers for Resell
            
          </button>
      
      </div>
      
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
                  <button onClick={()=> navigate('/branding')} 
                  className="rounded-full bg-red-600 hover:bg-red-500 px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-all shadow-lg hover:shadow-red-500/25 w-fit">
                   Buy Now
                  </button>
                </div>
              </div>
            </div>
          )}
        />
          <div className="mt-14 flex justify-center">
            <button
            onClick={()=> navigate('/branding')}
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
