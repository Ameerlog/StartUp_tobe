import React, { useState, useEffect, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, Tag, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";
import Pagination from "../components/Listing/Pagination";
import EmptyState from "../components/Listing/EmptyState";
import useListingState from "../hooks/useListingState";
import Logo_white from "../assets/domain/cobrother12341.png";

// Skeleton Card (Bigger Size)
const DomainCardSkeleton = () => {
  return (
    <div className="w-full">
      <div className="h-[380px] rounded-2xl border border-white/10 bg-[#0A0A0A] flex flex-col">
        <div className="h-36 rounded-t-2xl bg-white/5 animate-pulse w-full" />
        <div className="p-4 flex flex-col flex-1">
          <div className="h-6 w-3/4 bg-white/10 rounded animate-pulse" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-16 bg-white/5 rounded-xl animate-pulse" />
          </div>
          <div className="mt-auto h-11 w-full bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Domain Card (Bigger Size, No Gaps)
const DomainCard = ({ domain, imageErrors, handleImageError }) => {
  const navigate = useNavigate();

  const displayName = domain.domainName || "Domain";
  const displayExt = domain.domainExtension || ".com";
  const displayPrice = domain.askingPrice
    ? `₹${domain.askingPrice.toLocaleString("en-IN")}`
    : "TBA";
  const domainId = domain.slug || domain._id || domain.id;

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
        onClick={() => navigate(`/marketplace/domain/${domain.id}`)}
        className="
          group relative h-[380px] rounded-2xl border border-white/10 bg-[#111] bg-opacity-60
          backdrop-blur-md flex flex-col overflow-hidden transition-all duration-300
          hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1
          cursor-pointer
        "
      >
        <div className="relative h-36 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-6 border-b border-white/5">
          {domain.logo && !imageErrors?.[domainId] ? (
            <img
              src={`https://cobrother-api.onrender.com/api/images/${domain.logo}`}
              alt={displayName}
              className="max-h-full max-w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
              draggable={false}
              onError={() => handleImageError?.(domainId)}
            />
          ) : (
            <div className="text-5xl font-black text-white/10 select-none">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg">
            <p className="text-[9px] font-bold text-emerald-400 tracking-wider uppercase">
              Verified
            </p>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-white truncate">
            {displayName}
          </h3>

          <div className="grid grid-cols-2 gap-3 mt-4 flex-1">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-medium uppercase tracking-wider">
                <Tag className="w-3 h-3" /> Price
              </div>
              <div
                className="text-white font-bold text-base mt-1 whitespace-nowrap overflow-hidden text-ellipsis"
                title={displayPrice}
              >
                {displayPrice}
              </div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-zinc-400 text-[10px] font-medium uppercase tracking-wider">
                <Globe className="w-3 h-3" /> Extension
              </div>
              <div className="text-white font-bold text-base mt-1 truncate">
                {displayExt}
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/marketplace/domain/${domain.id}`);
            }}
            className="
              w-full flex items-center justify-center gap-2
              rounded-full bg-gray-600 text-white
              py-3 text-xs font-bold uppercase tracking-wider
              transition-transform active:scale-[0.98] hover:bg-gray-500
              mt-4
            "
          >
            Make it Yours <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const BrandingHero = () => {
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
          className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight"
        >
          <span className="font-display bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Find Premium
          </span>
          <span className="ml-2" />
          <span className="font-display bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
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

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

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

  // Get unique extensions
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
                        placeholder="Search for domain names..."
                        disabled={loading}
                        className={`w-full bg-neutral-950/40 border border-white/30  rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-purple-500/35 transition-all duration-300 disabled:opacity-50 ${
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
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <DomainCardSkeleton key={`skeleton-${index}`} />
            ))}
          </div>
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
              className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {paginatedDomains.map((domain) => (
                  <DomainCard
                    key={domain.id}
                    domain={domain}
                    imageErrors={imageErrors}
                    handleImageError={handleImageError}
                  />
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
