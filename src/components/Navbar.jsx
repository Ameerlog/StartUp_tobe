// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Menu, X, ChevronDown } from "lucide-react";
// import Logo_white from "../assets/icons/Cobrother.png";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);

//   // Scroll detection - hide on scroll down, show on scroll up
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       // Show/hide based on scroll direction
//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsVisible(false); // Scrolling down - hide navbar
//       } else {
//         setIsVisible(true); // Scrolling up - show navbar
//       }

//       // Background effect
//       setIsScrolled(currentScrollY > 20);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setActiveDropdown(null);
//   }, [location]);

//   const navLinks = [
//     {
//       name: "Solutions",
//       dropdown: [
//         { name: "Co-Venture", path: "/venture" },
//         { name: "Co-Branding", path: "/branding" },
//         { name: "Co-Marketing", path: "/marketing" },
//         { name: "Co-Creation", path: "/co-creation" },
//         { name: "Co-Operation", path: "/ai" },
//         { name: "Co-Working", path: "/community" },
//       ],
//     },
 
//     { name: "Domains", path: "/domains" },
   

//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <>
//       {/* Main Navbar */}
//       <motion.nav
//         initial={{ y: 0 }}
//         animate={{ y: isVisible ? 0 : -100 }}
//         transition={{ duration: 0.4, ease: "easeInOut" }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           isScrolled
//             ? "bg-black/95 backdrop-blur-xl border-b border-neutral-800/50 shadow-xl"
//             : "bg-black/80 backdrop-blur-md border-b border-neutral-800/30"
//         }`}
//       >
//         <div className="h-20 sm:h-24 px-4 sm:px-6 lg:px-8">
//           <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto">
//             {/* Logo */}
//             <motion.div
//               onClick={() => navigate("/")}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative cursor-pointer z-50"
//             >
//               <img
//                 src={Logo_white}
//                 alt="CoBrother Aultum"
//                 className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto scale-[2]  origin-left drop-shadow-2xl transition-transform duration-300 hover:scale-[1.9] sm:hover:scale-[2.3] md:hover:scale-[2.7] lg:hover:scale-[3.1] xl:hover:scale-[3.3]"
//               />
              
//             </motion.div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-1 xl:gap-2">
//               {navLinks.map((link, index) => (
//                 <div
//                   key={link.name}
//                   className="relative"
//                   onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
//                   onMouseLeave={() => setActiveDropdown(null)}
//                 >
//                   {link.dropdown ? (
//                     // Dropdown Menu
//                     <>
//                       <button className="group relative px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300 flex items-center gap-1">
//                         {link.name}
//                         <ChevronDown
//                           className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
//                         />
//                         <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
//                       </button>

//                       {/* Dropdown Panel */}
//                       <AnimatePresence>
//                         {activeDropdown === index && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 10 }}
//                             transition={{ duration: 0.2 }}
//                             className="absolute top-full left-0 mt-2 w-56"
//                           >
//                             <div className="relative group/dropdown">
//                               <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur opacity-50" />
//                               <div className="relative bg-neutral-950/98 backdrop-blur-xl border border-neutral-800/50 rounded-xl overflow-hidden shadow-2xl">
//                                 {link.dropdown.map((item) => (
//                                   <Link
//                                     key={item.name}
//                                     to={item.path}
//                                     className="block px-4 py-3 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/50 transition-all duration-300"
//                                   >
//                                     {item.name}
//                                   </Link>
//                                 ))}
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </>
//                   ) : (
//                     // Regular Link
//                     <Link
//                       to={link.path}
//                       className="group relative px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-300"
//                     >
//                       {link.name}
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
//                     </Link>
//                   )}
//                 </div>
//               ))}

//               {/* CTA Button */}
//               <motion.button
//                 onClick={() => navigate("/contact")}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="relative overflow-hidden rounded-full ml-4"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 blur transition duration-500" />
//                 <span className="relative px-6 py-2.5 font-semibold text-white text-sm block">
//                Schedule a visit
//                 </span>
//               </motion.button>
//             </div>

