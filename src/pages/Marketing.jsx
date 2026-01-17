// import React from "react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import MarqueeRow from "../components/Marqueerow";
// import FeaturesSection from "../components/Featuredsection";
// import HowItWorksSection from "../components/HowitWorks";
// import BentoGrid from "../components/BentoGrid";
// import Domains from "../components/Home/Domians";
// import FAQ from "../components/Faq";
// import MarketingBg from "../assets/domain/marketingbg.svg";
// import HeroImage from  "../assets/domain/jointventure.png";

// const Marketing = () => {
//   return (
//     <div className="min-h-screen bg-[#faf7ff] px-1.5 sm:px-2 lg:px-3 py-1.5 sm:py-2">
//      <div className="relative mx-auto max-w-360 min-h-[calc(90vh-1rem)] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
     
//       <img
//         src={HeroImage}
//         alt="Hero"
//         className="absolute inset-0 h-full w-full object-cover"
//       />

  
//       <div className="absolute inset-0 bg-black/40" />

//       <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-4 pt-10 sm:pt-14 mt-24">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white">
//           Aultum
//         </h1>

//         <p className="mt-6 max-w-3xl text-white/70 text-base sm:text-lg">
//           AllinOne CRM, Automation & AIReady Platform 
//           AULTUM combines marketing tools, CRM, communication, automation, and operations in one system.  
//         </p>

//         <MarqueeRow />

//         <div className="mt-8 sm:mt-10 w-full max-w-2xl flex flex-col items-center gap-4 sm:gap-6">
//           <Link
//             to="/get-started"
//             className="inline-flex h-12 sm:h-14 min-w-35 items-center justify-center rounded-4xl bg-white text-black px-5 sm:px-8 text-sm sm:text-base font-bold shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-black/40"
//           >
//             Get Started
//             <ArrowRight className="ml-2 w-4 h-4" />
//           </Link>

//           <p className="text-sm sm:text-base text-white/50">
//             Start free ✦ Upgrade only when you&apos;re ready
//           </p>
//         </div>

//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-x-4 -bottom-12 mx-auto h-40 sm:h-56 max-w-6xl rounded-[36px] bg-linear-to-r from-white/5 via-white/10 to-white/5 blur-2xl"
//         />
//       </div>
//     </div>
//         <Domains/>


//    <div className="mt-10 border-t border-black/10 pt-6">
//   {/* Tagline */}
//   <p className="text-center text-base sm:text-lg font-medium text-black">
//     Get started with brands from{" "}
//     <span className="text-red-600 font-semibold">₹9,999</span>
//     <span className="text-black/60 text-sm"> / month</span>
//   </p>

//   {/* Actions */}
//   <div className="mt-4 flex flex-wrap justify-center gap-2">
//     <button className="rounded-full bg-black px-4 py-2 text-xs sm:text-sm text-white hover:bg-black/90">
//       JV Partnership
//     </button>
//     <button className="rounded-full border border-black/20 px-4 py-2 text-xs sm:text-sm text-black hover:bg-black/5">
//       CRM Demo
//     </button>
//     <button className="rounded-full border border-black/20 px-4 py-2 text-xs sm:text-sm text-black hover:bg-black/5">
//       Pricing Plans
//     </button>
//   </div>

//   {/* Pricing rows */}
// <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm">
//   <div className="rounded-full bg-black/5 px-4 py-2">
//     <span className="font-medium">Core CRM</span>{" "}
//     <span className="text-black/60">₹9,999</span>
//   </div>

//   <div className="rounded-full bg-black/5 px-4 py-2">
//     <span className="font-medium">Marketing Suite</span>{" "}
//     <span className="text-black/60">₹14,999</span>
//   </div>

//   <div className="rounded-full bg-black/5 px-4 py-2">
//     <span className="font-medium">AI Automation</span>{" "}
//     <span className="text-black/60">₹24,999</span>
//   </div>
// </div>

//   <p className="mt-3 text-center text-xs text-black/50">
//     Pricing varies by tools, usage, and configuration.
//   </p>
// </div>


       
//       <FeaturesSection />
    
      
//       <HowItWorksSection/>
//       <BentoGrid/>
//       <FAQ/>
//     </div>
//   );
// };

// export default Marketing;

import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import MarqueeRow from "../components/Marqueerow";
import FeaturesSection from "../components/Featuredsection";
import HowItWorksSection from "../components/HowitWorks";
import BentoGrid from "../components/BentoGrid";
import FAQ from "../components/Faq";
import Domains from "../components/Home/Domians";
import MarketingBg from "../assets/domain/marketingbg.svg";
import Footer from "../components/Footer";

const Marketing = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] px-2 sm:px-3 lg:px-4 py-2 sm:py-3">
      

      <div className="relative mx-auto max-w-[1440px] rounded-[24px] sm:rounded-[40px] overflow-hidden bg-white/90 border border-slate-200 shadow-sm">
    
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 pt-10 sm:pt-16">
          
        
          

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 max-w-4xl leading-[1.15] mt-10">
               Aultum  <br className="hidden sm:block" />
            <span className="relative inline-block text-red-600">
               AllinOne CRM, Automation & AIReady Platform 

          
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-red-200 -z-10 block" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-slate-500 font-medium">
               AULTUM combines marketing tools, CRM, communication, automation, and operations in one system.  
          </p>

        
          <div className="mt-8 w-full max-w-5xl overflow-hidden text-slate-900">
             <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <MarqueeRow />
             </div>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
            <Link
              to="/get-started"
              className="group inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-red-600 px-6 sm:px-8 text-sm sm:text-base font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-200 hover:scale-[1.02] hover:bg-red-700"
            >
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Start free ✦ Upgrade only when you&apos;re ready
            </p>
          </div>

          <div className="mt-12 w-220 max-w-6xl px-2 sm:px-6 pb-10 sm:pb-16 ">
            <div className="relative rounded-xl sm:rounded-2xl bg-slate-50 ring-1 ring-slate-900/5 shadow-2xl overflow-hidden group">

              <div className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-3 bg-white border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200 group-hover:bg-red-400 transition-colors"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200 group-hover:bg-amber-400 transition-colors"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-slate-200 group-hover:bg-green-400 transition-colors"></div>
                </div>
                <div className="hidden sm:block mx-auto w-1/3 h-5 bg-slate-50 rounded-md border border-slate-100"></div>
              </div>
              
              <img
                src={MarketingBg}
                alt="Platform Preview"
                className="w-full h-auto object-cover bg-white
                "
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
        </div>
      </div>
          <Domains variant="light" />


  <div className="mx-auto max-w-6xl px-4 py-16 text-center">
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-900">
      Get started with brands from ₹9999 per/month
    </h2>
  </div>



      <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-8">
        <FeaturesSection />
        <HowItWorksSection />
        <BentoGrid />
        <FAQ />
        <Footer/>
      </div>
    </div>
  );
};

export default Marketing;