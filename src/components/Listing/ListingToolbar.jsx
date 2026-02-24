import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronDown } from "lucide-react";

const ListingToolbar = ({
  onSearch,
  onFilterToggle,
  searchValue,
  searchPlaceholder = "Search...",
  isSticky = false,
  children,
  ctaButton = null,
  isLoading = false,
  showClearFilters = false,
  onClearFilters,
}) => {
  const [showClear, setShowClear] = useState(false);
  const toolbarRef = useRef(null);

  useEffect(() => {
    setShowClear(searchValue?.trim().length > 0);
  }, [searchValue]);

  return (
    <motion.div
      ref={toolbarRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative z-40 bg-black border-b border-neutral-800/50 transition-all duration-300 ${
        isSticky
          ? "sticky top-20 shadow-lg shadow-black/50 backdrop-blur-xl bg-black/95"
          : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 sm:py-5">
          {/* Main toolbar content */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search Input */}
            <div className="w-full sm:flex-1 relative group">
              <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/0 to-blue-500/0 rounded-xl opacity-0 group-focus-within:from-purple-500/20 group-focus-within:to-blue-500/20 group-focus-within:opacity-100 transition-all duration-500 blur-sm" />
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => onSearch(e.target.value)}
                  placeholder={searchPlaceholder}
                  disabled={isLoading}
                  className="w-full pl-10 sm:pl-11 pr-10 py-2.5 sm:py-3 bg-neutral-900/80 border border-neutral-800/60 rounded-lg sm:rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 disabled:opacity-50"
                />
                <AnimatePresence>
                  {showClear && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => onSearch("")}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-800/50 rounded-md transition-colors"
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4 text-neutral-400 hover:text-white" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Filter & Sort Controls - Desktop */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              {children}
              {showClearFilters && (
                <button
                  onClick={onClearFilters}
                  className="ml-2 px-3 py-2 bg-neutral-900/80 border border-neutral-800/60 rounded-lg text-white text-xs font-medium hover:bg-neutral-800/60 transition-colors"
                  disabled={isLoading}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* CTA Button - Desktop */}
            {ctaButton && <div className="hidden sm:block">{ctaButton}</div>}

            {/* Filter Toggle - Mobile */}
            <button
              onClick={onFilterToggle}
              className="sm:hidden w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900/80 border border-neutral-800/60 rounded-lg text-white text-sm font-medium hover:bg-neutral-800/60 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Mobile: Controls & CTA below search */}
          <div className="sm:hidden mt-4 space-y-3">
            <div className="flex gap-2 overflow-x-auto pb-2">{children}</div>
            {showClearFilters && (
              <button
                onClick={onClearFilters}
                className="w-full px-3 py-2 bg-neutral-900/80 border border-neutral-800/60 rounded-lg text-white text-xs font-medium hover:bg-neutral-800/60 transition-colors"
                disabled={isLoading}
              >
                Clear Filters
              </button>
            )}
            {ctaButton && <div>{ctaButton}</div>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingToolbar;
