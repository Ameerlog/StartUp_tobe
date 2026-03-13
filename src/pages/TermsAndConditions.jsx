import React from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  FileText,
  Mail,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

export default function TermsAndConditions() {
  const lastUpdated = "13 March 2026";

  const sections = [
    { id: "acceptance", title: "1. Acceptance of terms" },
    { id: "services", title: "2. Services we provide" },
    { id: "user-obligations", title: "3. Your obligations" },
    { id: "intellectual-property", title: "4. Intellectual property" },
    { id: "payments", title: "5. Payments & refunds" },
    { id: "confidentiality", title: "6. Confidentiality" },
    { id: "disclaimers", title: "7. Disclaimers" },
    { id: "liability", title: "8. Limitation of liability" },
    { id: "termination", title: "9. Termination" },
    { id: "governing-law", title: "10. Governing law" },
    { id: "changes", title: "11. Changes to these terms" },
    { id: "contact", title: "12. Contact us" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white pt-24 md:pt-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 20, -20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
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
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 mb-5">
            <FileCheck className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Terms & Conditions
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Simple rules,
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              clear partnership
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            These Terms & Conditions govern your use of{" "}
            <span className="text-white font-semibold">CoBrother™ </span>{" "}
            services. By using our platform, you agree to these terms.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-neutral-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5">
              <Clock className="h-4 w-4" />
              Last updated: <span className="text-white">{lastUpdated}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5">
              <FileText className="h-4 w-4" />
              Read time: ~6 minutes
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
                          <span className="truncate text-left">{s.title}</span>
                          <ChevronRight className="h-4 w-4 opacity-60 group-hover:opacity-100 transition flex-shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-neutral-800/50 bg-neutral-950/40 p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Replace{" "}
                        <span className="text-white">[placeholders]</span> with
                        your actual company details before going live.
                      </p>
                    </div>
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
                <TermsSection id="acceptance" title="1. Acceptance of terms">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    By accessing or using CoBrother™ (the "Service"), you agree
                    to be bound by these Terms & Conditions. If you do not
                    agree, please do not use our Service.
                  </p>
                  <p className="text-neutral-400 leading-relaxed text-sm sm:text-base mt-3">
                    These terms constitute a legally binding agreement between
                    you and{" "}
                    <span className="text-white">
                      AULTUM INTERNATIONAL (Proprietor: Neminath Surendra
                      Akkole)
                    </span>{" "}
                    ("CoBrother", "we", "us").
                  </p>
                </TermsSection>

                <TermsSection id="services" title="2. Services we provide">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    CoBrother provides:
                  </p>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>Domain registration and marketplace services</li>
                    <li>Business compliance and registration support</li>
                    <li>Co-venture, co-branding, and co-marketing solutions</li>
                    <li>
                      Operational support ("your business bhai beside you")
                    </li>
                  </ul>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    Services may be updated or modified at our discretion. We
                    will notify users of material changes.
                  </p>
                </TermsSection>

                <TermsSection id="user-obligations" title="3. Your obligations">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    When using CoBrother, you agree to:
                  </p>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>Provide accurate, complete, and current information</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>
                      Not misuse the Service or interfere with its operation
                    </li>
                    <li>
                      Not engage in fraudulent, abusive, or harmful activities
                    </li>
                    <li>
                      Maintain the security and confidentiality of your account
                      credentials
                    </li>
                  </ul>
                </TermsSection>

                <TermsSection
                  id="intellectual-property"
                  title="4. Intellectual property"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    All content, branding, software, and materials on CoBrother
                    (including the CoBrother™ name, logo, and design) are owned
                    by us or our licensors and protected by intellectual
                    property laws.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    You may not copy, modify, distribute, or create derivative
                    works without our prior written consent.
                  </p>
                </TermsSection>

                <TermsSection id="payments" title="5. Payments & refunds">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    Some services require payment. Payment terms:
                  </p>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>
                      Prices are displayed in INR (Indian Rupees) unless
                      otherwise stated
                    </li>
                    <li>
                      Payment is due at the time of service request or booking
                    </li>
                    <li>We use secure third-party payment processors</li>
                    <li>
                      Refunds are handled on a case-by-case basis as per our
                      Refund Policy
                    </li>
                  </ul>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    For refund requests, contact us at{" "}
                    <a
                      href="mailto:cobrother.com@gmail.com"
                      className="text-white hover:text-purple-400 transition"
                    >
                      cobrother.com@gmail.com
                    </a>
                  </p>
                </TermsSection>

                <TermsSection id="confidentiality" title="6. Confidentiality">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    We respect your business information. Any confidential
                    information you share with us during service delivery
                    (documents, business plans, strategies) will be kept
                    confidential and not disclosed to third parties without your
                    consent, except as required by law.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    You also agree to keep any proprietary information shared by
                    CoBrother confidential.
                  </p>
                </TermsSection>

                <TermsSection id="disclaimers" title="7. Disclaimers">
                  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 mb-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        CoBrother services are provided "as is" and "as
                        available" without warranties of any kind, either
                        express or implied.
                      </p>
                    </div>
                  </div>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>
                      We do not guarantee uninterrupted or error-free service
                    </li>
                    <li>
                      We are not liable for third-party service failures
                      (hosting, payment gateways, etc.)
                    </li>
                    <li>
                      Business outcomes depend on many factors; we make no
                      guarantees of success
                    </li>
                  </ul>
                </TermsSection>

                <TermsSection id="liability" title="8. Limitation of liability">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    To the maximum extent permitted by law, CoBrother and its
                    team shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your use of
                    the Service.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    Our total liability for any claim related to the Service is
                    limited to the amount you paid us in the 12 months prior to
                    the claim.
                  </p>
                </TermsSection>

                <TermsSection id="termination" title="9. Termination">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    We may suspend or terminate your access to CoBrother if:
                  </p>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>You violate these Terms</li>
                    <li>You engage in fraudulent or illegal activity</li>
                    <li>We are required to do so by law</li>
                  </ul>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    You may also stop using the Service at any time. Upon
                    termination, certain provisions (intellectual property,
                    disclaimers, liability) survive.
                  </p>
                </TermsSection>

                <TermsSection id="governing-law" title="10. Governing law">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    These Terms are governed by the laws of India. Any disputes
                    shall be subject to the exclusive jurisdiction of the courts
                    in{" "}
                    <span className="text-white">
                      Dharwad, Hubballi Karnataka
                    </span>
                    , India.
                  </p>
                </TermsSection>

                <TermsSection id="changes" title="11. Changes to these terms">
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    We may update these Terms from time to time. Changes will be
                    posted on this page with an updated "Last updated" date.
                    Continued use of the Service after changes constitutes
                    acceptance.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    Material changes will be communicated via email or prominent
                    notice on our website.
                  </p>
                </TermsSection>

                <TermsSection id="contact" title="12. Contact us">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/30 p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <h3 className="text-sm font-semibold text-white/90">
                          Support contact
                        </h3>
                      </div>

                      <p className="text-sm text-neutral-300">
                        Email:
                        <a
                          href="mailto:cobrother.com@gmail.com"
                          className="text-white hover:text-purple-400 transition"
                        >
                          cobrother.com@gmail.com
                        </a>
                      </p>

                      <p className="text-sm text-neutral-300 mt-1">
                        Phone:
                        <span className="text-white"> 080 8575 8575</span>
                      </p>
                    </div>

                    <div className="rounded-2xl border border-neutral-800/50 bg-neutral-950/30 p-5">
                      <h3 className="text-sm font-semibold text-white/90 mb-2">
                        Company details
                      </h3>

                      <p className="text-sm text-neutral-300">
                        Legal name:
                        <span className="text-white">
                          {" "}
                          AULTUM INTERNATIONAL (Proprietor: Neminath Surendra
                          Akkole)
                        </span>
                      </p>

                      <p className="text-sm text-neutral-300 mt-1">
                        Address:
                        <span className="text-white">
                          {" "}
                          Dharwad, Hubballi Karnataka, India
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-neutral-800/50 bg-neutral-950/30 p-4">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      For questions regarding these Terms & Conditions, please
                      contact us using the details above.
                    </p>
                  </div>
                </TermsSection>
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

function TermsSection({ id, title, children }) {
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
