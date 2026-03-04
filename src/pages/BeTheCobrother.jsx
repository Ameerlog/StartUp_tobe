import React, { useMemo, useRef, useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

/* ─────────────────────────────────────────────
   Validation
────────────────────────────────────────────── */
const urlOptional = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine(
    (val) => !val || /^https?:\/\/.+/i.test(val),
    "Must be a valid URL (https://...)",
  );

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  location: z.string().min(2, "Location is required"),
  primarySkill: z.string().min(2, "Primary skill is required"),
  level: z.enum(["Student", "Junior", "Mid", "Senior", "Freelancer"], {
    required_error: "Select your level",
  }),

  education: z.string().min(2, "Education is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),

  hasLaptop: z.boolean().default(false),

  portfolio: urlOptional,
  linkedIn: urlOptional,
  github: urlOptional,

  notes: z.string().optional().or(z.literal("")),
});

/* ─────────────────────────────────────────────
   Motion presets
────────────────────────────────────────────── */
const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 4, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const softIn = {
  hidden: { opacity: 0, scale: 0.985 },
  show: { opacity: 1, scale: 1 },
};

const glowPop = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const MarqueeRow = ({ reverse = false, items = [], opacity = 0.22 }) => {
  const duration = reverse ? 32 : 28;

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3 whitespace-nowrap will-change-transform"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ opacity }}
      >
        {[...items, ...items].map((t, idx) => (
          <div
            key={`${t}-${idx}`}
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] uppercase tracking-[0.28em] text-slate-200/90"
          >
            {t}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Page
────────────────────────────────────────────── */
const BetheCobrotherpage = () => {
  const formRef = useRef(null);

  const [submitState, setSubmitState] = useState({
    status: "idle", // idle | loading | success | error
    message: "",
  });

  const defaultValues = useMemo(
    () => ({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      primarySkill: "",
      level: "Junior",
      education: "",
      city: "",
      state: "",
      hasLaptop: false,
      portfolio: "",
      linkedIn: "",
      github: "",
      notes: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const hasLaptop = watch("hasLaptop");

  const onSubmit = async (values) => {
    try {
      setSubmitState({ status: "loading", message: "" });

      // TODO: Replace with your backend endpoint
      // Example:
      // await axios.post(`${import.meta.env.VITE_API_URL}/bethecobrother/apply`, values);
      await new Promise((r) => setTimeout(r, 900));

      setSubmitState({
        status: "success",
        message: "Application received. We’ll reach out shortly.",
      });
      reset(defaultValues);
    } catch (e) {
      setSubmitState({
        status: "error",
        message:
          e?.response?.data?.message ||
          "Submit failed. Please try again in a moment.",
      });
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const marqueeA = [
    "Automation",
    "React",
    "Spring Boot",
    "MongoDB",
    "AI Ops",
    "SaaS Launch",
    "Funnels",
    "CRM",
    "Workflows",
    "Deploy",
    "Retainers",
    "Performance",
  ];

  const marqueeB = [
    "Onboarding",
    "Deliverables",
    "Playbooks",
    "Templates",
    "Paid Projects",
    "Quality Bar",
    "Support Stack",
    "Community",
    "Execution",
    "Velocity",
    "Outcomes",
    "Trust",
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      className="min-h-screen font-sans text-slate-100 bg-[#050508] relative overflow-x-hidden mt-20"
    >
      {/* Background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSI+PHBhdGggZD0iTTEzLjk5IDkuMjVsMTMgNy41djE1bC0xMyA3LjVMMSAzMS43NXYtMTVMMTMuOTkgOS4yNXpNMyAxNy45MXYxMi4xOGwxMC45OSA2LjM0IDExLTYuMzRWMTcuOTFMMTQgMTEuNTcgMyAxNy45MXoiIGZpbGw9IiM4OTJlZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>

      {/* Cinematic entry glow burst */}
      <motion.div
        variants={glowPop}
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      >
        <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#892eff]/12 blur-[160px] rounded-full" />
        <div className="absolute top-[10%] right-[-280px] w-[700px] h-[700px] bg-[#00C3FF]/10 blur-[170px] rounded-full" />
        <motion.div
          className="absolute top-[30%] left-[10%] w-[460px] h-[460px] rounded-full"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            transform: [
              "translateY(0px)",
              "translateY(-18px)",
              "translateY(0px)",
            ],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(137,46,255,0.22), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Background marquee */}
      <div className="absolute inset-x-0 top-[120px] pointer-events-none z-[2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MarqueeRow items={marqueeA} opacity={0.18} />
          <div className="h-4" />
          <MarqueeRow reverse items={marqueeB} opacity={0.14} />
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-24">
        {/* Top bar */}
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
                Build engines. Ship fast.
              </p>
            </div>
          </div>

          <a
            href="/"
            className="text-slate-300 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors"
          >
            Back to home
          </a>
        </motion.div>

        {/* Hero + Form grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left */}
          <div className="lg:col-span-7">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#892eff]/10 border border-[#892eff]/20 text-[#892eff] text-[10px] font-black uppercase tracking-[0.2em]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#892eff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#892eff]"></span>
              </span>
              Now accepting elite applicants
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tighter uppercase"
            >
              Be the tech that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#892eff] to-[#00C3FF]">
                reaches every doorstep.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-slate-400 text-base md:text-xl max-w-2xl leading-relaxed font-medium"
            >
              Join CoBrother Elite to help businesses automate, launch, and
              scale. You bring the skill. We bring the workflow, leads, and the
              stack.
            </motion.p>

            {/* CTA */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <motion.button
                type="button"
                onClick={scrollToForm}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="h-12 px-6 rounded-2xl bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white font-black uppercase tracking-widest shadow-[0_0_26px_rgba(137,46,255,0.35)]"
              >
                Apply now
              </motion.button>

              <motion.div
                whileHover={{ y: -1 }}
                className="h-12 px-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center">
                  <DynamicIcon
                    name="badge-check"
                    size={16}
                    className="text-[#00C3FF]"
                  />
                </div>
                <p className="text-slate-300 text-sm font-semibold">
                  Quality-first network. Real outcomes.
                </p>
              </motion.div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              variants={fadeUp}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
            >
              <Benefit
                icon="shield-check"
                title="Verified workflow"
                desc="A repeatable system to onboard, automate, and deliver."
              />
              <Benefit
                icon="zap"
                title="Fast execution"
                desc="Ship in days with templates + automation playbooks."
              />
              <Benefit
                icon="trending-up"
                title="Earn & grow"
                desc="Projects, retainers, and performance-based upgrades."
              />
              <Benefit
                icon="globe"
                title="Network effect"
                desc="Collaborate with other CoBrothers across domains."
              />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
            >
              <Stat value="48h" label="Onboarding" />
              <Stat value="1–3w" label="First payout" />
              <Stat value="∞" label="Growth loop" />
              <Stat value="24/7" label="Support stack" />
            </motion.div>

            {/* What you'll do */}
            <motion.div
              variants={softIn}
              className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#892eff]/15 border border-[#892eff]/25 flex items-center justify-center">
                  <DynamicIcon
                    name="sparkles"
                    size={18}
                    className="text-[#892eff]"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-bold">What you’ll do</p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Chip icon="workflow" text="Build automations & systems" />
                    <Chip icon="layers" text="Ship landing pages & MVPs" />
                    <Chip icon="database" text="Connect data + dashboards" />
                    <Chip icon="shield" text="Improve reliability & ops" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={softIn}
              className="mt-6 p-6 rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#892eff]/15 border border-[#892eff]/25 flex items-center justify-center">
                  <DynamicIcon
                    name="quote"
                    size={18}
                    className="text-[#892eff]"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold leading-relaxed">
                    “Smart hustlers don’t chase — they build engines.”
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    This page is your application doorway into that engine.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <div
            ref={formRef}
            className="lg:col-span-5 lg:sticky lg:top-6 scroll-mt-24"
          >
            <motion.div
              variants={softIn}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_60px_rgba(137,46,255,0.15)] overflow-hidden"
            >
              <div className="p-6 sm:p-7 border-b border-white/10">
                <p className="text-white font-black uppercase tracking-widest text-sm">
                  Application form
                </p>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Required fields are marked with a{" "}
                  <span className="text-red-400 font-black">*</span>.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-7">
                <div className="grid grid-cols-1 gap-4">
                  <Field
                    label="Full name"
                    required
                    error={errors.fullName?.message}
                  >
                    <input
                      {...register("fullName")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#892eff]/50"
                      placeholder="Your name"
                    />
                  </Field>

                  <Field label="Email" required error={errors.email?.message}>
                    <input
                      {...register("email")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]/40"
                      placeholder="you@email.com"
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Phone" required error={errors.phone?.message}>
                      <input
                        {...register("phone")}
                        className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#892eff]/50"
                        placeholder="10 digit number"
                      />
                    </Field>

                    <Field
                      label="Location"
                      required
                      error={errors.location?.message}
                    >
                      <input
                        {...register("location")}
                        className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#892eff]/50"
                        placeholder="Area / Locality"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="City" required error={errors.city?.message}>
                      <input
                        {...register("city")}
                        className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#892eff]/50"
                        placeholder="Hubballi"
                      />
                    </Field>

                    <Field label="State" required error={errors.state?.message}>
                      <input
                        {...register("state")}
                        className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#892eff]/50"
                        placeholder="Karnataka"
                      />
                    </Field>
                  </div>

                  <Field
                    label="Primary skill"
                    required
                    error={errors.primarySkill?.message}
                  >
                    <input
                      {...register("primarySkill")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]/40"
                      placeholder="React, Spring Boot, UI/UX, Automation…"
                    />
                  </Field>

                  <Field label="Level" required error={errors.level?.message}>
                    <select
                      {...register("level")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#892eff]/50"
                    >
                      <option className="bg-black" value="Student">
                        Student
                      </option>
                      <option className="bg-black" value="Junior">
                        Junior
                      </option>
                      <option className="bg-black" value="Mid">
                        Mid
                      </option>
                      <option className="bg-black" value="Senior">
                        Senior
                      </option>
                      <option className="bg-black" value="Freelancer">
                        Freelancer
                      </option>
                    </select>
                  </Field>

                  <Field
                    label="Education"
                    required
                    error={errors.education?.message}
                  >
                    <input
                      {...register("education")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]/40"
                      placeholder="BSc / BE / MSc / Diploma…"
                    />
                  </Field>

                  {/* Laptop - designed toggle */}
                  <motion.div
                    whileHover={{ y: -1 }}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#00C3FF]/10 border border-[#00C3FF]/20 flex items-center justify-center">
                          <DynamicIcon
                            name={hasLaptop ? "laptop" : "laptop-minimal"}
                            size={18}
                            className="text-[#00C3FF]"
                          />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">
                            Laptop available?
                          </p>
                          <p className="text-slate-400 text-xs">
                            Helps you deliver faster & handle automation work.
                          </p>
                        </div>
                      </div>

                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          {...register("hasLaptop")}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 rounded-full bg-white/10 border border-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#892eff]/40 peer-checked:bg-[#892eff]/25 peer-checked:border-[#892eff]/40 transition-colors" />
                        <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white/70 backdrop-blur-md shadow-md transition-transform peer-checked:translate-x-6" />
                      </label>
                    </div>
                  </motion.div>

                  {/* Optional links */}
                  <Field label="LinkedIn URL" error={errors.linkedIn?.message}>
                    <input
                      {...register("linkedIn")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]/40"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </Field>

                  <Field label="GitHub URL" error={errors.github?.message}>
                    <input
                      {...register("github")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]/40"
                      placeholder="https://github.com/..."
                    />
                  </Field>

                  <Field
                    label="Portfolio URL"
                    error={errors.portfolio?.message}
                  >
                    <input
                      {...register("portfolio")}
                      className="w-full h-11 rounded-xl bg-black/30 border border-white/10 px-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]/40"
                      placeholder="https://your-portfolio.com"
                    />
                  </Field>

                  <Field
                    label="Anything we should know?"
                    error={errors.notes?.message}
                  >
                    <textarea
                      {...register("notes")}
                      rows={4}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#892eff]/50 resize-none"
                      placeholder="Availability, preferred projects, tools you love…"
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || submitState.status === "loading"}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white font-black uppercase tracking-widest shadow-[0_0_26px_rgba(137,46,255,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitState.status === "loading"
                      ? "Submitting…"
                      : "Apply now"}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {submitState.status !== "idle" &&
                      submitState.status !== "loading" && (
                        <motion.div
                          key={submitState.status}
                          initial={{ opacity: 0, y: -8, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: "auto" }}
                          exit={{ opacity: 0, y: -8, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden mt-4"
                        >
                          {submitState.status === "success" && (
                            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200 flex items-start gap-3">
                              <DynamicIcon
                                name="check"
                                size={18}
                                className="mt-0.5"
                              />
                              <div>
                                <p className="font-semibold">Success</p>
                                <p className="opacity-90">
                                  {submitState.message}
                                </p>
                              </div>
                            </div>
                          )}

                          {submitState.status === "error" && (
                            <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200 flex items-start gap-3">
                              <DynamicIcon
                                name="alert-circle"
                                size={18}
                                className="mt-0.5"
                              />
                              <div>
                                <p className="font-semibold">Error</p>
                                <p className="opacity-90">
                                  {submitState.message}
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                  </AnimatePresence>

                  <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
                    By applying, you agree to be contacted about onboarding and
                    projects. No spam.
                  </p>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 grid grid-cols-2 gap-4"
            >
              <MiniBadge icon="sparkles" text="Automation-first" />
              <MiniBadge icon="timer" text="Fast onboarding" />
            </motion.div>
          </div>
        </div>

        {/* How you earn — Premium Section */}
        <section className="mt-10 relative">
          {/* Section glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#892eff]/8 blur-[130px] rounded-full" />

          {/* Header */}
          <div className="border-t border-white/5 pt-16">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-5"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#892eff]/15 to-[#00C3FF]/10 border border-[#892eff]/25">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#892eff] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#892eff]" />
                </span>
                <span className="text-[#892eff] text-[10px] font-black uppercase tracking-[0.28em]">
                  Your earning journey
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[1.05]"
              style={{
                color: "#ffffff",
                textShadow: "0 0 40px rgba(137,46,255,0.5)",
              }}
            >
              How You{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #892eff, #00C3FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Earn
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-slate-400 text-sm font-black uppercase tracking-[0.22em]"
            >
              Apply → Onboard → Deliver → Earn
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              Four clear steps from application to first payout. You bring the
              skill — we bring the workflow, the leads, and the stack.
            </motion.p>
          </div>

          {/* Cards grid with arrows */}
          <div className="mt-10 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row items-stretch gap-0 relative">
            <HowCard
              step="01"
              icon="fingerprint"
              title="Apply"
              accent="#892eff"
              accentSecond="#a855f7"
              desc="Submit your profile — skill, city, and availability. Takes under 3 minutes."
              bullets={[
                "No experience barrier",
                "Any skill level welcome",
                "Instant confirmation",
              ]}
            />
            {/* Arrow 1→2 */}
            <div className="hidden lg:flex items-center justify-center px-1 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#892eff]/20 to-[#6366f1]/20 border border-white/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M8 4l3 3-3 3"
                      stroke="#a78bfa"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <HowCard
              step="02"
              icon="rocket"
              title="Onboard"
              accent="#6366f1"
              accentSecond="#818cf8"
              desc="Unlock your playbook kit, automation templates, and your first project match."
              bullets={[
                "48-hour onboarding",
                "Proven templates",
                "Dedicated intro call",
              ]}
            />
            {/* Arrow 2→3 */}
            <div className="hidden lg:flex items-center justify-center px-1 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#0ea5e9]/20 border border-white/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M8 4l3 3-3 3"
                      stroke="#818cf8"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <HowCard
              step="03"
              icon="cpu"
              title="Deliver"
              accent="#0ea5e9"
              accentSecond="#38bdf8"
              desc="Execute automation builds, landing pages, CRM setups, or growth systems."
              bullets={[
                "Quality-reviewed output",
                "Peer support network",
                "Rapid iteration cycle",
              ]}
            />
            {/* Arrow 3→4 */}
            <div className="hidden lg:flex items-center justify-center px-1 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0ea5e9]/20 to-[#00C3FF]/20 border border-white/10 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7h8M8 4l3 3-3 3"
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <HowCard
              step="04"
              icon="badge-indian-rupee"
              title="Earn"
              accent="#00C3FF"
              accentSecond="#34d399"
              desc="Get paid per project or on retainer. Performance unlocks higher tiers."
              bullets={[
                "First payout in 1–3 weeks",
                "Retainer upgrades",
                "Unlimited growth",
              ]}
            />
          </div>

          {/* Bottom CTA strip */}
          <motion.div
            variants={fadeUp}
            className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-r from-[#892eff]/10 via-black/30 to-[#00C3FF]/10 backdrop-blur-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-white font-black text-xl uppercase tracking-tight">
                Ready to start earning?
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Join the network. First project match in under 48 hours.
              </p>
            </div>
            <motion.button
              type="button"
              onClick={scrollToForm}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 h-12 px-8 rounded-2xl bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white font-black uppercase tracking-widest shadow-[0_0_30px_rgba(137,46,255,0.4)] whitespace-nowrap"
            >
              Apply now →
            </motion.button>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Components
────────────────────────────────────────────── */
const Benefit = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 hover:border-[#892eff]/30 transition-colors"
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#892eff]/12 border border-[#892eff]/20 flex items-center justify-center">
        <DynamicIcon name={icon} size={18} className="text-[#892eff]" />
      </div>
      <div>
        <p className="text-white font-bold">{title}</p>
        <p className="text-slate-400 text-sm mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const Stat = ({ value, label }) => (
  <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
    <p className="text-white text-2xl font-black tracking-tight">{value}</p>
    <p className="text-slate-400 text-xs uppercase tracking-[0.22em] mt-1">
      {label}
    </p>
  </div>
);

const HowCard = ({
  step,
  icon,
  title,
  desc,
  bullets = [],
  accent = "#892eff",
  accentSecond = "#00C3FF",
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative group rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 overflow-hidden cursor-default"
      style={{
        boxShadow: hovered
          ? `0 0 40px ${accent}28, 0 8px 32px rgba(0,0,0,0.5)`
          : "0 4px 24px rgba(0,0,0,0.3)",
        borderColor: hovered ? `${accent}44` : undefined,
        transition: "box-shadow 0.35s ease, border-color 0.35s ease",
      }}
    >
      {/* Card background glow */}
      <div
        className="absolute inset-0 rounded-3xl group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${accent}14 0%, transparent 65%)`,
        }}
      />

      {/* Step + Icon row */}
      <div className="relative flex items-start justify-between mb-5">
        {/* Large icon container */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${accent}22, ${accentSecond}18)`,
            border: `1.5px solid ${accent}35`,
            boxShadow: hovered
              ? `0 0 22px ${accent}40`
              : `0 0 10px ${accent}20`,
            transition: "box-shadow 0.35s ease",
          }}
        >
          {/* Icon inner glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${accent}28, transparent 70%)`,
            }}
          />
          <DynamicIcon
            name={icon}
            size={24}
            style={{
              color: accent,
              filter: hovered ? `drop-shadow(0 0 8px ${accent})` : "none",
              transition: "filter 0.3s",
            }}
          />
        </div>

        {/* Step badge */}
        <div
          className="flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-black tracking-[0.15em]"
          style={{
            background: `linear-gradient(135deg, ${accent}30, ${accentSecond}20)`,
            border: `1px solid ${accent}40`,
            color: accent,
          }}
        >
          {step}
        </div>
      </div>

      {/* Title */}
      <p
        className="text-white text-lg font-black uppercase tracking-tight mb-2"
        style={{
          textShadow: hovered ? `0 0 20px ${accent}60` : "none",
          transition: "text-shadow 0.35s",
        }}
      >
        {title}
      </p>

      {/* Desc */}
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-center gap-2 text-xs text-slate-300"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: accent, boxShadow: `0 0 6px ${accent}` }}
              />
              {b}
            </li>
          ))}
        </ul>
      )}

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, ${accent}, ${accentSecond})`,
        }}
      />
    </motion.div>
  );
};

const MiniBadge = ({ icon, text }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 flex items-center gap-3">
    <div className="w-9 h-9 rounded-xl bg-[#892eff]/12 border border-[#892eff]/20 flex items-center justify-center">
      <DynamicIcon name={icon} size={16} className="text-[#892eff]" />
    </div>
    <p className="text-slate-300 text-sm font-semibold">{text}</p>
  </div>
);

const Field = ({ label, required = false, error, children }) => (
  <div>
    <div className="flex items-center justify-between gap-4">
      <label className="text-slate-300 text-sm font-semibold">
        {label}{" "}
        {required ? <span className="text-red-400 font-black">*</span> : null}
      </label>
      {error ? (
        <span className="text-[11px] text-orange-300">{error}</span>
      ) : null}
    </div>
    <div className="mt-2">{children}</div>
  </div>
);

const Chip = ({ icon, text }) => (
  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
    <DynamicIcon name={icon} size={14} className="text-slate-200/90" />
    <span className="text-slate-300 text-xs font-semibold">{text}</span>
  </div>
);

export default BetheCobrotherpage;
