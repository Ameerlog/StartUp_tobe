import React from "react";
import { motion } from "framer-motion";
import { Search, Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Results Found",
  description = "Try adjusting your search or filters",
  icon: Icon = Inbox,
  action = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16 sm:py-24 text-center"
    >
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-neutral-900/50 border border-neutral-800/50">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-500" />
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto mb-6">
        {description}
      </p>

      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="group relative rounded-full overflow-hidden inline-flex items-center gap-2 shadow-lg shadow-purple-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
          <span className="relative px-6 py-2.5 font-semibold text-white text-sm flex items-center gap-2">
            {action.label}
          </span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
