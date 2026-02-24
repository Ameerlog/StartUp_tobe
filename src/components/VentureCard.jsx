import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const VentureCard = ({ venture, theme, expandedCards, toggleExpand }) => {
  const navigate = useNavigate();
  if (!venture) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ y: -4 }}
      className="group relative bg-linear-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-6 hover:border-neutral-700/50 transition-all duration-300"
    >
      <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600/0 to-pink-600/0 rounded-2xl blur-lg opacity-0 group-hover:from-purple-600/30 group-hover:to-pink-600/30 group-hover:opacity-70 transition duration-500" />

      <div className="relative">
        {/* Logo/Avatar */}
        <div className="mb-4 h-40 bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl flex items-center justify-center overflow-hidden">
          {venture.logo ? (
            <img
              src={`https://cobrother-api.onrender.com/api/images/${venture.logo}`}
              alt={venture.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-white opacity-30">
              {(venture.name || venture.title || "V")
                .substring(0, 2)
                .toUpperCase()}
            </span>
          )}
        </div>

        {/* Venture Name */}
        <h3 className="text-lg font-bold text-white mb-1 truncate">
          {venture.name || venture.title}
        </h3>

        {/* Industry/Category */}
        <p className="text-xs text-neutral-400 mb-3 font-medium">
          {venture.industry || venture.category || "Enterprise"}
        </p>

        {/* Description */}
        <p className="text-sm text-neutral-300 mb-4 line-clamp-2">
          {venture.description || ""}
        </p>

        {/* Funding/Deal Value */}
        {venture.fundingAmount && (
          <div className="mb-4">
            <span className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {venture.fundingAmount}
            </span>
          </div>
        )}

        {/* Venture Type Badge */}
        {venture.ventureType && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 capitalize">
              {venture.ventureType}
            </span>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full group/btn relative overflow-hidden rounded-xl"
          onClick={() => navigate("/get-ventures")}
        >
          <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
          <span className="relative px-4 py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2">
            Explore Venture
            <span>→</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VentureCard;
