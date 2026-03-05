import React, { useState, useEffect, useRef } from "react";
import { investorCards } from "../../data/investors";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  Linkedin,
  Sparkles,
} from "lucide-react";

const API_BASE_URL = "https://cobrother-api.onrender.com";

// Exact same helper functions from Community page
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
    return `${API_BASE_URL}${imageField}`;
  }
  return `${API_BASE_URL}/api/images/${imageField}`;
};

// EXACT SAME ProfileCard from Community page
const ProfileCard = ({ profile }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

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
    <div className="shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] px-3 sm:px-4">
      <div className="group relative min-w-0 overflow-hidden bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-4 sm:p-5 hover:border-neutral-700/50 transition-all duration-300">
        <div className="mb-4 sm:mb-5 flex flex-col items-center">
          <div
            className={`relative w-full max-w-[170px] sm:max-w-[190px] md:max-w-[210px] aspect-square rounded-full p-[12px] sm:p-[14px] md:p-[16px] bg-gradient-to-br ${roleTheme.ring} shadow-[0_16px_34px_rgba(0,0,0,0.5)]`}
          >
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
                className="fill-white text-[8.5px] sm:text-[9.5px] md:text-[10.5px] font-black tracking-[1.9px] sm:tracking-[2.2px] md:tracking-[2.4px]"
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
                className="fill-white text-[8.5px] sm:text-[9.5px] md:text-[10.5px] font-black tracking-[1.9px] sm:tracking-[2.2px] md:tracking-[2.4px]"
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

            <div className="h-full w-full rounded-full overflow-hidden">
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
                  <span className="text-3xl font-bold text-white">
                    {initials(displayName || "C").slice(0, 2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center min-w-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight break-words">
            {displayName || "Community Member"}
          </h3>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm min-w-0">
          <div className="flex items-center gap-2 text-neutral-300 min-w-0">
            {displayIndustry && (
              <span className="flex items-center gap-1 min-w-0 break-words">
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                {displayIndustry}
              </span>
            )}
          </div>
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              <Linkedin className="w-4 h-4" />
              Connect
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="shrink-0 w-[280px] sm:w-[300px] md:w-[320px] lg:w-[340px] px-3 sm:px-4">
    <div className="rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 p-4 sm:p-5 animate-pulse">
      <div className="flex justify-center mb-4 sm:mb-5">
        <div className="w-[170px] sm:w-[190px] md:w-[210px] aspect-square rounded-full bg-neutral-800" />
      </div>
      <div className="h-6 bg-neutral-800 rounded w-3/4 mx-auto" />
      <div className="mt-3 flex justify-center gap-3">
        <div className="h-4 bg-neutral-800 rounded w-20" />
        <div className="h-4 bg-neutral-800 rounded w-16" />
      </div>
    </div>
  </div>
);

export default function Investors() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const animationRef = useRef(null);
  const touchStartRef = useRef(null);
  const idleTimerRef = useRef(null);

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/community-form");
    }
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/ListAllCoWorking`);

        if (!response.ok) {
          throw new Error(`Failed to fetch profiles: ${response.status}`);
        }

        const data = await response.json();
        const profileList = Array.isArray(data) ? data : data.data || [];

        if (profileList.length > 0) {
          setProfiles(profileList);

          let marqueeData = [...profileList];
          while (marqueeData.length < 8) {
            marqueeData = [...marqueeData, ...profileList];
          }
          setDataToDisplay(marqueeData);
        } else {
          setDataToDisplay(investorCards);
        }
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setDataToDisplay(investorCards);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();

    const interval = setInterval(fetchProfiles, 30000);
    return () => clearInterval(interval);
  }, []);

  const duplicatedData = [...dataToDisplay, ...dataToDisplay];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || loading || dataToDisplay.length === 0) return;

    let scrollSpeed = 1;

    const animate = () => {
      if (!isPaused && container) {
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (scrollDirection === "forward") {
          container.scrollLeft += scrollSpeed;

          // Check if reached end
          if (container.scrollLeft >= maxScroll - 10) {
            setIsFading(true);
            setTimeout(() => {
              setScrollDirection("backward");
              setIsFading(false);
            }, 500);
          }
        } else {
          container.scrollLeft -= scrollSpeed;

          // Check if reached start
          if (container.scrollLeft <= 10) {
            setIsFading(true);
            setTimeout(() => {
              setScrollDirection("forward");
              setIsFading(false);
            }, 500);
          }
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, loading, dataToDisplay.length, scrollDirection]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 1000);
  };

  const handleMouseEnter = () => {
    if (loading) return;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (loading) return;
    resetIdleTimer();
  };

  const handleTouchStart = (e) => {
    if (loading) return;
    touchStartRef.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    if (loading || touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    if (Math.abs(diff) > 50) {
      handleScroll(diff > 0 ? "right" : "left");
    }
    touchStartRef.current = null;
    resetIdleTimer();
  };

  const handleScroll = (dir) => {
    if (!scrollRef.current || loading) return;
    setIsPaused(true);
    resetIdleTimer();

    const firstCard = scrollRef.current.querySelector(":scope > div");
    const scrollAmount = firstCard ? firstCard.offsetWidth : 340;

    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden">
      <div className="text-center px-0 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold font-display">
          Co-Working
        </h2>

        <button
          onClick={() => {
            navigate("/coworker-form");
          }}
          className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-white/30 px-7 py-2.5 text-sm font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.45)] transition-all duration-300 hover:scale-[1.03] hover:border-white/60 hover:shadow-[0_0_28px_rgba(139,92,246,0.7)] active:scale-[0.98] mt-4"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative cursor-pointer">Join our community</span>
        </button>
      </div>

      <div
        className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="
            pointer-events-none absolute left-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-gradient-to-r from-black to-transparent
          "
        />

        <div
          className="
            pointer-events-none absolute right-0 top-0 z-10 
            h-full w-10 sm:w-16 md:w-24 lg:w-32 
            bg-gradient-to-l from-black to-transparent
          "
        />

        {!loading && dataToDisplay.length > 0 && (
          <>
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-1 sm:left-2 md:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-violet-600/20 border border-violet-500/40 backdrop-blur-md p-2 sm:p-2.5 text-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.35)] transition-all duration-300 hover:bg-violet-600/40 hover:text-violet-200 hover:scale-110 hover:shadow-[0_0_22px_rgba(139,92,246,0.65)] active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronsLeft
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
            </button>

            <button
              onClick={() => handleScroll("right")}
              className="absolute right-1 sm:right-2 md:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-violet-600/20 border border-violet-500/40 backdrop-blur-md p-2 sm:p-2.5 text-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.35)] transition-all duration-300 hover:bg-violet-600/40 hover:text-violet-200 hover:scale-110 hover:shadow-[0_0_22px_rgba(139,92,246,0.65)] active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronsRight
                className="w-5 h-5 sm:w-6 sm:h-6"
                strokeWidth={2.5}
              />
            </button>
          </>
        )}

        <div className="mx-auto  overflow-hidden">
          {loading ? (
            <div className="flex py-4">
              {[...Array(5)].map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden py-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {duplicatedData.map((profile, index) => (
                <ProfileCard
                  profile={profile}
                  key={`${profile.Id || profile.id || index}-${index}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {window.location.pathname === "/" && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/community")}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full border border-purple-500/40 bg-purple-500/5 px-8 py-2.5 text-sm font-bold text-purple-300 backdrop-blur-md shadow-[0_0_16px_rgba(139,92,246,0.2)] transition-all duration-300 hover:border-blue-400/60 hover:text-white hover:shadow-[0_0_26px_rgba(96,165,250,0.4)] active:scale-[0.97]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-blue-600/0 to-pink-600/0 group-hover:from-purple-600/20 group-hover:via-blue-600/20 group-hover:to-pink-600/20 transition-all duration-300" />
            <span className="relative cursor-pointer">View All</span>
            <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      )}
    </section>
  );
}
