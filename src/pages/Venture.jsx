import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";
import Pagination from "../components/Listing/Pagination";
import EmptyState from "../components/Listing/EmptyState";
import SkeletonLoader from "../components/Listing/SkeletonLoader";
import useListingState from "../hooks/useListingState";
import VentureCard from "../components/VentureCard";
import Logo_white from "../assets/domain/cobrother12341.png";
import { industryCategories } from "../constants/coventure";

const VentureHero = () => {
  return (
    <section className="relative w-full min-h-[28vh] bg-black overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4  pb-2 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight"
        >
          <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Discover
          </span>
          <br />
          <span className="bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Strategic Ventures
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto"
        >
          Find and connect with high-growth venture opportunities aligned with
          your goals.
        </motion.p>
      </div>
    </section>
  );
};

const Venture = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    debouncedSearch,
    currentPage,
    filters,
    sort,
    handleSearch,
    handleFilterChange,
    handleSortChange,
    handlePageChange,
    itemsPerPage,
    setFilters,
    setSearchQuery,
    setSort,
    setCurrentPage,
  } = useListingState(32);

  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const [isSticky, setIsSticky] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const heroRef = useRef(null);
  const toolbarRef = useRef(null);

  // IntersectionObserver for sticky toolbar
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const nextSticky = !entry.isIntersecting;
        setIsSticky((prev) => (prev === nextSticky ? prev : nextSticky));
      },
      { root: null, threshold: [0, 1], rootMargin: "-80px 0px 0px 0px" },
    );
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  useEffect(() => {
    const updateToolbarHeight = () => {
      if (toolbarRef.current) {
        setToolbarHeight(toolbarRef.current.offsetHeight || 0);
      }
    };

    updateToolbarHeight();
    window.addEventListener("resize", updateToolbarHeight);
    return () => window.removeEventListener("resize", updateToolbarHeight);
  }, []);

  // Fetch ventures from API
  useEffect(() => {
    const fetchVentures = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllBrands",
        );
        if (response.ok) {
          const data = await response.json();
          const validVentures = (data || [])
            .filter((v) => v.brandDetails?.brandName)
            .map((v, idx) => ({
              id: v.id || idx,
              title: v.brandDetails?.brandName || "Unknown",
              industry: v.brandDetails?.industry || "Tech",
              priceTag: v.brandDetails?.dealValue
                ? `₹${v.brandDetails.dealValue.toLocaleString("en-IN")}`
                : "Price on inquiry",
              description: v.brandDetails?.description || "",
              logo: v.brandDetails?.logoUrl || "",
              imageError: false,
            }));
          setVentures(validVentures);
        }
      } catch (error) {
        console.error("Error fetching ventures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVentures();
  }, []);

  // Filter and search logic
  const filteredVentures = ventures.filter((venture) => {
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      const matchesSearch =
        venture.title.toLowerCase().includes(query) ||
        venture.industry.toLowerCase().includes(query) ||
        venture.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    if (filters.industry && filters.industry !== "") {
      if (venture.industry.toLowerCase() !== filters.industry.toLowerCase())
        return false;
    }
    return true;
  });

  // Sort logic
  let sortedVentures = [...filteredVentures];
  if (sort === "newest") {
    sortedVentures.reverse();
  } else if (sort === "trending") {
    sortedVentures.sort((a, b) => b.id - a.id);
  } else if (sort === "funded") {
    sortedVentures.sort((a, b) => {
      const aVal = parseInt(a.priceTag.replace(/\D/g, "")) || 0;
      const bVal = parseInt(b.priceTag.replace(/\D/g, "")) || 0;
      return bVal - aVal;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedVentures.length / itemsPerPage);
  const paginatedVentures = sortedVentures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

  // Get unique industries for filter - combine form industries with API industries
  const defaultIndustries = industryCategories
    .filter((cat) => cat.value && cat.value.trim() !== "") // Skip empty/placeholder option
    .map((cat) => ({ label: cat.label, value: cat.label.toLowerCase() }));

  const apiIndustries = Array.from(new Set(ventures.map((v) => v.industry)))
    .filter((ind) => ind && ind.trim() !== "")
    .map((ind) => ({ label: ind, value: ind.toLowerCase() }));

  // Merge and deduplicate industries
  const uniqueIndustries = Array.from(
    new Map(
      [...defaultIndustries, ...apiIndustries].map((x) => [x.value, x]),
    ).values(),
  );

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery?.trim().length > 0 || filters.industry || sort;

  const ctaButton = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/coventure-form")}
      className="group relative overflow-hidden rounded-full w-full sm:w-auto"
    >
      <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
      <span className="relative px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base flex items-center justify-center gap-2">
        List Your Venture
        <ArrowRight className="w-4 h-4" />
      </span>
    </motion.button>
  );

  // Clear filters logic
  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setSort("");
    setCurrentPage(1);
  };

  return (
    <main id="venture" className="min-h-screen bg-black">
      {/* Navbar + Hero */}
      <div className="relative">
        <div ref={heroRef}>
          <VentureHero />
        </div>
        {/* Sticky Toolbar: Two-Row Layout */}
        <div style={isSticky ? { height: toolbarHeight } : undefined}>
          <div
            ref={toolbarRef}
            className={`w-full overflow-visible will-change-transform transition-[background-color,box-shadow,border-color,transform] duration-500 ease-out ${isSticky ? "fixed top-0 left-0 z-50 bg-black/95 border-b border-neutral-800/50 shadow-lg backdrop-blur-md translate-y-0" : "relative z-10 bg-transparent border-b border-transparent shadow-none translate-y-0"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
            {/* Row 1: Logo + Search + Support Icon */}
            <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4">
              <div
                className={`flex-shrink-0 overflow-hidden transition-all duration-500 ease-out ${isSticky ? "max-w-[180px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"}`}
              >
                <button
                  onClick={() => navigate("/")}
                  className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  title="Home"
                  tabIndex={isSticky ? 0 : -1}
                >
                  <img
                    src={Logo_white}
                    alt="CoBrother"
                    className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto"
                  />
                </button>
              </div>

              {/* Search Bar (Center) */}
              <div
                className={`flex-1 mx-auto transition-all duration-300 ${
                  isSticky ? "max-w-4xl" : "max-w-5xl"
                }`}
              >
                <div className="relative group">
                  <div
                    className={`relative flex items-center rounded-2xl border border-neutral-700/60 bg-neutral-900/95 transition-all duration-300 ${
                      isSticky
                        ? "p-1 shadow-[0_8px_22px_rgba(0,0,0,0.35)]"
                        : "p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                    }`}
                  >
                    <Search
                      className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none transition-all duration-300 ${
                        isSticky
                          ? "left-4 sm:left-5 w-4 h-4 sm:w-5 sm:h-5"
                          : "left-5 sm:left-6 w-5 h-5 sm:w-6 sm:h-6"
                      }`}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Type your startup idea or keywords..."
                      disabled={loading}
                      className={`w-full bg-neutral-950/40 border border-transparent rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/35 transition-all duration-300 disabled:opacity-50 ${
                        isSticky
                          ? "h-11 sm:h-12 pl-11 sm:pl-12 pr-10 sm:pr-12 text-sm sm:text-base"
                          : "h-14 sm:h-16 pl-14 sm:pl-16 pr-12 sm:pr-14 text-base sm:text-[1.08rem]"
                      }`}
                    />
                    <AnimatePresence>
                      {searchQuery.trim().length > 0 && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => handleSearch("")}
                          className={`absolute top-1/2 -translate-y-1/2 hover:bg-neutral-800/80 rounded-md transition-all duration-300 ${
                            isSticky
                              ? "right-3 sm:right-4 p-1"
                              : "right-4 sm:right-5 p-1.5"
                          }`}
                          disabled={loading}
                        >
                          <X
                            className={`text-neutral-400 hover:text-white transition-all duration-300 ${
                              isSticky ? "w-4 h-4" : "w-5 h-5"
                            }`}
                          />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Filters (Left) + Sort & CTA (Right) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-t border-neutral-800/30 overflow-visible">
              {/* Filters (Left) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-visible">
                <span className="text-xs sm:text-sm font-medium text-neutral-400 whitespace-nowrap">
                  Filters:
                </span>
                <FilterDropdown
                  label={filters.industry || "Industry"}
                  value={filters.industry}
                  options={uniqueIndustries}
                  onChange={(val) => handleFilterChange("industry", val)}
                />
              </div>

              {/* Sort & CTA (Right) */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <SortDropdown
                  label="Sort"
                  value={sort}
                  onChange={handleSortChange}
                  options={[
                    { label: "Newest", value: "newest" },
                    { label: "Trending", value: "trending" },
                    { label: "Most Funded", value: "funded" },
                  ]}
                />
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-neutral-900/80 border border-neutral-800/60 rounded-lg text-white text-xs font-medium hover:bg-neutral-800/60 transition-colors whitespace-nowrap"
                    disabled={loading}
                  >
                    Clear Filters
                  </button>
                )}
                {ctaButton && <div className="flex-shrink-0">{ctaButton}</div>}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {loading ? (
          <SkeletonLoader count={8} columns={4} />
        ) : paginatedVentures.length === 0 ? (
          <EmptyState
            title="No ventures found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        ) : (
          <LayoutGroup>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {paginatedVentures.map((venture, index) => (
                  <VentureCard
                    key={venture.id}
                    venture={venture}
                    theme={cardColors[index % cardColors.length]}
                    expandedCards={expandedCards}
                    toggleExpand={toggleExpand}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
        {paginatedVentures.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={loading}
            itemsPerPage={itemsPerPage}
            totalItems={sortedVentures.length}
          />
        )}
      </section>
    </main>
  );
};

export default Venture;
