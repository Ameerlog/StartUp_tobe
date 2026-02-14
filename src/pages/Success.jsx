import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const domain = params.get("domain");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-white/20 bg-emerald-500/10 text-emerald-400 text-3xl font-bold">
            ✓
          </div>

          <h1 className="text-3xl font-semibold">Thanks for reserving!</h1>
          <p className="mt-4 text-zinc-400 text-lg">
            We’ll contact you shortly{domain ? ` about ${domain}` : ""}.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to="/marketplace"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Back to marketplace
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}