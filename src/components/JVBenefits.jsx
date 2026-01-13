import {
  Globe,
  Hash,
  LayoutGrid,
  ShieldCheck,
  Megaphone,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Premium Domains",
    desc: "Access high-value, brand-ready domains curated for serious startups.",
  },
  {
    icon: Hash,
    title: "Fancy Numbers",
    desc: "Memorable numeric identities for branding, trust, and recall.",
  },
  {
    icon: LayoutGrid,
    title: "White-Labeled SaaS",
    desc: "Operate on a full SaaS ecosystem under your own startup brand.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Registration",
    desc: "Company setup, legal compliance, and filings handled end-to-end.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Merch",
    desc: "Branding, launch marketing, and merchandise support from day one.",
  },
  {
    icon: TrendingUp,
    title: "Growth Partnership",
    desc: "Aligned incentives through revenue sharing and long-term growth.",
  },
];

export default function JVBenefitsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl">
            JV Benefits for Founders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600">
            What startups gain by partnering with StartupToBe
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-zinc-900">
                {title}
              </h3>

              <p className="text-sm leading-relaxed text-zinc-600">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
