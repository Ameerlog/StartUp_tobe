import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/domain/cobrotheraultum_Logo_white.png";
import BackgroundImage from "../assets/domain/bg1.svg";

import Joint from "../assets/domain/venture1.svg";
import Branding from "../assets/domain/brand.svg";
import Marketing from "../assets/domain/market.svg";
import Compliances from "../assets/domain/complian.svg";
import Funding from "../assets/domain/ai.svg";
import Community from "../assets/domain/community.svg";

import JointVenture from "./Home/JointVenture";
// import Numbers from "./Home/Numbers";
import Domains from "./Home/Domians";
import Investors from "./Home/Investors";
import Market from "./Home/Marketing";
// import Merchandise from "./Home/Merchandise";
import AIRobotics from "./Home/AIRobotics";
import Footer from "./Footer";
import ComplianceCards from "./ComplianceCards";

const Home = () => {
  const navigate = useNavigate();

  const iconData = [
    {
      Icon: Joint,
      title: "Co-Venture",
      subtitle: "Strategic Partnerships",
      path: "/venture",
    },
    {
      Icon: Branding,
      title: "Co-Branding",
      subtitle: "Identity Creation",
      path: "/branding",
    },
    {
      Icon: Marketing,
      title: "Co-Marketing",
      subtitle: "Growth Strategies",
      path: "/marketing",
    },
    {
      Icon: Compliances,
      title: "Co-Creation",
      subtitle: "",
      path: null,
    },
    {
      Icon: Funding,
      title: "Co-Operation",
      subtitle: "Capital Access",
      path: "/ai",
    },
    {
      Icon: Community,
      title: "Co-Working",
      subtitle: "Network Building",
      path: "/community",
    },
  ];

  return (
    <>
      <section className="min-h-screen w-full relative overflow-hidden">
        {/* <h2>One platform for every stage of your business.</h2> */}
        <div className="absolute inset-0 w-full h-full ">
          <img
            src={BackgroundImage}
            alt="Background"
            className="w-full bg-black h-full object-cover object-center
                       sm:object-cover md:object-cover lg:object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/95" />

        <div
          className="relative z-20 flex items-center justify-center min-h-screen 
                        px-3 sm:px-4 md:px-6 lg:px-8 
                        py-6 sm:py-8 md:py-10 lg:py-12"
        >
          <div
            className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 
                          mt-6 sm:mt-8 md:mt-10 lg:mt-12 
                          relative
                          mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16
                          "
          >
            <div
              className="absolute 
                            -top-10 sm:-top-12 md:-top-14 lg:-top-16 
                            left-1/2 -translate-x-1/2 
                            pointer-events-none z-30"
            >
              <img
                src={Logo}
                alt="Logo"
                className="w-19 h-26 sm:w-16 sm:h-16 md:w-20 md:h-28 lg:w-24 lg:h-24
                          //  scale-[3] sm:scale-[2] md:scale-[2.4] lg:scale-[4]
                          //  drop-shadow-2xl
                           "
              />
            </div>

            <div
              className="bg-transparentbackdrop-blur-sm 
                         border border-white/20 sm:border-white/25
                        
                         mt-10 sm:mt-12 md:mt-14 lg:mt-10
                         p-3 sm:p-4 md:p-6 lg:p-8
                         pt-10 sm:pt-12 md:pt-6 lg:pt-12
                         rounded-lg sm:rounded-xl md:rounded-2xl
                         grid grid-cols-2 sm:grid-cols-3
                         gap-9 sm:gap-7 md:gap-9 lg:gap-14
                         place-items-center
                         w-full
                         

                         "
            >
              {iconData.map(({ Icon, title, subtitle, path }, index) => (
                <div
                  key={index}
                  onClick={() => path && navigate(path)}
                  className="flex flex-col items-center 
                             gap-1 sm:gap-1.5 md:gap-2 
                             cursor-pointer
                             group transition-all duration-300 
                             hover:scale-105 active:scale-95
                             p-1 sm:p-1.5 md:p-2 lg:p-3
                             w-full max-w-30 sm:max-w-35 md:max-w-40 lg:max-w-45"
                >
                  <div
                    className="relative flex items-center justify-center
                                  w-12 h-12 
                                  sm:w-14 sm:h-14 
                                  md:w-16 md:h-16 
                                  lg:w-20 lg:h-20
                                  xl:w-24 xl:h-24 scale-150
                                  overflow-hidden "
                  >
                    <img
                      src={Icon}
                      alt={title}
                      className="
                      cursor-pointer
                      w-full h-full object-contain
                      /* Responsive size (STATIC) */
                      scale-150
                      md:scale-180
                      lg:scale-210
                      /* Hover effect (FAST & CLEAN) */
                      transition-transform duration-150 ease-out
                      group-hover:scale-[1.15]
                      /* Light glow */
                      drop-shadow-md
                      group-hover:drop-shadow-sm
                    "
                    />
                  </div>

                  <div
                    className="text-gray-300 text-center 
                                  mt-0.5 sm:mt-1 md:mt-1.5 
                                  w-full px-0.5 sm:px-1"
                  >
                    <h4
                      className="text-[9px] 
                                   sm:text-[10px] 
                                   md:text-xs 
                                   lg:text-sm
                                   xl:text-base
                                   font-bold 
                                   group-hover:text-white   
                                   transition-colors duration-300
                                   line-clamp-2 sm:line-clamp-1
                                   leading-tight 
                                   min-h-4 sm:min-h-4.5 md:min-h-5"
                    >
                      {title}
                    </h4>
                    <p
                      className="text-[7px] 
                                  sm:text-[8px] 
                                  md:text-[9px] 
                                  lg:text-[10px]
                                  xl:text-xs
                                  opacity-70 
                                  group-hover:opacity-100
                                  transition-opacity duration-300
                                  mt-0.5
                                  line-clamp-1 
                                  leading-tight
                                  hidden xs:block"
                    >
                      {subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <JointVenture />
      <Domains />
      {/* <Numbers /> */}
      {/* <Merchandise/> */}
      <ComplianceCards />
      <Market />
      {/* Below It is Compliance */}
      <AIRobotics />
      {/* <Investors /> */}
    </>
  );
};

export default Home;
