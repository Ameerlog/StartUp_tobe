import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Headphones } from "lucide-react";
import Logo_white from "../assets/domain/cobrother12341.png";
import support from "../assets/icons/botLogo.png";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHomePage = location.pathname === "/";

  const scrolltoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    {
      name: "Solutions",
      dropdown: [
        { name: "Co-Venture", path: "/venture" },
        { name: "Co-Branding", path: "/branding" },
        { name: "Co-Marketing", path: "/marketing" },
        { name: "Co-Working", path: "/community" },
      ],
    },
    { name: "Domains", path: "/branding" },
  ];

  const HoverUnderline = () => (
    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 group-hover:w-4/5 transition-all duration-300 rounded-full" />
  );

  const MobileUnderline = () => (
    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-focus:w-full group-active:w-full transition-all duration-300 rounded-full" />
  );

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
                className="relative cursor-pointer z-50 shrink-0"
              >
                <img
                  src={Logo_white}
                  alt="CoBrother Aultum"
                  onClick={scrolltoTop}
                  className="h-7 sm:h-7 md:h-7 lg:h-10 xl:h-11 ml-8 w-auto drop-shadow-2xl transition-transform duration-300 scale-140"
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
                          <HoverUnderline />
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
                              <div className="relative bg-black backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="group relative block px-4 py-2.5 xl:py-3 text-sm xl:text-base text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                                  >
                                    <span className="relative">
                                      {item.name}
                                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300 rounded-full" />
                                    </span>
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
                        <HoverUnderline />
                      </Link>
                    )}
                  </div>
                ))}

                <motion.button
                  onClick={() => navigate(" ")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative rounded-full ml-2 xl:ml-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                  <span className="relative px-4 xl:px-5 py-2 xl:py-2.5 font-semibold text-white text-sm xl:text-base flex items-center gap-1.5 rounded-full border border-transparent hover:border-white/60 transition-colors duration-300">
                    Get Started <span className="text-xs xl:text-sm">→</span>
                  </span>
                </motion.button>

                {/* <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 p-2 xl:p-2.5 rounded-lg hover:bg-white/10 transition-colors ml-1"
                  title="Support"
                >
                  <img src={support} alt="" className="h-5 w-5 xl:h-6 xl:w-6 object-contain scale-[4] ml-3" />
                </motion.button> */}
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center p-2 xl:p-2.5 rounded-lg bg-transparent hover:bg-white/10 transition-colors ml-1"
                  title="Support"
                >
                  <img
                    src={support}
                    alt="Support"
                    className="h-7 w-7 xl:h-6 xl:w-6 object-cover scale-200"
                  />
                </motion.button>
              </div>

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
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === index ? null : index,
                            )
                          }
                          className="group w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white/80 hover:text-white active:text-white focus:text-white hover:bg-white/10 active:bg-white/15 rounded-lg sm:rounded-xl transition-all duration-300 relative focus:outline-none"
                        >
                          <span className="relative inline-block">
                            {link.name}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-focus:w-full group-active:w-full peer-focus:w-full transition-all duration-300 rounded-full" />
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
                          />
                        </motion.button>

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
                              {link.dropdown.map((item, itemIndex) => (
                                <motion.div
                                  key={item.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: itemIndex * 0.05 }}
                                >
                                  <Link
                                    to={item.path}
                                    className="group block px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-white/70 hover:text-white active:text-white focus:text-white hover:bg-white/10 active:bg-white/15 rounded-md sm:rounded-lg transition-all duration-300 focus:outline-none"
                                  >
                                    <motion.span
                                      className="relative inline-block"
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      {item.name}
                                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-focus:w-full group-active:w-full transition-all duration-300 rounded-full" />
                                    </motion.span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      // Regular Link
                      <motion.div whileTap={{ scale: 0.98 }}>
                        <Link
                          to={link.path}
                          className="group block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white/80 hover:text-white active:text-white focus:text-white hover:bg-white/10 active:bg-white/15 rounded-lg sm:rounded-xl transition-all duration-300 focus:outline-none"
                        >
                          <span className="relative inline-block">
                            {link.name}
                            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-focus:w-full group-active:w-full transition-all duration-300 rounded-full" />
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                ))}

                <motion.button
                  onClick={() => navigate("")}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full overflow-hidden rounded-lg sm:rounded-xl mt-4 sm:mt-6 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 group-active:from-purple-500 group-active:to-blue-500 transition-all duration-300" />
                  <span className="relative block px-6 py-2.5 sm:py-3 font-semibold text-white text-sm sm:text-base">
                    Get Started →
                  </span>
                </motion.button>

                <motion.div whileTap={{ scale: 0.98 }} className="mt-3">
                  <button
                    onClick={() => navigate("/contact")}
                    className="group w-full flex items-center gap-4 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white/60 hover:text-white active:text-white focus:text-white hover:bg-white/10 active:bg-white/15 rounded-lg sm:rounded-xl transition-all duration-300 focus:outline-none"
                  >
                    <img
                      src={support}
                      className="w-4 h-4 sm:w-5 sm:h-5 scale-300"
                    />
                    <span className="relative inline-block ">
                      Support
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-focus:w-full group-active:w-full transition-all duration-300 rounded-full" />
                    </span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
