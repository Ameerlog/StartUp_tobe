import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";

const INITIAL_COUNT = 6;

const cardColors = [
  {
    gradient: "from-purple-500/15 to-indigo-500/15",
    glow: "from-purple-600/30 to-indigo-600/30",
    border: "group-hover:border-purple-500/50",
  },
  {
    gradient: "from-blue-500/15 to-cyan-500/15",
    glow: "from-blue-600/30 to-cyan-600/30",
    border: "group-hover:border-blue-500/50",
  },
  {
    gradient: "from-pink-500/15 to-rose-500/15",
    glow: "from-pink-600/30 to-rose-600/30",
    border: "group-hover:border-pink-500/50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
  exit: { opacity: 0, y: -16, scale: 0.96 },
  hover: { y: -6, scale: 1.01 },
  tap: { scale: 0.985 },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 16 },
  },
  hover: { scale: 1.04 },
  tap: { scale: 0.96 },
};

const arrowVariants = {
  animate: {
    y: [0, 5, 0],
    transition: { duration: 1.2, repeat: Infinity },
  },
};

const getImageUrl = (imageField) => {
  if (!imageField) return null;
  if (imageField.startsWith("data:")) return imageField;
  if (imageField.startsWith("http")) return imageField;
  if (imageField.startsWith("/api/images/")) {
    return `https://cobrother-api.onrender.com${imageField}`;
  }
  return `https://cobrother-api.onrender.com/api/images/${imageField}`;
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
      priceLabel: `\u20B9${numericPrice.toLocaleString("en-IN")}`,
    };
  }

  const textPrice = priceCandidates.find(
    (value) => typeof value === "string" && value.trim().length > 0,
  );

  return {
    priceValue: 0,
    priceLabel: textPrice ? textPrice.trim() : "Price on inquiry",
  };
};

