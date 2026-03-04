import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  ArrowRight,
  Search,
  X,
  Wallet,
  FileText,
  Layers, // Used for Industry
  ChevronDown,
} from "lucide-react";

import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";
import Logo_white from "../assets/domain/cobrother12341.png";

const INITIAL_COUNT = 8;

// --- Skeleton Component ---
const MarketPlaceSkeleton = () => {
  return (
    <div className="h-[380px] rounded-2xl border border-white/10 bg-[#0A0A0A] p-2 flex flex-col w-full">
      <div className="h-32 rounded-xl bg-white/5 animate-pulse mx-auto w-full" />
      <div className="p-3 flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start">
          <div className="h-5 w-24 bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-12 bg-white/10 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="h-14 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-14 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="h-16 bg-white/5 rounded-lg animate-pulse mt-1" />
        <div className="mt-auto h-9 w-full bg-white/10 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

// --- Helper Functions ---
const getImageUrl = (imageField) => {
  if (!imageField) return null;
  // Fix localhost/local network issues if present in API data
  let url = imageField;
  if (url.includes("localhost:8080")) {
    url = url.replace("localhost:8080", "192.168.29.184:8080");
  }

  if (url.startsWith("data:")) return url;
  if (url.startsWith("http")) return url;
  if (url.startsWith("/api/images/")) {
    return `https://cobrother-api.onrender.com${url}`;
  }
  return `https://cobrother-api.onrender.com/api/images/${url}`;
};

const normalizePrice = (details) => {
  const priceCandidates = [
    details.dealValue,
    details.askingPrice,
    details.fundingAmount,
    details.priceTag,
    details.price,
  ];

  const numericPrice = priceCandidates
    .map((value) =>
      typeof value === "number"
        ? value
        : parseInt(String(value || "").replace(/\D/g, ""), 10),
    )
    .find((value) => Number.isFinite(value) && value > 0);

  if (numericPrice) {
    return {
      priceValue: numericPrice,
      priceLabel: `₹${numericPrice.toLocaleString("en-IN")}`,
    };
  }

  return {
    priceValue: 0,
    priceLabel: "Price on inquiry",
  };
};

// --- Hero Section ---
const MarketHero = () => {
  return (
    <section className="relative w-full min-h-[28vh] bg-[#09090b] overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-2 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent font-display">
            Premium
          </span>{" "}
          <span />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent font-display">
            Brand Marketplace
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto"
        >
          Acquire established brand identities, domains, and assets to kickstart
          your next venture.
        </motion.p>
      </div>
    </section>
  );
};

export default function MarketPlace() {
  const navigate = useNavigate();

  // State
  const [showAll, setShowAll] = useState(false);
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sort, setSort] = useState("");
  const [imageErrors, setImageErrors] = useState({});

  // Sticky Header Refs
  const [isSticky, setIsSticky] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const heroRef = useRef(null);
  const toolbarRef = useRef(null);

  // --- Sticky Logic ---
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { root: null, threshold: [0, 1], rootMargin: "-80px 0px 0px 0px" },
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  useEffect(() => {
    const updateToolbarHeight = () => {
      if (toolbarRef.current)
        setToolbarHeight(toolbarRef.current.offsetHeight || 0);
    };
    updateToolbarHeight();
    window.addEventListener("resize", updateToolbarHeight);
    return () => window.removeEventListener("resize", updateToolbarHeight);
  }, []);

  // --- Search Debounce ---
  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(searchQuery.trim().toLowerCase()),
      250,
    );
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset show all on filter change
  useEffect(() => {
    setShowAll(false);
  }, [debouncedSearch, industryFilter, sort]);

  // --- Data Fetching ---
  useEffect(() => {
    const fetchVentures = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllBrands",
        );
        const data = await response.json();
        const list = Array.isArray(data) ? data : data.data || [];

        const mappedVentures = list
          .filter((item) => item?.brandDetails?.brandName)
          .map((item, index) => {
            const details = item.brandDetails || {};
            const { priceValue, priceLabel } = normalizePrice(details);

            return {
              id: item.id || index,
              uniqueKey: `${item.id}-${index}`,
              title: details.brandName || "Unknown Brand",
              description:
                details.description || "Premium venture opportunity.",
              industry: details.industry || "General",
              logo: details.logoUrl || "",
              priceValue,
              priceLabel,
            };
          });

        setVentures(mappedVentures);
      } catch (error) {
        console.error("Error fetching data:", error);
        setVentures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVentures();
  }, []);

  // --- Filtering & Sorting ---
  const industryOptions = useMemo(() => {
    const industryMap = new Map();
    ventures.forEach((v) => {
      if (v.industry?.trim()) {
        const key = v.industry.toLowerCase();
        if (!industryMap.has(key)) industryMap.set(key, v.industry);
      }
    });
    return Array.from(industryMap.values()).map((ind) => ({
      label: ind,
      value: ind,
    }));
  }, [ventures]);

  const filteredVentures = useMemo(() => {
    let filtered = ventures.filter((v) => {
      if (debouncedSearch) {
        const text = `${v.title} ${v.description} ${v.industry}`.toLowerCase();
        if (!text.includes(debouncedSearch)) return false;
      }
      if (
        industryFilter &&
        v.industry.toLowerCase() !== industryFilter.toLowerCase()
      ) {
        return false;
      }
      return true;
    });

    if (sort === "price_high")
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    else if (sort === "price_low")
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    else if (sort === "name")
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "newest") filtered.reverse();

    return filtered;
  }, [ventures, debouncedSearch, industryFilter, sort]);

  const displayedVentures = showAll
    ? filteredVentures
    : filteredVentures.slice(0, INITIAL_COUNT);
  const hasMore = filteredVentures.length > INITIAL_COUNT;
  const hasActiveFilters = Boolean(searchQuery || industryFilter || sort);

  const handleImageError = (key) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <main className="min-h-screen bg-[#09090b]">
      <div className="relative">
        <div ref={heroRef}>
          <MarketHero />
        </div>

        {/* --- Sticky Toolbar --- */}
        <div style={isSticky ? { height: toolbarHeight } : undefined}>
          <div
            ref={toolbarRef}
            className={`relative z-[200] w-full transition-all duration-500 ease-out 
              ${
                isSticky
                  ? "fixed top-0 left-0 bg-black/95 border-b border-neutral-800/50 shadow-lg backdrop-blur-md"
                  : "relative z-10 bg-transparent border-b border-transparent shadow-none"
              }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Top Row */}
              <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4">
                <div
                  className={`flex-shrink-0 overflow-hidden transition-all duration-500 ${isSticky ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"}`}
                >
                  <button
                    onClick={() => navigate("/")}
                    className="hover:opacity-80"
                  >
                    <img
                      src={Logo_white}
                      alt="CoBrother"
                      className="h-6 sm:h-8 w-auto"
                    />
                  </button>
                </div>

                <div
                  className={`flex-1 mx-auto transition-all duration-300 ${isSticky ? "max-w-4xl" : "max-w-5xl"}`}
                >
                  <div
                    className={`relative flex items-center rounded-2xl border border-neutral-700/60 bg-neutral-900/95 transition-all duration-300 ${isSticky ? "p-1 shadow-lg" : "p-2 shadow-xl"}`}
                  >
                    <Search
                      className={`absolute text-neutral-400 pointer-events-none ${isSticky ? "left-4 w-4 h-4" : "left-5 w-5 h-5"}`}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search brands, industries..."
                      className={`w-full bg-neutral-950/40 border-transparent rounded-xl text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-purple-500/35 transition-all ${isSticky ? "h-11 pl-11 pr-10 text-sm" : "h-14 pl-14 pr-12 text-base"}`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 p-1 hover:bg-neutral-800/80 rounded-md"
                      >
                        <X className="w-4 h-4 text-neutral-400" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-t border-neutral-800/30">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-neutral-400">
                    Filters:
                  </span>
                  <FilterDropdown
                    label={industryFilter || "Industry"}
                    value={industryFilter}
                    options={industryOptions}
                    onChange={setIndustryFilter}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <SortDropdown
                    label="Sort"
                    value={sort}
                    onChange={setSort}
                    options={[
                      { label: "Newest", value: "newest" },
                      { label: "Name A-Z", value: "name" },
                      { label: "Price: High to Low", value: "price_high" },
                      { label: "Price: Low to High", value: "price_low" },
                    ]}
                  />
                  {hasActiveFilters && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setIndustryFilter("");
                        setSort("");
                      }}
                      className="px-3 py-2 bg-neutral-900/80 border border-neutral-800/60 rounded-lg text-white text-xs font-medium hover:bg-neutral-800/60"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Listing Grid --- */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <LayoutGroup>
          {loading ? (
            <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <MarketPlaceSkeleton key={i} />
              ))}
            </div>
          ) : displayedVentures.length === 0 ? (
            <div className="w-full text-center py-20 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-2">
                No results found
              </h3>
              <p className="text-zinc-400">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIndustryFilter("");
                }}
                className="mt-4 px-4 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-200"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {displayedVentures.map((card) => (
                  <motion.div
                    key={card.uniqueKey}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* --- CONSISTENT CARD DESIGN --- */}
                    <div className="group relative h-[380px] rounded-2xl border border-white/10 bg-[#111] bg-opacity-60 backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1">
                      {/* Top Image */}
                      <div className="relative h-32 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-4 border-b border-white/5">
                        {card.logo && !imageErrors[card.uniqueKey] ? (
                          <img
                            src={getImageUrl(card.logo)}
                            alt={card.title}
                            className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            onError={() => handleImageError(card.uniqueKey)}
                          />
                        ) : (
                          <span className="text-4xl font-black text-white/10 select-none">
                            {card.title.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded">
                          <p className="text-[9px] font-bold text-emerald-400 tracking-wider uppercase">
                            Verified
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 truncate">
                          {card.title}
                        </h3>

                        {/* Data Grid: Price & Industry */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 overflow-hidden">
                            <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-medium uppercase tracking-wider mb-0.5">
                              <Wallet className="w-2.5 h-2.5" /> Price
                            </div>
                            <div className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                              {card.priceLabel}
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 overflow-hidden">
                            <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-medium uppercase tracking-wider mb-0.5">
                              <Layers className="w-2.5 h-2.5" /> Industry
                            </div>
                            <div className="text-white font-bold text-sm truncate">
                              {card.industry}
                            </div>
                          </div>
                        </div>

                        {/* Description Box */}
                        <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 mb-3 flex-1 overflow-hidden">
                          <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-medium uppercase tracking-wider mb-0.5">
                            <FileText className="w-2.5 h-2.5" /> Description
                          </div>
                          <p className="text-[10px] text-zinc-300 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={() => navigate("/get-ventures")}
                            className="w-full flex items-center justify-center gap-1.5 rounded-full bg-gray-600 text-white py-2.5 text-[11px] font-bold uppercase tracking-wider transition-transform active:scale-[0.98] hover:bg-gray-500"
                          >
                            Get Brand <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* --- END CARD DESIGN --- */}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Load More Button */}
          {!loading && hasMore && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-gray-800 hover:border-white/40 active:scale-[0.98]"
              >
                {showAll
                  ? "Show Less"
                  : `View All (${filteredVentures.length - INITIAL_COUNT} more)`}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </LayoutGroup>
      </section>
    </main>
  );
}
