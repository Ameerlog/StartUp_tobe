import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "What exactly do I get when I start?",
    answer:
      "You receive a complete startup foundation. This includes a brand name and domain, majority ownership of the brand, and access to an integrated platform for sales, operations, and management. Accounting and compliance support are included, with everything set up to work together from day one.",
  },
  {
    question: "Who owns the brand and domain?",
    answer:
      "You retain 70% ownership of the brand and full operational control. The ownership structure is designed to give founders long-term flexibility while still benefiting from ongoing platform support.",
  },
  {
    question: "Is this a software platform or a service?",
    answer:
      "It is both. The platform provides the core systems and tools, while our team supports setup, coordination, and early-stage operations. You don’t just get access to software — you start with a working system.",
  },
  {
    question: "How is this different from using multiple SaaS tools?",
    answer:
      "Using individual tools requires setup, integrations, and constant decisions. This platform delivers a pre-aligned foundation that reduces fragmentation, saves time, and avoids rebuilding systems as the startup grows.",
  },
  {
    question: "Who is this best suited for?",
    answer:
      "This is designed for early-stage founders, solopreneurs, and small teams who want to start with clarity, ownership, and structure. It is not intended for large enterprises or late-stage companies.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="lg:w-1/3">
            <h3 className="text-balance text-2xl font-medium tracking-tight text-white sm:text-4xl lg:text-5xl">
              Frequently asked questions
            </h3>
          </div>

          <div className="flex-1">
            <div className="divide-y divide-zinc-800 border-y border-zinc-800">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-medium text-white transition-colors group-hover:text-zinc-300 sm:text-lg">
          {faq.question}
        </span>

        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 group-hover:text-white"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-2 text-sm leading-relaxed text-zinc-400 sm:pr-12 sm:text-base">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
