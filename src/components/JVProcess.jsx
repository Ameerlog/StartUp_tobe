import React from "react";
import { motion } from "framer-motion";
import { FileText, SearchCheck, Grid, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: FileText,
    title: "Apply Online",
    desc: "Fill out a short coventure application with basic startup details.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    glowColor: "from-purple-600/30 to-indigo-600/30",
    iconColor: "text-purple-400",
    borderColor: "group-hover:border-purple-500/50",
    bgGlow: "bg-purple-500",
  },
  {
    step: "02",
    icon: SearchCheck,
    title: "Review & Approval",
    desc: "Our team reviews the fit, vision, and potential synergy.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    glowColor: "from-blue-600/30 to-cyan-600/30",
    iconColor: "text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
    bgGlow: "bg-blue-500",
  },
  {
    step: "03",
    icon: Grid,
    title: "Access Cobrother Ecosystem",
    desc: "Get domains, SaaS tools, compliance, and marketing support.",
    gradient: "from-pink-500/20 to-rose-500/20",
    glowColor: "from-pink-600/30 to-rose-600/30",
    iconColor: "text-pink-400",
    borderColor: "group-hover:border-pink-500/50",
    bgGlow: "bg-pink-500",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Co-Build & Launch",
    desc: "Launch together with shared growth and revenue alignment.",
    gradient: "from-green-500/20 to-emerald-500/20",
    glowColor: "from-green-600/30 to-emerald-600/30",
    iconColor: "text-green-400",
    borderColor: "group-hover:border-green-500/50",
    bgGlow: "bg-green-500",
  },
];

export default function JVProcess() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="relative bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-6xl px-4 text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            How the{" "}
          </span>
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Coventure Works
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-neutral-400"
        >
          A simple, transparent process designed for{" "}
          <span className="text-white font-medium">co-founders</span>
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map(
            ({
              step,
              icon: Icon,
              title,
              desc,
              gradient,
              glowColor,
              iconColor,
              borderColor,
              bgGlow,
            }) => (
              <motion.div
                key={step}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className={`group relative rounded-2xl border border-neutral-800/50 
                bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 
                backdrop-blur-xl p-6 text-left
                ${borderColor}
                transition-all duration-300`}
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${glowColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500`}
                />

                <div className="relative">
                  <span
                    className={`absolute -top-9 left-0 rounded-full px-3 py-1 text-xs font-bold text-white 
                    bg-gradient-to-r ${glowColor}`}
                  >
                    {step}
                  </span>

                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.08 }}
                    className={`mt-2 flex h-14 w-14 items-center justify-center rounded-xl 
                    bg-gradient-to-br ${gradient} border border-white/10`}
                  >
                    <Icon className={`h-7 w-7 ${iconColor}`} />
                  </motion.div>

                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {desc}
                  </p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className={`mt-4 h-0.5 w-12 bg-gradient-to-r ${glowColor} rounded-full origin-left`}
                  />
                </div>

                <div
                  className={`absolute -bottom-4 -right-4 w-24 h-24 ${bgGlow}/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
