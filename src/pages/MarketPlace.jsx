import React, { useState, useMemo } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { domainCards } from "../data/domain";

export default function MarketPlace() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const INITIAL_COUNT = 6;

  const displayedDomains = useMemo(
    () => (showAll ? domainCards : domainCards.slice(0, INITIAL_COUNT)),
    [showAll],
  );

  const hasMore = domainCards.length > INITIAL_COUNT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
    exit: { opacity: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    exit: { opacity: 0, y: -20, scale: 0.9 },
    hover: { y: -6, scale: 1.015 },
    tap: { scale: 0.98 },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
    exit: { opacity: 0, y: -20, scale: 0.8 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const arrowVariants = {
    animate: {
      y: [0, 6, 0],
      transition: { duration: 1.2, repeat: Infinity },
    },
  };

  // Theme for cards (Joint Venture style)
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

  return (
    <main className="relative  bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <section className="relative z-10 border-b border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Let’s Find Your Brand Name
          </motion.h1>

          {/* <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm sm:text-base text-neutral-400"
          >
            Start co-creation and build something memorable.
          </motion.p> */}

          {/* <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/co-creation")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
          >
            Start Co-creation →
          </motion.button> */}
        </div>
      </section>

      <section className="relative z-10 pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              <motion.div
                key={showAll ? "expanded" : "collapsed"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {displayedDomains.map((item, index) => {
                    const theme = cardColors[index % cardColors.length];

                    return (
                      <motion.article
                        key={item.slug}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        layout
                        className={`group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 backdrop-blur-xl cursor-pointer ${theme.border}`}
                      >
                        {/* Glow effect */}
                        <div
                          className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${theme.glow} opacity-0 blur-lg transition duration-500 group-hover:opacity-70`}
                        />

                        <motion.button
                          onClick={() => navigate(`/marketplace/${item.slug}`)}
                          className="absolute inset-0 z-10"
                        />

                        <div
                          className={`border-b border-neutral-800/50 bg-gradient-to-br ${theme.gradient} p-4`}
                        >
                          <div className="aspect-[4/3] flex items-center justify-center rounded-xl bg-black/80">
                            <motion.img
                              src={item.src}
                              alt={item.title}
                              className="max-h-full max-w-full object-contain"
                              initial={{ scale: 0.9, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: index * 0.05 }}
                            />
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs text-neutral-300">
                              {item.badge.label}
                            </span>

                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/marketplace/${item.slug}`);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative overflow-hidden rounded-full"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
                              <span className="relative px-4 py-1.5 text-xs font-semibold text-white">
                                Buy Now
                              </span>
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="text-sm font-semibold text-white">
                            {item.title}
                          </div>
                          <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-neutral-700/50 bg-neutral-800/50 px-3 py-1 text-xs text-neutral-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {hasMore && (
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="mt-10 text-center"
              >
                <motion.button
                  onClick={() => {
                    setShowAll(!showAll);
                    if (showAll) {
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }
                  }}
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-6 py-3 text-sm font-semibold text-neutral-200"
                >
                  {showAll
                    ? "Show Less"
                    : `View All (${domainCards.length - INITIAL_COUNT} more)`}

                  <motion.svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    variants={arrowVariants}
                    animate="animate"
                    style={{ rotate: showAll ? 180 : 0 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>
              </motion.div>
            )}
          </LayoutGroup>
        </div>
      </section>
    </main>
  );
}
