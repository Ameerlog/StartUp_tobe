import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Check,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import betheBro from "../assets/domain/bethebro1.png";
import BackgroundImage from "../assets/domain/bg1.svg";
import Joint from "../assets/domain/venture1.svg";
import Branding from "../assets/domain/brand.svg";
import Marketing from "../assets/domain/market.svg";
import Community from "../assets/domain/community.svg";
import JointVenture from "./Home/JointVenture";
import Domains from "./Home/Domians";
import Market from "./Home/Marketing";
import Investors from "./Home/Investors";

// ─────────────────────────────────────────────
// HEXAGON BACKGROUND  — canvas-based, full screen
// ─────────────────────────────────────────────
const HEX_R = 18;
const HEX_PAD = 4;
const GLOW_R = 130;

const HexagonBackground = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const cellsRef = useRef([]);

  const buildGrid = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const W = wrap.offsetWidth;
    const H = wrap.offsetHeight;

    const hexW = Math.sqrt(3) * HEX_R;
    const hexH = 2 * HEX_R;
    const colStep = hexW + HEX_PAD;
    const rowStep = hexH * 0.75 + HEX_PAD;

    const cols = Math.ceil(W / colStep) + 2;
    const rows = Math.ceil(H / rowStep) + 2;

    const cells = [];
    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const offsetX = row % 2 === 1 ? colStep / 2 : 0;
        cells.push({
          cx: col * colStep + offsetX + hexW / 2,
          cy: row * rowStep + hexH / 2,
          r: HEX_R,
        });
      }
    }
    cellsRef.current = cells;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e) => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const hexPath = (ctx, cx, cy, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    };

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const ctx = canvas.getContext("2d");

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const cells = cellsRef.current;

      cells.forEach(({ cx, cy, r }) => {
        const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
        const ratio = Math.max(0, 1 - dist / GLOW_R);

        hexPath(ctx, cx, cy, r - 1);

        if (ratio > 0.01) {
          ctx.fillStyle = `rgba(139, 92, 246, ${0.04 + ratio * 0.18})`;
          ctx.fill();

          ctx.strokeStyle = `rgba(167, 139, 250, ${0.4 + ratio * 0.72})`;
          ctx.lineWidth = 1.2;

          if (ratio > 0.35) {
            ctx.shadowColor = `rgba(167, 139, 250, ${ratio * 0.55})`;
            ctx.shadowBlur = 10 * ratio;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        } else {
          ctx.fillStyle = "rgba(14, 12, 20, 0.9)";
          ctx.fill();
          ctx.strokeStyle = "rgba(100, 80, 180, 0.10)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.97) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

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

  // const searchDomain = async () => {
  //   if (!domainQuery.trim()) {
  //     setErrorMessage("Please enter a domain name");
  //     setSearchStatus("error");
  //     setTimeout(() => setSearchStatus("idle"), 3000);
  //     return;
  //   }

  //   const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;
  //   if (!domainRegex.test(domainQuery.trim())) {
  //     setErrorMessage(
  //       "Invalid domain name. Use only letters, numbers, and hyphens"
  //     );
  //     setSearchStatus("error");
  //     setTimeout(() => setSearchStatus("idle"), 3000);
  //     return;
  //   }

  //   setSearchStatus("loading");
  //   setErrorMessage("");

  //   try {
  //     const fullDomain = `${domainQuery.trim()}${selectedExtension}`;
  //     const response = await axios.get(
  //       `https://api.godaddy.com/v1/domains/available?domain=${fullDomain}`,
  //       {
  //         headers: {
  //           Authorization: `sso-key YOUR_API_KEY:YOUR_API_SECRET`,
  //         },
  //         timeout: 10000,
  //       }
  //     );

  //     if (response.data.available) {
  //       setSearchStatus("available");
  //     } else {
  //       setSearchStatus("unavailable");
  //     }
  //   } catch (error) {
  //     console.error("Error checking domain:", error);
  //     if (error.code === "ECONNABORTED") {
  //       setErrorMessage("Request timeout. Please try again.");
  //     } else if (error.response) {
  //       setErrorMessage(
  //         error.response.data.message || "Server error. Please try again."
  //       );
  //     } else if (error.request) {
  //       setErrorMessage("Network error. Please check your connection.");
  //     } else {
  //       setErrorMessage("An unexpected error occurred. Please try again.");
  //     }
  //     setSearchStatus("error");
  //   }
  // };

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
      // Already full domain like abcd.com
      finalDomain = value;
    } else {
      // Only name entered → append selected extension
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

    // Redirect ONLY when search button clicked
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

    // Remove existing extension if present
    const baseName = value.includes(".") ? value.split(".")[0] : value;

    const updatedDomain = baseName + ext;

    setDomainQuery(updatedDomain); // Update input field
    setSelectedExtension(ext); // Update selected button
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
      subtitle: "Identify your brands",
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
      {/* MAIN HERO SECTION */}
      <section className="min-h-screen w-full relative overflow-hidden bg-black">
        {/* ── HEXAGON BACKGROUND (bottom layer) ── */}
        <HexagonBackground />

        {/* ── ANIMATED GRADIENT ORBS ── */}
        <div
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
        </div>

        {/* ── BACKGROUND IMAGE ──
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 2 }}>
          <img
            src={BackgroundImage}
            alt="Background"
            className="w-full h-full object-cover object-center opacity-15"
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
                className="relative text-2xl sm:text-4xl md:text-3xl lg:text-3xl font-bold tracking-tight mb-3 sm:mb-4"
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  Discover Your Brand Name Here
                </span>
              </motion.h2>
              {/* 
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative text-base sm:text-lg md:text-xl font-medium bg-gradient-to-r from-red-400 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-2"
              >
                Get a .com for only ₹1.00<span className="text-sm">*</span>/1st
                yr
                <span className="align-super text-xs">^</span>
              </motion.p> */}
              {/* 
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto"
              >
                Included AI powered CoBrother{" "}
                <span className="font-semibold text-neutral-300">Aultum</span>{" "}
                with Add-on AI automation at your doorstep
              </motion.p> */}
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative group mb-4 sm:mb-6"
            >
              <div
                className={`absolute -inset-[2px] bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-opacity duration-500 ${
                  focused ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />
              <div
                className={`absolute -inset-[5px] bg-gradient-to-r from-red-500 via-violet-500 to-red-500 rounded-full blur-md transition-opacity duration-500 ${
                  focused ? "opacity-40" : "opacity-0 group-hover:opacity-30"
                }`}
              />

              <div className="relative bg-neutral-900/95 backdrop-blur-sm rounded-full mb-2 p-1.5 sm:p-2 flex items-center gap-2 sm:gap-3">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3 sm:left-5 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 pointer-events-none" />
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
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full pl-9 sm:pl-14 pr-2 sm:pr-4 h-10 sm:h-14 bg-transparent text-white placeholder-neutral-500 focus:outline-none text-sm sm:text-base rounded-full"
                    style={{ cursor: "text" }}
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={searchDomain}
                  disabled={searchStatus === "loading"}
                  whileHover={{ scale: searchStatus === "loading" ? 1 : 1.05 }}
                  whileTap={{ scale: searchStatus === "loading" ? 1 : 0.95 }}
                  className="relative overflow-hidden rounded-full disabled:cursor-not-allowed disabled:opacity-70 flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-600"
                  style={{ cursor: "pointer" }}
                >
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
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4"
            >
              {[
                { name: ".com", price: "₹999" },
                { name: ".in", price: "₹699" },
                { name: ".ai", price: "₹4599" },
                { name: ".io", price: "₹4599" },
              ].map((ext, index) => (
                <motion.button
                  key={ext.name}
                  onClick={() => handleExtensionClick(ext.name)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  style={{ cursor: "pointer" }}
                  className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    selectedExtension === ext.name
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30"
                  }`}
                >
                  {ext.name}
                  <span className="ml-1 opacity-70 text-[10px] sm:text-xs">
                    {ext.price}
                  </span>
                </motion.button>
              ))}
            </motion.div> */}

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

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-md sm:text-sm text-neutral-500 mt-4 pl-10"
            >
              <span className="mt-4">
                <div className="relative flex items-center justify-center mt-25">
                  {/* Pulsing Glow Rings — like WhatsApp button */}
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute rounded-bl-4xl rounded-tr-4xl"
                      style={{ width: "100%", height: "100%" }}
                    />
                  ))}

                  {/* Outer soft glow */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 10px 2px rgba(147,51,234,0.4)",
                        "0 0 25px 8px rgba(37,99,235,0.6)",
                        "0 0 10px 2px rgba(147,51,234,0.4)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-110 h-22 cursor-pointer rounded-bl-4xl rounded-tr-4xl border border-white/30 bg-transparent overflow-hidden flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.08,
                        background: "linear-gradient(135deg, #9333ea, #2563eb)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="w-full h-full flex items-center justify-center bg-transparent"
                    >
                      <img
                        src={betheBro}
                        className="relative z-10 w-75 h-25 object-fit"
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </span>
            </motion.p>

            
          </motion.div>

          {/* 2. SERVICES GRID - Updated Layout from Second Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="w-full max-w-7xl px-2 sm:px-4 "
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
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

      {/* OTHER SECTIONS */}
      <JointVenture />
      <Domains />
      <Market />
      <Investors />
    </>
  );
};

