import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Sparkles, ArrowRight, Check, X, Loader2 } from "lucide-react";

import axios from "axios";

import BackgroundImage from "../assets/domain/bg1.svg";
import Joint from "../assets/domain/venture1.svg";
import Branding from "../assets/domain/brand.svg";
import Marketing from "../assets/domain/market.svg";
import Compliances from "../assets/domain/complian.png";
import Funding from "../assets/domain/ai.svg";
import Community from "../assets/domain/community.svg";
import JointVenture from "./Home/JointVenture";
import Domains from "./Home/Domians";

import AIRobotics from "./Home/AIRobotics";
import ComplianceCards from "./ComplianceCards";
import Investors from "./Home/Investors";
import ChallengesMarquee from "./Home/Challeges";

const Home = () => {
  const navigate = useNavigate();
  const [domainQuery, setDomainQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("idle");
  const [focused, setFocused] = useState(false);

  const searchDomain = async () => {
    if (!domainQuery.trim()) return;
    setSearchStatus("loading");

    try {
      // NOTE: Ensure you replace YOUR_API_KEY/SECRET with real environment variables in production
      const response = await axios.get(
        `https://api.godaddy.com/v1/domains/available?domain=${domainQuery}`,
        {
          headers: {
            Authorization: `sso-key YOUR_API_KEY:YOUR_API_SECRET`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.available) {
        setSearchStatus("available");
      } else {
        setSearchStatus("unavailable");
      }
    } catch (error) {
      console.error("Error checking domain:", error);
      setSearchStatus("idle");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchDomain();
    }
  };

  const iconData = [
    {
      Icon: Joint,
      title: "Co-Venture",
      subtitle: "Strategic Partnerships",
      path: "/venture",
      gradient: "from-purple-500/20 to-indigo-500/20",
      glowColor: "from-purple-600/30 to-indigo-600/30",
      iconColor: "text-purple-400",
    },
    {
      Icon: Branding,
      title: "Co-Branding",
      subtitle: "Identity Creation",
      path: "/branding",
      gradient: "from-blue-500/20 to-cyan-500/20",
      glowColor: "from-blue-600/30 to-cyan-600/30",
      iconColor: "text-blue-400",
    },
    {
      Icon: Marketing,
      title: "Co-Marketing",
      subtitle: "Growth Strategies",
      path: "/marketing",
      gradient: "from-pink-500/20 to-rose-500/20",
      glowColor: "from-pink-600/30 to-rose-600/30",
      iconColor: "text-pink-400",
    },
    {
      Icon: Compliances,
      title: "Co-Creation",
      subtitle: "Innovative Solutions",
      path: "/co-creation",
      gradient: "from-orange-500/20 to-amber-500/20",
      glowColor: "from-orange-600/30 to-amber-600/30",
      iconColor: "text-orange-400",
    },
    {
      Icon: Funding,
      title: "Co-Operation",
      subtitle: "Capital Access",
      path: "/ai",
      gradient: "from-green-500/20 to-emerald-500/20",
      glowColor: "from-green-600/30 to-emerald-600/30",
      iconColor: "text-green-400",
    },
    {
      Icon: Community,
      title: "Co-Working",
      subtitle: "Network Building",
      path: "/community",
      gradient: "from-violet-500/20 to-purple-500/20",
      glowColor: "from-violet-600/30 to-purple-600/30",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <>
      {/* HERO SECTION WITH ANIMATED BACKGROUND */}
      <section className="min-h-screen w-full relative overflow-hidden bg-black">
        {/* ANIMATED GRADIENT ORBS */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 8,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
            animate={{
              x: [0, 30, -40, 0],
              y: [0, -40, 40, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 8,
              delay: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* BACKGROUND IMAGE WITH OVERLAY */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={BackgroundImage}
            alt="Background"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/95" />
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-3 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 sm:pb-20">
          {/* HERO TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 max-w-4xl relative"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-6 shadow-lg shadow-purple-500/20"
            >
              <Sparkles className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Your Business Bhai, Right Beside You
              </span>
            </motion.div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 relative">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Build Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                Business Empire
              </span>

              {/* Floating glow orbs */}
              <motion.div
                className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 20, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl pointer-events-none"
                animate={{
                  scale: [1.3, 1, 1.3],
                  opacity: [0.6, 0.3, 0.6],
                  x: [0, -20, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-neutral-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
            >
              We don't just advise—we sit with you, work with you, and build
              with you. From registration to growth, your CoBrother handles it
              all.
            </motion.p>

      
            <motion.button
              onClick={() => navigate("/contact")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full inline-flex items-center gap-2 shadow-2xl shadow-purple-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

              <span className="relative px-8 py-4 font-semibold text-white text-base sm:text-lg flex items-center gap-2">
                Book Your CoBrother
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full pointer-events-none"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${25 + (i % 3) * 25}%`,
                  filter: "blur(0.5px)",
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* DOMAIN SEARCH BAR - Fully Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-3xl mb-10 sm:mb-16 px-2 sm:px-4"
          >
            <div className="relative group">
              {/* Rainbow Gradient Border */}
              <div
                className={`absolute -inset-[2px] bg-gradient-to-r from-green-400 via-blue-500 via-purple-500 to-pink-500 rounded-full transition-opacity duration-500 ${
                  focused ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Glow Effect */}
              <div
                className={`absolute -inset-[3px] bg-gradient-to-r from-green-400 via-blue-500 via-purple-500 to-pink-500 rounded-full blur-md transition-opacity duration-500 ${
                  focused ? "opacity-40" : "opacity-0 group-hover:opacity-30"
                }`}
              />


              <div className="relative bg-neutral-900/95 backdrop-blur-sm rounded-full p-1.5 sm:p-2 flex items-center gap-2 sm:gap-3">
    
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3 sm:left-5 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search your perfect domain..."
                    value={domainQuery}
                    onChange={(e) => setDomainQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full pl-9 sm:pl-14 pr-2 sm:pr-4 h-10 sm:h-14 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm sm:text-base rounded-full"
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={searchDomain}
                  disabled={searchStatus === "loading"}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-full disabled:cursor-not-allowed disabled:opacity-50 flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 blur transition duration-500" />

                  {/* Button Content */}
                  <div className="relative px-4 sm:px-8 h-10 sm:h-14 flex items-center justify-center gap-2">
                    {searchStatus === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
                        <span className="font-semibold text-white text-sm sm:text-base hidden sm:inline">
                          Searching...
                        </span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <span className="font-semibold text-white text-sm sm:text-base hidden sm:inline">
                          Search
                        </span>
                      </>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Search Status Messages */}
              {searchStatus !== "idle" && searchStatus !== "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4"
                >
                  {searchStatus === "available" && (
                    <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-400 font-semibold text-sm sm:text-base">
                          Domain is available!
                        </p>
                        <p className="text-green-400/70 text-xs sm:text-sm">
                          Ready to register your perfect domain
                        </p>
                      </div>
                    </div>
                  )}

                  {searchStatus === "unavailable" && (
                    <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-red-400 font-semibold text-sm sm:text-base">
                          Domain is not available
                        </p>
                        <p className="text-red-400/70 text-xs sm:text-sm">
                          Try a different name or extension
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* SERVICES GRID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-6xl px-2 sm:px-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {iconData.map((item, index) => (
                <ServiceCard
                  key={index}
                  item={item}
                  index={index}
                  navigate={navigate}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <JointVenture />
      <Domains />
      <ComplianceCards />
      {/* <Market /> */}
      <ChallengesMarquee/>
      <AIRobotics />
      <Investors/>
    </>
  );
};


const ServiceCard = ({ item, index, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => item.path && navigate(item.path)}
      className="relative group cursor-pointer h-full"
    >
      {/* Glow Effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${item.glowColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-500`}
      />

      {/* Card Content - Dynamic Padding */}
      <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-3 sm:p-6 lg:p-8 hover:border-neutral-700/50 transition-all duration-300 h-full flex flex-col items-center text-center">
        {/* Icon Container - Dynamic Sizing */}
        <div
          className={`relative w-14 h-14 sm:w-20 sm:h-20 mb-3 sm:mb-4 bg-gradient-to-br ${item.gradient} rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 flex items-center justify-center p-2 sm:p-3`}
        >
          <img
            src={item.Icon}
            alt={item.title}
            className="w-full h-full object-contain drop-shadow-lg"
          />
        </div>

        {/* Text Content */}
        <h3
          className={`text-sm sm:text-lg font-bold mb-1 sm:mb-2 transition-colors duration-300 ${isHovered ? item.iconColor : "text-white"}`}
        >
          {item.title}
        </h3>
        <p className="text-[10px] sm:text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">
          {item.subtitle}
        </p>

        {/* Arrow Icon - Hidden on very small screens if needed, or scaled down */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
          className={`mt-auto ${item.iconColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block`}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
