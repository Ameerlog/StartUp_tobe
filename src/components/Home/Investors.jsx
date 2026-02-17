import React, { useState, useEffect } from "react";
import MarqueeRow from "../../components/Marquee";
import { investorCards } from "../../data/investors";
import BackgroundImage from "../../assets/domain/bg1.svg";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const API_BASE_URL = "https://cobrother-api.onrender.com";

const InvestorCard = ({ card }) => {
  const isProfile = card.hasOwnProperty("fullName");

  return (
    <div
      className="shrink-0 
                 w-[240px] xs:w-[260px] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] 
                 px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6"
    >
      <div
        className="group 
                   h-[220px] xs:h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] 
                   rounded-xl sm:rounded-2xl md:rounded-[20px] 
                   border border-white/10
                   bg-gray-900/70
                   p-3 xs:p-4 sm:p-5 md:p-6 
                   backdrop-blur-sm 
                   shadow-2xl
                   transition-all duration-300 
                   flex flex-col justify-between 
                   hover:shadow-xl
                   hover:border-white/20
                   hover:bg-gray-900/50
                   relative"
      >
        <div
          className="h-[100px] xs:h-[110px] sm:h-[130px] md:h-[150px] lg:h-[165px] xl:h-[180px] 
                     flex items-center justify-center 
                     bg-white/10 
                     rounded-lg sm:rounded-xl md:rounded-[14px] 
                     backdrop-blur-sm 
                     border border-white/10
                     transition-all duration-300
                     group-hover:border-white/20
                     overflow-hidden"
        >
          {isProfile ? (
            card.logo ? (
              <img
                src={card.logo}
                alt={card.fullName}
                className="max-h-[70px] xs:max-h-[80px] sm:max-h-[100px] md:max-h-[120px] lg:max-h-[135px] xl:max-h-[150px] 
                         max-w-[70px] xs:max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[135px] xl:max-w-[150px] 
                         object-contain 
                         group-hover:grayscale
                         transition-all duration-500
                         group-hover:scale-100 scale-105"
                draggable={false}
                loading="lazy"
                onError={(e) => {
                  const initials = card.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                      <span class="text-white text-3xl font-bold">${initials}</span>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
                <span className="text-white text-3xl sm:text-4xl font-bold">
                  {card.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              </div>
            )
          ) : (
            <img
              src={card.src}
              alt={card.company}
              className="max-h-[70px] xs:max-h-[80px] sm:max-h-[100px] md:max-h-[120px] lg:max-h-[135px] xl:max-h-[150px] 
                       max-w-[70px] xs:max-w-[80px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[135px] xl:max-w-[150px] 
                       object-contain 
                       group-hover:grayscale
                       transition-all duration-500
                       group-hover:scale-100 scale-105"
              draggable={false}
              loading="lazy"
            />
          )}
        </div>

        <div className="text-center flex-1 flex flex-col justify-center">
          <h3
            className="text-sm xs:text-base sm:text-lg md:text-[18px] lg:text-[20px] 
                       font-bold text-white
                       tracking-tight 
                       transition-colors duration-300
                       group-hover:text-gray-400
                       line-clamp-1"
          >
            {isProfile ? card.fullName : card.company}
          </h3>

          <p
            className="mt-1 xs:mt-1.5
                       text-[11px] xs:text-xs sm:text-sm md:text-[14px] lg:text-[15px] 
                       text-white
                       font-medium 
                       transition-colors duration-300
                       group-hover:text-gray-400
                       line-clamp-1"
          >
            {isProfile ? card.primaryRole : card.founder}
          </p>
        </div>

        {isProfile && card.linkedinUrl && (
          <div className="mt-3 xs:mt-4">
            <a
              href={card.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 xs:py-2.5 px-3 xs:px-4
                         bg-blue-600/10 hover:bg-blue-600/20 
                         border border-blue-600/20 hover:border-blue-600/40
                         rounded-lg xs:rounded-xl
                         transition-all duration-300
                         group/connect"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="text-xs xs:text-sm font-semibold text-blue-400 group-hover/connect:text-blue-300 transition-colors">
                  Connect
                </span>

                <svg
                  className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-blue-400/60 group-hover/connect:translate-x-0.5 group-hover/connect:-translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </a>
          </div>
        )}

        {!isProfile && <div className="mt-3 xs:mt-4 h-[36px] xs:h-[40px]" />}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div
    className="shrink-0 
               w-[240px] xs:w-[260px] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] 
               px-2 xs:px-3 sm:px-4 md:px-5 lg:px-6"
  >
    <div
      className="h-[220px] xs:h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] xl:h-[320px] 
                 rounded-xl sm:rounded-2xl md:rounded-[20px] 
                 border border-white/10
                 bg-gray-900/70
                 p-3 xs:p-4 sm:p-5 md:p-6 
                 animate-pulse"
    >
      <div className="h-[100px] xs:h-[110px] sm:h-[130px] md:h-[150px] lg:h-[165px] xl:h-[180px] bg-gray-800 rounded-lg" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-800 rounded w-3/4 mx-auto" />
        <div className="h-3 bg-gray-800 rounded w-1/2 mx-auto" />
      </div>
      <div className="mt-4 h-10 bg-gray-800 rounded-lg" />
    </div>
  </div>
);

export default function Investors() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataToDisplay, setDataToDisplay] = useState(investorCards);

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

  const midPoint = Math.ceil(dataToDisplay.length / 2);
  const firstRowData = dataToDisplay.slice(0, midPoint);
  const secondRowData = dataToDisplay.slice(midPoint);

  return (
    <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden">
      <div className="text-center px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
          Co-Working
        </h2>

        <button
          onClick={() => navigate("/coworker-form")}
          className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/20 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white backdrop-blur-xl transition-all duration-300 hover:bg-gray-800 active:scale-[0.98] mt-4"
        >
          Join our community
        </button>
      </div>

      <div className="relative mt-4 sm:mt-6 md:mt-8 lg:mt-10">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent" />

        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent" />
        <div className="mx-auto max-w-[1400px] overflow-hidden space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
          {loading ? (
            <>
              <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                  <SkeletonCard key={`skeleton-1-${i}`} />
                ))}
              </div>
              <div className="flex gap-4">
                {[...Array(5)].map((_, i) => (
                  <SkeletonCard key={`skeleton-2-${i}`} />
                ))}
              </div>
            </>
          ) : (
            <>
              <MarqueeRow
                data={firstRowData}
                speed={25}
                renderItem={(card) => (
                  <InvestorCard
                    card={card}
                    key={card.Id || card.company || Math.random()}
                  />
                )}
              />

              {/* Uncomment to show second row */}
              {/* <MarqueeRow
                data={secondRowData}
                speed={25}
                direction="right"
                renderItem={(card) => <InvestorCard card={card} key={card.Id || card.company || Math.random()} />}
              /> */}
            </>
          )}
        </div>
      </div>
      {window.location.pathname === "/" && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/community")}
            className="flex items-center gap-2 rounded-full border border-white bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-gray-800"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