// ─────────────────────────────────────────────
// SERVICE CARD - Updated Layout from Second Code
// ─────────────────────────────────────────────
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
      className="relative group cursor-pointer"
    >
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${item.glowColor} rounded-xl sm:rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-500`}
      />

      <div
        className="relative rounded-xl sm:rounded-2xl hover:border-neutral-700/50 transition-all duration-300 h-full flex flex-col items-center text-center
        p-4 sm:p-5 md:p-6 lg:p-8
      "
      >
        <div
          className={`
            relative mb-3 sm:mb-4 lg:mb-5
            w-16 h-16
            sm:w-20 sm:h-20
            md:w-24 md:h-24
            lg:w-28 lg:h-28
            bg-gradient-to-br ${item.gradient}
            rounded-xl sm:rounded-2xl
            flex items-center justify-center
            transition-transform duration-300
            group-hover:scale-110 group-hover:rotate-6
          `}
        >
          <img
            src={item.Icon}
            alt={item.title}
            className="w-full h-full scale-[1.5] object-contain drop-shadow-xl"
          />
        </div>

        <h3
          className={`
            font-bold mb-1 sm:mb-2
            text-xs sm:text-sm md:text-base lg:text-lg
            transition-colors duration-300
            ${isHovered ? item.iconColor : "text-white"}
          `}
        >
          {item.title}
        </h3>

        <p
          className="
          text-neutral-400 group-hover:text-neutral-300
          transition-colors duration-300
          line-clamp-2
          text-[10px] sm:text-xs md:text-sm
          mb-2 sm:mb-3 lg:mb-4
        "
        >
          {item.subtitle}
        </p>

        <motion.div
          initial={{ x: 0 }}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
          className={`
            mt-auto ${item.iconColor}
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            hidden sm:block
          `}
        >
          <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
