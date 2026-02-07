import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Mail, Clock, ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "Feb 7, 2026"; // change anytime

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "data-we-collect", title: "Data we collect" },
    { id: "how-we-use", title: "How we use data" },
    { id: "sharing", title: "Sharing & disclosures" },
    { id: "cookies", title: "Cookies & analytics" },
    { id: "retention", title: "Retention" },
    { id: "security", title: "Security" },
    { id: "rights", title: "Your rights (India DPDP)" },
    { id: "children", title: "Children’s data" },
    { id: "contact", title: "Contact & grievances" },
    { id: "changes", title: "Changes to this policy" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 20, -20, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 10,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black/95" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-400/10 to-blue-500/10 px-4 py-2 mb-5">
            <Shield className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Privacy Policy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Your data,
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              handled with care
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            This Privacy Policy explains how{" "}
            <span className="text-white font-semibold">CoBrother™</span> (“we”,
            “us”) collects, uses, and protects your information when you use our
            website and services.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-neutral-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5">
              <Clock className="h-4 w-4" />
              Last updated: <span className="text-white">{lastUpdated}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5">
              <FileText className="h-4 w-4" />
              Read time: ~5 minutes
            </span>
          </div>
        </motion.div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* TOC (desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur opacity-40 group-hover:opacity-60 transition duration-500" />
                <div className="relative rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6">
                  <h2 className="text-sm font-semibold text-white/90 mb-4">
                    On this page
                  </h2>
                  <ul className="space-y-2">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => scrollTo(s.id)}
                          className="group flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/40 transition"
                        >
                          <span className="truncate">{s.title}</span>
                          <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-neutral-800/50 bg-neutral-950/40 p-4">
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Quick note: Replace placeholders like{" "}
                      <span className="text-white">[Support Email]</span> and{" "}
                      <span className="text-white">[Company Legal Name]</span>{" "}
                      before publishing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <div className="relative group">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 sm:p-8">
                {/* Mobile TOC */}
                <div className="lg:hidden mb-8">
                  <h2 className="text-sm font-semibold text-white/90 mb-3">
                    On this page
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => scrollTo(s.id)}
                        className="text-xs rounded-full border border-neutral-800/60 bg-neutral-950/30 px-3 py-1.5 text-neutral-300 hover:text-white hover:border-neutral-700/60 transition"
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sections */}
                <PolicySection id="overview" title="1) Overview">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    CoBrother™ is a SaaS-enabled platform that helps founders
                    and businesses with domains, compliance, and operational
                    support. This policy applies to our website, our
                    communications, and any forms you submit to us.
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm sm:text-base mt-3">
                    If you do not agree with this policy, please do not use our
                    website or submit personal information.
                  </p>
                </PolicySection>

                <PolicySection id="data-we-collect" title="2) Data we collect">
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>
                      Contact data: name, email, phone number, company name.
                    </li>
                    <li>
                      Communication data: messages you send through forms,
                      email, or chat.
                    </li>
                    <li>
                      Service data: details you provide to request
                      startup/compliance/business support (you control what you
                      share).
                    </li>
                    <li>
                      Technical data: device/browser info, IP address, basic
                      logs (for security and performance).
                    </li>
                  </ul>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3">
                    Optional: If you later add payments, document uploads, or
                    booking, update this section accordingly.
                  </p>
                </PolicySection>

                <PolicySection id="how-we-use" title="3) How we use data">
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>
                      To respond to inquiries and provide requested services.
                    </li>
                    <li>To schedule calls/meetings and support delivery.</li>
                    <li>
                      To improve our website, offerings, and user experience.
                    </li>
                    <li>To prevent fraud, abuse, and security incidents.</li>
                  </ul>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3">
                    Under India’s Digital Personal Data Protection Act, 2023,
                    consent should be free, specific, informed, and
                    withdrawable. [page:0]
                  </p>
                </PolicySection>

                <PolicySection id="sharing" title="4) Sharing & disclosures">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    We may share personal data with trusted service providers
                    (for example: hosting, email, analytics, customer support
                    tools) only as needed to run our services.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    We may disclose information if required to comply with law,
                    enforce our policies, or protect rights, safety, and
                    security.
                  </p>
                </PolicySection>

                <PolicySection id="cookies" title="5) Cookies & analytics">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    We may use cookies or similar technologies for basic site
                    functionality, security, and analytics.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    If you add analytics tools (e.g., Google Analytics) or
                    advertising pixels later, list them here and provide opt-out
                    instructions.
                  </p>
                </PolicySection>

                <PolicySection id="retention" title="6) Retention">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    We keep personal data only as long as needed for the
                    purposes described above, unless longer retention is
                    required by law or for legitimate business needs.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    DPDP Act requires erasure when consent is withdrawn or when
                    the purpose is no longer served (unless retention is legally
                    necessary). [page:0]
                  </p>
                </PolicySection>

                <PolicySection id="security" title="7) Security">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    We use reasonable safeguards to protect personal data. No
                    method of transmission or storage is 100% secure, but we
                    work to prevent unauthorized access.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    The DPDP Act places obligations on data fiduciaries to take
                    reasonable security safeguards and to intimate breaches to
                    affected users and the Board as prescribed. [page:0]
                  </p>
                </PolicySection>

                <PolicySection id="rights" title="8) Your rights (India DPDP)">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    If you are in India, you may have rights to access
                    information about your personal data, request
                    correction/erasure, and use grievance redressal mechanisms.
                    [page:0]
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    To request these, contact us using the details in the
                    “Contact & grievances” section.
                  </p>
                </PolicySection>

                <PolicySection id="children" title="9) Children’s data">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    Our services are not intended for children. Under the DPDP
                    Act, a child is an individual under 18, and processing
                    children’s data requires verifiable parental consent in
                    prescribed cases. [page:0]
                  </p>
                </PolicySection>

                <PolicySection id="contact" title="10) Contact & grievances">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/30 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <h3 className="text-sm font-semibold text-white/90">
                          Privacy contact
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-300">
                        Email:{" "}
                        <span className="text-white">[Support Email]</span>
                      </p>
                      <p className="text-xs text-neutral-500 mt-2">
                        Example: privacy@cobrother.in
                      </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/30 p-5">
                      <h3 className="text-sm font-semibold text-white/90 mb-2">
                        Company details
                      </h3>
                      <p className="text-sm text-neutral-300">
                        Legal name:{" "}
                        <span className="text-white">[Company Legal Name]</span>
                      </p>
                      <p className="text-sm text-neutral-300">
                        Address:{" "}
                        <span className="text-white">[Company Address]</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
                    The DPDP Act also requires an effective grievance redressal
                    mechanism and describes a right of grievance redressal.
                    [page:0]
                  </p>
                </PolicySection>

                <PolicySection id="changes" title="11) Changes to this policy">
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    We may update this Privacy Policy from time to time. We will
                    post the latest version on this page and update the “Last
                    updated” date.
                  </p>
                </PolicySection>

                {/* Bottom note */}
                <div className="mt-10 rounded-2xl border border-neutral-800/50 bg-neutral-950/30 p-5">
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Draft note: This page is a starter template to help you
                    publish a clean Privacy Policy. When you share your exact
                    forms + third-party tools, we’ll tailor the content
                    precisely.
                  </p>
                </div>
              </div>
            </div>

            {/* spacing bottom */}
            <div className="h-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PolicySection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-lg sm:text-xl font-bold text-white mb-3 mt-10 first:mt-0">
        {title}
      </h2>
      {children}
      <div className="mt-8 border-t border-neutral-800/50" />
    </section>
  );
}
