// src/pages/AboutUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Users, TrendingUp, Zap } from "lucide-react";

export default function AboutUs() {
  const pillars = [
    {
      icon: Lightbulb,
      title: "Identity (Co-Branding)",
      description: "Instantly provision the digital foundations of a brand.",
      gradient: "from-purple-600 to-blue-600 font-medium hover:from-purple-500",
    },
    {
      icon: TrendingUp,
      title: "Capital (Co-Venture)",
      description: "Bridging the gap between silent capital and vocal talent.",
      gradient: "from-pink-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Growth (Co-Marketing)",
      description: "Providing the SaaS marketplace to scale without overhead.",
      gradient: "from-blue-500 to-purple-500",
    },
    {
      icon: Users,
      title: "Innovation (Co-Creation)",
      description: "Solving industrial challenges through AI-driven rewards.",
      gradient: "from-purple-500 to-blue-500",
    },
    {
      icon: Target,
      title: "Efficiency (Co-Operation)",
      description:
        "Deploying pre-built automation 'recipes' to replace manual employees.",
      gradient: "from-red-500 to-purple-500",
    },
    {
      icon: Eye,
      title: "Culture (Co-Working)",
      description:
        "Curating a virtual workspace where the world's best founders meet.",
      gradient: "from-purple-600 to-blue-600 font-medium hover:from-purple-500",
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden pt-24 md:pt-28 pb-20">
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 20,
            delay: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 font-display">
            About{" "}
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
              CoBrother
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            The Operating System for Founders
          </p>
        </motion.div>

        {/* Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Overview
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4">
                <strong>The Architecture of Ambition.</strong> At CoBrother
                Aultum, we don't believe in the traditional boundaries of
                business. We believe in <strong>Ecosystems</strong>. In a world
                where speed is the only sustainable competitive advantage, the
                gap between an idea and an enterprise should be measured in
                hours, not years.
              </p>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                CoBrother Aultum was born from a simple realization:
                entrepreneurs are tired of being "customers" of disconnected
                tools. They want to be{" "}
                <strong>architects of a unified vision</strong>. We provide the
                raw materials—domains, capital support with community—and the
                intelligent automation to weave them together.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Our Vision
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                To decentralize the power of the enterprise, making the{" "}
                <strong>
                  global GDP accessible to every individual with an idea
                </strong>
                . We envision a 2030 where starting a company is as frictionless
                as sending a message. A world where "Co-Creation" is the
                default, and the traditional "lonely founder" is replaced by an{" "}
                <strong>AI-augmented network</strong> of partners, investors,
                and automated workflows.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              Our Mission
            </span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 text-center max-w-3xl mx-auto mb-12">
            Build the Operating System for Founders by integrating six critical
            pillars into one high-velocity environment:
          </p>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-6 h-full">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${pillar.gradient} flex items-center justify-center mb-4`}
                  >
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
