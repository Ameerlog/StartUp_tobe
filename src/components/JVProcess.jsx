import { FileText, SearchCheck, Grid, Rocket } from "lucide-react";

export default function JVProcess() {
  const steps = [
    {
      step: "01",
      icon: FileText,
      title: "Apply Online",
      desc: "Fill out a short joint venture application with basic startup details."
    },
    {
      step: "02",
      icon: SearchCheck,
      title: "Review & Approval",
      desc: "Our team reviews the fit, vision, and potential synergy."
    },
    {
      step: "03",
      icon: Grid,
      title: "Access StartupToBe Ecosystem",
      desc: "Get domains, SaaS tools, compliance, and marketing support."
    },
    {
      step: "04",
      icon: Rocket,
      title: "Co-Build & Launch",
      desc: "Launch together with shared growth and revenue alignment."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-[#240029]">
          How the JV Works
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600">
          A simple, transparent process designed for founders.
        </p>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ step, icon: Icon, title, desc }) => (
            <div
              key={step}
              className="relative rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm"
            >
              <span className="absolute -top-3 left-6 rounded-full bg-[#240029] px-3 py-1 text-xs font-semibold text-white">
                {step}
              </span>

              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#240029]/10">
                <Icon className="h-6 w-6 text-[#240029]" />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-[#240029]">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
