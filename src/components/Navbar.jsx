import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo_white from "../assets/domain/cobrother_Logo_white.png";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Scroll detection - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down - hide navbar
      } else {
        setIsVisible(true); // Scrolling up - show navbar
      }

      // Background effect
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

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
    { name: "Domains", path: "/domains" },
    {
      name: "Services",
      dropdown: [
        { name: "Compliance", path: "/compliance" },
        { name: "Company Registration", path: "/compliance" },
        { name: "GST & Tax Filing", path: "/compliance" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-xl"
            : "bg-black/80 backdrop-blur-md border-b border-neutral-800/30"
        }`}
      >
        <div className="h-20 sm:h-24 px-4 sm:px-6 lg:px-8">
          <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto">
            {/* Logo */}
            <motion.div
              onClick={() => navigate("/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer z-50"
            >
              <img
                src={Logo_white}
                alt="CoBrother Aultum"
                className="h-10 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto  origin-left drop-shadow-2xl transition-transform duration-300 scale-200 ml-10"
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link, index) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.dropdown ? (
                    // Dropdown Menu
                    <>
                      <button className="group relative px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300 flex items-center gap-1">
                        {link.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
                        />
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                      </button>

                      {/* Dropdown Panel */}
                      <AnimatePresence>
                        {activeDropdown === index && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-56"
                          >
                            <div className="relative group/dropdown">
                              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur opacity-50" />
                              <div className="relative bg-neutral-950/98 backdrop-blur-xl border border-neutral-800/50 rounded-xl overflow-hidden shadow-2xl">
                                {link.dropdown.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-all duration-300"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    // Regular Link
                    <Link
                      to={link.path}
                      className="group relative px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA Button */}
              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-full ml-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 blur transition duration-500" />
                <span className="relative px-6 py-2.5 font-semibold text-white text-sm block">
                  Get Started
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden relative z-50 p-2 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-800/50 text-white hover:border-purple-500/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-neutral-950 border-l border-neutral-800/50 z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-800/50">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Menu
                </h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800/50 text-white hover:border-purple-500/50 transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="p-6 space-y-2">
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
                          className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all duration-300"
                        >
                          {link.name}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
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
                              className="overflow-hidden ml-4 mt-2 space-y-1"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="block px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
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
                        className="block px-4 py-3 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all duration-300"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <motion.button
                  onClick={() => navigate("/contact")}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full overflow-hidden rounded-xl mt-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                  <span className="relative block px-6 py-3.5 font-semibold text-white text-base">
                    Get Started
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
