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

export default function CancellationRefundPolicy() {
  const lastUpdated = "13 March 2026";

  const sections = [
    { id: "cancellation-policy", title: "1. Cancellation Policy" },
    { id: "perishable-items", title: "2. Perishable Items" },
    { id: "damaged-items", title: "3. Damaged or Defective Items" },
    { id: "warranty-products", title: "4. Warranty Products" },
    { id: "refund-processing", title: "5. Refund Processing" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-transparent text-white pt-24 md:pt-28">
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
              Cancellation & Refund Policy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-display">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Your satisfaction,
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              our commitment
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
            At <span className="text-white font-semibold">CoBrother™</span>, we
            believe in helping our customers as far as possible. Our liberal
            cancellation and refund policy ensures transparency and fairness.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-neutral-400">
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5">
              <Clock className="h-4 w-4" />
              Last updated: <span className="text-white">{lastUpdated}</span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800/60 bg-neutral-900/40 px-3 py-1.5">
              <FileText className="h-4 w-4" />
              Read time: ~3 minutes
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
                        For questions about this policy, please{" "}
                        <span className="text-white">contact us</span> at
                        cobrother.com@gmail.com
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
                <PolicySection
                  id="cancellation-policy"
                  title="1. Cancellation Policy"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    Cancellations will be considered only if the request is made
                    immediately after placing the order. However, the
                    cancellation request may not be entertained if the orders
                    have been communicated to the vendors/merchants and they
                    have initiated the process of shipping them.
                  </p>
                  <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      <span className="text-blue-400 font-semibold">
                        Quick Cancellation:{" "}
                      </span>
                      Request cancellations as soon as possible after placing
                      your order for the best chance of approval.
                    </p>
                  </div>
                </PolicySection>

                <PolicySection
                  id="perishable-items"
                  title="2. Perishable Items"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    CoBrother does not accept cancellation requests for
                    perishable items such as flowers, eatables, and similar
                    products. However, refund or replacement can be made if the
                    customer establishes that the quality of product delivered
                    is not satisfactory.
                  </p>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>
                      Quality issues with perishable items are eligible for
                      refunds
                    </li>
                    <li>
                      Must report issues with documented evidence if possible
                    </li>
                    <li>
                      Refund/replacement approval is based on investigation by
                      our team
                    </li>
                  </ul>
                </PolicySection>

                <PolicySection
                  id="damaged-items"
                  title="3. Damaged or Defective Items"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    In case of receipt of damaged or defective items, please
                    report the same to our Customer Service team immediately.
                  </p>
                  <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-neutral-300 leading-relaxed">
                        Report damaged or defective items within{" "}
                        <strong>7 days</strong> of receipt of the products for
                        claim eligibility.
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    The request will be entertained once the merchant has
                    checked and determined the damage at their end.
                    Additionally, if you feel that the product received is not
                    as shown on the site or as per your expectations, bring it
                    to the notice of our Customer Service team within 7 days of
                    receiving the product.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                    Our Customer Service Team will review your complaint and
                    take an appropriate decision regarding refund or
                    replacement.
                  </p>
                </PolicySection>

                <PolicySection
                  id="warranty-products"
                  title="4. Warranty Products"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    In case of complaints regarding products that come with a
                    warranty from the manufacturer, please refer the issue
                    directly to the manufacturer. They will handle
                    warranty-related claims as per their warranty terms and
                    conditions.
                  </p>
                  <p className="text-neutral-400 text-sm sm:text-base mt-3 leading-relaxed">
                    CoBrother will assist you in facilitating communication with
                    the manufacturer if needed.
                  </p>
                </PolicySection>

                <PolicySection
                  id="refund-processing"
                  title="5. Refund Processing"
                >
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base mb-3">
                    For refunds approved by CoBrother:
                  </p>
                  <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-4 mb-3">
                    <p className="text-neutral-300 text-sm sm:text-base font-semibold">
                      Processing Time:{" "}
                      <span className="text-purple-300">6-8 business days</span>
                    </p>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-2">
                      Refunds are processed to your original payment method
                      after approval
                    </p>
                  </div>
                  <ul className="text-neutral-300 text-sm sm:text-base leading-relaxed list-disc pl-5 space-y-2">
                    <li>
                      Refund approval is subject to verification of your claim
                    </li>
                    <li>
                      Processing time may vary based on your bank or payment
                      provider
                    </li>
                    <li>
                      You will receive confirmation once the refund is initiated
                    </li>
                    <li>
                      Contact support if refund is not received within the
                      stated timeframe
                    </li>
                  </ul>
                </PolicySection>
              </div>
            </div>

            {/* spacing bottom */}
            <div className="h-10" />

            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative rounded-2xl border border-neutral-800/50 bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl p-6 sm:p-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Need Help?
                  </h3>
                  <p className="text-neutral-300 mb-4">
                    For any questions or concerns regarding this Cancellation &
                    Refund Policy, please reach out to our support team:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-neutral-800/50 bg-neutral-950/30 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-purple-400" />
                        <h4 className="text-sm font-semibold text-white/90">
                          Support contact
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-300">
                        Email:
                        <a
                          href="mailto:cobrother.com@gmail.com"
                          className="text-white hover:text-purple-400 transition"
                        >
                          {" "}
                          cobrother.com@gmail.com
                        </a>
                      </p>
                      <p className="text-sm text-neutral-300 mt-1">
                        Phone:
                        <span className="text-white"> 080 8575 8575</span>
                      </p>
                    </div>
                    <div className="rounded-xl border border-neutral-800/50 bg-neutral-950/30 p-4">
                      <h4 className="text-sm font-semibold text-white/90 mb-2">
                        Company details
                      </h4>
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
                  <p className="text-neutral-400 text-sm mt-4">
                    We're here to help ensure your complete satisfaction!
                  </p>
                </div>
              </div>
            </motion.div>
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
