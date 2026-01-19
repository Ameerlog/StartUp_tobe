import React from "react";
import { Wallet, ShieldCheck, Zap, HeartHandshake, X } from "lucide-react";


export default function Compliance() {
  const complianceServices = [
    { id: "business", name: "Business Registration", price: "₹499", points: ["Proprietorship", "Partnership Firm", "LLP Registration", "Pvt Ltd / OPC"] },
    { id: "gst", name: "GST Services", price: "₹999", points: ["GST Registration", "GST Amendment", "GST Cancellation", "Return Filing"] },
    { id: "din", name: "DIN & DSC", price: "₹2500", points: ["DIN Application", "DIN KYC", "Director Change", "Director Resignation"] },
    { id: "msme", name: "MSME / Udyam", price: "₹199", points: ["Udyam Registration", "Certificate Download", "Update Details"] },
    { id: "iec", name: "Import Export Code (IEC)", price: "₹999", points: ["IEC Registration", "IEC Modification", "IEC Renewal"] },
    { id: "licenses", name: "Trade & Local Licenses", price: "₹999", points: ["Shop & Establishment", "Trade License", "Gumasta License"] },
    { id: "brand", name: "Brand & Digital Compliance", price: "₹1,499", points: ["Trademark Filing", "Logo Ownership", "Domain Protection"] },
    { id: "filings", name: "Annual & Basic Filings", price: "₹1,999", points: ["Annual ROC Filing", "PAN / TAN", "Company Closure"] },
  ];

  const [activeService, setActiveService] = React.useState(null);
  const [formData, setFormData] = React.useState({ name: "", email: "", phone: "", service: "" });

  React.useEffect(() => {
    if (activeService) {
      setFormData((prev) => ({ ...prev, service: activeService.name }));
    }
  }, [activeService]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setActiveService(null);
  }

  return (
    <main className="relative min-h-screen bg-[#F8F9FA] text-slate-900">

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <section className="relative pt-25  pb-10 text-center z-10">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-sm font-bold text-slate-500">
            Filing and Compliance
          </p>

          <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tighter">
            Compliance made for PreUnicorns
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500 font-medium">
            PreUnicorns handles registrations, filings, and compliance so your startup stays legal and stress-free.
          </p>

       

          <div className="mt-8 flex justify-center">
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative py-14 z-10">
        <div className="mx-auto max-w-6xl px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {complianceServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-red-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all"
            >
              <h3 className="text-lg font-bold">{service.name}</h3>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Starting at {service.price}
              </p>

              <ul className="mt-3 space-y-1 text-sm text-slate-500">
                {service.points.map((p) => (
                  <li key={p}>• {p}</li>
                ))}
              </ul>

              <button
                onClick={() => setActiveService(service)}
                className="mt-5 w-full rounded-full bg-slate-900 py-2.5 text-sm font-bold text-white hover:bg-red-600 transition"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="relative py-14 z-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Why we’re different
            </h2>
            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-slate-900" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[Wallet, ShieldCheck, Zap, HeartHandshake].map((Icon, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
                <p className="font-bold">
                  {["Transparent pricing", "No hidden charges", "Fast turnaround", "Startup-friendly support"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

            <button
              onClick={() => setActiveService(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold">{activeService.name}</h3>
            <p className="mt-1 text-sm text-slate-500">
              Starting at {activeService.price}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full rounded-lg border px-4 py-2" />
              <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full rounded-lg border px-4 py-2" />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} required className="w-full rounded-lg border px-4 py-2" />
              <input value={formData.service} readOnly className="w-full rounded-lg border bg-slate-100 px-4 py-2" />

              <button className="w-full rounded-full bg-slate-900 py-3 text-sm font-bold text-white hover:bg-red-600 transition">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
