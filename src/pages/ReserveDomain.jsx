import React, { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DESIGNS } from "../data/design";

export default function ReserveDomainPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = useMemo(() => DESIGNS.find((d) => d.slug === slug), [slug]);

  if (!item)
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Not found
      </main>
    );

  const priceLabel = `₹${Number(item.price || 49000).toLocaleString("en-IN")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch(form.action, { method: "POST", body: formData });
      navigate(`/marketplace/${slug}/payment/success`);
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link
            to={`/marketplace/${item.slug}`}
            className="text-sm text-zinc-400 hover:text-white"
          >
            ← Back
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Reserve your domain
              </h1>

              <p className="mt-3 text-zinc-400">
                You’re one step away from owning{" "}
                <span className="font-semibold text-white">{item.domain}</span>.
                Fill the form and our team will contact you.
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Domains are sold on a first-come, first-served basis.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <form
                  action="https://forms.zohopublic.in/startuptobe1/form/REGISTRATIONFORM/formperma/HjGU8Tog1y1aGRwpOGjgJBWWS5-MQXcyq4NxSANp-6M/htmlRecords/submit"
                  method="POST"
                  encType="multipart/form-data"
                  className="space-y-5"
                  onSubmit={handleSubmit}
                >
                  <input type="hidden" name="zf_referrer_name" />
                  <input type="hidden" name="zc_gad" />

                  <FieldNative
                    label="Email"
                    name="Email"
                    type="email"
                    required
                  />
                  <FieldNative
                    label="Phone"
                    name="PhoneNumber_countrycode"
                    type="tel"
                    id="international_PhoneNumber_countrycode"
                  />
                  <FieldNative
                    label="City / Pincode"
                    name="SingleLine"
                    type="text"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black hover:opacity-90"
                  >
                    Submit to Reserve →
                  </button>
                </form>
              </div>
            </div>

            <aside className="lg:sticky lg:top-8 h-fit">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <h3 className="text-lg font-semibold">Order Summary</h3>

                <div className="mt-5 space-y-3 text-sm">
                  <Row label="Domain" value={item.domain} />
                  <Row label="Price" value={priceLabel} />
                  <Row label="Taxes" value="As applicable" />
                  <div className="my-3 h-px bg-white/10" />
                  <Row label="Total" value={priceLabel} strong />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function FieldNative({ label, name, type = "text", required, id }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-zinc-400">{label}</span>
      <input
        name={name}
        id={id}
        type={type}
        required={required}
        className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
      />
    </label>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-zinc-400">{label}</span>
      <span className={strong ? "font-semibold text-white" : "text-zinc-300"}>
        {value}
      </span>
    </div>
  );
}