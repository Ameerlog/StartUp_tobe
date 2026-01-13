import React from "react";
import { useNavigate } from "react-router-dom";

const ReserveDomainForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      navigate("/thank-you");
    } catch (err) {
      console.error("Error submitting form", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        {/* Form title */}
        <h3 className="text-center text-xl font-semibold text-zinc-900">
          Reserve Your Domain
        </h3>

        <p className="mt-2 text-center text-sm text-zinc-600">
          Leave your details and we’ll guide you through the next steps
        </p>

        <form
          action="https://forms.zohopublic.in/startuptobe1/form/REGISTRATIONFORM/formperma/HjGU8Tog1y1aGRwpOGjgJBWWS5-MQXcyq4NxSANp-6M/htmlRecords/submit"
          method="POST"
          acceptCharset="UTF-8"
          encType="multipart/form-data"
          className="mt-6 space-y-4"
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
            className="mt-2 w-full rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Submit & Reserve
          </button>

          <p className="text-center text-xs text-zinc-500">
            No spam • Founder-first conversation
          </p>
        </form>
      </div>
    </div>
  );
};

export default ReserveDomainForm;

/* ---------- helper ---------- */

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
