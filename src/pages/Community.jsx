import React, { useState, useEffect, useRef } from "react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { Linkedin, Sparkles, ArrowRight, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "../components/Listing/FilterDropdown";
import SortDropdown from "../components/Listing/SortDropdown";
import Pagination from "../components/Listing/Pagination";
import EmptyState from "../components/Listing/EmptyState";
import SkeletonLoader from "../components/Listing/SkeletonLoader";
import useListingState from "../hooks/useListingState";
import Logo_white from "../assets/domain/cobrother12341.png";

const CommunityHero = () => (
  <section className="relative w-full min-h-[24vh] bg-black overflow-hidden pt-14 sm:pt-28 md:pt-32 lg:pt-36 xl:pt-40">
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
          Join Our
        </span><span className="ml-2" />
        <span className="bg-linear-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
           Co-Working Community
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto"
      >
        Connect with investors, founders, and experienced advisors in our
        growing community.
      </motion.p>
    </div>
  </section>
);

const getRoleTheme = (roleText = "") => {
  const role = roleText.toLowerCase();

  if (/(founder|co-founder|ceo|owner)/.test(role)) {
    return {
      ring: "from-purple-500 to-blue-500",
      badge: "bg-purple-500/20 border-purple-400/50 text-purple-200",
      city: "bg-purple-500/10 border-purple-500/30 text-purple-200",
    };
  }
  if (/(investor|vc|angel)/.test(role)) {
    return {
      ring: "from-emerald-500 to-cyan-500",
      badge: "bg-emerald-500/20 border-emerald-400/50 text-emerald-200",
      city: "bg-emerald-500/10 border-emerald-500/30 text-emerald-200",
    };
  }
  if (/(designer|ux|ui|product)/.test(role)) {
    return {
      ring: "from-sky-500 to-indigo-500",
      badge: "bg-sky-500/20 border-sky-400/50 text-sky-200",
      city: "bg-sky-500/10 border-sky-500/30 text-sky-200",
    };
  }
  if (/(marketing|sales|growth)/.test(role)) {
    return {
      ring: "from-pink-500 to-orange-500",
      badge: "bg-pink-500/20 border-pink-400/50 text-pink-200",
      city: "bg-pink-500/10 border-pink-500/30 text-pink-200",
    };
  }
  if (/(developer|engineer|tech)/.test(role)) {
    return {
      ring: "from-indigo-500 to-violet-500",
      badge: "bg-indigo-500/20 border-indigo-400/50 text-indigo-200",
      city: "bg-indigo-500/10 border-indigo-500/30 text-indigo-200",
    };
  }

  return {
    ring: "from-neutral-500 to-neutral-700",
    badge: "bg-neutral-500/20 border-neutral-400/40 text-neutral-200",
    city: "bg-neutral-500/10 border-neutral-500/30 text-neutral-200",
  };
};

