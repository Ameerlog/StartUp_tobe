import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DESIGNS } from "../data/design";

function inr(n) {
  const v = Number(n ?? 49000);
  return `₹${v.toLocaleString("en-IN")}`;
}

const FEATURES = [
  {
    title: "Secure & Trusted Transactions",
    tip: "Simple, safe transaction process — trusted by founders.",
  },
  {
    title: "Fast & Guaranteed Transfers",
    tip: "We aim for quick domain transfers wherever possible.",
  },
  {
    title: "Easy & Flexible Payments",
    tip: "UPI/cards/netbanking + optional payment plan.",
  },
];

const INCLUDED_RIGHT = [
  "Free Transaction Support",
  "No Extra Fees",
  "Full Ownership Upon Payment",
];

export default function DomainDetailsLayout() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const item = useMemo(() => DESIGNS.find((d) => d.slug === slug), [slug]);
  if (!item) return <NotFound />;

  const domain =
    item.domain || `${item.title.replace(/\s+/g, "").toLowerCase()}.com`;
  const price = item.price ?? 49000;

  const [method, setMethod] = useState("buy");

  const proceed = () => {
    navigate(`/marketplace/${item.slug}/payment`);
  };

  return (
    <main className="min-h-screen bg-white text-zinc-950 mt-10">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="text-sm text-zinc-600 hover:text-zinc-900">
              ← Back
            </Link>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800">
                Strong buyer interest
              </span>
              <span className="rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-semibold text-zinc-700">
                Verified domain
              </span>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h4 className="text-sm text-zinc-600">This domain name</h4>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                    {domain}{" "}
                    <span className="text-zinc-500 text-2xl sm:text-3xl">
                      is for sale!
                    </span>
                  </h1>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
                <div className="aspect-590/360 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={domain}
                    className="max-h-full max-w-full object-contain p-8"
                    loading="eager"
                    draggable={false}
                  />
                </div>

                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  <button
                    type="button"
                    className="h-2 w-8 rounded-full bg-zinc-900/20"
                    aria-label="Slide 1"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="text-sm font-semibold">{f.title}</div>
                    <p className="mt-2 text-sm text-zinc-600">{f.tip}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <h2 className="text-lg font-semibold">
                  Join our community for free
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Find your partner and Co-founder and share idea's by just
                  filling the form
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                >
                  Join Now <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-6 mt-10 h-fit">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">Purchase Domain</div>
                    <div className="mt-1 text-xs text-zinc-600">
                      Verified Domain
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-800">
                    Verified
                  </span>
                </div>

                <div className="mt-5 grid gap-3">
                  <label
                    className={[
                      "flex cursor-pointer items-start justify-between gap-3 rounded-2xl border p-4",
                      method === "buy"
                        ? "border-zinc-300 bg-zinc-50"
                        : "border-zinc-200 bg-white hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    <div className="grid gap-1">
                      <div className="text-sm font-semibold">Buy Now</div>
                      <div className="text-xs text-zinc-600">
                        One-time payment
                      </div>
                    </div>
                    <div className="text-sm font-semibold">{inr(price)}</div>
                    <input
                      type="radio"
                      className="hidden"
                      name="payment_method"
                      checked={method === "buy"}
                      onChange={() => setMethod("buy")}
                    />
                  </label>

                  <button
                    type="button"
                    onClick={proceed}
                    className="rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
                  >
                    Proceed to Payment <span aria-hidden="true">→</span>
                  </button>

                  <div className="mt-2 space-y-2">
                    {INCLUDED_RIGHT.map((x) => (
                      <div
                        key={x}
                        className="flex items-center gap-2 text-sm text-zinc-700"
                      >
                        <span className="text-emerald-700">✓</span>
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                    <p className="text-sm font-semibold">Payment Options</p>
                    <p className="mt-2 text-sm text-zinc-600">
                      UPI · Cards · Net Banking
                    </p>
                  </div>
                </div>

                {/* fixed bar (desktop mimic) */}
                <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm">
                      <strong>{inr(price)}</strong>
                    </p>
                    <button
                      type="button"
                      onClick={proceed}
                      className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
                    >
                      Purchase →
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <p className="text-sm font-semibold text-center">
                  Need help? Contact us now.
                </p>
                <div className="mt-4 grid gap-2">
                  <a
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-zinc-50"
                    href="tel:+919999999999"
                  >
                    Call
                  </a>
                  <a
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-zinc-50"
                    href="mailto:support@startuptobe.com"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-2xl font-semibold">Domain not found</h1>
        <p className="mt-2 text-zinc-600">Check the URL and try again.</p>
      </div>
    </main>
  );
}
