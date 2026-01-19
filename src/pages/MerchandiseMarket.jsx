import React, { useState, useMemo } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { merchandiseData, categories } from "../data/merchandise";
import { useNavigate } from "react-router-dom";

export default function MerchandiseMarket() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  const INITIAL_COUNT = 6;

  const filteredProducts = useMemo(() => {
    return activeCategory === "all"
      ? merchandiseData
      : merchandiseData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const displayedProducts = useMemo(() => {
    return showAll ? filteredProducts : filteredProducts.slice(0, INITIAL_COUNT);
  }, [filteredProducts, showAll]);

  const hasMore = filteredProducts.length > INITIAL_COUNT;

  // Container animation variants
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

  // Card animation variants
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

  // Title animation variants
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

  // Button animation variants
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
    hover: {
      scale: 1.05,
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

  // Arrow animation variants
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

  return (
    <main className="relative bg-[#F8F9FA] text-slate-900 min-h-screen overflow-hidden">
      {/* Grid Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      {/* Title Section */}
      <section className="border-b border-slate-200 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="text-center">
            <motion.h1
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900"
            >
              Merchandise
            </motion.h1>
            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              animate="visible"
              className="mt-2 text-sm sm:text-base text-slate-500"
            >
              Premium branded merchandise for your business
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b border-slate-200 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setShowAll(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    rounded-full
                    px-4 sm:px-6
                    py-2 sm:py-2.5
                    text-xs sm:text-sm
                    font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                    }
                  `}
                >
                  {category.label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <LayoutGroup>
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
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
                    className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50 text-xl"
                  >
                    👕
                  </motion.div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    No products found
                  </h3>
                  <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
                    Try selecting a different category.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${activeCategory}-${showAll ? "expanded" : "collapsed"}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {displayedProducts.map((item, index) => (
                      <motion.article
                        key={item.id}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        layout
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >
                        {/* Card Header with Image */}
                        <div className="border-b border-slate-200 bg-slate-50 p-3">
                          <motion.div
                            className="aspect-[4/3] rounded-xl overflow-hidden bg-white"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.img
                              src={item.icon}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay: index * 0.1,
                                duration: 0.4,
                              }}
                              whileHover={{ scale: 1.08 }}
                              loading="lazy"
                            />
                          </motion.div>

                          {/* Category & Price */}
                          <div className="mt-3 flex items-center justify-between">
                            <motion.span
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 uppercase tracking-wider"
                            >
                              {item.category}
                            </motion.span>

                            <motion.span
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="text-lg font-bold text-slate-900"
                            >
                              {item.price}
                            </motion.span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4">
                          {/* Product Name */}
                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            className="text-sm font-semibold text-slate-900"
                          >
                            {item.name}
                          </motion.h3>

                          {/* Description if available */}
                          {item.description && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.35 }}
                              className="mt-1.5 text-xs text-slate-500 line-clamp-2"
                            >
                              {item.description}
                            </motion.p>
                          )}

                          {/* Action Button */}
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.4 }}
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "#dc2626",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors duration-300"
                          >
                            Print Your Brand
                          </motion.button>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View All / Show Less Button */}
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
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-red-300 transition-colors duration-300 shadow-sm"
                  >
                    {showAll
                      ? "Show Less"
                      : `View All (${filteredProducts.length - INITIAL_COUNT} more)`}
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