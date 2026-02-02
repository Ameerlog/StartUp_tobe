import React from "react";
import MarqueeRow from "../../components/Marquee";
import { investorCards } from "../../data/investors";
import { ArrowRight } from "lucide-react";
import BackgroundImage from "../../assets/domain/bg1.svg";

// Reusable Card Component to avoid repetition
const InvestorCard = ({ card }) => (
  <div 
    className="shrink-0 
               w-[240px] xs:w-[260px] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] 
               px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6 "
  >
    <div 
      className="group 
                 h-[220px] xs:h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] 
                 rounded-xl sm:rounded-2xl md:rounded-[20px] 
                 border border-white/20 
                 bg-gray-900/50 
                 p-3 xs:p-4 sm:p-5 md:p-6 
                 backdrop-blur-sm 
                 shadow-xl 
                 transition-all duration-300 
                 flex flex-col justify-between 
                 hover:shadow-2xl 
                 hover:border-white
                 hover:bg-gray-900/70"
    >
      {/* Image Container */}
      <div 
        className="h-[120px] xs:h-[130px] sm:h-[150px] md:h-[170px] lg:h-[185px] xl:h-[200px] 
                   flex items-center justify-center 
                   bg-white/10 
                   rounded-lg sm:rounded-xl md:rounded-[14px] 
                   backdrop-blur-sm 
                   border border-white/20 
                   group-hover:border-white
                   transition-all duration-300"
      >
        <img
          src={card.src}
          alt={card.company}
          className="max-h-[80px] xs:max-h-[90px] sm:max-h-[110px] md:max-h-[130px] lg:max-h-[145px] xl:max-h-[160px] 
                     max-w-[80px] xs:max-w-[90px] sm:max-w-[110px] md:max-w-[130px] lg:max-w-[145px] xl:max-w-[160px] 
                     object-contain 
                     grayscale group-hover:grayscale-0 
                     transition-all duration-500
                     group-hover:scale-105"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Text Content */}
      <div className="text-center mt-3 xs:mt-4 sm:mt-5 md:mt-6">
        <h3 
          className="text-sm xs:text-base sm:text-lg md:text-[18px] lg:text-[20px] 
                     font-bold text-gray-400 
                     tracking-tight 
                     group-hover:text-white 
                     transition-colors duration-300
                     line-clamp-1"
        >
          {card.company}
        </h3>

        <p 
          className="mt-1 xs:mt-1.5 sm:mt-2 
                     text-[11px] xs:text-xs sm:text-sm md:text-[14px] lg:text-[15px] 
                     text-gray-400 
                     font-medium 
                     group-hover:text-white
                     transition-colors duration-300
                     line-clamp-1"
        >
          {card.founder}
        </p>
      </div>
    </div>
  </div>
);

export default function Investors() {
  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden"
   >

       <div className="text-center px-4 flex flex-col items-center gap-4">
           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Co-Working
           </h2>
         
          <button
           className="
             group
             flex items-center gap-2
             rounded-full
             border border-white
             bg-gray-800
             px-5 sm:px-6 md:px-8
             py-2.5 sm:py-3
             text-xs sm:text-sm
             font-bold text-white
             backdrop-blur-xl
             transition-all duration-300
             hover:border-white
             hover:text-white
             hover:bg-white/20
             active:scale-[0.98]
             mt-4
           "
         >
        Join our community
           
         </button>
         
         </div>

      <div className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10">
    {/* Left and right screen shade  */}
         <div 
          className="pointer-events-none absolute left-0 top-0 z-10 
                     h-full 
                     w-8 xs:w-12 sm:w-20 md:w-28 lg:w-36 xl:w-40 
                     bg-gradient-to-r from-black to-transparent" 
        />

        <div 
          className="pointer-events-none absolute right-0 top-0 z-10 
                     h-full 
                     w-8 xs:w-12 sm:w-20 md:w-28 lg:w-36 xl:w-40 
                     bg-gradient-to-l from-black to-transparent" 
        />

        <div className="mx-auto max-w-[1400px] px-2 sm:px-4 md:px-6 overflow-hidden space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">

          <MarqueeRow
            data={investorCards}
            speed={25}
            renderItem={(card) => <InvestorCard card={card} />}
          />

          <MarqueeRow
            data={investorCards}
            speed={25}
            direction="right"
            renderItem={(card) => <InvestorCard card={card} />}
          />

          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex justify-center px-4">
            {/* <button
              className="group flex items-center 
                         gap-1.5 sm:gap-2
                         rounded-full
                         border border-white
                         bg-white/10
                         px-5 xs:px-6 sm:px-7 md:px-8 
                         py-2 xs:py-2.5 sm:py-3
                         text-xs sm:text-sm 
                         font-bold text-white
                         backdrop-blur-xl
                         transition-all duration-300
                         hover:border-white/30
            hover:text-white
                         hover:bg-gray-800
                         active:scale-[0.98]
                         hover:shadow-lg
                         cursor-pointer
                         "
                         
            >
              View All
              <ArrowRight
                className="w-3.5 h-3.5 sm:w-4 sm:h-4
                           transition-transform duration-300 
                           group-hover:translate-x-1"
              />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}