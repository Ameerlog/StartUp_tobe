import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { jvMarqueeCards } from "../data/jointVenture";

export default function JointVentureGrid() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5,
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
              Joint Venture
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-2 text-sm sm:text-base text-slate-500"
            >
              Explore partnership opportunities
            </motion.p>
          </div>
        </div>
      </section>

    
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <LayoutGroup>
            {jvMarqueeCards.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
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
                  className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50"
                >
                  🤝
                </motion.div>
                <h3 className="text-lg font-semibold text-slate-900">
                  No ventures available
                </h3>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
                  Check back soon for new partnership opportunities.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {jvMarqueeCards.map((card, index) => (
                  <motion.article
                    key={card.id}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    layout
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
              
                    <div className="border-b border-slate-200 bg-slate-50 p-4">
                      
                      <motion.div
                        className="h-12 sm:h-14 flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.1 }}
                      >
                        <img
                          src={card.logo}
                          alt="JV Brand Logo"
                          className="h-auto mt-15  max-w-full object-contain"
                          loading="lazy"
                        />
                      </motion.div>

                      {/* Buttons in Header */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[15px] text-slate-700 font-bold">
                         {card.price}
                        </span>

                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#dc2626",
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white transition-colors duration-300"
                        >
                          Get Venture
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-4">
                     
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="text-sm font-semibold text-slate-900 line-clamp-2"
                      >
                        {card.desc}
                      </motion.p>

                      <motion.div
                        className="mt-3 space-y-1.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {card.details.slice(0, 3).map((item, detailIndex) => (
                          <motion.p
                            key={detailIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.1 + 0.3 + detailIndex * 0.05,
                            }}
                            className="text-xs text-slate-500 flex gap-2"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                            <span className="line-clamp-1">{item}</span>
                          </motion.p>
                        ))}
                      </motion.div>

                      {/* <motion.div
                        className="mt-3 flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        <motion.span
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#fee2e2",
                          }}
                          className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600 transition-colors"
                        >
                          Investment
                        </motion.span>
                        <motion.span
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#fee2e2",
                          }}
                          className="rounded-full border border-slate-200 px-2 py-1 text-xs text-slate-600 transition-colors"
                        >
                          Partnership
                        </motion.span>
                      </motion.div> */}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </LayoutGroup>
        </div>
      </section>
    </main>
  );
}