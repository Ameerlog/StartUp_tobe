import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Hash,
  LayoutGrid,
  ShieldCheck,
  Megaphone,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Premium Domains",
    desc: "Access high-value, brand-ready domains curated for serious startups.",
    gradient: "from-purple-500/15 to-indigo-500/15",
    glow: "from-purple-600/30 to-indigo-600/30",
    iconColor: "text-purple-400",
    border: "group-hover:border-purple-500/50",
    number: "01",
  },
  {
    icon: Hash,
    title: "Fancy Numbers",
    desc: "Memorable numeric identities for branding, trust, and recall.",
    gradient: "from-blue-500/15 to-cyan-500/15",
    glow: "from-blue-600/30 to-cyan-600/30",
    iconColor: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    number: "02",
  },
  {
    icon: LayoutGrid,
    title: "White-Labeled SaaS",
    desc: "Operate on a full SaaS ecosystem under your own startup brand.",
    gradient: "from-pink-500/15 to-rose-500/15",
    glow: "from-pink-600/30 to-rose-600/30",
    iconColor: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    number: "03",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Registration",
    desc: "Company setup, legal compliance, and filings handled end-to-end.",
    gradient: "from-green-500/15 to-emerald-500/15",
    glow: "from-green-600/30 to-emerald-600/30",
    iconColor: "text-green-400",
    border: "group-hover:border-green-500/50",
    number: "04",
  },
  {
    icon: Megaphone,
    title: "Marketing & Merch",
    desc: "Branding, launch marketing, and merchandise support from day one.",
    gradient: "from-orange-500/15 to-amber-500/15",
    glow: "from-orange-600/30 to-amber-600/30",
    iconColor: "text-orange-400",
    border: "group-hover:border-orange-500/50",
    number: "05",
  },
  {
    icon: TrendingUp,
    title: "Growth Partnership",
    desc: "Aligned incentives through revenue sharing and long-term growth.",
    gradient: "from-violet-500/15 to-purple-500/15",
    glow: "from-violet-600/30 to-purple-600/30",
    iconColor: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    number: "06",
  },
];

export default function JVBenefitsSection() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Coventure Benefits for{" "}
            </span>
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              Founders
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-neutral-400">
            What startups gain by partnering with{" "}
            <span className="text-white font-medium">Cobrother</span>
          </p>

          <div className="mt-6 flex justify-center">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(
            ({
              icon: Icon,
              title,
              desc,
              gradient,
              glow,
              iconColor,
              border,
              number,
            }) => (
              <motion.article
                key={title}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 backdrop-blur-xl p-6 transition ${border}`}
              >
                <div
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${glow} blur-lg opacity-0 group-hover:opacity-60 transition duration-500`}
                />

                <span
                  className={`absolute -top-4 -right-4 text-7xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent opacity-20`}
                >
                  {number}
                </span>

                <div className="relative">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} border border-white/10`}
                    >
                      <Icon
                        className={`h-6 w-6 ${iconColor}`}
                        strokeWidth={1.5}
                      />
                    </div>

                    <h3 className="pt-2 text-lg font-semibold text-white">
                      {title}
                    </h3>
                  </div>

                  <p className="mt-3 pl-16 text-sm text-neutral-400 leading-relaxed">
                    {desc}
                  </p>

                  <div className="mt-4 pl-16">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium ${iconColor} opacity-0 group-hover:opacity-100 transition`}
                    >
                      Learn more
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ),
          )}
        </div>

        <div className="mt-14 text-center">
          <p className="mb-5 text-sm text-neutral-500">
            Ready to unlock all benefits?
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center overflow-hidden rounded-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition" />

            <span className="relative flex items-center gap-2 px-8 py-3.5 text-sm sm:text-base font-semibold text-white">
              Become a Coventure Partner
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
