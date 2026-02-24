import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FilterDropdown = ({
  label,
  value,
  options,
  onChange,
  icon: Icon,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 180),
      });
    }
  };

 
  useEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

 
  useEffect(() => {
    if (!isOpen) return;

    const handleUpdate = () => updatePosition();
    
    window.addEventListener("scroll", handleUpdate, true);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate, true);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0 ? `${value.length} selected` : "Select...";
    }
    if (value) {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : "Select...";
    }
    return "Select...";
  };

  const handleSelect = (optionValue) => {
    if (multiple && Array.isArray(value)) {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const dropdownContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: position.top,
            left: position.left,
            minWidth: position.width,
            zIndex: 99999,
          }}
          className="bg-black border border-neutral-800/50 rounded-xl shadow-xl shadow-black/60"
        >
          <div className="py-2 max-h-64 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                  multiple
                    ? value?.includes(option.value)
                      ? "bg-purple-500/20 text-purple-300 border-l-2 border-purple-500"
                      : "text-neutral-300 hover:bg-neutral-800/50"
                    : value === option.value
                      ? "bg-purple-500/20 text-purple-300 border-l-2 border-purple-500"
                      : "text-neutral-300 hover:bg-neutral-800/50"
                }`}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={value?.includes(option.value) || false}
                    readOnly
                    className="w-4 h-4 rounded border-neutral-600 bg-neutral-800 accent-purple-500 cursor-pointer"
                  />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-900/80 border rounded-lg sm:rounded-xl text-white text-sm font-medium hover:bg-neutral-800/60 transition-colors flex items-center gap-2 whitespace-nowrap ${
          isOpen ? "border-purple-500/50" : "border-neutral-800/60"
        }`}
      >
        {Icon && <Icon className="w-4 h-4 text-purple-400" />}
        <span className="truncate">{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {typeof document !== "undefined" &&
        createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default FilterDropdown;