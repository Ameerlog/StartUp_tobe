import React from "react";
import { motion } from "framer-motion";

const SkeletonCard = ({ colSpan = 1 }) => (
  <div
    className={`group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 backdrop-blur-xl`}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/50 to-transparent animate-pulse" />
    <div className="relative p-5 sm:p-6 space-y-4">
      <div className="h-32 sm:h-40 bg-neutral-800/50 rounded-lg animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-neutral-800/50 rounded-md animate-pulse w-3/4" />
        <div className="h-3 bg-neutral-800/50 rounded-md animate-pulse w-1/2" />
      </div>
      <div className="h-10 bg-neutral-800/50 rounded-lg animate-pulse" />
    </div>
  </div>
);

const SkeletonLoader = ({ count = 8, columns = 4 }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`}
    >
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </motion.div>
  );
};

export default SkeletonLoader;
