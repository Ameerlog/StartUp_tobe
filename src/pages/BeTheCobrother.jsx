import React, { useMemo, useRef, useState, useEffect } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

/* ─────────────────────────────────────────────
   VALIDATION
────────────────────────────────────────────── */
const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  whatsapp: z
    .string()
    .min(10, "Enter a valid WhatsApp number")
    .max(15, "Enter a valid WhatsApp number"),
  cityPincode: z.string().min(2, "City / Pincode is required"),
  topSkill: z.enum(["CRM", "AI Bots", "SaaS Setup"], {
    required_error: "Select a top skill",
  }),
  hasEquipment: z.boolean().default(false),
});

/* ─────────────────────────────────────────────
   MOTION
────────────────────────────────────────────── */
const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.07 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(3px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45 },
  },
};
const softIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
const glowPop = {
  hidden: { opacity: 0, scale: 0.82 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};
const cardIn = {
  hidden: { opacity: 0, y: 12, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

/* ─────────────────────────────────────────────
   MARQUEE
────────────────────────────────────────────── */
const MarqueeRow = ({ reverse = false, items = [], opacity = 0.22 }) => (
  <div className="relative overflow-hidden">
    <motion.div
      className="flex gap-3 whitespace-nowrap will-change-transform"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{
        duration: reverse ? 34 : 30,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{ opacity }}
    >
      {[...items, ...items].map((t, i) => (
        <div
          key={`${t}-${i}`}
          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] uppercase tracking-[0.28em] text-slate-200/90"
        >
          {t}
        </div>
      ))}
    </motion.div>
  </div>
);

/* ─────────────────────────────────────────────
   SHINE EFFECT
────────────────────────────────────────────── */
const Shine = () => (
  <motion.div
    aria-hidden
    className="pointer-events-none absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="absolute -left-[40%] top-0 h-full w-[50%]"
      animate={{ x: ["0%", "240%"] }}
      transition={{
        duration: 2.6,
        repeat: Infinity,
        ease: "linear",
        delay: 0.4,
      }}
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.13) 45%, transparent 90%)",
        transform: "skewX(-18deg)",
      }}
    />
  </motion.div>
);

