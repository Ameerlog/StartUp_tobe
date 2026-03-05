import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  X,
  PieChart,
  Wallet,
  FileText,
} from "lucide-react";
import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";
import Pagination from "../components/Listing/Pagination";
import EmptyState from "../components/Listing/EmptyState";
import useListingState from "../hooks/useListingState";
import Logo_white from "../assets/domain/cobrother12341.png";
import { industryCategories } from "../constants/coventure";

// Skeleton Card
const VentureCardSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-[380px] rounded-2xl border border-white/10 bg-[#0A0A0A] p-2 flex flex-col">
        <div className="h-32 rounded-xl bg-white/5 animate-pulse mx-auto w-full" />
        <div className="p-3 flex flex-col flex-1 gap-2">
          <div className="h-5 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="h-14 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-14 bg-white/5 rounded-lg animate-pulse" />
          </div>
          <div className="h-16 bg-white/5 rounded-lg animate-pulse mt-1" />
          <div className="mt-auto h-9 w-full bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Venture Card
const VentureCard = ({ venture, imageErrors, handleImageError }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div
        className="
          group relative h-[380px] rounded-2xl border border-white/10 bg-[#111] bg-opacity-60
          backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300
          hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1
        "
      >
        <div className="relative h-32 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-4 border-b border-white/5">
          {venture.logo && !imageErrors[venture.id] ? (
            <img
              src={`https://cobrother-api.onrender.com/api/images/${venture.logo}`}
              alt={venture.title}
              className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              draggable={false}
              onError={() => handleImageError(venture.id)}
            />
          ) : (
            <span className="text-4xl font-black text-white/10 select-none">
              {venture.title.slice(0, 2).toUpperCase()}
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
            {venture.title}
          </h3>

          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 overflow-hidden">
              <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-medium uppercase tracking-wider mb-0.5">
                <Wallet className="w-2.5 h-2.5" /> Deal Value
              </div>
              <div
                className="text-white font-bold whitespace-nowrap overflow-hidden text-ellipsis"
                title={venture.dealValue}
                style={{
                  fontSize: venture.dealValue.length > 10 ? "12px" : "14px",
                }}
              >
                {venture.dealValue}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 overflow-hidden">
              <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-medium uppercase tracking-wider mb-0.5">
                <PieChart className="w-2.5 h-2.5" /> Equity
              </div>
              <div className="text-white font-bold text-sm truncate">
                {venture.ventureType}
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 mb-3 flex-1 overflow-hidden">
            <div className="flex items-center gap-1 text-zinc-400 text-[9px] font-medium uppercase tracking-wider mb-0.5">
              <FileText className="w-2.5 h-2.5" /> Description
            </div>
            <p className="text-[10px] text-zinc-300 line-clamp-2 leading-relaxed">
              {venture.description}
            </p>
          </div>

          <div className="mt-auto">
            <button
              onClick={() => navigate("/get-ventures")}
              className="
                w-full flex items-center justify-center gap-1.5
                rounded-full bg-gray-600 text-white
                py-2.5 text-[11px] font-bold uppercase tracking-wider
                transition-transform active:scale-[0.98] hover:bg-gray-500
              "
            >
              Get Coventure <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const VentureHero = () => {
  return (
    <section className="relative w-full min-h-[24vh] bg-black overflow-hidden pt-14 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-2 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight"
        >
          <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Discover
          </span>
          <span className="ml-2" />
          <span className="bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent font-display">
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
  const [imageErrors, setImageErrors] = useState({});
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
    if (heroRef.current) observer.observe(heroRef.current);
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
          const validVentures = data.filter(
            (brand) => brand.brandDetails?.brandName,
          );

          const mapped = validVentures.map((brand) => {
            let logoUrl = brand.brandDetails?.logoUrl || "";
            if (logoUrl.includes("localhost:8080")) {
              logoUrl = logoUrl.replace(
                "localhost:8080",
                "192.168.29.184:8080",
              );
            }

            const ratioMap = {
              FIFTY_FIFTY: "50:50",
              SIXTY_FORTY: "60:40",
              SEVENTY_THIRTY: "70:30",
              EIGHTY_TWENTY: "80:20",
              NINETY_TEN: "90:10",
              NEGOTIABLE: "Negotiable",
            };
            const rawType = brand.brandDetails?.ventureType || "Negotiable";
            const ventureRatio = ratioMap[rawType] || rawType;

            return {
              id: brand.id,
              logo: logoUrl,
              title: brand.brandDetails?.brandName || "Unknown",
              industry: brand.brandDetails?.industry || "Tech",
              dealValue: `₹${(brand.brandDetails?.dealValue || 0).toLocaleString("en-IN")}`,
              ventureType: ventureRatio,
              description:
                brand.brandDetails?.description || "No description available",
            };
          });

          setVentures(mapped);
        }
      } catch (error) {
        console.error("Error fetching ventures:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVentures();
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

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
      const aVal = parseInt(a.dealValue.replace(/\D/g, "")) || 0;
      const bVal = parseInt(b.dealValue.replace(/\D/g, "")) || 0;
      return bVal - aVal;
    });
  }

  // Pagination
  const totalPages = Math.ceil(sortedVentures.length / itemsPerPage);
  const paginatedVentures = sortedVentures.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Get unique industries for filter
  const defaultIndustries = industryCategories
    .filter((cat) => cat.value && cat.value.trim() !== "")
    .map((cat) => ({ label: cat.label, value: cat.label.toLowerCase() }));

  const apiIndustries = Array.from(new Set(ventures.map((v) => v.industry)))
    .filter((ind) => ind && ind.trim() !== "")
    .map((ind) => ({ label: ind, value: ind.toLowerCase() }));

  const uniqueIndustries = Array.from(
    new Map(
      [...defaultIndustries, ...apiIndustries].map((x) => [x.value, x]),
    ).values(),
  );

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

        {/* Sticky Toolbar */}
        <div style={isSticky ? { height: toolbarHeight } : undefined}>
          <div
            ref={toolbarRef}
            className={`w-full overflow-visible will-change-transform transition-[background-color,box-shadow,border-color,transform] duration-500 ease-out ${
              isSticky
                ? "fixed top-0 left-0 z-50 bg-black/95 border-b border-neutral-800/50 shadow-lg backdrop-blur-md translate-y-0"
                : "relative z-10 bg-transparent border-b border-transparent shadow-none translate-y-0"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
              {/* Row 1: Logo + Search */}
              <div className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4">
                <div
                  className={`flex-shrink-0 overflow-hidden transition-all duration-500 ease-out ${
                    isSticky
                      ? "max-w-[180px] opacity-100"
                      : "max-w-0 opacity-0 pointer-events-none"
                  }`}
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

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl mx-auto">
                  <div className="relative group">
                    <div className="relative flex items-center">
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
                        placeholder="Search ventures, industries, or keywords..."
                        disabled={loading}
                        className={`w-full bg-neutral-950/40 border border-white/30 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/35 transition-all duration-300 disabled:opacity-50 ${
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
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-800/50 rounded-md transition-colors"
                            disabled={loading}
                          >
                            <X className="w-4 h-4 text-neutral-400 hover:text-white" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Filters */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-t border-neutral-800/30 overflow-visible">
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
                  {ctaButton && (
                    <div className="flex-shrink-0">{ctaButton}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {loading ? (
          <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <VentureCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
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
                {paginatedVentures.map((venture) => (
                  <VentureCard
                    key={venture.id}
                    venture={venture}
                    imageErrors={imageErrors}
                    handleImageError={handleImageError}
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
