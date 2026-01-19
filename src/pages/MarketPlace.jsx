import React, { useState, useMemo } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { domainCards } from "../data/domain";

export default function MarketPlace() {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const INITIAL_COUNT = 6;

  const displayedDomains = useMemo(() => {
    return showAll ? domainCards : domainCards.slice(0, INITIAL_COUNT);
  }, [showAll]);

  const hasMore = domainCards.length > INITIAL_COUNT;


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5,
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
    },
  };


  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const arrowVariants = {
    animate: {
      y: [0, 5, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <main className="relative bg-[#F8F9FA] text-slate-900 min-h-screen overflow-hidden">
    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      <section className="border-b border-slate-200 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="text-center">
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
            >
              Domain Marketplace
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-2 text-sm sm:text-base text-slate-500"
            >
              Find your perfect domain name
            </motion.p>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              {domainCards.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border bg-slate-50"
                  >
                    📋
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    No domains available
                  </h3>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
                    Check back soon for new domains.
                  </p>
                </motion.div>
              ) : (
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
                    {displayedDomains.map((item, index) => (
                      <motion.article
                        key={item.slug}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        whileHover="hover"
                        whileTap="tap"
                        layout
                        layoutId={item.slug}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-red-200 transition-colors duration-300 cursor-pointer"
                        style={{ perspective: 1000 }}
                      >
                        <motion.button
                          onClick={() => navigate(`/marketplace/${item.slug}`)}
                          className="absolute inset-0 z-10"
                          aria-label={`Open ${item.title}`}
                        />

                        <div className="border-b border-slate-200 bg-slate-50 p-3">
                          <motion.div
                            className="aspect-[4/3] flex items-center justify-center overflow-hidden rounded-xl bg-white"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.img
                              src={item.src}
                              alt={item.title}
                              className="max-h-full max-w-full object-contain"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                              }}
                              whileHover={{ scale: 1.08 }}
                            />
                          </motion.div>

                          <div className="mt-3 flex items-center justify-between">
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
                            >
                              {item.badge.label}
                            </motion.span>

                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/marketplace/${item.slug}`);
                              }}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              whileHover={{
                                scale: 1.1,
                                backgroundColor: "#dc2626",
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="relative z-20 rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors duration-300"
                            >
                              Buy now
                            </motion.button>
                          </div>
                        </div>

                        <motion.div
                          className="p-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <div className="text-sm font-semibold text-slate-900">
                            {item.title}
                          </div>

                          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                            {item.description}
                          </p>

                          <motion.div
                            className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                          >
                            {item.tags.map((t, tagIndex) => (
                              <motion.span
                                key={t}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.1 + 0.4 + tagIndex * 0.05,
                                }}
                                whileHover={{
                                  scale: 1.1,
                                  backgroundColor: "#fee2e2",
                                }}
                                className="rounded-full border border-slate-200 px-2 py-1 transition-colors"
                              >
                                {t}
                              </motion.span>
                            ))}
                          </motion.div>
                        </motion.div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {hasMore && (
                <motion.div
                  key={showAll ? "show-less" : "view-all"}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-8 text-center"
                >
                  <motion.button
                    onClick={() => {
                      setShowAll(!showAll);
                      if (showAll) {
                        window.scrollTo({ top: 200, behavior: "smooth" });
                      }
                    }}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:border-red-300 transition-colors duration-300 shadow-sm"
                  >
                    {showAll ? "Show Less" : `View All (${domainCards.length - INITIAL_COUNT} more)`}
                    <motion.svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      variants={arrowVariants}
                      animate="animate"
                      style={{
                        rotate: showAll ? 180 : 0,
                      }}
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
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>
    </main>
  );
}