const ProfileCard = ({ profile }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const pickFirstText = (...values) => {
    for (const value of values) {
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
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

  const details = profile.coworkingDetails || profile.profile || {};
  const skillText = pickFirstText(profile.skill, details.skill);
  const skillParts = skillText
    .split(" - ")
    .map((x) => x.trim())
    .filter(Boolean);

  const displayName = pickFirstText(
    profile.fullName,
    details.fullName,
    profile.company,
    details.company,
  );
  const displayRole = pickFirstText(
    profile.primaryRole,
    details.primaryRole,
    profile.title,
    details.title,
    profile.role,
    details.role,
  );
  const displayLocation = pickFirstText(
    profile.location,
    details.location,
    skillParts[2],
  );
  const displayCity =
    displayLocation.split(",")[0]?.split("-")[0]?.trim() || "City not set";
  const displayIndustry = pickFirstText(
    profile.industry,
    details.industry,
    skillParts[1],
  );
  const linkedinUrl = pickFirstText(
    profile.linkedinUrl,
    details.linkedinUrl,
    profile.linkedin,
    details.linkedin,
  );
  const imageSource = pickFirstText(
    profile.logo,
    details.logo,
    profile.logoUrl,
    details.logoUrl,
    profile.photoUrl,
    details.photoUrl,
    profile.profileImage,
    details.profileImage,
    profile.image,
    details.image,
    profile.photo,
    details.photo,
  );
  const imageUrl = getImageUrl(imageSource);
  const roleTheme = getRoleTheme(displayRole);
  const circleTextSeed =
    `${profile.id || profile.Id || displayName || "member"}`
      .toString()
      .replace(/[^a-zA-Z0-9_-]/g, "");
  const topArcId = `role-arc-top-${circleTextSeed}`;
  const bottomArcId = `role-arc-bottom-${circleTextSeed}`;
  const circleRoleText = (displayRole || "Member").toUpperCase().slice(0, 24);
  const circleCityText = displayCity.toUpperCase().slice(0, 24);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ y: -4 }}
      className="group relative min-w-0 overflow-hidden bg-linear-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-3 sm:p-4 md:p-5 hover:border-neutral-700/50 transition-all duration-300"
    >
      {/* Profile Image Section - Fixed for small screens */}
      <div className="mb-3 sm:mb-4 md:mb-5 flex flex-col items-center">
        <div
          className={`relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[170px] md:h-[170px] lg:w-[190px] lg:h-[190px] rounded-full p-[8px] sm:p-[10px] md:p-[12px] lg:p-[14px] bg-gradient-to-br ${roleTheme.ring} shadow-[0_16px_34px_rgba(0,0,0,0.5)] flex-shrink-0`}
        >
          {/* SVG for circular text */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <path id={topArcId} d="M 10 100 A 90 90 0 0 1 190 100" />
              <path id={bottomArcId} d="M 10 100 A 90 90 0 0 0 190 100" />
            </defs>
            <text
              className="fill-white text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] font-black tracking-[1.5px] sm:tracking-[1.8px] md:tracking-[2px] lg:tracking-[2.2px]"
              style={{
                paintOrder: "stroke",
                stroke: "rgba(10,10,10,0.98)",
                strokeWidth: 2.2,
              }}
            >
              <textPath
                href={`#${topArcId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {circleRoleText}
              </textPath>
            </text>
            <text
              className="fill-white text-[7px] sm:text-[8px] md:text-[9px] lg:text-[12px] font-black tracking-[1.5px] sm:tracking-[1.8px] md:tracking-[2px] lg:tracking-[2.2px]"
              style={{
                paintOrder: "stroke",
                stroke: "rgba(10,10,10,0.98)",
                strokeWidth: 2.2,
              }}
            >
              <textPath
                href={`#${bottomArcId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {circleCityText}
              </textPath>
            </text>
          </svg>
          {/* Inner circle with image */}
          <div className="h-full w-full rounded-full overflow-hidden flex-shrink-0">
            {imageUrl && !imageFailed ? (
              <img
                src={imageUrl}
                alt={displayName || "Profile"}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
                onError={() => setImageFailed(true)}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {initials(displayName || "C").slice(0, 2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="text-center min-w-0">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white leading-tight break-words line-clamp-2">
          {displayName || "Community Member"}
        </h3>
      </div>

      {/* Industry & LinkedIn */}
      <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm min-w-0">
        <div className="flex items-center gap-1 sm:gap-2 text-neutral-300 min-w-0">
          {displayIndustry && (
            <span className="flex items-center gap-1 min-w-0 break-words line-clamp-1">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 flex-shrink-0" />
              <span className="truncate max-w-[80px] sm:max-w-[120px]">
                {displayIndustry}
              </span>
            </span>
          )}
        </div>
        {linkedinUrl && (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
          >
            <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Connect</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Community = () => {
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

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const heroRef = useRef(null);
  const toolbarRef = useRef(null);

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

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://cobrother-api.onrender.com/api/ListAllCoWorking",
        );
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data || [];
        setProfiles(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const pickFirstText = (...values) => {
    for (const value of values) {
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return "";
  };

  const extractProfileMeta = (profile) => {
    const details = profile.coworkingDetails || profile.profile || {};
    const skillText = pickFirstText(profile.skill, details.skill);
    const skillParts = skillText
      .split(" - ")
      .map((x) => x.trim())
      .filter(Boolean);

    const name = pickFirstText(
      profile.fullName,
      details.fullName,
      profile.company,
      details.company,
    );
    const role = pickFirstText(
      profile.primaryRole,
      details.primaryRole,
      profile.title,
      details.title,
      profile.role,
      details.role,
    );
    const industry = pickFirstText(
      profile.industry,
      details.industry,
      profile.focusArea,
      details.focusArea,
      skillParts[1],
    );
    const location = pickFirstText(
      profile.location,
      details.location,
      skillParts[2],
    );

    return { name, role, industry, location };
  };

  const normalizedProfiles = profiles.map((profile) => ({
    profile,
    ...extractProfileMeta(profile),
  }));

  const filteredProfiles = normalizedProfiles
    .filter(({ name, role, industry, location }) => {
      if (debouncedSearch.trim()) {
        const q = debouncedSearch.toLowerCase();
        const nameValue = name.toLowerCase();
        const roleValue = role.toLowerCase();
        if (!nameValue.includes(q) && !roleValue.includes(q)) return false;
      }
      if (filters.role && filters.role !== "") {
        if (role.toLowerCase() !== filters.role.toLowerCase()) return false;
      }
      if (filters.industry && filters.industry !== "") {
        if (industry.toLowerCase() !== filters.industry.toLowerCase())
          return false;
      }
      if (filters.location && filters.location.trim() !== "") {
        const queryLocation = filters.location.toLowerCase();
        if (!location.toLowerCase().includes(queryLocation)) return false;
      }
      return true;
    })
    .map((x) => x.profile);

  let sortedProfiles = [...filteredProfiles];
  if (sort === "name")
    sortedProfiles.sort((a, b) =>
      (a.fullName || a.company || "").localeCompare(
        b.fullName || b.company || "",
      ),
    );
  else if (sort === "newest") sortedProfiles.reverse();

  const totalPages = Math.ceil(sortedProfiles.length / itemsPerPage);
  const paginatedProfiles = sortedProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const roleMap = new Map();
  const industryMap = new Map();
  const locationMap = new Map();

  normalizedProfiles.forEach(({ role, industry, location }) => {
    if (role) {
      const key = role.toLowerCase();
      if (!roleMap.has(key)) roleMap.set(key, role);
    }
    if (industry) {
      const key = industry.toLowerCase();
      if (!industryMap.has(key)) industryMap.set(key, industry);
    }
    if (location) {
      const key = location.toLowerCase();
      if (!locationMap.has(key)) locationMap.set(key, location);
    }
  });

  const uniqueRoles = Array.from(roleMap.values()).map((r) => ({
    label: r,
    value: r,
  }));
  const uniqueIndustries = Array.from(industryMap.values()).map((i) => ({
    label: i,
    value: i,
  }));
  const uniqueLocations = Array.from(locationMap.values());

  const ctaButton = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate("/coworker-form")}
      className="group relative overflow-hidden rounded-full w-full sm:w-auto"
    >
      <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
      <span className="relative px-5 sm:px-6 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base flex items-center justify-center gap-2">
        Join Our Community <ArrowRight className="w-4 h-4" />
      </span>
    </motion.button>
  );

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery("");
    setSort("");
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters =
    searchQuery?.trim().length > 0 ||
    filters.role ||
    filters.industry ||
    filters.location ||
    sort;

  return (
    <main className="min-h-screen bg-black">
      {/* Navbar + Hero */}
      <div className="relative">
        <div ref={heroRef}>
          <CommunityHero />
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
              <div className="flex-1 max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-500 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search investors, founders, or partners..."
                      disabled={loading}
                      className="w-full pl-10 sm:pl-11 pr-10 py-2 sm:py-2.5 bg-neutral-900/80 border border-neutral-800/60 rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 disabled:opacity-50"
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

            {/* Row 2: Filters (Left) + Sort & CTA (Right) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 border-t border-neutral-800/30 overflow-visible">
              {/* Filters (Left) */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-visible">
                <span className="text-xs sm:text-sm font-medium text-neutral-400 whitespace-nowrap">
                  Filters:
                </span>
                <FilterDropdown
                  label={filters.role || "Role"}
                  value={filters.role}
                  options={uniqueRoles}
                  onChange={(v) => handleFilterChange("role", v)}
                />
                <FilterDropdown
                  label={filters.industry || "Industry Focus"}
                  value={filters.industry}
                  options={uniqueIndustries}
                  onChange={(v) => handleFilterChange("industry", v)}
                />
                <div className="relative">
                  <input
                    list="community-location-options"
                    value={filters.location || ""}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    placeholder="Location"
                    className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 bg-neutral-900/80 border border-neutral-800/60 rounded-lg sm:rounded-xl text-white text-sm font-medium placeholder:text-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-colors min-w-[150px]"
                  />
                  <datalist id="community-location-options">
                    {uniqueLocations.map((loc) => (
                      <option key={loc} value={loc} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Sort & CTA (Right) */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <SortDropdown
                  label="Sort"
                  value={sort}
                  onChange={handleSortChange}
                  options={[
                    { label: "Name A-Z", value: "name" },
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

      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {loading ? (
          <SkeletonLoader count={8} columns={4} />
        ) : paginatedProfiles.length === 0 ? (
          <EmptyState
            title="No community members found"
            description="Try adjusting your search or filters to find the perfect connection."
            action={{
              label: "Join Community",
              onClick: () => navigate("/coworker-form"),
            }}
          />
        ) : (
          <LayoutGroup>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {paginatedProfiles.map((p) => (
                  <ProfileCard key={p.Id || p.id || p.company} profile={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        )}

        {paginatedProfiles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            isLoading={loading}
            itemsPerPage={itemsPerPage}
            totalItems={sortedProfiles.length}
          />
        )}
      </section>
    </main>
  );
};

export default Community;
