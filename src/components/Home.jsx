import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Check, X, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";
import betheBro from "../assets/domain/bethebro1.png";
import JointVenture from "./Home/JointVenture";
import Domains from "./Home/Domians";
import Market from "./Home/Marketing";
import Investors from "./Home/Investors";

// ─────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();

  const [domainQuery, setDomainQuery] = useState("");
  const [selectedExtension, setSelectedExtension] = useState(".com");
  const [searchStatus, setSearchStatus] = useState("idle");
  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const searchDomain = () => {
    const value = domainQuery.trim().toLowerCase();

    if (!value) {
      setErrorMessage("Please enter a domain name");
      setSearchStatus("error");
      setTimeout(() => setSearchStatus("idle"), 3000);
      return;
    }

    const fullDomainRegex = /^[a-z0-9-]+\.(com|in|ai|io)$/;

    let finalDomain = "";

    if (fullDomainRegex.test(value)) {
      finalDomain = value;
    } else {
      const nameRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;

      if (!nameRegex.test(value)) {
        setErrorMessage(
          "Invalid domain name. Use only letters, numbers, and hyphens",
        );
        setSearchStatus("error");
        setTimeout(() => setSearchStatus("idle"), 3000);
        return;
      }

      finalDomain = value + selectedExtension;
    }

    window.open(
      `https://www.secureserver.net/products/domain-registration/find?plid=600394&domainToCheck=${finalDomain}`,
      "_blank",
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchDomain();
  };

  const handleExtensionClick = (ext) => {
    const value = domainQuery.trim().toLowerCase();

    if (!value) return;

    const baseName = value.includes(".") ? value.split(".")[0] : value;

    const updatedDomain = baseName + ext;

    setDomainQuery(updatedDomain);
    setSelectedExtension(ext);
    setSearchStatus("idle");
    setErrorMessage("");
  };

  return (
    <>
      {/* MAIN HERO SECTION */}
      <section className="min-h-screen w-full relative overflow-hidden bg-black">
        {/* ── ANIMATED GRADIENT ORBS ── */}
        {/* <div
          className="fixed inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 3 }}
        >
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -60, 30, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
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
        </div> */}

        {/* ── MAIN CONTENT ── */}
        <div
          className="relative flex flex-col items-center justify-center min-h-screen px-3 sm:px-6 lg:px-8 pt-16 sm:pt-25 pb-12 sm:pb-20"
          style={{ zIndex: 10 }}
        >
          {/* 1. DOMAIN SEARCH SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl mb-12 sm:mb-16 px-2 sm:px-4"
          >
            {/* Title & Subtitle */}
            <div className="relative text-center mb-6 sm:mb-8">
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
                className="relative text-2xl sm:text-4xl md:text-3xl lg:text-3xl font-bold tracking-tight mb-3 sm:mb-4 font-display"
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] ">
                  Let's Begin With Your Brand Name
                </span>
              </motion.h2>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mb-6"
            >
              <motion.div
                className="rounded-full p-[1px]"
                animate={{
                  backgroundPosition: ["0% 50%", "200% 50%"],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background: `
        linear-gradient(
          90deg,
          #8b5cf6,
          #3b82f6,
          
          #8b5cf6
        )
      `,
                  backgroundSize: "300% 300%",
                  boxShadow: "0 2px 40px rgba(139,92,246,0.6)",
                }}
              >
                {/* ✅ Inner Search Container */}
                <div className="bg-neutral-900 rounded-full p-2 flex items-center gap-3">
                  <div className="relative flex-1 flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />

                    <input
                      type="text"
                      placeholder="Search your domain name"
                      value={domainQuery}
                      onChange={(e) => {
                        setDomainQuery(e.target.value);
                        setSearchStatus("idle");
                        setErrorMessage("");
                      }}
                      onKeyPress={handleKeyPress}
                      className=" w-full pl-12 pr-4 h-12 bg-transparent text-white placeholder-neutral-500 focus:outline-none rounded-full"
                    />
                  </div>

                  <motion.button
                    type="button"
                    onClick={searchDomain}
                    disabled={searchStatus === "loading"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 h-12 flex items-center justify-center text-white font-semibold"
                  >
                    {searchStatus === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      "Search"
                    )}
                  </motion.button>
                </div>
              </motion.div>
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

            {/* bethebrob */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-md sm:text-sm text-neutral-500 mt-4 inset-0"
            >
              <div className="relative flex w-full items-center justify-center mt-8 sm:mt-10 lg:mt-10">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full"
                    style={{ width: "100%", height: "100%" }}
                  />
                ))}

                <div className="cobrother-border-shell">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(168, 85, 247, 0.4)",
                        "0 0 30px rgba(147, 14, 234, 0.7)",
                        "0 0 15px rgba(168, 85, 247, 0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="group relative 
        h-10 w-[160px] 
        sm:h-12 sm:w-[200px] 
        md:h-14 md:w-[240px] 
        lg:h-22 lg:w-[300px] 
        cursor-pointer overflow-hidden rounded-full 
        bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-purple-900/80 
        shadow-2xl backdrop-blur-sm 
        hover:shadow-[0_25px_50px_rgba(147,51,234,0.6)]"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 16,
                      }}
                      className="cursor-pointer flex h-full w-full items-center justify-center rounded-full 
          bg-gradient-to-r from-slate-900/95 to-slate-800/95 hover:brightness-110 "
                    >
                      <img
                        src={betheBro}
                        className="relative z-10 w-[120%] h-[120%] object-contain"
                        alt="BeTheBro"
                        onClick={() => {
                          navigate("/bethecobrother");
                        }}
                      />
                    </motion.button>

                    {/* Shine sweep */}
                    <div className="absolute inset-0 -skew-x-12  h-px w-0 opacity-0 transition-all duration-700 origin-left group-hover:w-full group-hover:opacity-100 top-1/2 -translate-y-1/2" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <JointVenture />
      <Domains />
      <Market />
      <Investors />
    </>
  );
};

export default Home;
