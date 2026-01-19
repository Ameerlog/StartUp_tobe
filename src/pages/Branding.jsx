import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MarketPlace from "./MarketPlace";
import NumbersMarketplace from "./NumbersMarket";
import MerchandiseMarket from "./MerchandiseMarket";


// function MerchandiseMarketplace() {
//   return (
//     <div className="mx-auto max-w-6xl px-4 py-10">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="rounded-2xl border border-slate-200 bg-white p-8 text-center"
//       >
//         <h3 className="text-xl font-semibold text-slate-900">
//           Merchandise Coming Soon
//         </h3>
//         <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
//           We're working on exclusive branded merchandise. Stay tuned for premium apparel and accessories.
//         </p>
//       </motion.div>
//     </div>
//   );
// }



export default function Branding() {
  const [activeTab, setActiveTab] = useState("domains");

  const tabs = [
    { id: "domains", label: "Domains" },
    { id: "numbers", label: "Business Numbers" },
    { id: "merchandise", label: "Merchandise" },
  ];

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#F8F9FA] text-slate-900">

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <section className="relative pt-25 pb-10 text-center z-10">
        <div className="mx-auto max-w-4xl px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 text-5xl sm:text-6xl font-bold tracking-tighter"
          >
            Branding
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-slate-500 font-medium leading-relaxed"
          >
            We provide premium domains, branded merchandise, and memorable numbers
            to help businesses and individuals build a strong, unique identity.
          </motion.p>

     

          <div className="mt-8 flex justify-center">
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative z-10 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-center gap-1 sm:gap-2 py-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative
                  rounded-full px-4 sm:px-6 py-2 sm:py-2.5 
                  text-xs sm:text-sm font-semibold 
                  transition-all duration-300 cursor-pointer
                  ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }
                `}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-900 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 ">
        <AnimatePresence mode="wait">
          {activeTab === "domains" && (
            <motion.div
              key="domains"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              
            >
              <MarketPlace />
            </motion.div>
          )}

          {activeTab === "numbers" && (
            <motion.div
              key="numbers"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <NumbersMarketplace />
            </motion.div>
          )}

          {activeTab === "merchandise" && (
            <motion.div
              key="merchandise"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <MerchandiseMarket />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}