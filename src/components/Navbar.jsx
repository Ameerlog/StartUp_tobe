import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo_white from "../assets/domain/cobrother1234.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Scroll detection for background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHomePage = location.pathname === "/";

  // Don't render navbar if not on home page
  if (!isHomePage) {
    return null;
  }
  const navLinks = [
    {
      name: "Solutions",
      dropdown: [
        { name: "Co-Venture", path: "/venture" },
        { name: "Co-Branding", path: "/branding" },
        { name: "Co-Marketing", path: "/marketing" },
        { name: "Co-Creation", path: "/co-creation" },
        { name: "Co-Operation", path: "/ai" },
        { name: "Co-Working", path: "/community" },
      ],
    },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Domains", path: "/branding" },
  ];

  return (
    <>
      {/* Glassmorphism Navbar - Fully Responsive */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 md:px-6 lg:px-8 pt-3 sm:pt-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl lg:max-w-6xl xl:max-w-7xl transition-all duration-500 rounded-2xl sm:rounded-3xl lg:rounded-full ${
            isScrolled
              ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50"
              : "bg-black/20 backdrop-blur-md border border-white/5 shadow-xl shadow-black/30"
          }`}
        >
          <div className="h-14 sm:h-16 md:h-18 lg:h-20 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="relative h-full flex items-center justify-between">
              {/* Logo - Responsive Scaling */}
              <motion.div
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer z-50 flex-shrink-0"
              >
                <img
                  src={Logo_white}
                  alt="CoBrother Aultum"
                  className="
    h-7 sm:h-7 md:h-7 lg:h-10 xl:h-11 ml-8
    w-auto
    drop-shadow-2xl
    transition-transform duration-300 scale-140
  "
                />
              </motion.div>

              {/* Desktop Navigation - Hidden on Mobile/Tablet */}
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                {navLinks.map((link, index) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() =>
                      link.dropdown && setActiveDropdown(index)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.dropdown ? (
                      // Dropdown Menu
                      <>
                        <button className="group relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-1">
                          {link.name}
                          <ChevronDown
                            className={`w-3.5 xl:w-4 h-3.5 xl:h-4 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
                          />
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r   font-medium hover:from-purple-500 group-hover:w-full transition-all duration-300" />
                        </button>

                        {/* Dropdown Panel */}
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full left-0 mt-2 w-52 xl:w-56"
                            >
                              <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-2.5 xl:py-3 text-sm xl:text-base text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Regular Link
                      <Link
                        to={link.path}
                        className="group relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium text-white/80 hover:text-white transition-colors duration-300 block"
                      >
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:from-purple-500 group-hover:w-full transition-all duration-300" />
                      </Link>
                    )}
                  </div>
                ))}

                {/* CTA Button - Desktop - Aultum Gradient */}
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-full ml-2 xl:ml-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:from-purple-500 " />
                  <span className="relative px-4 xl:px-5 py-2 xl:py-2.5 font-semibold text-white text-sm xl:text-base flex items-center gap-1.5 rounded-full border border-transparent hover:border-white/60 transition-colors duration-300">
                    Get Started <span className="text-xs xl:text-sm">→</span>
                  </span>
                </motion.button>
              </div>

              {/* Mobile Menu Button - Visible on Mobile/Tablet */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden relative z-50 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:border-white/40 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu - Fully Responsive */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Menu Panel - Responsive Width */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] sm:w-[70vw] md:w-96 bg-black/60 backdrop-blur-2xl border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 text-white hover:border-white/40 transition-all duration-300"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                {navLinks.map((link, index) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <>
                        {/* Dropdown Toggle */}
                        <button
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === index ? null : index,
                            )
                          }
                          className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-300"
                        >
                          {link.name}
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
                          />
                        </button>

                        {/* Dropdown Items */}
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden ml-3 sm:ml-4 mt-1 sm:mt-2 space-y-1"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="block px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-md sm:rounded-lg transition-all duration-300"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Regular Link
                      <Link
                        to={link.path}
                        className="block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg sm:rounded-xl transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button - Aultum Gradient */}
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full overflow-hidden rounded-lg sm:rounded-xl mt-4 sm:mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-600" />
                  <span className="relative block px-6 py-2.5 font-semibold text-white text-sm">
                    {" "}
                    Get Started →
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