/* ─────────────────────────────────────────────
   WELCOME MODAL
────────────────────────────────────────────── */
const WelcomeModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    style={{ backdropFilter: "blur(14px)", background: "rgba(5,5,8,0.82)" }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a0a10] shadow-[0_0_80px_rgba(137,46,255,0.3)] overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* top glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#892eff]/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative p-8">
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#892eff]/10 border border-[#892eff]/20 text-[#892eff] text-[10px] font-black uppercase tracking-[0.22em] mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#892eff] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#892eff]" />
          </span>
          Now open · India
        </div>

        <h2 className="text-white text-3xl font-black uppercase tracking-tight leading-[1.05]">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#892eff] to-[#00C3FF]">
            CoBrother Elite.
          </span>
        </h2>

        <p className="mt-4 text-slate-400 leading-relaxed">
          Small businesses in India are buying AI and SaaS—but{" "}
          <span className="text-slate-200 font-semibold">
            they can't install it
          </span>
          . You walk in, set it up, and take{" "}
          <span className="text-white font-black">upto 60%</span> of the setup
          fee. Zero wait time. Instant commission.
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { val: "60%", label: "Commission" },
            { val: "48h", label: "Onboarding" },
            { val: "∞", label: "Leads" },
          ].map(({ val, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center"
            >
              <p className="text-white text-xl font-black">{val}</p>
              <p className="text-slate-400 text-[10px] uppercase tracking-[0.22em] mt-0.5">
                {label}
              </p>
            </div>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden mt-6 w-full h-12 rounded-2xl bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white font-black uppercase tracking-widest shadow-[0_0_28px_rgba(137,46,255,0.5)]"
        >
          <Shine />
          Claim my territory →
        </motion.button>

        <p className="mt-3 text-center text-[11px] text-slate-500">
          Click anywhere outside to dismiss
        </p>
      </div>
    </motion.div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SECTION LABEL
────────────────────────────────────────────── */
const SectionLabel = ({ icon, kicker, title, desc }) => (
  <motion.div variants={fadeUp} className="flex items-start gap-4">
    <div className="w-11 h-11 rounded-2xl bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center shrink-0">
      <DynamicIcon name={icon} size={18} className="text-[#00C3FF]" />
    </div>
    <div className="min-w-0">
      <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.28em]">
        {kicker}
      </p>
      <p className="text-white text-xl sm:text-2xl font-black uppercase tracking-tight">
        {title}
      </p>
      {desc && (
        <p className="mt-1.5 text-slate-400 text-sm leading-relaxed">{desc}</p>
      )}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   DETAILS SECTION
────────────────────────────────────────────── */
const DetailsSection = () => {
  const cards = [
    {
      icon: "package",
      title: "What you install",
      color: "#892eff",
      items: [
        "Aultum CRM setup",
        "AI Social Bots integration",
        "Dashboard live + handover",
      ],
    },
    {
      icon: "store",
      title: "Who you help",
      color: "#892eff",
      items: [
        "Shops & local businesses",
        "Owners buying AI tools",
        "Teams needing setup support",
      ],
    },
    {
      icon: "sparkles",
      title: "What you get",
      color: "#892eff",
      items: [
        "Lead notifications by area",
        "Clear setup workflow",
        "Commission on go-live",
      ],
    },
    {
      icon: "map",
      title: "Territory logic",
      color: "#892eff",
      items: [
        "City / pincode based routing",
        "Skill-based matching",
        "Local-first opportunities",
      ],
    },
  ];

  const requirements = [
    { icon: "smartphone", text: "Phone + WhatsApp active" },
    { icon: "message-circle", text: "Basic communication skills" },
    { icon: "laptop", text: "Laptop/Tablet recommended" },
    { icon: "map-pin", text: "Willing to do on-site setup" },
  ];

  const flowSteps = [
    { title: "Lead Assigned", icon: "bell", color: "#892eff" },
    { title: "Setup CRM & AI Bots", icon: "settings", color: "#6366f1" },
    { title: "Dashboard Handover", icon: "monitor-check", color: "#00C3FF" },
    { title: "Go-Live", icon: "rocket", color: "#34d399" },
    { title: "Commission", icon: "badge-indian-rupee", color: "#f59e0b" },
  ];

  const faqs = [
    {
      q: "Do I need years of experience?",
      a: "No. Skill + execution mindset matters. Choose a top skill and start.",
    },
    {
      q: "When do I get paid?",
      a: "Commission clears when the integration goes live — post setup and dashboard handover.",
    },
    {
      q: "How will I receive leads?",
      a: "Based on your city/pincode and selected skill. You'll get a WhatsApp notification.",
    },
    {
      q: "Is there a joining fee?",
      a: "No joining fee. No hidden charges. You only earn — we take nothing upfront.",
    },
  ];

  return (
    <section className="mt-16 pt-14 border-t border-white/5">
      {/* ── Info cards ── */}
      <SectionLabel
        icon="sparkles"
        kicker="Details"
        title="Everything you should know"
        desc="Scannable details — anyone can understand the workflow in one visit."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-70px" }}
        className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {cards.map((c) => (
          <DetailCard
            key={c.title}
            icon={c.icon}
            title={c.title}
            items={c.items}
          />
        ))}
      </motion.div>

      {/* Requirements full-width */}
      <motion.div
        variants={cardIn}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-[#892eff]/12 border border-[#892eff]/20 flex items-center justify-center">
            <DynamicIcon
              name="shield-check"
              size={17}
              className="text-[#892eff]"
            />
          </div>
          <p className="text-white font-black uppercase tracking-tight">
            Requirements
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {requirements.map((r) => (
            <div
              key={r.text}
              className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
            >
              <div className="w-8 h-8 rounded-xl bg-[#892eff]/12 border border-[#892eff]/20 flex items-center justify-center shrink-0">
                <DynamicIcon
                  name={r.icon}
                  size={14}
                  className="text-[#892eff]"
                />
              </div>
              <p className="text-slate-300 text-sm font-semibold">{r.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── How it works ── */}
      <div className="mt-12">
        <SectionLabel
          icon="workflow"
          kicker="Flow"
          title="How it works"
          desc="From lead assignment to your commission — a simple, repeatable process."
        />

        <motion.div
          variants={softIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-7 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 sm:p-6 overflow-x-auto"
        >
          {/* Single clean row */}
          <div className="flex items-stretch gap-0 min-w-[620px]">
            {flowSteps.map((s, idx) => (
              <React.Fragment key={s.title}>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-4 flex flex-col items-center gap-2.5 text-center">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}35`,
                    }}
                  >
                    <DynamicIcon
                      name={s.icon}
                      size={18}
                      style={{ color: s.color }}
                    />
                  </div>
                  <p className="text-white text-xs font-black uppercase tracking-tight leading-snug">
                    {s.title}
                  </p>
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-0.5"
                    style={{
                      background: s.color,
                      boxShadow: `0 0 8px ${s.color}`,
                    }}
                  />
                </div>

                {idx !== flowSteps.length - 1 && (
                  <div className="flex items-center justify-center px-2 shrink-0">
                    <div className="flex items-center gap-1">
                      <div className="w-5 h-[1px] bg-white/15 rounded-full" />
                      <DynamicIcon
                        name="chevron-right"
                        size={14}
                        className="text-slate-400"
                      />
                      <div className="w-5 h-[1px] bg-white/15 rounded-full" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── FAQ ── */}
      <div className="mt-12">
        <SectionLabel
          icon="help-circle"
          kicker="FAQ"
          title="Quick answers"
          desc="Tap a question to expand instantly."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid grid-cols-1 gap-2.5"
        >
          {faqs.map((f) => (
            <AccordionItem key={f.q} q={f.q} a={f.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   PAGE
────────────────────────────────────────────── */
const BeTheCobrother = () => {
  const formRef = useRef(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      whatsapp: "",
      cityPincode: "",
      topSkill: "CRM",
      hasEquipment: false,
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const hasEquipment = watch("hasEquipment");

  const scrollToForm = () => {
    setShowWelcome(false);
    setTimeout(
      () =>
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      200,
    );
  };

  const onSubmit = async (values) => {
    try {
      setSubmitState({ status: "loading", message: "" });
      // await axios.post(`${import.meta.env.VITE_API_URL}/bethecobrother/claim`, values);
      await new Promise((r) => setTimeout(r, 900));
      setSubmitState({
        status: "success",
        message:
          "Territory claimed. We'll notify you when leads are ready in your area.",
      });
      reset(defaultValues);
    } catch (e) {
      setSubmitState({
        status: "error",
        message:
          e?.response?.data?.message || "Submit failed. Please try again.",
      });
    }
  };

  const marqueeA = [
    "UPTO 60% COMMISSION",
    "ZERO WAIT TIME",
    "LEAD ASSIGNED",
    "ON-SITE SETUP",
    "GO LIVE",
    "INSTANT CREDIT",
    "AULTUM CRM",
    "AI SOCIAL BOTS",
  ];
  const marqueeB = [
    "INDIA",
    "SMALL BUSINESSES",
    "AI + SAAS",
    "DEPLOYMENT",
    "DASHBOARD",
    "HANDOVER",
    "COMMISSION",
    "YOU WALK IN",
  ];

  return (
    <>
      {/* Welcome modal */}
      <AnimatePresence>
        {showWelcome && <WelcomeModal onClose={scrollToForm} />}
      </AnimatePresence>

      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="show"
        className="min-h-screen font-sans text-slate-100 bg-[#050508] relative overflow-x-hidden mt-20"
      >
        {/* Bg pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSI+PHBhdGggZD0iTTEzLjk5IDkuMjVsMTMgNy41djE1bC0xMyA3LjVMMSAzMS43NXYtMTVMMTMuOTkgOS4yNXpNMyAxNy45MXYxMi4xOGwxMC45OSA2LjM0IDExLTYuMzRWMTcuOTFMMTQgMTEuNTcgMyAxNy45MXoiIGZpbGw9IiM4OTJlZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />

        <motion.div
          variants={glowPop}
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
        >
          <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[1050px] h-[750px] bg-[#892eff]/14 blur-[170px] rounded-full" />
          <div className="absolute top-[8%] right-[-280px] w-[720px] h-[720px] bg-[#00C3FF]/12 blur-[180px] rounded-full" />
          <motion.div
            className="absolute top-[28%] left-[6%] w-[560px] h-[560px] rounded-full"
            animate={{ opacity: [0.1, 0.26, 0.1], y: [0, -18, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background:
                "radial-gradient(circle, rgba(137,46,255,0.28), transparent 62%)",
            }}
          />
        </motion.div>

        <div className="absolute inset-x-0 top-[120px] pointer-events-none z-[2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <MarqueeRow items={marqueeA} opacity={0.18} />
            <div className="h-4" />
            <MarqueeRow reverse items={marqueeB} opacity={0.12} />
          </div>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-24">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-[#892eff] rounded-xl flex items-center justify-center shadow-[0_0_18px_rgba(137,46,255,0.6)] shrink-0">
                <DynamicIcon name="network" color="white" size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-white font-black tracking-tight uppercase leading-none truncate">
                  CoBrother Elite
                </p>
                <p className="text-slate-400 text-xs uppercase tracking-[0.22em] truncate">
                  Setup • Deploy • Get paid
                </p>
              </div>
            </div>
            <a
              href="/"
              className="text-slate-300 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors"
            >
              ← Home
            </a>
          </motion.div>

          {/* ── Hero / Form 2-col grid ── */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
            {/* LEFT — hero content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#892eff]/10 border border-[#892eff]/20 text-[#892eff] text-[10px] font-black uppercase tracking-[0.2em] w-fit"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#892eff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#892eff]" />
                </span>
                Now open · Upto 60% commission
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-white text-4xl sm:text-5xl md:text-[58px] font-black leading-[1.02] tracking-tighter uppercase"
                style={{ textShadow: "0 0 40px rgba(137,46,255,0.28)" }}
              >
                Join the{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg,#892eff,#00C3FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  CoBrother Elite.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-slate-300/90 text-base md:text-lg max-w-xl leading-relaxed"
              >
                Small businesses in India are buying{" "}
                <strong className="text-white">AI and SaaS</strong>, but can't
                install it. We provide the software —{" "}
                <strong className="text-white">
                  you provide the deployment
                </strong>{" "}
                and earn up to 60%.
              </motion.p>

              {/* Stat strip */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
                {[
                  { val: "60%", label: "Commission" },
                  { val: "48h", label: "Onboarding" },
                  { val: "₹0", label: "Joining fee" },
                ].map(({ val, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/5 py-4 text-center"
                  >
                    <p className="text-white text-2xl font-black">{val}</p>
                    <p className="text-slate-400 text-[10px] uppercase tracking-[0.22em] mt-0.5">
                      {label}
                    </p>
                  </div>
                ))}
              </motion.div>

              <motion.button
                variants={fadeUp}
                type="button"
                onClick={() =>
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden h-12 px-6 rounded-2xl bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white font-black uppercase tracking-widest shadow-[0_0_34px_rgba(137,46,255,0.4)] w-fit"
              >
                <Shine />
                APPLY TO BE A COBROTHER →
              </motion.button>

              {/* Vertical timeline workflow */}
              <motion.div
                variants={softIn}
                className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6"
              >
                <p className="text-white font-black uppercase tracking-widest text-xs mb-6">
                  The <span className="text-[#00C3FF]">"CoBrother"</span>{" "}
                  Workflow
                </p>
                <div className="flex flex-col">
                  {[
                    {
                      icon: "bell",
                      title: "Claim a Lead",
                      desc: "Get notified of a business in your area ready for AI.",
                      color: "#892eff",
                      step: "01",
                    },
                    {
                      icon: "map-pin",
                      title: "On-Site Setup",
                      desc: "Visit the shop. Install Aultum CRM and AI Social Bots.",
                      color: "#6366f1",
                      step: "02",
                    },
                    {
                      icon: "monitor-check",
                      title: "Dashboard Handover",
                      desc: "Walk the owner through their new live dashboard.",
                      color: "#0ea5e9",
                      step: "03",
                    },
                    {
                      icon: "badge-indian-rupee",
                      title: "Instant Commission",
                      desc: "Your 60% commission clears the moment integration goes live.",
                      color: "#00C3FF",
                      step: "04",
                    },
                  ].map((c, i, arr) => (
                    <div key={c.title} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0 w-10">
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            background: `${c.color}18`,
                            border: `1.5px solid ${c.color}44`,
                          }}
                        >
                          <DynamicIcon
                            name={c.icon}
                            size={17}
                            style={{ color: c.color }}
                          />
                        </div>
                        {i < arr.length - 1 && (
                          <div
                            className="w-[2px] my-2 flex-1 min-h-[20px]"
                            style={{
                              background: `linear-gradient(to bottom, ${c.color}60, ${arr[i + 1].color}30)`,
                            }}
                          />
                        )}
                      </div>
                      <div
                        className={`pt-1 min-w-0 ${i < arr.length - 1 ? "pb-4" : "pb-0"}`}
                      >
                        <p
                          className="text-[10px] font-black tracking-[0.2em] uppercase"
                          style={{ color: c.color }}
                        >
                          Step {c.step}
                        </p>
                        <p className="text-white font-black text-sm mt-0.5">
                          {c.title}
                        </p>
                        <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                          {c.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — sticky form */}
            <div ref={formRef} className="lg:col-span-5 scroll-mt-24">
              <div className="lg:sticky lg:top-6 flex flex-col gap-4">
                {/* Form card */}
                <motion.div
                  variants={softIn}
                  className="rounded-3xl border border-[#892eff]/20 bg-[#0a0a12] shadow-[0_0_80px_rgba(137,46,255,0.18)] overflow-hidden"
                >
                  {/* Form header gradient bar */}
                  <div className="h-1 bg-gradient-to-r from-[#892eff] via-[#6366f1] to-[#00C3FF]" />

                  <div className="p-6 border-b border-white/8">
                    <p className="text-white font-black uppercase tracking-widest text-sm">
                      Claim your territory
                    </p>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      Fill once — we route leads to you by area &amp; skill.{" "}
                      <span className="text-red-400 font-black">*</span>{" "}
                      required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                    <div className="flex flex-col gap-4">
                      <Field
                        label="Full Name"
                        required
                        error={errors.fullName?.message}
                      >
                        <input
                          {...register("fullName")}
                          className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#892eff]/60 focus:ring-1 focus:ring-[#892eff]/40 transition-colors"
                          placeholder="Your full name"
                        />
                      </Field>

                      <Field
                        label="WhatsApp"
                        required
                        error={errors.whatsapp?.message}
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-11 px-3 rounded-xl border border-white/10 bg-white/5 flex items-center text-slate-300 text-sm font-bold shrink-0">
                            +91
                          </div>
                          <input
                            {...register("whatsapp")}
                            className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00C3FF]/60 focus:ring-1 focus:ring-[#00C3FF]/40 transition-colors"
                            placeholder="WhatsApp number"
                          />
                        </div>
                      </Field>

                      <Field
                        label="City / Pincode"
                        required
                        error={errors.cityPincode?.message}
                      >
                        <input
                          {...register("cityPincode")}
                          className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#892eff]/60 focus:ring-1 focus:ring-[#892eff]/40 transition-colors"
                          placeholder="Hubballi / 5800xx"
                        />
                      </Field>

                      <Field
                        label="Top Skill"
                        required
                        error={errors.topSkill?.message}
                      >
                        <select
                          {...register("topSkill")}
                          className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-white focus:outline-none focus:border-[#00C3FF]/60 focus:ring-1 focus:ring-[#00C3FF]/40 transition-colors"
                        >
                          <option className="bg-[#0a0a12]" value="CRM">
                            CRM Setup
                          </option>
                          <option className="bg-[#0a0a12]" value="AI Bots">
                            AI Social Bots
                          </option>
                          <option className="bg-[#0a0a12]" value="SaaS Setup">
                            SaaS Setup
                          </option>
                        </select>
                      </Field>

                      {/* Equipment toggle */}
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center">
                              <DynamicIcon
                                name={hasEquipment ? "laptop" : "tablet"}
                                size={16}
                                className="text-[#00C3FF]"
                              />
                            </div>
                            <div>
                              <p className="text-white font-semibold text-sm">
                                Equipment
                              </p>
                              <p className="text-slate-500 text-xs">
                                Laptop / Tablet available
                              </p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer select-none">
                            <input
                              type="checkbox"
                              {...register("hasEquipment")}
                              className="sr-only peer"
                            />
                            <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10 peer-checked:bg-[#892eff]/30 peer-checked:border-[#892eff]/50 transition-colors duration-200" />
                            <div className="absolute left-[3px] top-[3px] w-[22px] h-[22px] rounded-full bg-white/80 shadow-sm transition-transform duration-200 peer-checked:translate-x-5" />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <motion.button
                        type="submit"
                        disabled={
                          isSubmitting || submitState.status === "loading"
                        }
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        className="relative overflow-hidden w-full h-12 rounded-2xl bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white font-black uppercase tracking-widest shadow-[0_0_34px_rgba(137,46,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        <Shine />
                        {submitState.status === "loading"
                          ? "Submitting…"
                          : "START EARNING 60% →"}
                      </motion.button>

                      <AnimatePresence mode="wait">
                        {submitState.status !== "idle" &&
                          submitState.status !== "loading" && (
                            <motion.div
                              key={submitState.status}
                              initial={{ opacity: 0, y: -6, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -6, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-3"
                            >
                              {submitState.status === "success" && (
                                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200 flex items-start gap-3">
                                  <DynamicIcon
                                    name="check"
                                    size={16}
                                    className="mt-0.5 shrink-0"
                                  />
                                  <div>
                                    <p className="font-black text-xs uppercase tracking-wide">
                                      Territory Claimed!
                                    </p>
                                    <p className="opacity-90 text-xs mt-0.5">
                                      {submitState.message}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {submitState.status === "error" && (
                                <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200 flex items-start gap-3">
                                  <DynamicIcon
                                    name="alert-circle"
                                    size={16}
                                    className="mt-0.5 shrink-0"
                                  />
                                  <div>
                                    <p className="font-black text-xs uppercase tracking-wide">
                                      Error
                                    </p>
                                    <p className="opacity-90 text-xs mt-0.5">
                                      {submitState.message}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                      </AnimatePresence>

                      <p className="mt-3 text-[11px] text-slate-600 leading-relaxed text-center">
                        No spam · No joining fee · Get matched within 48h
                      </p>
                    </div>
                  </form>
                </motion.div>

                {/* Trust badges */}
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-2 gap-3"
                >
                  <TrustBadge icon="timer" text="Zero wait time" />
                  <TrustBadge icon="badge-percent" text="Upto 60% cut" />
                  <TrustBadge icon="shield-check" text="No joining fee" />
                  <TrustBadge icon="map-pin" text="Local territory" />
                </motion.div>

                {/* Quote */}
                <motion.div
                  variants={softIn}
                  className="rounded-2xl border border-white/8 bg-black/30 p-4"
                >
                  <div className="flex items-start gap-3">
                    <DynamicIcon
                      name="quote"
                      size={16}
                      className="text-[#892eff] shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-slate-200 font-semibold text-sm leading-relaxed">
                        "Smart hustlers don't chase — they build engines."
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        This form is your doorway into that engine.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Full-width Details / FAQ below the grid ── */}
          <DetailsSection />
        </main>
      </motion.div>
    </>
  );
};

/* ─────────────────────────────────────────────
   COMPONENTS
────────────────────────────────────────────── */
const DetailCard = ({ icon, title, items }) => (
  <motion.div
    variants={cardIn}
    whileHover={{ y: -2 }}
    className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
  >
    <div className="flex items-start gap-3">
      <div className="w-11 h-11 rounded-2xl bg-[#892eff]/12 border border-[#892eff]/20 flex items-center justify-center shrink-0">
        <DynamicIcon name={icon} size={18} className="text-[#892eff]" />
      </div>
      <div className="min-w-0">
        <p className="text-white font-black uppercase tracking-tight">
          {title}
        </p>
        <div className="mt-3 space-y-2">
          {items.map((p) => (
            <div key={p} className="flex items-start gap-2">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#00C3FF] shrink-0" />
              <p className="text-slate-300 text-sm leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const AccordionItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={cardIn}
      className="rounded-2xl border border-white/10 bg-black/20 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-white/3 transition-colors duration-150"
      >
        <p className="text-white font-black text-sm">{q}</p>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="shrink-0"
        >
          <DynamicIcon
            name="chevron-down"
            size={17}
            className="text-slate-300"
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-4 pt-0">
              <div className="border-t border-white/5 pt-3 text-slate-400 text-sm leading-relaxed">
                {a}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TrustBadge = ({ icon, text }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center gap-3">
    <div className="w-8 h-8 rounded-xl bg-[#892eff]/12 border border-[#892eff]/20 flex items-center justify-center shrink-0">
      <DynamicIcon name={icon} size={14} className="text-[#892eff]" />
    </div>
    <p className="text-slate-300 text-xs font-semibold">{text}</p>
  </div>
);

const Field = ({ label, required = false, error, children }) => (
  <div>
    <div className="flex items-center justify-between gap-4">
      <label className="text-slate-300 text-sm font-semibold">
        {label} {required && <span className="text-red-400 font-black">*</span>}
      </label>
      {error && <span className="text-[11px] text-orange-300">{error}</span>}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

export default BeTheCobrother;
