import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FEATURES = [
  {
    title: "Secure & Trusted Transactions",
    tip: "Founder-safe purchase flow with verified ownership.",
  },
  {
    title: "Fast & Guaranteed Transfers",
    tip: "Quick domain handover after confirmation.",
  },
  {
    title: "Flexible Payments",
    tip: "UPI, cards, net banking supported.",
  },
];

const INCLUDED_RIGHT = [
  "Free Transaction Support",
  "No Hidden Fees",
  "Full Ownership Transfer",
];

export default function DomainDetailsLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState("buy");
  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch domain from backend
  useEffect(() => {
    fetchDomain();
  }, [id]);

  const fetchDomain = async () => {
    try {
      const response = await fetch(
        `https://cobrother-api.onrender.com/api/domain/${id}`,
      );
      if (!response.ok) throw new Error("Domain not found");
      const data = await response.json();
      setDomain(data);
    } catch (error) {
      console.error("Error fetching domain:", error);
      setDomain(null);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // Not found state
  if (!domain) return <NotFound />;

  // Prepare data
  const domainFullName = `${domain.domainName}${domain.domainExtension}`;
  const priceFormatted = `₹${domain.askingPrice.toLocaleString("en-IN")}`;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/branding"
              className="text-sm text-zinc-400 hover:text-white"
            >
              ← Back
            </Link>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                High demand
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-zinc-300">
                Verified
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8">
              <div>
                <h4 className="text-sm text-zinc-400">Premium domain</h4>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {domainFullName}
                  <span className="ml-2 text-zinc-400 text-2xl sm:text-3xl">
                    available
                  </span>
                </h1>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
                <div className="aspect-[16/10] flex items-center justify-center">
                  {domain.logo ? (
                    <img
                      src={domain.logo}
                      alt={domainFullName}
                      className="max-h-full max-w-full object-contain p-10"
                      draggable={false}
                    />
                  ) : (
                    <div className="text-6xl font-bold text-white/20">
                      {domain.domainName.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
                  >
                    <div className="text-sm font-semibold">{f.title}</div>
                    <p className="mt-2 text-sm text-zinc-400">{f.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 lg:sticky lg:top-8 h-fit">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">Purchase</div>
                    <div className="text-xs text-zinc-400">
                      Secure transaction
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Verified
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 ${
                      method === "buy"
                        ? "border-white/20 bg-white/10"
                        : "border-white/10 hover:bg-white/5"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold">Buy Now</div>
                      <div className="text-xs text-zinc-400">
                        One-time payment
                      </div>
                    </div>

                    <div className="text-sm font-semibold">
                      {priceFormatted}
                    </div>

                    <input
                      type="radio"
                      className="hidden"
                      checked={method === "buy"}
                      onChange={() => setMethod("buy")}
                    />
                  </label>

                  <button
                    onClick={() =>
                      navigate(`/marketplace/domain/${id}/payment`)
                    }
                    className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Proceed to Payment →
                  </button>

                  <div className="mt-3 space-y-2">
                    {INCLUDED_RIGHT.map((x) => (
                      <div
                        key={x}
                        className="flex items-center gap-2 text-sm text-zinc-300"
                      >
                        <span className="text-emerald-400">✓</span>
                        {x}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="text-sm font-semibold">Payment methods</p>
                    <p className="mt-2 text-sm text-zinc-400">
                      UPI · Cards · Net Banking
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm font-semibold text-center">Need help?</p>
                <div className="mt-4 grid gap-2">
                  <a
                    className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black text-center hover:opacity-90"
                    href="tel:+919999999999"
                  >
                    Call
                  </a>
                  <a
                    className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black text-center hover:opacity-90"
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
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h1 className="text-2xl font-semibold">Domain not found</h1>
        <p className="mt-2 text-zinc-400">Check the URL and try again.</p>
        <Link
          to="/branding"
          className="mt-4 inline-block text-purple-400 hover:text-purple-300"
        >
          ← Back to Marketplace
        </Link>
      </div>
    </main>
  );
}
