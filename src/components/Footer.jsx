import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
const XLogo = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor" // This ensures it uses your hover text colors
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
import { Link } from "react-router-dom";
import Logo from "../assets/domain/cobrotheraultum_Logo_white.png";

const social = [
  {
    href: "https://x.com/CoBrother141506",
    label: "X",
    Icon: XLogo,
    color: "hover:text-blue-400",
  },
  {
    href: "https://www.instagram.com/cobrother__?igsh=bXE3YnR4dDJ6NnVi",
    label: "Instagram",
    Icon: Instagram,
    color: "hover:text-pink-400",
  },
  {
    href: "https://www.facebook.com/share/16vjEWTjHi/",
    label: "Facebook",
    Icon: Facebook,
    color: "hover:text-blue-500",
  },
  {
    href: "https://www.linkedin.com/in/co-brother-9921b03aa",
    label: "LinkedIn",
    Icon: Linkedin,
    color: "hover:text-blue-600",
  },
  {
    href: "https://www.youtube.com/channel/UCPq5njZ3e63myDvzfcoSDEQ",
    label: "YouTube",
    Icon: Youtube,
    color: "hover:text-red-500",
  },
];

const columns = [
  {
    title: "Product",
    links: ["Marketplace", "Domains for Sale", "Startup Toolkit", "Pricing"],
  },
  {
    title: "Solutions",
    links: [
      "Company Registration",
      "GST & Tax Filing",
      "Trademark & IP",
      "Accounting & Compliance",
      "Startup Business",
    ],
  },
  { title: "Co-Working", links: ["CoFounder", "CoInvestor"] },
  {
    title: "Resources",
    links: ["Legal Basics for Founders", "Brand Naming Guide"],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "How It Works",
      "Careers",
      "Contact Us",
      "Privacy Policy",
      "Terms of Service",
    ],
  },
  // {
  //   title: "Trust & Security",
  //   links: [
  //     "Secure Payments",
  //     "Transparent Pricing",
  //     "Founder-First Approach",
  //     "India-Focused Compliance",
  //   ],
  // },
];

const linkPaths = {
  Marketplace: "/marketplace",
  "Domains for Sale": "/domains",
  "Startup Toolkit": "/toolkit",
  Pricing: "/pricing",
  "Company Registration": "/compliance",
  "GST & Tax Filing": "/compliance",
  "Trademark & IP": "/compliance",
  "Accounting & Compliance": "/accounting-compliance",
  "Startup Business": "/startup-business",
  CoFounder: "/community",
  CoInvestor: "/community",
  "Legal Basics for Founders": "/legal-basics",
  "Brand Naming Guide": "/brand-naming",
  "About Us": "/about",
  "How It Works": "/how-it-works",
  Careers: "/careers",
  "Contact Us": "/contact",
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-of-service",
  "Secure Payments": "/secure-payments",
  "Transparent Pricing": "/transparent-pricing",
  "Founder-First Approach": "/founder-first-approach",
  "India-Focused Compliance": "/india-compliance",
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Animated Gradient Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            delay: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Footer Content */}
      <section className="relative border-t border-neutral-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Top Section - Logo & Links Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 lg:gap-12 mb-12">
            {/* Logo & Description Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Logo */}
              <Link to="/" className="inline-block">
                <img
                  src={Logo}
                  alt="CobrotherAultum"
                  className="h-16 sm:h-20 md:h-24 w-auto transform scale-150 sm:scale-[1.8] md:scale-[2] lg:scale-[2.2] origin-left transition-transform duration-300 hover:scale-[1.6] sm:hover:scale-[1.9] md:hover:scale-[2.1] lg:hover:scale-[2.3]"
                />
              </Link>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Everything your business needs, in one place.
                </p>
                <p className="text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CoBrother™
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-neutral-400">
                <div className="flex items-center gap-2 hover:text-purple-400 transition-colors duration-300">
                  <Mail className="w-4 h-4" />
                  <span>cobrother.com@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-300">
                  <Phone className="w-4 h-4" />
                  <span>+91 8085758575</span>
                </div>
                <div className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-300">
                  <MapPin className="w-4 h-4" />
                  <span>Hubballi, Karnataka, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {social.map(({ label, Icon, href, color }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 border border-neutral-800/50 text-neutral-500 transition-all duration-300 ${color} hover:border-neutral-700/50`}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300" />
                    <Icon className="relative h-5 w-5 sm:h-5 sm:w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Columns */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
              {columns.map((col, colIndex) => (
                <motion.div
                  key={col.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: colIndex * 0.1, duration: 0.6 }}
                  className="flex flex-col gap-4"
                >
                  {/* Column Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white/90 mb-1">
                    {col.title}
                  </h3>

                  {/* Column Links */}
                  <ul className="space-y-2.5">
                    {col.links.map((label, idx) => {
                      const path = linkPaths[label];

                      return path ? (
                        <li key={label + idx}>
                          <Link
                            to={path}
                            className="group inline-flex items-center text-xs sm:text-sm text-neutral-400 hover:text-white transition-colors duration-300"
                          >
                            <span className="relative">
                              {label}
                              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300" />
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li key={label + idx}>
                          <span className="text-xs sm:text-sm text-neutral-500 cursor-default">
                            {label}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Newsletter Section (Optional) */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group mb-12"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    Stay Updated
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Subscribe to get the latest updates and startup resources
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 sm:w-64 px-4 py-2.5 bg-neutral-950/50 border border-neutral-800/50 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 transition-all duration-300 text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden rounded-xl whitespace-nowrap"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 blur transition duration-500" />
                    <span className="relative px-6 py-2.5 font-semibold text-white text-sm block">
                      Subscribe
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Bottom Section - Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="pt-8 border-t border-neutral-800/50"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="text-xs sm:text-sm text-neutral-500">
                © 2026{" "}
                <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  CoBrother™
                </span>
                . All rights reserved.
              </div>
              <div className="text-xs sm:text-sm text-neutral-400">
                Made with ❤️ in India
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button - Shows only after scrolling */}
      {showBackToTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-300" />
            <div className="relative p-3 sm:p-3.5 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800/50 text-white hover:border-purple-500/50 transition-all duration-300">
              <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </motion.button>
        </motion.div>
      )}
    </footer>
  );
}
