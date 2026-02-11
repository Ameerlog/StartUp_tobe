import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { coventureAPI } from "../services/api/coventure.api";
import { useDataFetch } from "../hooks/useDataFetch";

export default function JointVentureGrid() {
  const {
    data: jvMarqueeCards,
    loading,
    error,
  } = useDataFetch(coventureAPI.getAll);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    hover: {
      y: -6,
      scale: 1.015,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    tap: { scale: 0.98 },
  };

  const cardColors = [
    {
      gradient: "from-purple-500/15 to-indigo-500/15",
      glow: "from-purple-600/30 to-indigo-600/30",
      border: "group-hover:border-purple-500/50",
    },
    {
      gradient: "from-blue-500/15 to-cyan-500/15",
      glow: "from-blue-600/30 to-cyan-600/30",
      border: "group-hover:border-blue-500/50",
    },
    {
      gradient: "from-pink-500/15 to-rose-500/15",
      glow: "from-pink-600/30 to-rose-600/30",
      border: "group-hover:border-pink-500/50",
    },
  ];

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading ventures...</div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="text-red-500 text-center p-8 bg-black min-h-screen flex items-center justify-center">
        <div>
          <p className="text-xl mb-2">Failed to load ventures</p>
          <p className="text-sm text-gray-400">{error}</p>
          <p className="text-xs text-gray-500 mt-4">
            Make sure backend API is running
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!jvMarqueeCards || jvMarqueeCards.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-center">
          <p className="text-white text-xl mb-2">No ventures available yet</p>
          <p className="text-gray-400 text-sm">
            Submit the first venture to see it here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
      </div>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 shadow-lg shadow-purple-500/20"
        >
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-sm font-medium text-transparent">
            Coventure Ecosystem
          </span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Joint Ventures
          </span>
        </h1>

        <p className="mt-3 text-sm sm:text-base text-neutral-400">
          Strategic partnerships built to{" "}
          <span className="text-white font-medium">scale together</span>
        </p>

        <div className="mt-6 flex justify-center">
          <div className="h-px w-40 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16">
        <LayoutGroup>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {jvMarqueeCards.map((card, index) => {
              const theme = cardColors[index % cardColors.length];

              return (
                <motion.article
                  key={card._id || card.id}
                  variants={cardVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  className={`group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 backdrop-blur-xl transition ${theme.border}`}
                >
                  <div
                    className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${theme.glow} opacity-0 blur-lg transition duration-500 group-hover:opacity-70`}
                  />

                  <div className="relative">
                    <div
                      className={`border-b border-neutral-800/50 bg-gradient-to-br ${theme.gradient} px-5 py-6`}
                    >
                      <div className="flex items-center justify-center h-16 sm:h-20">
                        <img
                          src={card.logo}
                          alt={card.name || card.title}
                          className="max-h-full max-w-[200px] object-contain scale-250"
                          loading="lazy"
                        />
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-neutral-300">
                          Partnership
                        </span>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative overflow-hidden rounded-full"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                          <a
                            href="/getventure"
                            className="relative flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white"
                          >
                            Get Coventure
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </motion.button>
                      </div>
                    </div>

                    <div className="px-5 py-4">
                      <p className="text-sm text-neutral-300 mb-3">
                        {card.desc || card.description}
                      </p>
                      <div className="mt-3 space-y-2">
                        {(card.details || card.features || [])
                          .slice(0, 3)
                          .map((item, i) => (
                            <p
                              key={i}
                              className="flex items-start gap-2 text-xs text-neutral-400"
                            >
                              <span
                                className={`mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${theme.gradient}`}
                              />
                              <span className="line-clamp-1">{item}</span>
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </LayoutGroup>
      </section>
    </main>
  );
}
