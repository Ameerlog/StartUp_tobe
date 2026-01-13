import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import B from "../assets/domain/Batteryfy.svg";
import P from "../assets/domain/pregadays.svg";
import DC from "../assets/domain/drychilli.svg";
import DG from "../assets/domain/drygrains.svg";
import MB from "../assets/domain/30mbps.svg";
import CO from "../assets/domain/cosister.svg";

function useIsSmall() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setIsSmall(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  return isSmall;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

function Card({ as: As = "div", href, className = "", children }) {
  const Comp = As;
  return (
    <Comp
      href={href}
      className={[
        "group relative h-full min-h-0 rounded-2xl border border-black/10 bg-white",
        "shadow-[0_18px_50px_rgba(0,0,0,0.10)] transition-shadow hover:shadow-[0_28px_70px_rgba(0,0,0,0.14)]",
        href ? "block" : "",
        className,
      ].join(" ")}
    >
      {children}
      <div className="pointer-events-none absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-sm text-black/60">
        →
      </div>
    </Comp>
  );
}

function Eyebrow({ children }) {
  return <div className="text-xs font-semibold tracking-wide text-black/55">{children}</div>;
}

function Title({ children }) {
  return <h3 className="text-base font-extrabold text-black">{children}</h3>;
}

function Muted({ children, className = "" }) {
  return <p className={["text-sm leading-relaxed text-black/60", className].join(" ")}>{children}</p>;
}

function CheckRow({ children }) {
  return (
    <div className="flex items-start gap-2 text-sm text-black/70">
      <span className="mt-[3px] inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700">
        ✓
      </span>
      <span className="leading-relaxed">{children}</span>
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

function FadeTopBottom() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent" />
    </>
  );
}

function VerticalMarquee({ rows }) {
  return (
    <div className="relative h-56 sm:h-60 overflow-hidden rounded-xl bg-white border border-black/10">
      <FadeTopBottom />
      <div className="marquee-vert__track">
        {rows.concat(rows).map((r, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 border-b border-black/10 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <div className="grid h-6 w-6 place-items-center rounded-full border border-black/10 bg-black/[0.02] text-[10px] font-extrabold text-black/60">
                {typeof r.icon === "string" ? (
                  <img src={r.icon} alt="" className="h-4 w-4 scale-150" />
                ) : (
                  r.icon
                )}
              </div>
              <div className="truncate text-xs font-semibold text-black">{r.name}</div>
            </div>
            <div className="shrink-0 text-xs text-black/55">{r.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmailList() {
  const rows = [
    { title: "Landing page copy", meta: "Hero + value prop", done: true },
    { title: "Brand messaging", meta: "Positioning + one-liner", done: true },
    { title: "Social profiles", meta: "Instagram, LinkedIn, Google", done: false },
    { title: "Launch assets", meta: "Logo, banners, thumbnails", done: false },
  ];

  return (
    <div className="relative h-56 overflow-hidden rounded-xl border border-black/10 bg-white">
      <FadeTopBottom />
      <div className="space-y-0">
        {rows.map((r) => (
          <div key={r.title} className="flex items-start gap-3 border-b border-black/10 px-4 py-3">
            <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border border-black/10 bg-black/[0.02] text-xs text-black/60">
              •
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-black">{r.title}</div>
              <div className="text-xs text-black/55">{r.meta}</div>
            </div>
            <div className="ml-auto">
              <div
                className={[
                  "mt-1 h-5 w-5 rounded-full border",
                  r.done ? "border-emerald-600/20 bg-emerald-500/15" : "border-black/10 bg-black/[0.02]",
                ].join(" ")}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute bottom-2 left-0 right-0 mx-auto h-[2px] w-[70%] rounded-full bg-black/10" />
    </div>
  );
}

function HelpDeskChat() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-black/10 bg-black/[0.02] px-3 py-2 text-xs text-black/70">
     09876556789
      </div>
      <div className="text-center text-[11px] font-semibold text-black/55">StartupToBe mapped the next step</div>
      <div className="rounded-xl border border-black/10 bg-white px-3 py-2 text-xs text-black/70">
      987654345678
      </div>
      <div className="text-center text-[11px] font-semibold text-black/55">Founder moved to Step 2</div>
    </div>
  );
}

function AuthPreview() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-black/60">Register your company</div>
          <div className="h-7 w-20 rounded-lg border border-black/10 bg-black/[0.02]" />
        </div>

        <div className="mt-4 rounded-xl border border-black/10 bg-black/[0.02] p-4">
          
          <div className="mt-3 space-y-2">
            <div className="h-9 rounded-lg border border-black/10 bg-white" />
            <div className="h-9 rounded-lg border border-black/10 bg-white" />
            <div className="h-9 rounded-lg bg-black" />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-black/10 bg-white p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-black/70">Back-office checklist</span>
            <span className="text-black/50">•••</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-8 rounded-lg border border-black/10 bg-black/[0.02]" />
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#635BFF]/25 bg-[#635BFF]/10 px-3 py-2 text-[11px] text-[#4a42ff]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/70">✓</span>
            <span className="font-semibold">Support ready</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white p-4">
        <div className="text-xs font-semibold text-black/60">Tools you can add</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-8 rounded-lg border border-black/10 bg-black/[0.02]" />
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-[#635BFF]/25 bg-[#635BFF]/10 p-3 text-[11px] font-semibold text-[#4a42ff]">
          Systems + support that grow with you
        </div>
      </div>
    </div>
  );
}

function ReportingCard() {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-black/70">Compliance</div>
          <div className="text-xs text-black/50">your filing rhythm</div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-black/60"
        >
          Checklist <span className="text-black/40">▾</span>
        </button>
      </div>

      <div className="mt-3 text-lg font-extrabold text-black">Stay compliant</div>

      <div className="mt-3 rounded-xl border border-black/10 bg-black/[0.02] p-4">
        <div className="h-[140px] w-full rounded-lg bg-gradient-to-b from-black/10 to-transparent" />
      </div>

      <div className="mt-3 grid gap-2">
        <div className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs text-black/70">
          GST registration & filings (as applicable)
        </div>
        <div className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs text-black/70">
          Trademark & IP filing guidance
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-12 bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 -top-4 h-10 bg-gradient-to-b from-white to-transparent" />
    </div>
  );
}

export default function BentoGrid() {
  const isSmall = useIsSmall();

  const nameRows = [
    { icon: B, name: "Batteryfy", status: ".in available" },
    { icon: P, name: "Pregadays", status: ".com premium" },
    { icon: DC, name: "DryChillis", status: ".com taken" },
    { icon: DG, name: "DrayGrains", status: ".in available" },
    { icon: MB, name: "30Mbps", status: ".com premium" },
    { icon: CO, name: "Cosister", status: ".in available" },
  ];

  return (
    <section className="bg-[#F6F6FB] py-16 sm:py-20 overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center text-black/70">
          
          <h2 className="mt-2 text-balance text-2xl font-medium tracking-tight text-black sm:text-3xl lg:text-6xl">
           Required services to strengthen your startup foundation
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isSmall ? "show" : undefined}
          whileInView={isSmall ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-12 gap-3 sm:gap-4"
        >
          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-6 min-h-0">
            <Card as="a" href="/" className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Title>Trade Mark and IP Protection</Title>
                <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.02] px-3 py-1 text-xs text-black/60">
                  <span className="font-semibold">Paperwork handled</span>
                </span>
              </div>

              <Muted className="mt-3">
                Make it official — without paperwork stress. You focus on the idea. We handle the filings.
              </Muted>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <CheckRow>PAN Card</CheckRow>
                <CheckRow>Aadhaar card</CheckRow>
                <CheckRow>Business registration proof</CheckRow>
                <CheckRow>Trade mark logo</CheckRow>
              </div>

              <div className="mt-6 rounded-2xl border border-[#635BFF]/25 bg-[#635BFF]/10 p-4 sm:p-5">
                <div className="flex flex-wrap justify-center gap-2">
                  {["Certificate of Incorporation", "List of directors", "Authorization letter"].map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-center">
                  <div className="grid h-28 w-28 sm:h-36 sm:w-36 place-items-center rounded-[28px] border border-[#635BFF]/50 bg-white">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-extrabold text-[#635BFF]">LLP</div>
                      <div className="text-xs font-semibold text-black/60">Company Limited</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 min-h-0">
            <Card as="a" href="/" className="p-4 sm:p-6">
              <Title>Premium and Fancy Domains</Title>
              <Muted className="mt-3">
              Access high-value, brand-ready domains curated for serious startups. 
              </Muted>
              <div className="mt-5">
                <VerticalMarquee rows={nameRows} />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 min-h-0">
            <Card as="a" href="/" className="p-4 sm:p-6">
              <Title>Digital Presence</Title>
              <Muted className="mt-3">
                Look credible from Day One with website content, brand messaging, and launch-ready assets.
              </Muted>
              <div className="mt-5">
                <EmailList />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 min-h-0">
            <Card as="a" href="/" className="p-4 sm:p-6">
              <Title>Vanity Mobile Numbers</Title>
              <Muted className="mt-3">
               Memorable business numbers designed to improve brand recall and trust.
              </Muted>
              <div className="mt-5">
                <HelpDeskChat />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-6 min-h-0">
            <Card as="a" href="/" className="p-4 sm:p-6">
              <Title>Company Registration & Structuring</Title>
              <Muted className="mt-3">
               Professional support for registering your business with the right legal structure.
              </Muted>
              <div className="mt-5 overflow-hidden">
                <AuthPreview />
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="col-span-12 md:col-span-6 lg:col-span-3 min-h-0">
            <Card as="a" href="/" className="p-4 sm:p-6">
              <Title>GST & Compliance</Title>
              <Muted className="mt-3">
                Stay compliant as you start operations — GST, filings, and bookkeeping setup (based on your business type).
              </Muted>
              <div className="mt-5">
                <ReportingCard />
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .marquee-vert__track{
          animation: marqueeVert 11s linear infinite;
        }
        .marquee-vert__track:hover{
          animation-play-state: paused;
        }
        @keyframes marqueeVert{
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-vert__track{ animation: none; transform: none; }
        }
      `}</style>
    </section>
  );
}