export default function MarketPlace() {
  const [showAll, setShowAll] = useState(false);
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim().toLowerCase());
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setShowAll(false);
  }, [debouncedSearch, industryFilter, sort]);

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
              id: item.id || item.Id || index + 1,
              title: details.brandName || "Unknown Brand",
              description: details.description || "Premium venture opportunity.",
              industry: details.industry || "General",
              logo: details.logoUrl || "",
              priceValue,
              priceLabel,
            };
          });

        setVentures(mappedVentures);
      } catch (error) {
        console.error("Error fetching venture data:", error);
        setVentures([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVentures();
  }, []);

  const industryOptions = useMemo(() => {
    const industryMap = new Map();

    ventures.forEach((venture) => {
      if (venture.industry?.trim()) {
        const key = venture.industry.toLowerCase();
        if (!industryMap.has(key)) industryMap.set(key, venture.industry);
      }
    });

    return Array.from(industryMap.values()).map((industry) => ({
      label: industry,
      value: industry,
    }));
  }, [ventures]);

  const filteredVentures = useMemo(() => {
    const filtered = ventures.filter((venture) => {
      if (debouncedSearch) {
        const searchable = `${venture.title} ${venture.description} ${venture.industry}`.toLowerCase();
        if (!searchable.includes(debouncedSearch)) return false;
      }

      if (industryFilter) {
        if (venture.industry.toLowerCase() !== industryFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...filtered];
    if (sort === "price_high") {
      sorted.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sort === "price_low") {
      sorted.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sort === "name") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "newest") {
      sorted.reverse();
    }

    return sorted;
  }, [ventures, debouncedSearch, industryFilter, sort]);

  const displayedVentures = useMemo(
    () =>
      showAll
        ? filteredVentures
        : filteredVentures.slice(0, INITIAL_COUNT),
    [showAll, filteredVentures],
  );

  const hasMore = filteredVentures.length > INITIAL_COUNT;
  const hasActiveFilters = Boolean(searchQuery || industryFilter || sort);

  return (
    <main className="relative text-white overflow-hidden">
      <section className="relative z-10">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Let&apos;s Find Your Brand Name
          </motion.h1>
        </div>
      </section>

      <section className="relative z-10 pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-8">
          <div className="sticky top-20 z-20 mb-6 sm:mb-8 rounded-2xl border border-neutral-800/60 bg-neutral-900/75 backdrop-blur-xl shadow-[0_14px_38px_rgba(0,0,0,0.35)]">
            <div className="p-3 sm:p-4 border-b border-neutral-800/50">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brand name, description or industry..."
                  disabled={loading}
                  className="w-full h-11 sm:h-12 pl-10 pr-10 rounded-xl border border-neutral-700/70 bg-neutral-950/50 text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all disabled:opacity-50"
                />
                {searchQuery.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-neutral-800/70 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                )}
              </div>
            </div>

            <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium text-neutral-400 whitespace-nowrap">
                  Filters:
                </span>
                <FilterDropdown
                  label={industryFilter || "Industry"}
                  value={industryFilter}
                  options={industryOptions}
                  onChange={setIndustryFilter}
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
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
                    className="px-3 py-2 bg-neutral-900/80 border border-neutral-700/60 rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-neutral-800/70 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>

          <LayoutGroup>
            <AnimatePresence mode="wait">
              <motion.div
                key={showAll ? "expanded" : "collapsed"}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {displayedVentures.map((item, index) => {
                    const theme = cardColors[index % cardColors.length];

                    return (
                      <motion.article
                        key={item.id}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        layout
                        className={`group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/80 to-neutral-950/85 backdrop-blur-xl cursor-pointer ${theme.border}`}
                      >
                        <div
                          className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${theme.glow} opacity-0 blur-lg transition duration-500 group-hover:opacity-70`}
                        />

                        <motion.button
                          onClick={() => navigate("/get-ventures")}
                          className="absolute inset-0 z-10"
                        />

                        <div
                          className={`border-b border-neutral-800/50 bg-gradient-to-br ${theme.gradient} p-4`}
                        >
                          <div className="aspect-[4/3] flex items-center justify-center rounded-xl bg-black/60">
                            {item.logo ? (
                              <motion.img
                                src={getImageUrl(item.logo)}
                                alt={item.title}
                                className="max-h-full max-w-full object-contain"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                              />
                            ) : (
                              <span className="text-3xl font-bold text-white/40">
                                {item.title.substring(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-2">
                            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs text-neutral-300 truncate max-w-[55%]">
                              {item.priceLabel}
                            </span>

                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate("/get-ventures");
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="relative overflow-hidden rounded-full"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
                              <span className="relative px-4 py-1.5 text-xs font-semibold text-white">
                                Buy Now
                              </span>
                            </motion.button>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="text-sm font-semibold text-white">
                            {item.title}
                          </div>
                          <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full border border-neutral-700/50 bg-neutral-800/50 px-3 py-1 text-xs text-neutral-300">
                              {item.industry}
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {loading ? (
              <div className="mt-10 text-center text-sm text-neutral-400">
                Loading ventures...
              </div>
            ) : filteredVentures.length === 0 ? (
              <div className="mt-10 text-center text-sm text-neutral-400">
                No brands matched your current filters.
              </div>
            ) : hasMore ? (
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="mt-10 text-center"
              >
                <motion.button
                  onClick={() => {
                    setShowAll(!showAll);
                    if (showAll) {
                      window.scrollTo({ top: 220, behavior: "smooth" });
                    }
                  }}
                  whileHover="hover"
                  whileTap="tap"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-xl px-6 py-3 text-sm font-semibold text-neutral-200"
                >
                  {showAll
                    ? "Show Less"
                    : `View All (${filteredVentures.length - INITIAL_COUNT} more)`}

                  <motion.svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    variants={arrowVariants}
                    animate="animate"
                    style={{ rotate: showAll ? 180 : 0 }}
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
            ) : null}
          </LayoutGroup>
        </div>
      </section>
    </main>
  );
}
