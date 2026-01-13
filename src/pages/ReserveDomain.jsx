import React, { useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DESIGNS } from "../data/design";

export default function ReserveDomainPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const item = useMemo(() => DESIGNS.find((d) => d.slug === slug), [slug]);

  if (!item) return <div className="p-6">Not found</div>;

  const priceLabel = `₹${Number(item.price || 49000).toLocaleString("en-IN")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      // redirect to Thank You page
      navigate(`/marketplace/${slug}/payment/success`);
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex items-center justify-between">
            <Link
              to={`/marketplace/${item.slug}`}
              className="text-sm text-zinc-600 hover:text-zinc-900"
            >
              ← Back
            </Link>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
     
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Reserve your domain
              </h1>

              <p className="mt-3 text-zinc-600">
                You’re one step away from owning{" "}
                <span className="font-semibold">{item.domain}</span>. Fill this
                form and the team will contact you for payment.
              </p>

              <p className="mt-2 text-sm text-zinc-600">
                Domains are sold on a first-come, first-served basis.
              </p>

              <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6">
                <form
                  action="https://forms.zohopublic.in/startuptobe1/form/REGISTRATIONFORM/formperma/HjGU8Tog1y1aGRwpOGjgJBWWS5-MQXcyq4NxSANp-6M/htmlRecords/submit"
                  name="form"
                  id="form"
                  method="POST"
                  acceptCharset="UTF-8"
                  encType="multipart/form-data"
                  className="space-y-4"
                  onSubmit={handleSubmit} 
                >
                  <input type="hidden" name="zf_referrer_name" value="" />
                  <input type="hidden" name="zc_gad" value="" />

                  <FieldNative
                    label="Email"
                    name="Email"
                    type="email"
                    maxLength={255}
                    required
                  />

                  <FieldNative
                    label="Phone"
                    name="PhoneNumber_countrycode"
                    type="tel"
                    maxLength={20}
                    id="international_PhoneNumber_countrycode"
                  />

                  <FieldNative
                    label="City / Pincode"
                    name="SingleLine"
                    type="text"
                    maxLength={255}
                  />

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
                  >
                    Submit to Reserve
                  </button>
{/* 
                  <p className="mt-3 text-center text-xs text-zinc-500">
                    🔒 Submitted to Zoho Forms · The team will contact you for
                    payment & transfer
                  </p> */}
                </form>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <aside className="lg:sticky lg:top-6 h-fit">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
                <h3 className="text-lg font-semibold">Order Summary</h3>

                <div className="mt-4 space-y-2 text-sm text-zinc-700">
                  <Row label="Domain" value={item.domain} />
                  <Row label="Price" value={priceLabel} />
                  <Row label="Taxes" value="As applicable" />
                  <div className="my-3 h-px bg-zinc-200" />
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

function FieldNative({ label, name, type = "text", maxLength, required, id }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-zinc-700">{label}</span>
      <input
        name={name}
        id={id}
        type={type}
        maxLength={maxLength}
        required={required}
        className="h-11 w-full rounded-xl border border-zinc-200 bg-white px-3 outline-none focus:border-zinc-300"
      />
    </label>
  );
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-zinc-600">{label}</span>
      <span className={strong ? "font-semibold text-zinc-950" : "text-zinc-800"}>
        {value}
      </span>
    </div>
  );
}
