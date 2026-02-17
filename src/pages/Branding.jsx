import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Branding() {
  const [activeTab, setActiveTab] = useState("domains");
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tabs = [{ id: "domains", label: "Domains" }];

  // Fetch domains from backend
  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const response = await fetch(
        "https://cobrother-api.onrender.com/api/ListAllDomains",
      );
      const data = await response.json();
      setDomains(data);
    } catch (error) {
      console.error("Error fetching domains:", error);
    } finally {
      setLoading(false);
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative z-10 pt-15 pb-0 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
            Venture Branding
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
          >
            <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Build Your Brand
            </span>
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              CoBrother Guides You.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mx-auto mt-5 max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            Finding the perfect brand name isn't easy. CoBrother makes it
            simple.
            <br />
            We help you discover unique, memorable names and instantly check
            domain availability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="group relative inline-flex items-center gap-2 rounded-full overflow-hidden
              shadow-[0_0_40px_rgba(168,85,247,0.35)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

              <a
                href="/domain-form"
                className="relative px-7 py-3 text-sm sm:text-base font-semibold text-white flex items-center gap-2"
              >
                Resell Your Domain
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Domain Cards Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "domains" && (
              <motion.div
                key="domains"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {loading ? (
                  <div className="text-center py-20">
                    <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-neutral-400">Loading domains...</p>
                  </div>
                ) : domains.length === 0 ? (
                  <div className="text-center py-20">
                    <Globe className="w-16 h-16 mx-auto text-neutral-600 mb-4" />
                    <p className="text-neutral-400">No domains listed yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {domains.map((domain, index) => (
                      <motion.div
                        key={domain.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-6 hover:border-neutral-700/50 transition-all duration-300"
                      >
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-pink-600/0 rounded-2xl blur-lg opacity-0 group-hover:from-purple-600/30 group-hover:to-pink-600/30 group-hover:opacity-70 transition duration-500" />

                        <div className="relative">
                          {/* Logo */}
                          <div className="mb-4">
                            {domain.logo ? (
                              <img
                                src={`https://cobrother-api.onrender.com/api/images/${domain.logo}`}
                                alt={domain.domainName}
                                className="w-full h-40 object-cover rounded-xl border border-neutral-700/50"
                              />
                            ) : (
                              <div className="w-full h-40 bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-500 rounded-xl flex items-center justify-center">
                                <span className="text-4xl font-bold text-white opacity-50">
                                  {domain.domainName
                                    .substring(0, 2)
                                    .toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Domain Name */}
                          <h3 className="text-xl font-bold text-white mb-1 truncate">
                            {domain.domainName}
                          </h3>

                          {/* Extension */}
                          <p className="text-sm text-neutral-400 mb-3">
                            {domain.domainExtension}
                          </p>

                          {/* Price */}
                          <div className="mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                              ₹{domain.askingPrice.toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* Category Badge */}
                          <div className="mb-4">
                            <span className="inline-block px-3 py-1 text-xs bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 capitalize">
                              {domain.domainCategory}
                            </span>
                          </div>

                          {/* Make it Yours Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                              navigate(`/marketplace/domain/${domain.id}`)
                            }
                            className="w-full group/btn relative overflow-hidden rounded-xl"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 opacity-0 group-hover/btn:opacity-100 blur-xl transition duration-500" />

                            <span className="relative px-4 py-2.5 font-semibold text-white text-sm flex items-center justify-center gap-2">
                              Make it Yours
                              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
