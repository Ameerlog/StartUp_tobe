import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  ArrowRight,
  Check,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
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
import Market from "./Home/Marketing";
import AIRobotics from "./Home/AIRobotics";

import Investors from "./Home/Investors";
import Challenges from "../components/Home/Challeges";
const Home = () => {
  const navigate = useNavigate();

  // Domain Search States
  const [domainQuery, setDomainQuery] = useState("");
  const [selectedExtension, setSelectedExtension] = useState(".com");
  const [searchStatus, setSearchStatus] = useState("idle"); // idle, loading, available, unavailable, error
  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAllExtensions, setShowAllExtensions] = useState(false);

  // Domain Extensions
  const extensions = [
    { name: ".com", price: "₹100", popular: true },
    { name: ".co", price: "₹250", popular: true },
    { name: ".net", price: "₹150", popular: true },
    { name: ".org", price: "₹200", popular: true },
    { name: ".shop", price: "₹50", popular: false },
    { name: ".ai", price: "₹2,500", popular: false },
    { name: ".io", price: "₹1,200", popular: false },
    { name: ".dev", price: "₹350", popular: false },
    { name: ".tech", price: "₹180", popular: false },
    { name: ".store", price: "₹80", popular: false },
  ];

  const visibleExtensions = showAllExtensions
    ? extensions
    : extensions.filter((ext) => ext.popular);

  // Domain Search Function with Error Handling
  const searchDomain = async () => {
    // Input validation
    if (!domainQuery.trim()) {
      setErrorMessage("Please enter a domain name");
      setSearchStatus("error");
      setTimeout(() => setSearchStatus("idle"), 3000);
      return;
    }

    // Domain name validation (basic)
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
    if (!domainRegex.test(domainQuery.trim())) {
      setErrorMessage(
        "Invalid domain name. Use only letters, numbers, and hyphens",
      );
      setSearchStatus("error");
      setTimeout(() => setSearchStatus("idle"), 3000);
      return;
    }

    setSearchStatus("loading");
    setErrorMessage("");

    try {
      const fullDomain = `${domainQuery.trim()}${selectedExtension}`;

      // Replace with your actual API endpoint and credentials
      const response = await axios.get(
        `https://api.godaddy.com/v1/domains/available?domain=${fullDomain}`,
        {
          headers: {
            Authorization: `sso-key YOUR_API_KEY:YOUR_API_SECRET`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 second timeout
        },
      );

      if (response.data.available) {
        setSearchStatus("available");
      } else {
        setSearchStatus("unavailable");
      }
    } catch (error) {
      console.error("Error checking domain:", error);

      // Handle different error types
      if (error.code === "ECONNABORTED") {
        setErrorMessage("Request timeout. Please try again.");
      } else if (error.response) {
        // Server responded with error
        setErrorMessage(
          error.response.data.message || "Server error. Please try again.",
        );
      } else if (error.request) {
        // No response received
        setErrorMessage("Network error. Please check your connection.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      setSearchStatus("error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchDomain();
    }
  };

  const handleExtensionClick = (ext) => {
    setSelectedExtension(ext);
    setSearchStatus("idle");
    setErrorMessage("");
  };

  const iconData = [
    {
      Icon: Joint,
      title: "Co-Venture",
      subtitle: "Strategic Partnerships",
      path: "/venture",
      gradient: "from-purple-400/20 to-indigo-500/20",
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
      {/* MAIN HERO SECTION WITH BACKGROUND */}
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
          {/* 1. DOMAIN SEARCH SECTION - FIRST */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mb-12 sm:mb-16 px-2 sm:px-4"
          >
            {/* Title & Subtitle */}
            <div className="relative text-center mb-6 sm:mb-8">
              {/* Floating white glowing particles behind heading */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                  style={{
                    left: `${15 + i * 12}%`,
                    top: `${10 + (i % 3) * 8}%`,
                    filter: "blur(0.5px)",
                    boxShadow:
                      "0 0 8px rgba(255,255,255,0.8), 0 0 16px rgba(255,255,255,0.4)",
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4"
              >
                <span className=" bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Search and buy available brand names
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative text-base sm:text-lg md:text-xl font-medium 
             bg-gradient-to-r from-red-400  via-violet-500 to-purple-500
                
             bg-clip-text text-transparent mb-2"
              >
                Get a .com for only ₹1.00<span className="text-sm">*</span>/1st
                yr
                <span className="align-super text-xs">^</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto"
              >
                Included AI powered cobrother{" "}
                <span className="font-semibold text-neutral-300 bg-clip-text">
                  Aultum
                </span>{" "}
                with Add-on AI automation for your doorstep
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative group mb-4 sm:mb-6"
            >
              {/* Rainbow Gradient Border */}
              <div
                className={`absolute -inset-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-opacity duration-500 ${
                  focused ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Glow Effect */}
              <div
                className={`absolute -inset-[5px] bg-gradient-to-r from-red-500 via-violet-500 to-red-500 rounded-full blur-md transition-opacity duration-500 ${
                  focused ? "opacity-40" : "opacity-0 group-hover:opacity-30"
                }`}
              />

              {/* Search Bar Container */}
              <div className="relative bg-neutral-900/95 backdrop-blur-sm rounded-full p-1.5 sm:p-2 flex items-center gap-2 sm:gap-3">
                {/* Input Field with Icon */}
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3 sm:left-5 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search the brand name you want"
                    value={domainQuery}
                    onChange={(e) => {
                      setDomainQuery(e.target.value);
                      setSearchStatus("idle");
                      setErrorMessage("");
                    }}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full pl-9 sm:pl-14 pr-2 sm:pr-4 h-10 sm:h-14 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm sm:text-base rounded-full"
                  />
                </div>

                {/* Search Button */}
                <motion.button
                  type="button"
                  onClick={searchDomain}
                  disabled={searchStatus === "loading"}
                  whileHover={{ scale: searchStatus === "loading" ? 1 : 1.05 }}
                  whileTap={{ scale: searchStatus === "loading" ? 1 : 0.95 }}
                  className="relative overflow-hidden rounded-full disabled:cursor-not-allowed disabled:opacity-70 flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-100 blur transition duration-500" />

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
            </motion.div>

            {/* Domain Extensions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4"
            >
              {[
                { name: ".com", price: "₹100" },
                { name: ".co", price: "₹250" },
                { name: ".net", price: "₹150" },
                { name: ".org", price: "₹200" },
              ].map((ext, index) => (
                <motion.button
                  key={ext.name}
                  onClick={() => handleExtensionClick(ext.name)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    selectedExtension === ext.name
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30"
                  }`}
                >
                  {ext.name}
                  <span className="ml-1 opacity-70 text-[10px] sm:text-xs">
                    {ext.price}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Search Status Messages */}
            <AnimatePresence mode="wait">
              {searchStatus !== "idle" && searchStatus !== "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {searchStatus === "available" && (
                    <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl backdrop-blur-sm">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-400 font-semibold text-sm sm:text-base">
                          🎉 Domain is available!
                        </p>
                        <p className="text-green-400/70 text-xs sm:text-sm mt-1">
                          {domainQuery}
                          {selectedExtension} is ready to register
                        </p>
                      </div>
                    </div>
                  )}

                  {searchStatus === "unavailable" && (
                    <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <X className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-red-400 font-semibold text-sm sm:text-base">
                          Domain is not available
                        </p>
                        <p className="text-red-400/70 text-xs sm:text-sm mt-1">
                          Try a different name or extension
                        </p>
                      </div>
                    </div>
                  )}

                  {searchStatus === "error" && (
                    <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl backdrop-blur-sm">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-orange-400 font-semibold text-sm sm:text-base">
                          Error
                        </p>
                        <p className="text-orange-400/70 text-xs sm:text-sm mt-1">
                          {errorMessage ||
                            "Something went wrong. Please try again."}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fine Print */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-xs sm:text-sm text-neutral-500 mt-4"
            >
              <span className="align-super text-[10px]">^</span>3-year purchase
              required. Additional years ₹1,599.00
              <span className="text-[10px]">*</span>
            </motion.p>
          </motion.div>

          {/* 2. HERO TEXT SECTION - SECOND */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12 sm:mb-16 max-w-4xl relative px-2 sm:px-4"
          >
            Description
            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="tracking-[0.1em] text-neutral-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-3"
            >
              We don't just advise—we sit with you, work with you, and build
              with you. From registration to growth, your CoBrother handles it
              all.
            </motion.p> */}
            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold bg-gradient-to-r from-purple-400 via-blue-400 to-violet-400 bg-clip-text text-transparent mb-8"
            >
              Visit your cobrother at your doorstep
            </motion.p>
            {/* CTA Button */}
            <motion.button
              onClick={() => setShowBookingModal(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ null: true }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full inline-flex items-center gap-2 shadow-2xl shadow-purple-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500 " />

              <span className="relative px-8 py-4 font-semibold text-white text-base sm:text-lg flex items-center gap-2 rounded-full border-2 border-transparent group-hover:border-white/60 transition-all duration-300">
                Book a CoBrother
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
            {/* Floating particles around the hero */}
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

          {/* 3. SERVICES GRID - THIRD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
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

      {/* 4. OTHER SECTIONS - FOURTH */}
      <JointVenture />
      <Domains />
      {/* <ComplianceCards /> */}
      <Market />
      <Challenges />

      <AIRobotics />
      <Investors />
    </>
  );
};

// SERVICE CARD COMPONENT - OPTIMIZED FOR RESPONSIVENESS
const ServiceCard = ({ item, index, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 + index * 0.1 }}
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
          className={`relative 
            w-20 h-20 
            sm:w-28 sm:h-28 
            lg:w-32 lg:h-32 
            mb-4 sm:mb-6
            bg-gradient-to-br ${item.gradient}
            rounded-2xl
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-6
          `}
        >
          <img
            src={item.Icon}
            alt={item.title}
            className="w-full h-full scale-[1.15] object-contain drop-shadow-xl"
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

        {/* Arrow Icon - Hidden on very small screens */}
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
