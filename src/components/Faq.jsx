import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Is AULTUM a ready-made CRM or custom built?",
    answer:
      "AULTUM is a ready-to-use, highly customizable CRM platform built on a scalable white-label infrastructure.",
  },
  {
    question: "Can I use AULTUM for my own business?",
    answer:
      "Yes. AULTUM is designed for startups, SMEs, agencies, and service businesses to manage leads, customers, and operations.",
  },
  {
    question: "Can I resell AULTUM as my own CRM?",
    answer:
      "Yes. AULTUM supports full white-labeling, allowing you to sell CRM services under your own brand.",
  },
  {
    question: "Does AULTUM support WhatsApp & Email automation?",
    answer:
      "Yes. AULTUM supports WhatsApp, Email, and SMS automation depending on the plan and integrations.",
  },
  {
    question: "Is there any setup or onboarding support?",
    answer:
      "Yes. We provide onboarding support, system setup, and guidance based on your selected plan.",
  },
  {
    question: "Is AULTUM AI-powered?",
    answer:
      "AULTUM is AI-ready, meaning it supports advanced automation and can integrate with AI tools for smart workflows.",
  },
  {
    question: "Can I upgrade or downgrade plans?",
    answer:
      "Yes. Plans are flexible and can be upgraded or adjusted based on your business needs.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   
        <div className="flex flex-col lg:flex-row lg:gap-12">

          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 text-center lg:text-left sm:text-5xl">
             Frequently asked questions
            </h3>
          </div>

          <div className="flex-1">
            <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
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
        className="flex w-full items-start justify-between py-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-zinc-900 group-hover:text-zinc-700">
          {faq.question}
        </span>
        <span className="ml-6 flex h-7 items-center">
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 group-hover:text-zinc-600"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </motion.div>
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12 text-base leading-relaxed text-zinc-500">
              <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
