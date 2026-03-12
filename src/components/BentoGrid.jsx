import { motion } from "framer-motion";
import {
  Layers,
  IndianRupee,
  Zap,
  Headphones,
  TrendingUp,
  Check,
} from "lucide-react";

const containerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const itemVar = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const CheckRow = ({ children }) => (
  <div className="flex items-start gap-2.5 text-sm text-zinc-300">
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 text-blue-200 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
      <Check className="h-3 w-3" />
    </span>
    <span className="leading-relaxed text-zinc-300/90">{children}</span>
  </div>
);

const Badge = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs font-medium text-zinc-300 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white cursor-default">
    {children}
  </span>
);

const Price = ({ amount }) => (
  <div className="mt-auto pt-5 sm:pt-6 text-left sm:text-right">
    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-blue-100 transition-colors">
      ₹{amount.toLocaleString()}
    </span>
    <span className="ml-1 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-zinc-500">
      / month
    </span>
  </div>
);

const InsetCard = ({ children, className = "", isHoverable = true }) => {
  return (
    <motion.div
      variants={itemVar}
      whileHover={isHoverable ? { y: -4, scale: 1.01 } : {}}
      className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-zinc-900/60 p-5 sm:p-6 lg:p-8 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/20 ${className}`}
      style={{
        boxShadow:
          "inset 0 0 20px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)",
        willChange: "transform, opacity",
      }}
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-violet-600/10 via-blue-600/5 to-transparent opacity-60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600/20 via-blue-500/20 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
};

export default function BentoGrid() {
  return (
    <section className="relative overflow-hidden bg-transparent py-14 sm:py-20 lg:py-24 text-zinc-200 selection:bg-blue-500/30 selection:text-white">
     
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 sm:mb-14 lg:mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-balance text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight"
          >
            AULTUM - All-in-One CRM & Automation Platform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mx-auto mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base text-zinc-400 leading-relaxed"
          >
            Replace scattered tools with one unified platform for sales,
            marketing, automation, and growth.
          </motion.p>
        </div>

        <motion.div
          variants={containerVar}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6"
        >
          <div className="col-span-1 md:col-span-2 xl:col-span-4">
            <InsetCard className="h-full">
              <div className="flex flex-col gap-6 lg:gap-8 xl:flex-row xl:items-start xl:justify-between">
                <div className="w-full xl:max-w-xl">
                  <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] sm:text-xs font-medium text-blue-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]">
                    <Layers className="h-3 w-3 shrink-0 text-blue-400" />
                    <span className="truncate">Platform Overview</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-blue-100 transition-colors">
                    What is AULTUM?
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    A centralized CRM and automation engine built for startups,
                    agencies, and high-performance sales teams.
                  </p>

                  <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                    {["Startups", "Agencies", "Sales Teams", "Services"].map(
                      (b) => (
                        <Badge key={b}>{b}</Badge>
                      )
                    )}
                  </div>
                </div>

                <div className="grid w-full gap-x-6 gap-y-3 sm:grid-cols-2 xl:max-w-2xl xl:flex-1">
                  {[
                    "Centralized CRM",
                    "Marketing automation",
                    "WhatsApp, Email and SMS",
                    "AI-ready workflows",
                    "White-label setup",
                    "Scalable access",
                  ].map((feat) => (
                    <CheckRow key={feat}>{feat}</CheckRow>
                  ))}
                </div>
              </div>
            </InsetCard>
          </div>

          <InsetCard>
            <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">
              Core CRM and Automation
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Track leads, pipelines, and follow-ups effortlessly.
            </p>

            <div className="mt-5 sm:mt-6 space-y-3">
              {[
                "Lead management",
                "Custom pipelines",
                "Tasks and reminders",
                "Basic automation",
                "Role-based access",
              ].map((f) => (
                <CheckRow key={f}>{f}</CheckRow>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 rounded-xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-3 text-center text-xs font-medium text-blue-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
              Never lose leads again.
            </div>
            <Price amount={9999} />
          </InsetCard>

          <InsetCard>
            <div className="absolute -right-10 -top-10 h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-blue-500/20 blur-[40px] sm:blur-[50px]" />

            <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-100 transition-colors pr-6">
              Marketing and Communication
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Capture and nurture leads without switching tools.
            </p>

            <div className="mt-5 sm:mt-6 space-y-3">
              {[
                "Landing pages",
                "Email automation",
                "WhatsApp and SMS",
                "Unified inbox",
                "Campaign tracking",
              ].map((f) => (
                <CheckRow key={f}>{f}</CheckRow>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 rounded-xl border border-white/10 bg-gradient-to-r from-violet-500/10 to-blue-500/10 p-3 text-center text-xs font-medium text-blue-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
              Replace multiple marketing tools.
            </div>
            <Price amount={14999} />
          </InsetCard>

          <InsetCard>
            <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">
              Advanced Automation and AI
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Designed for scale with advanced workflows.
            </p>

            <div className="mt-5 sm:mt-6 space-y-3">
              {[
                "Multi-step workflows",
                "AI-ready logic",
                "Lead scoring",
                "Advanced dashboards",
                "API access",
                "Integrations",
              ].map((f) => (
                <CheckRow key={f}>{f}</CheckRow>
              ))}
            </div>

            <Price amount={24999} />
          </InsetCard>

          <InsetCard>
            <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-100 transition-colors">
              White-Label and Branding
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Launch AULTUM under your own brand.
            </p>

            <div className="mt-5 sm:mt-6 space-y-3">
              {[
                "Custom domain",
                "Your branding",
                "Branded login",
                "Client access",
                "Reseller ready",
                "Agency friendly",
              ].map((f) => (
                <CheckRow key={f}>{f}</CheckRow>
              ))}
            </div>
            <div className="flex-1" />
          </InsetCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 sm:mt-20 lg:mt-24 text-center"
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-white">
            Why Choose AULTUM?
          </h3>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            One platform to reduce cost, simplify operations, and scale faster.
          </p>

          <div className="mx-auto mt-6 sm:mt-8 flex max-w-5xl flex-wrap justify-center gap-2.5 sm:gap-4">
            {[
              { text: "Replace multiple tools", icon: Layers },
              { text: "Lower operational cost", icon: IndianRupee },
              { text: "Faster execution", icon: Zap },
              { text: "Easy onboarding", icon: Headphones },
              { text: "Scales with growth", icon: TrendingUp },
            ].map(({ text, icon: Icon }) => (
              <motion.div
                key={text}
                whileHover={{ scale: 1.04 }}
                className="flex cursor-default items-center gap-2.5 sm:gap-3 rounded-full border border-white/10 bg-gradient-to-r from-violet-900/20 to-blue-900/20 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm text-zinc-300 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
              >
                <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/10 text-blue-200">
                  <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </span>
                <span className="whitespace-nowrap">{text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}