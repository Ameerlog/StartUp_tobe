import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/30Logo.png";
import BackgroundImage from "../assets/domain/Joint Venture.png";

import Joint from "../assets/domain/joint.png";
import Branding from "../assets/domain/branding.png";
import Marketing from "../assets/domain/marketing.png";
import Compliances from "../assets/domain/compliances.png";
import Funding from "../assets/domain/funding.png";
import Community from "../assets/domain/community.png";

import JointVenture from "./Home/JointVenture";
import Numbers from "./Home/Numbers";
import Domains from "./Home/Domians";
import Investors from "./Home/Investors";

const Home = () => {
  const navigate = useNavigate();

  const iconData = [
    { Icon: Joint, title: "Joint Venture", subtitle: "Strategic Partnerships", path: "/venture" },
    { Icon: Branding, title: "Branding", subtitle: "Identity Creation", path: "/branding" },
    { Icon: Marketing, title: "Marketing", subtitle: "Growth Strategies", path: "/marketing" },
    { Icon: Compliances, title: "Compliances", subtitle: "Regulatory Solutions", path: "/compliance" },
    { Icon: Funding, title: "Funding", subtitle: "Capital Access", path: "/funding" },
    { Icon: Community, title: "Community", subtitle: "Network Building", path: "/community" }
  ];

  return (
    <>
      <section className="min-h-screen relative overflow-hidden">
        <img
          src={BackgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/95" />

        <div className="relative z-20 flex items-center justify-center min-h-screen p-8">
          <div className="max-w-4xl w-full mt-20 relative">

            {/* LOGO */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none">
              <img
                src={Logo}
                alt="Logo"
                className="w-24 h-24 md:w-32 md:h-32 scale-400 drop-shadow-2xl"
              />
            </div>

            {/* ICON GRID */}
            <div
              className="bg-white/8 backdrop-blur-sm border border-white/25
                         shadow-xl shadow-white/15 mt-20
                         p-12 md:p-16 rounded-3xl
                         grid grid-cols-3 grid-rows-2 gap-10
                         h-[520px] place-items-center pt-28"
            >
              {iconData.map(({ Icon, title, subtitle, path }, index) => (
                <div
                  key={index}
                  onClick={() => navigate(path)}
                  className="flex flex-col items-center gap-3 cursor-pointer"
                >
                  <img
                    src={Icon}
                    alt={title}
                    className="w-32 h-32 object-contain scale-150 drop-shadow-xl"
                  />
                  <div className="text-white text-center">
                    <h4 className="text-xl font-bold hover:text-red-500 hover:underline">
                      {title}
                    </h4>
                    <p className="text-sm opacity-90">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
  
          </div>
        </div>
      
      </section>

   <JointVenture/>
   <Domains/>
   <Numbers/>
   <Investors/>

    
    </>
  );
};

export default Home;
