
import { Link, useSearchParams } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const domain = params.get("domain");

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50">
            ✓
          </div>

          <h1 className="text-2xl font-semibold">Thanks for reserving!</h1>
          <p className="mt-3 text-zinc-600">
            We’ll contact you shortly{domain ? ` about ${domain}` : ""}.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/marketplace"
              className="rounded-xl border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              Back to marketplace
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
