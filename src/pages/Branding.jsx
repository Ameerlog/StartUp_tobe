import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MarketPlace from "./MarketPlace";

export default function Branding() {
  const [activeTab, setActiveTab] = useState("domains");
  const navigate = useNavigate();

  const tabs = [{ id: "domains", label: "Domains" }];

  const contentVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <section className="relative z-10 pt-28 pb-16 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            Venture Branding
          </motion.div>

<motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
>
  <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
    Build Your Brand
  </span>
  <span className="block mt-2 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
    Cobrother Guides You.
  </span>
</motion.h1>


          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            Finding the perfect brand name isn’t easy. Cobrother makes it simple.
            <br />
            We help you discover unique, memorable names and instantly check
            domain availability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center gap-2 rounded-full overflow-hidden
              shadow-[0_0_40px_rgba(168,85,247,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

              <span className="relative px-7 py-3 text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                Find & Secure Your Domain
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

     

      <section className="relative z-10 ">
        <AnimatePresence mode="wait">
          {activeTab === "domains" && (
            <motion.div
              key="domains"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MarketPlace />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
