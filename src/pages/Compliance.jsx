
  import React from "react";
import {
  Wallet,
  ShieldCheck,
  Zap,
  HeartHandshake,
  X,
} from "lucide-react";


function CTAButtons() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <a
        href="/pricing"
        className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
      >
        Get Filing & Compliance with StartupToBe
      </a>

    </div>
  );
}

export default function Compliance() {
  const complianceServices = [
    {
      id: "business",
      name: "Business Registration",
      price: "₹499",
      points: ["Proprietorship", "Partnership Firm", "LLP Registration", "Pvt Ltd / OPC"],
    },
    {
      id: "gst",
      name: "GST Services",
      price: "₹999",
      points: ["GST Registration", "GST Amendment", "GST Cancellation", "Return Filing"],
    },
    {
      id: "din",
      name: "DIN & Director Services",
      price: "₹499",
      points: ["DIN Application", "DIN KYC", "Director Change", "Director Resignation"],
    },
    {
      id: "msme",
      name: "MSME / Udyam",
      price: "₹199",
      points: ["Udyam Registration", "Certificate Download", "Update Details"],
    },
    {
      id: "iec",
      name: "Import Export Code (IEC)",
      price: "₹999",
      points: ["IEC Registration", "IEC Modification", "IEC Renewal"],
    },
    {
      id: "licenses",
      name: "Trade & Local Licenses",
      price: "₹999",
      points: ["Shop & Establishment", "Trade License", "Gumasta License"],
    },
    {
      id: "brand",
      name: "Brand & Digital Compliance",
      price: "₹1,499",
      points: ["Trademark Filing", "Logo Ownership", "Domain Protection"],
    },
    {
      id: "filings",
      name: "Annual & Basic Filings",
      price: "₹1,999",
      points: ["Annual ROC Filing", "PAN / TAN", "Company Closure"],
    },
  ];

  const [activeService, setActiveService] = React.useState(null);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });

  React.useEffect(() => {
    if (activeService) {
      setFormData((prev) => ({
        ...prev,
        service: activeService.name,
      }));
    }
  }, [activeService]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    alert("Form submitted (check console)");
    setActiveService(null);
  }

  return (
    <main className="bg-white text-zinc-900">

      {/* ======================
         HERO
      ====================== */}
      <section className="relative overflow-hidden pt-16">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-fuchsia-500/18 via-indigo-500/10 to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <div className="text-sm font-semibold tracking-wide text-zinc-500">
            Filing and Compliance
          </div>

          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
            Compliance made for <br /> Startup-to-be
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-600">
            StartupToBe takes care of registrations, filings, and compliance —
            so your startup stays legal, credible, and stress-free.
          </p>

          <CTAButtons />

          <div className="mt-10 flex justify-center">
            <div className="h-px w-72 bg-linear-to-r from-transparent via-zinc-200 to-transparent" />
          </div>
        </div>
      </section>

      {/* ======================
         SERVICES
      ====================== */}
      <section className="py-24 bg-zinc-50">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complianceServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="mt-1 text-sm font-medium text-zinc-700">
                Starting at {service.price}
              </p>

              <ul className="mt-3 space-y-1 text-sm text-zinc-600">
                {service.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>

              <button
                onClick={() => setActiveService(service)}
                className="mt-6 w-full rounded-full bg-zinc-900 py-2 text-sm font-semibold text-white hover:bg-zinc-800 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ======================
         WHY DIFFERENT
      ====================== */}
      <section className="py-28 cursor-pointer">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Why we’re different
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-zinc-900" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[Wallet, ShieldCheck, Zap, HeartHandshake].map((Icon, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold">
                  {["Transparent pricing", "No hidden charges", "Fast turnaround", "Startup-friendly support"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================
         MODAL
      ====================== */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

            {/* Close icon */}
            <button
              onClick={() => setActiveService(null)}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-semibold">{activeService.name}</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Starting at {activeService.price}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border px-4 py-2"
              />
              <input
                value={formData.service}
                readOnly
                className="w-full rounded-lg border bg-zinc-100 px-4 py-2"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
