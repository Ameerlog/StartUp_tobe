import React from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  ArrowUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/FooterLogo.png";
import { useNavigate } from "react-router-dom";

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

const footerColumns = [
  {
    title: "Solutions",
    links: [
      "Co-Creation Challenges",
      "Co-Operation Setup",
      "Co-Marketing Solutions",
      "Co-Branding & Domains",
      "Co-Working / Virtual Workspace",
    ],
  },
  {
    title: "Marketplace & Ventures",
    links: [
      "Domain Marketplace",
      "Coventure / JV Opportunities",
      "Premium Brands for Partnership",
    ],
  },
  {
    title: "Company & Support",
    links: [
      "About Cobrother",
      "How It Works",
      "Careers",
      "Contact Us",
      "Privacy Policy",
      "Terms of Service",
      "Trust & Security",
    ],
  },
];

/* ================= PATHS ================= */

const linkPaths = {
  "Co-Creation Challenges": "/co-creation",
  "Co-Operation Setup": "/co-operation",
  "Co-Marketing Solutions": "/co-marketing",
  "Co-Branding & Domains": "/domains",
  "Co-Working / Virtual Workspace": "/workspace",

  "Domain Marketplace": "/marketplace",
  "Coventure / JV Opportunities": "/coventure",
  "Premium Brands for Partnership": "/brands",

  "About Cobrother": "/about",
  "How It Works": "/how-it-works",
  Careers: "/careers",
  "Contact Us": "/contact",
  "Privacy Policy": "/privacy-policy",
  "Terms of Service": "/terms-of-service",
  "Trust & Security": "/trust-security",
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 blur-3xl rounded-full" />
      </div>

      {/* Main Footer */}
      <section className="relative border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
            {/* BRAND COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/">
                <img
                  src={Logo}
                  alt="Cobrother Aultum"
                  className="h-48 md:h-56 w-auto"
                />
              </Link>

              <p className="text-sm text-neutral-400">
                Everything your business needs, in one place.
              </p>

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
            </div>

            {/* LINKS */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-10">
              {footerColumns.map((col) => (
                <div key={col.title}>
                  <h4 className="font-semibold mb-4">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.links.map((label) => (
                      <li key={label}>
                        <Link
                          to={linkPaths[label]}
                          className="text-sm text-neutral-400 hover:text-white transition"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => navigate("/contact")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium hover:from-purple-500"
            >
              Book a Cobrother Visit →
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://aultum.com/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="px-6 py-3 rounded-xl border border-neutral-700 hover:border-neutral-500 transition"
            >
              Get Aultum SaaS →
            </button>
          </div>

          {/* BOTTOM */}
          <div className="pt-6 border-t border-neutral-800 text-center text-sm text-neutral-500">
            © 2026 <span className="font-semibold text-white">Cobrother™</span>.
            All rights reserved. Made with ❤️ in India.
          </div>
        </div>
      </section>

      {/* BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}
