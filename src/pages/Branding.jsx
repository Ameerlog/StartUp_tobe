import React, { useState, useEffect, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";
import Pagination from "../components/Listing/Pagination";
import EmptyState from "../components/Listing/EmptyState";
import SkeletonLoader from "../components/Listing/SkeletonLoader";
import useListingState from "../hooks/useListingState";
import Logo_white from "../assets/domain/cobrother12341.png";

const BrandingHero = () => {
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
            Find Premium
          </span> <span />
          <span className="bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Domain Names
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto"
        >
          Discover and secure the perfect domain for your brand with ease.
        </motion.p>
      </div>
    </section>
  );
};

const DomainCard = ({ domain }) => {
  const navigate = useNavigate();

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
        {/* Logo */}
        <div className="mb-4 h-40 bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl flex items-center justify-center overflow-hidden">
          {domain.logo ? (
            <img
              src={`https://cobrother-api.onrender.com/api/images/${domain.logo}`}
              alt={domain.domainName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl font-bold text-white opacity-30">
              {domain.domainName.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        {/* Domain Name */}
        <h3 className="text-lg font-bold text-white mb-1 truncate">
          {domain.domainName}
        </h3>

        {/* Extension */}
        <p className="text-xs text-neutral-400 mb-3 font-medium">
          {domain.domainExtension}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ₹{domain.askingPrice.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 capitalize">
            {domain.domainCategory}
          </span>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/marketplace/domain/${domain.id}`)}
          className="w-full group/btn relative overflow-hidden rounded-xl"
        >
          <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
          <span className="relative px-4 py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2">
            Make it Yours
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};
const Branding = () => {
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

  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch domains
  useEffect(() => {
    const fetchDomains = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllDomains",
        );
        const data = await response.json();
        setDomains(data || []);
      } catch (error) {
        console.error("Error fetching domains:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDomains();
  }, []);

  // Filter and search logic
  const filteredDomains = domains.filter((domain) => {
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      const matchesSearch =
        domain.domainName.toLowerCase().includes(query) ||
        domain.domainExtension.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }
    if (filters.extension && filters.extension !== "") {
      if (domain.domainExtension !== filters.extension) return false;
    }
    if (filters.priceMin || filters.priceMax) {
      const price = domain.askingPrice;
      if (filters.priceMin && price < parseInt(filters.priceMin)) return false;
      if (filters.priceMax && price > parseInt(filters.priceMax)) return false;
    }
    if (filters.length && filters.length !== "") {
      const domainLength = domain.domainName.length;
      if (filters.length === "short" && domainLength > 5) return false;
      if (
        filters.length === "medium" &&
        (domainLength < 6 || domainLength > 10)
      )
        return false;
      if (filters.length === "long" && domainLength < 11) return false;
    }
    return true;
  });

  // Sort logic
  let sortedDomains = [...filteredDomains];
  if (sort === "price_low") {
    sortedDomains.sort((a, b) => a.askingPrice - b.askingPrice);
  } else if (sort === "price_high") {
    sortedDomains.sort((a, b) => b.askingPrice - a.askingPrice);
  } else if (sort === "newest") {
    sortedDomains.reverse();
  }

  // Pagination
  const totalPages = Math.ceil(sortedDomains.length / itemsPerPage);
  const paginatedDomains = sortedDomains.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Get unique extensions with default options
  const defaultExtensions = [
    { label: ".com", value: ".com" },
    { label: ".net", value: ".net" },
    { label: ".org", value: ".org" },
    { label: ".io", value: ".io" },
    { label: ".ai", value: ".ai" },
    { label: ".tech", value: ".tech" },
    { label: ".co", value: ".co" },
    { label: ".biz", value: ".biz" },
  ];
  const apiExtensions = Array.from(
    new Set(domains.map((d) => d.domainExtension)),
  )
    .filter((ext) => ext && ext.trim() !== "")
    .map((ext) => ({ label: ext, value: ext }));
  const uniqueExtensions = Array.from(
    new Map(
      [...defaultExtensions, ...apiExtensions].map((x) => [x.value, x]),
    ).values(),
  );

  const ctaButton = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/domain-form")}
      className="group relative overflow-hidden rounded-full w-full sm:w-auto"
    >
      <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
      <span className="relative px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base flex items-center justify-center gap-2">
        List Your Domain
        <ArrowRight className="w-4 h-4" />
      </span>
    </motion.button>
  );

  // Clear filters logic
  const handleClearFilters = () => {
    setFilters({
      extension: "",
      priceMin: "",
      priceMax: "",
      length: "",
    });
    setSearchQuery("");
    setSort("");
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery?.trim().length > 0 ||
    filters.extension ||
    filters.length ||
    sort;

  return (
    <main className="min-h-screen bg-black">
      {/* Navbar + Hero */}
      <div className="relative">
        <div ref={heroRef}>
          <BrandingHero />
        </div>
        {/* Sticky Toolbar: Two-Row Layout */}
        <div style={isSticky ? { height: toolbarHeight } : undefined}>
          <div
            ref={toolbarRef}
            className={` relative z-[200] w-full overflow-visible will-change-transform transition-[background-color,box-shadow,border-color,transform] duration-500 ease-out ${isSticky ? "fixed top-0 left-0 z-50 bg-black/95 border-b border-neutral-800/50 shadow-lg backdrop-blur-md translate-y-0" : "relative z-10 bg-transparent border-b border-transparent shadow-none translate-y-0"}`}
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
                  label={filters.extension || "Extension"}
                  value={filters.extension}
                  options={uniqueExtensions}
                  onChange={(val) => handleFilterChange("extension", val)}
                />
                <FilterDropdown
                  label={filters.length || "Length"}
                  value={filters.length}
                  options={[
                    { label: "Short (≤5)", value: "short" },
                    { label: "Medium (6-10)", value: "medium" },
                    { label: "Long (11+)", value: "long" },
                  ]}
                  onChange={(val) => handleFilterChange("length", val)}
                />
              </div>

              {/* Sort & CTA (Right) */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <SortDropdown
                  label="Sort"
                  value={sort}
                  onChange={handleSortChange}
                  options={[
                    { label: "Price: Low to High", value: "price_low" },
                    { label: "Price: High to Low", value: "price_high" },
                    { label: "Newest", value: "newest" },
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
        ) : paginatedDomains.length === 0 ? (
          <EmptyState
            title="No domains found"
            description="Try adjusting your search or filters to find the perfect domain."
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
                {paginatedDomains.map((domain) => (
                  <DomainCard key={domain.id} domain={domain} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}
        {paginatedDomains.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={loading}
            itemsPerPage={itemsPerPage}
            totalItems={sortedDomains.length}
          />
        )}
      </section>
    </main>
  );
};

export default Branding;