//             {/* Mobile Menu Button */}
//             <motion.button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               whileTap={{ scale: 0.95 }}
//               className="lg:hidden relative z-50 p-2 rounded-xl bg-neutral-900/80 backdrop-blur-sm border border-neutral-800/50 text-white hover:border-purple-500/50 transition-all duration-300"
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </motion.button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-neutral-950 border-l border-neutral-800/50 z-50 lg:hidden overflow-y-auto"
//             >
//               {/* Mobile Menu Header */}
//               <div className="flex items-center justify-between p-6 border-b border-neutral-800/50">
//                 <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                   Menu
//                 </h2>
//                 <button
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800/50 text-white hover:border-purple-500/50 transition-all duration-300"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Mobile Menu Links */}
//               <div className="p-6 space-y-2">
//                 {navLinks.map((link, index) => (
//                   <div key={link.name}>
//                     {link.dropdown ? (
//                       <>
//                         {/* Dropdown Toggle */}
//                         <button
//                           onClick={() =>
//                             setActiveDropdown(
//                               activeDropdown === index ? null : index,
//                             )
//                           }
//                           className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all duration-300"
//                         >
//                           {link.name}
//                           <ChevronDown
//                             className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === index ? "rotate-180" : ""}`}
//                           />
//                         </button>

//                         {/* Dropdown Items */}
//                         <AnimatePresence>
//                           {activeDropdown === index && (
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{ height: "auto", opacity: 1 }}
//                               exit={{ height: 0, opacity: 0 }}
//                               transition={{ duration: 0.3 }}
//                               className="overflow-hidden ml-4 mt-2 space-y-1"
//                             >
//                               {link.dropdown.map((item) => (
//                                 <Link
//                                   key={item.name}
//                                   to={item.path}
//                                   className="block px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all duration-300"
//                                 >
//                                   {item.name}
//                                 </Link>
//                               ))}
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </>
//                     ) : (
//                       // Regular Link
//                       <Link
//                         to={link.path}
//                         className="block px-4 py-3 text-base font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-xl transition-all duration-300"
//                       >
//                         {link.name}
//                       </Link>
//                     )}
//                   </div>
//                 ))}

//                 {/* Mobile CTA Button */}
//                 <motion.button
//                   onClick={() => navigate("/contact")}
//                   whileTap={{ scale: 0.95 }}
//                   className="relative w-full overflow-hidden rounded-xl mt-6"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
//                   <span className="relative block px-6 py-3.5 font-semibold text-white text-base">
//                     Get Started
//                   </span>
//                 </motion.button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo_white from "../assets/icons/Cobrother.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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
    { name: "Domains", path: "/domains" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 lg:px-8 pt-3 md:pt-4"
      >
        <div
          className={`max-w-6xl mx-auto transition-all duration-500 rounded-full ${
            isScrolled
              ? "bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl"
              : "bg-black/30 backdrop-blur-lg border border-white/5"
          }`}
        >
          <div className="h-14 sm:h-16 md:h-[70px] px-3 sm:px-4 md:px-6">
            <div className="relative h-full flex items-center justify-between">
              {/* Logo + Text */}
              <motion.div
                onClick={() => navigate("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 cursor-pointer z-50 flex-shrink-0"
              >
                <img
                  src={Logo_white}
                  alt="Cobrother"
                  className="h-8 sm:h-10 md:h-12 w-auto drop-shadow-2xl scale-300"
                />
                <span className="text-sm sm:text-base md:text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
                  Cobrother
                </span>
              </motion.div>

              <div className="hidden lg:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
                {navLinks.map((link, index) => (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => link.dropdown && setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.dropdown ? (
                      <>
                        <button className="group relative px-3 xl:px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white flex items-center gap-1 transition-colors">
                          {link.name}
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-300 ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                          <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                        </button>

                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="absolute top-full left-0 mt-3 w-52"
                            >
                              <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                {link.dropdown.map((item, idx) => (
                                  <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`block px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-all duration-200 ${
                                      idx !== 0 ? "border-t border-white/5" : ""
                                    }`}
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
                      <Link
                        to={link.path}
                        className="group relative px-3 xl:px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                      >
                        {link.name}
                        <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <motion.button
                onClick={() => navigate("/contact")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:block relative overflow-hidden rounded-full group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
                <span className="relative block px-5 py-2 font-semibold text-white text-sm whitespace-nowrap">
                  Schedule a visit
                </span>
              </motion.button>

              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 sm:top-24 left-0 right-0 z-40 px-3 sm:px-4 md:px-6 lg:hidden"
          >
            <div className="bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto">
              <div className="py-4">
                {navLinks.map((link, index) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setActiveDropdown(activeDropdown === index ? null : index)
                          }
                          className="w-full px-6 py-3 text-left text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                        >
                          {link.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ${
                              activeDropdown === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden bg-white/5"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  to={item.path}
                                  className="block px-10 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className="block px-6 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}

                <motion.button
                  onClick={() => navigate("/contact")}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mx-6 mt-4 relative overflow-hidden rounded-full group"
                  style={{ width: "calc(100% - 3rem)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" />
                  <span className="relative block px-6 py-2.5 font-semibold text-white text-sm">
                    Schedule a visit
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;