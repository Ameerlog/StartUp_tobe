// import React from "react";
// import MarqueeRow from "../../components/Marquee";
// import { domainCards } from "../../data/domain";
// import { ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function Domains() {
//   const navigate = useNavigate();
//   return (
//     <section className="w-full bg-black py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden ">
//       <div className="text-center px-4 flex flex-col items-center gap-4">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
//           Domains
//         </h2>

//         <button
//           className="
//         group
//         flex items-center gap-2
//         rounded-full
//         border border-white
//         bg-white/10
//         px-5 sm:px-6 md:px-8
//         py-2.5 sm:py-3
//         text-xs sm:text-sm
//         font-bold text-white
//         backdrop-blur-xl
//         transition-all duration-300
//         hover:border-red-400
//         hover:text-red-400
//         hover:bg-white/20
//         active:scale-[0.98]
//         mt-4
//       "
//         >
//           List Domains for Resell
//         </button>
//       </div>

//       <div className="relative mt-3 sm:mt-8 md:mt-10">
//         <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 sm:w-16 md:w-24 lg:w-32 bg-linear-to-r from-black to-transparent" />

//         <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 sm:w-16 md:w-24 lg:w-32 bg-linear-to-l from-black to-transparent" />

//         <MarqueeRow
//           data={domainCards}
//           speed={25}
//           renderItem={(card) => {
//             const { id, title, price, src } = card;
//             return (
//               <div
//                 key={id}
//                 className="shrink-0 w-60 xs:w-[260px] sm:w-70 md:w-[320px] lg:w-90 px-2 sm:px-3 md:px-4 lg:px-5"
//               >
//                 <div className="group h-70 xs:h-[300px] sm:h-80 md:h-85 lg:h-90 rounded-xl sm:rounded-2xl md:rounded-[20px] border border-white/20 sm:border-2 bg-gray-900/60 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 overflow-hidden flex flex-col">
//                   <div className="p-3 xs:p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
//                     <div className="flex items-start justify-between gap-2 sm:gap-3 shrink-0">
//                       <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white leading-tight group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
//                         {title}
//                       </h3>

//                       <span className="shrink-0 rounded-full border border-white/30 sm:border-2 bg-white/10 px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] xs:text-xs sm:text-sm md:text-[14px] font-bold text-white backdrop-blur-sm whitespace-nowrap">
//                         {price}
//                       </span>
//                     </div>

//                     <div className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm flex-1 min-h-0">
//                       <div className="h-full w-full p-2 xs:p-3 sm:p-4 flex items-center justify-center relative">
//                         <img
//                           src={src}
//                           alt={title}
//                           className="w-20 xs:w-[100px] sm:w-50 md:w-35 h-12.5 xs:h-[60px] sm:h-37.5 md:h-20 object-contain"
//                           draggable={false}
//                           loading="lazy"
//                         />

//                         <div className="absolute right-2 sm:right-3 md:right-4 bottom-2 sm:bottom-3 md:bottom-4 text-white text-[8px] xs:text-[10px] sm:text-xs font-bold tracking-wider">
//                           .com
//                         </div>
//                       </div>
//                     </div>

//                     <div className="mt-3 xs:mt-5 sm:mt-5 md:mt-8 flex justify-end shrink-0">
//                       <button onClick={()=>navigate("/marketplace")} className="rounded-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-2.5 md:py-3 text-[10px] xs:text-xs sm:text-sm font-bold text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl hover:shadow-gray-600/25 transform hover:-translate-y-0.5 active:scale-[0.98] ">
//                        Make an Offer →
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           }}
//         />

//         <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 flex justify-center px-4">
//           <button className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/30 bg-white/10 px-4 xs:px-5 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 text-[10px] xs:text-xs sm:text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:border-red-400 hover:text-red-400 hover:bg-white/20 active:scale-[0.98]">
//             View All
//             <ArrowRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


import React from "react";
import MarqueeRow from "../../components/Marquee";
import { domainCards } from "../../data/domain";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Domains({ variant = "dark" }) {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  const theme = {
    section: isDark ? "bg-black" : "bg-white",
    heading: isDark ? "text-white" : "text-zinc-900",

    topButton: isDark
      ? "border-white bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",

    fadeFrom: isDark ? "from-black" : "from-white",

    cardBg: isDark ? "bg-gray-900/60" : "bg-white",
    cardBorder: isDark ? "border-white/20" : "border-zinc-200",
    cardTitle: isDark ? "text-white" : "text-zinc-900",

    priceBadge: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",

    imageBox: isDark
      ? "bg-white/10 border-white/20"
      : "bg-zinc-50 border-zinc-200",

    tld: isDark ? "text-white" : "text-zinc-500",

    bottomButton: isDark
      ? "border-white/30 bg-white/10 text-white"
      : "border-zinc-300 bg-zinc-100 text-zinc-700",
  };

  return (
    <section
      className={`w-full py-10 sm:py-12 md:py-16 relative overflow-hidden ${theme.section}`}
    >
      {/* Header */}
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold ${theme.heading}`}
        >
          Domains
        </h2>

        <button
          className={`
            group flex items-center gap-2 rounded-full
            border ${theme.topButton}
            px-5 sm:px-6 md:px-8 py-2.5 sm:py-3
            text-xs sm:text-sm font-bold
            backdrop-blur-xl transition-all duration-300
            hover:border-red-400 hover:text-red-400
            active:scale-[0.98]
          `}
        >
          List Domains for Resell
        </button>
      </div>

      {/* Marquee */}
      <div className="relative mt-6 sm:mt-10">
        {/* Left Fade */}
        <div
          className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-16 sm:w-24 bg-linear-to-r ${theme.fadeFrom} to-transparent`}
        />
        {/* Right Fade */}
        <div
          className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-16 sm:w-24 bg-linear-to-l ${theme.fadeFrom} to-transparent`}
        />

        <MarqueeRow
          data={domainCards}
          speed={25}
          renderItem={(card) => {
            const { id, title, price, src } = card;
            return (
              <div
                key={id}
                className="shrink-0 w-[260px] sm:w-[300px] md:w-[320px] px-3"
              >
                <div
                  className={`group h-[360px] rounded-2xl border ${theme.cardBorder} ${theme.cardBg}
                  backdrop-blur-sm shadow-xl transition-all duration-300 flex flex-col`}
                >
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title + Price */}
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`text-lg font-bold leading-tight ${theme.cardTitle} group-hover:text-red-500 transition-colors`}
                      >
                        {title}
                      </h3>

                      <span
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${theme.priceBadge}`}
                      >
                        {price}
                      </span>
                    </div>

                    {/* Image */}
                    <div
                      className={`mt-5 rounded-xl border ${theme.imageBox} flex-1 flex items-center justify-center relative`}
                    >
                      <img
                        src={src}
                        alt={title}
                        className="w-[120px] h-[60px] object-contain"
                        draggable={false}
                        loading="lazy"
                      />

                      <span
                        className={`absolute bottom-3 right-3 text-xs font-bold ${theme.tld}`}
                      >
                        .com
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => navigate("/marketplace")}
                        className="rounded-full bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        Make an Offer →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />

        {/* Bottom Button */}
        <div className="mt-10 flex justify-center px-4">
          <button
            className={`
              group flex items-center gap-2 rounded-full
              border ${theme.bottomButton}
              px-6 py-3 text-sm font-bold
              backdrop-blur-xl transition-all duration-300
              hover:border-red-400 hover:text-red-400
              active:scale-[0.98]
            `}
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
