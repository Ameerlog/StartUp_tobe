import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Layers, IndianRupee, Zap, Headphones, TrendingUp } from "lucide-react";

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

function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "relative rounded-3xl border border-zinc-800/60 bg-zinc-900",
        "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
        "transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Title({ children }) {
  return (
    <h3 className="text-base font-semibold tracking-tight text-white">
      {children}
    </h3>
  );
}

function Muted({ children }) {
  return <p className="text-sm leading-relaxed text-zinc-400">{children}</p>;
}

function CheckRow({ children }) {
  return (
    <div className="flex items-start gap-2 text-sm text-zinc-300">
      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white">
        ✓
      </span>
      <span>{children}</span>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-300">
      {children}
    </span>
  );
}

export default function BentoGrid() {
  const isSmall = useIsSmall();

  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-6xl">
            AULTUM – All-in-One CRM & Automation Platform
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base text-zinc-400">
            Replace scattered tools with one unified platform for sales,
            marketing, automation, and growth.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isSmall ? "show" : undefined}
          whileInView={isSmall ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-12 gap-4"
        >
          <motion.div variants={item} className="col-span-12 lg:col-span-6">
            <Card className="p-6">
              <Title>What is AULTUM?</Title>
              <Muted className="mt-3">
                A centralized CRM and automation engine built for startups,
                agencies, and high-performance sales teams.
              </Muted>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <CheckRow>Centralized CRM</CheckRow>
                <CheckRow>Marketing automation</CheckRow>
                <CheckRow>WhatsApp, Email & SMS</CheckRow>
                <CheckRow>AI-ready workflows</CheckRow>
                <CheckRow>White-label setup</CheckRow>
                <CheckRow>Scalable access</CheckRow>
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {["Startups", "Agencies", "Sales Teams", "Services"].map(
                    (b) => (
                      <Badge key={b}>{b}</Badge>
                    ),
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-3">
            <Card className="p-6">
              <Title>Core CRM & Automation</Title>
              <Muted className="mt-2">
                Track leads, pipelines, and follow-ups effortlessly.
              </Muted>

              <div className="mt-4 space-y-2">
                <CheckRow>Lead management</CheckRow>
                <CheckRow>Custom pipelines</CheckRow>
                <CheckRow>Tasks & reminders</CheckRow>
                <CheckRow>Basic automation</CheckRow>
                <CheckRow>Role-based access</CheckRow>
              </div>

              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-400">
                Never lose leads again.
              </div>

              <div className="mt-4 text-right text-sm font-semibold text-white">
                ₹9,999 / month
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-3">
            <Card className="p-6">
              <Title>Marketing & Communication</Title>
              <Muted className="mt-2">
                Capture and nurture leads without switching tools.
              </Muted>

              <div className="mt-4 space-y-2">
                <CheckRow>Landing pages</CheckRow>
                <CheckRow>Email automation</CheckRow>
                <CheckRow>WhatsApp & SMS</CheckRow>
                <CheckRow>Unified inbox</CheckRow>
                <CheckRow>Campaign tracking</CheckRow>
              </div>

              <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-xs text-zinc-400">
                Replace multiple marketing tools.
              </div>

              <div className="mt-4 text-right text-sm font-semibold text-white">
                ₹14,999 / month
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-6">
            <Card className="p-6">
              <Title>Advanced Automation & AI</Title>
              <Muted className="mt-2">
                Designed for scale with advanced workflows.
              </Muted>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <CheckRow>Multi-step workflows</CheckRow>
                <CheckRow>AI-ready logic</CheckRow>
                <CheckRow>Lead scoring</CheckRow>
                <CheckRow>Advanced dashboards</CheckRow>
                <CheckRow>API access</CheckRow>
                <CheckRow>Integrations</CheckRow>
              </div>

              <div className="mt-4 text-right text-sm font-semibold text-white">
                ₹24,999 / month
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-6">
            <Card className="p-6">
              <Title>White-Label & Branding</Title>
              <Muted className="mt-2">
                Launch AULTUM under your own brand.
              </Muted>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <CheckRow>Custom domain</CheckRow>
                <CheckRow>Your branding</CheckRow>
                <CheckRow>Branded login</CheckRow>
                <CheckRow>Client access</CheckRow>
                <CheckRow>Reseller ready</CheckRow>
                <CheckRow>Agency friendly</CheckRow>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.section variants={item} className="mt-20 text-center">
          <h3 className="text-xl sm:text-2xl font-medium text-white">
            Why Choose AULTUM?
          </h3>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            One platform to reduce cost, simplify operations, and scale faster.
          </p>

          <div className="mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-4">
            {[
              { text: "Replace multiple tools", icon: Layers },
              { text: "Lower operational cost", icon: IndianRupee },
              { text: "Faster execution", icon: Zap },
              { text: "Easy onboarding", icon: Headphones },
              { text: "Scales with growth", icon: TrendingUp },
            ].map(({ text, icon: Icon }) => (
              <motion.div
                key={text}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-3 text-sm text-zinc-300"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-3.5 w-3.5 text-white" />
                </span>
                {text}
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
