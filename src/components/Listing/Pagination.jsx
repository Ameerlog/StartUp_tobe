import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages,
  onPageChange,
  isLoading = false,
  itemsPerPage = 32,
  totalItems = 0,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (!isLoading && page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 sm:mt-16 py-8 sm:py-12"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {/* Results info - Mobile will wrap */}
        {totalItems > 0 && (
          <p className="text-xs sm:text-sm text-neutral-400 order-3 sm:order-1">
            Showing <span className="text-white font-medium">{startItem}</span>{" "}
            to <span className="text-white font-medium">{endItem}</span> of{" "}
            <span className="text-white font-medium">{totalItems}</span>
          </p>
        )}

        {/* Page controls */}
        <div className="flex items-center gap-2 order-1 sm:order-2">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: currentPage > 1 ? 1.05 : 1 }}
            whileTap={{ scale: currentPage > 1 ? 0.95 : 1 }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className={`p-2 rounded-lg border transition-all ${
              currentPage === 1 || isLoading
                ? "border-neutral-800/30 text-neutral-600 cursor-not-allowed"
                : "border-neutral-800/60 text-neutral-300 hover:bg-neutral-800/50 hover:border-neutral-700"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-2 text-neutral-500 text-sm"
                >
                  ...
                </span>
              ) : (
                <motion.button
                  key={page}
                  whileHover={{ scale: page !== currentPage ? 1.1 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageChange(page)}
                  disabled={page === currentPage || isLoading}
                  className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                    page === currentPage
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50"
                      : "border border-neutral-800/60 text-neutral-300 hover:bg-neutral-800/50 hover:border-neutral-700 disabled:opacity-50"
                  }`}
                >
                  {page}
                </motion.button>
              ),
            )}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: currentPage < totalPages ? 1.05 : 1 }}
            whileTap={{ scale: currentPage < totalPages ? 0.95 : 1 }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className={`p-2 rounded-lg border transition-all ${
              currentPage === totalPages || isLoading
                ? "border-neutral-800/30 text-neutral-600 cursor-not-allowed"
                : "border-neutral-800/60 text-neutral-300 hover:bg-neutral-800/50 hover:border-neutral-700"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Empty space for alignment on desktop */}
        <div className="order-2 sm:order-3 hidden sm:block w-32"></div>
      </div>
    </motion.div>
  );
};

export default Pagination;
