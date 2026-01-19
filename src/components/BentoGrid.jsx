import { motion } from "framer-motion";
import { useEffect, useState } from "react";import {
  Layers,
  IndianRupee,
  Zap,
  Headphones,
  TrendingUp,
} from "lucide-react";


function useIsSmall() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setIsSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return isSmall;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ------------------ UI Helpers ------------------ */
function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "relative rounded-2xl border border-black/10 bg-white",
        "shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
        "transition-shadow hover:shadow-[0_28px_70px_rgba(0,0,0,0.14)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Title({ children }) {
  return <h3 className="text-base font-extrabold text-black">{children}</h3>;
}

function Muted({ children }) {
  return <p className="text-sm leading-relaxed text-black/60">{children}</p>;
}

function CheckRow({ children }) {
  return (
    <div className="flex items-start gap-2 text-sm text-black/70">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
        ✓
      </span>
      <span>{children}</span>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/60">
      {children}
    </span>
  );
}

/* ------------------ Main Component ------------------ */
export default function BentoGrid() {
  const isSmall = useIsSmall();

  return (
    <section className="bg-[#F6F6FB] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ---------- Header ---------- */}
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-6xl">
            AULTUM – All-in-One CRM & Automation Platform
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base text-black/60">
            AULTUM replaces multiple tools with one powerful system to manage
            marketing, sales, communication, and operations — from lead capture
            to customer retention.
          </p>
        </div>

        {/* ---------- Grid ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isSmall ? "show" : undefined}
          whileInView={isSmall ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-12 gap-4"
        >
          {/* 1. Overview */}
          <motion.div variants={item} className="col-span-12 lg:col-span-6">
            <Card className="p-6">
              <Title>What is AULTUM?</Title>
              <Muted className="mt-3">
                AULTUM is a centralized CRM and automation platform designed for
                startups, agencies, and sales-driven teams.
              </Muted>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <CheckRow>Centralized CRM & database</CheckRow>
                <CheckRow>Marketing automation</CheckRow>
                <CheckRow>WhatsApp, Email & SMS</CheckRow>
                <CheckRow>AI-ready workflows</CheckRow>
                <CheckRow>White-label infrastructure</CheckRow>
                <CheckRow>Scalable team access</CheckRow>
              </div>

              <div className="mt-6 rounded-xl border border-[#635BFF]/25 bg-[#635BFF]/10 p-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    "Startups",
                    "Service businesses",
                    "Marketing agencies",
                    "Sales teams",
                  ].map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* 2. Core CRM */}
          <motion.div variants={item} className="col-span-12 lg:col-span-3">
            <Card className="p-6">
              <Title>Core CRM & Automation</Title>
              <Muted className="mt-2">
                Manage leads, pipelines, and follow-ups in one place.
              </Muted>

              <div className="mt-4 space-y-2">
                <CheckRow>Lead & contact management</CheckRow>
                <CheckRow>Custom pipelines</CheckRow>
                <CheckRow>Tasks & reminders</CheckRow>
                <CheckRow>Basic automation</CheckRow>
                <CheckRow>Role-based access</CheckRow>
              </div>

              <div className="mt-4 rounded-lg border border-black/10 bg-black/5 p-3 text-xs">
                <strong>Use case:</strong> Never lose leads from ads, calls, or
                referrals.
              </div>

              <div className="mt-4 text-right text-sm font-semibold">
                ₹9,999 / month
              </div>
            </Card>
          </motion.div>

          {/* 3. Marketing Suite */}
          <motion.div variants={item} className="col-span-12 lg:col-span-3">
            <Card className="p-6">
              <Title>Marketing & Communication</Title>
              <Muted className="mt-2">
                Capture, nurture, and close leads without multiple tools.
              </Muted>

              <div className="mt-4 space-y-2">
                <CheckRow>Landing pages & forms</CheckRow>
                <CheckRow>Email automation</CheckRow>
                <CheckRow>WhatsApp & SMS campaigns</CheckRow>
                <CheckRow>Central inbox</CheckRow>
                <CheckRow>Campaign tracking</CheckRow>
              </div>

              <div className="mt-4 rounded-lg border border-black/10 bg-black/5 p-3 text-xs">
                <strong>Use case:</strong> Replace Mailchimp, WhatsApp tools &
                CRMs.
              </div>

              <div className="mt-4 text-right text-sm font-semibold">
                ₹14,999 / month
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-6">
            <Card className="p-6">
              <Title>Advanced Automation & AI-Ready</Title>
              <Muted className="mt-2">
                Built for scale — automate operations without increasing
                manpower.
              </Muted>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <CheckRow>Multi-step workflows</CheckRow>
                <CheckRow>AI-ready logic</CheckRow>
                <CheckRow>Lead scoring</CheckRow>
                <CheckRow>Advanced dashboards</CheckRow>
                <CheckRow>API access</CheckRow>
                <CheckRow>Third-party integrations</CheckRow>
              </div>

              <div className="mt-4 rounded-lg border border-black/10 bg-black/5 p-3 text-xs">
                <strong>Use case:</strong> Scale faster with automation & AI.
              </div>

              <div className="mt-4 text-right text-sm font-semibold">
                ₹24,999 / month
              </div>
            </Card>
          </motion.div>

          {/* 5. White Label */}
          <motion.div variants={item} className="col-span-12 lg:col-span-6">
            <Card className="p-6 border-[#635BFF]/30 bg-[#635BFF]/5">
              <Title>White-Label & Branding</Title>
              <Muted className="mt-2">
                Run AULTUM under your own brand and sell it as your SaaS.
              </Muted>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <CheckRow>Custom domain</CheckRow>
                <CheckRow>Your logo & brand</CheckRow>
                <CheckRow>Custom login URL</CheckRow>
                <CheckRow>Branded dashboards</CheckRow>
                <CheckRow>Client-level access</CheckRow>
                <CheckRow>Reseller-ready</CheckRow>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  "Agencies",
                  "Consultants",
                  "Founders",
                  "Resellers",
                ].map((b) => (
                  <Badge key={b}>{b}</Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

    
<motion.section
  variants={item}
  className="mt-16 px-4 sm:px-6"
>

  <div className="mx-auto max-w-4xl text-center">
    <h3 className="text-xl sm:text-2xl font-semibold text-black">
      Why Choose AULTUM?
    </h3>
    <p className="mt-2 text-sm sm:text-base text-black/50">
      One platform built to simplify operations, reduce cost, and scale faster.
    </p>
  </div>

  {(() => {
    const whyChooseData = [
      { text: "Replace 5–7 tools with one platform", icon: Layers },
      { text: "Lower operational costs", icon: IndianRupee },
      { text: "Faster execution & automation", icon: Zap },
      { text: "Easy onboarding & support", icon: Headphones },
      { text: "Scalable as your business grows", icon: TrendingUp },
    ];

    return (
      <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-4">
        {whyChooseData.map(({ text, icon: Icon }) => (
          <motion.div
            key={text}
            whileHover={{ y: -2 }}
            className="
              flex items-center gap-3
              rounded-full
              border border-black/10
              bg-white
              px-5 py-3
              text-sm text-black/70
              shadow-sm
            "
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#635BFF]/15">
              <Icon className="h-3.5 w-3.5 text-[#635BFF]" />
            </span>
            {text}
          </motion.div>
        ))}
      </div>
    );
  })()}
</motion.section>

    </section>
    
  );
}