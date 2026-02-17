import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const VentureHero = () => {
  return (
    <section className="relative w-full min-h-[65vh] bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-blue-500/20 rounded-full blur-[120px]"
          animate={{ x: [0, -60, 40, 0], y: [0, 60, -40, 0] }}
          transition={{
            duration: 16,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[26rem] h-[26rem] bg-pink-500/15 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

      <div className="relative mx-auto max-w-6xl px-4 pt-15 pb-2 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Strategic Partnerships
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight relative"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Coventure with
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            CoBrother
          </span>

          <motion.div
            className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 -z-10"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-lg sm:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto"
        >
          Our co-venture system operates on the CoBrother Aultum CRM & AI
          Automation —
          <br className="hidden sm:block" />
          <span className="text-white font-medium">
            Ensuring clarity, accountability, and execution from day one.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <motion.a
            href="/coventure-form"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-base sm:text-lg overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
            <span className="relative flex items-center gap-2">
              List Your Venture
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.a>
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-5 flex justify-center"
        >
          <div className="h-px w-80 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        </motion.div> */}
      </div>
    </section>
  );
};

export default VentureHero;
