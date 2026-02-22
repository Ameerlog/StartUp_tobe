import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check } from "lucide-react";

const SortDropdown = ({ value, onChange, options, label = "Sort" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-900/80 border border-neutral-800/60 rounded-lg sm:rounded-xl text-white text-sm font-medium hover:bg-neutral-800/60 transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        <ArrowUpDown className="w-4 h-4 text-blue-400" />
        <span className="truncate max-w-[120px]">
          {selectedOption ? selectedOption.label : label}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 bg-black border border-neutral-800/50 rounded-xl shadow-lg shadow-black/50 z-50 min-w-max"
          >
            <div className="py-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center justify-between ${
                    value === option.value
                      ? "bg-blue-500/20 text-blue-300 border-l-2 border-blue-500"
                      : "text-neutral-300 hover:bg-neutral-800/50"
                  }`}
                >
                  <span>{option.label}</span>
                  {value === option.value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
