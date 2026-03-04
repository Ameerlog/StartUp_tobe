import React, { useState } from "react";
import {
  Network,
  Hub,
  DynamicFeed,
  Mediation,
  Quote,
  TrendingUp,
  Fingerprint,
  Rocket,
  RefreshCcw,
  Wallet,
  User,
  MapPin,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";

const BetheCobrotherpage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    location: "",
    skill: "",
    hasLaptop: false,
  });

  return (
    <div className="min-h-screen font-sans text-slate-100 bg-[#050508] relative overflow-x-hidden">
      {/* Background Decorative Patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSI+PHBhdGggZD0iTTEzLjk5IDkuMjVsMTMgNy41djE1bC0xMyA3LjVMMSAzMS43NXYtMTVMMTMuOTkgOS4yNXpNMyAxNy45MXYxMi4xOGwxMC45OSA2LjM0IDExLTYuMzRWMTcuOTFMMTQgMTEuNTcgMyAxNy45MXoiIGZpbGw9IiM4OTJlZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]"></div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-[#892eff] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(137,46,255,0.6)]">
            <Network className="text-white w-5 h-5" />
          </div>
          <h2 className="text-white text-xl font-black italic uppercase tracking-tighter">
            CoBrother
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {["The Stack", "Workflow", "Math", "Elite"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-slate-400 hover:text-white text-sm font-semibold transition-colors uppercase tracking-widest"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white text-sm font-bold py-2.5 px-6 rounded-full transition-transform active:scale-95 uppercase tracking-wider shadow-[0_0_20px_rgba(137,46,255,0.4)]">
          Join Elite
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#892eff]/10 border border-[#892eff]/20 text-[#892eff] text-[10px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#892eff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#892eff]"></span>
            </span>
            Now accepting elite applicants
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter uppercase">
            DEVISE THE FUTURE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#892eff] to-[#00C3FF]">
              GET PAID INSTANTLY.
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Join the CoBrother Elite. Deploy the ultimate stack and scale your
            digital empire with high-contrast glassmorphic precision.
          </p>
          <button className="bg-gradient-to-r from-[#892eff] to-[#00C3FF] text-white text-base md:text-lg font-black py-4 px-10 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(137,46,255,0.6)] uppercase tracking-widest mt-4">
            APPLY TO BE A COBROTHER
          </button>
        </div>

        {/* Product Stack Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#892eff]/10 blur-[120px] rounded-full pointer-events-none"></div>

          <Card
            icon={<Network />}
            title="Aultum CRM"
            desc="High-frequency relationship management optimized for rapid expansion."
            count="01"
            color="primary"
          />
          <Card
            icon={<Zap />}
            title="AI Social Sync"
            desc="Omnichannel dominance through autonomous content synchronization."
            count="02"
            color="secondary"
            featured
          />
          <Card
            icon={<Mediation />}
            title="Aultum Bridge"
            desc="Seamless asset liquidity across digital ecosystems and markets."
            count="03"
            color="pink"
          />
        </div>
      </main>

      {/* Quote Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="relative inline-block">
          <Quote className="text-[#892eff]/20 w-16 h-16 absolute -top-12 -left-12 rotate-180" />
          <h2 className="text-white text-2xl md:text-4xl font-bold italic leading-snug">
            "Smart hustlers don’t chase — <br />
            they build engines"
          </h2>
          <p className="mt-8 text-[#892eff] font-black uppercase tracking-[0.3em] text-sm">
            Founder's Axiom
          </p>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[0.5px] bg-gradient-to-r from-transparent via-[#892eff] to-transparent z-0"></div>
          <Step
            icon={<Fingerprint />}
            title="Apply"
            desc="Pass the vetting process."
          />
          <Step
            icon={<Rocket />}
            title="Deploy"
            desc="Activate the Aultum stack."
          />
          <Step
            icon={<RefreshCcw />}
            title="Scale"
            desc="Automate acquisition."
          />
          <Step icon={<Wallet />} title="Profit" desc="Instant payouts." />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60 text-[10px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#892eff] rounded flex items-center justify-center">
            <Network className="text-white w-3 h-3" />
          </div>
          <span>CoBrother</span>
        </div>
        <p>© 2026 DEVISE THE FUTURE. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

// Sub-components for cleaner code
const Card = ({ icon, title, desc, count, color, featured }) => {
  const colors = {
    primary: "text-[#892eff] bg-[#892eff]/20 border-[#892eff]/30",
    secondary: "text-[#00C3FF] bg-[#00C3FF]/20 border-[#00C3FF]/30",
    pink: "text-[#FF4EDB] bg-[#FF4EDB]/20 border-[#FF4EDB]/30",
  };

  return (
    <div
      className={`glass p-8 rounded-2xl flex flex-col items-start gap-6 group hover:border-[#892eff]/50 transition-all text-left relative ${featured ? "bg-[#892eff]/5 border-[#892eff]/30" : "bg-white/5 border-white/10 border"}`}
    >
      {featured && (
        <div className="absolute -top-3 -right-3 px-4 py-1.5 bg-gradient-to-r from-[#892eff] to-[#00C3FF] rounded-full text-[10px] font-black text-white shadow-lg flex items-center gap-2">
          <Zap size={12} /> 60% POWER
        </div>
      )}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:bg-opacity-100 ${colors[color]}`}
      >
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="mt-auto pt-6 w-full border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] font-black tracking-widest uppercase opacity-60">
          Status Active
        </span>
        <span className="font-bold">{count}</span>
      </div>
    </div>
  );
};

const Step = ({ icon, title, desc }) => (
  <div className="relative z-10 flex flex-col items-center text-center gap-6">
    <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center border border-[#892eff]/30 shadow-[0_0_30px_rgba(137,46,255,0.1)]">
      {React.cloneElement(icon, { className: "text-[#892eff] w-8 h-8" })}
    </div>
    <div>
      <h4 className="text-white font-bold uppercase tracking-wider mb-2">
        {title}
      </h4>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  </div>
);

export default BetheCobrotherpage;
