import React from "react";
import { motion } from "framer-motion";

import Domains from "../components/Home/Domians";
function CTAButtons() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
      <a
        href="/pricing"
        className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/30"
      >
        Get Filing & Compliance with StartupToBe
      </a>
      <a
        href="/demo"
        className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20"
      >
        Watch demo
      </a>
    </div>
  );
}

export default function Branding() {
  return (
    <main id="main" className="bg-white text-zinc-900">

      <section className="relative overflow-hidden pb-0 pt-16">
 
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-fuchsia-500/18 via-indigo-500/10 to-transparent blur-3xl" />

     
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(113,113,122,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(113,113,122,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl text-center">
              <div className="text-sm font-semibold tracking-wide text-zinc-500">
                Branding
              </div>

              <p className="mt-3 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
               Branding
              </p>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600">
                Starting a business is exciting. 
                Missing a filing deadline isn’t. 
                StartupToBe takes care of registrations, filings, and compliance — so your startup stays legal, credible, and stress-free. 
              </p>

              <CTAButtons />

              <p className="mt-4 text-sm text-zinc-500">
                No contracts • Connect Stripe in minutes • Cancel anytime
              </p>

              <div className="mt-10 flex justify-center">
                <div className="h-px w-72 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Domains/>
    </main>
  );
}
