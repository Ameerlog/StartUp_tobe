// components/VipNumbers.jsx
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { vipNumbers } from "../data/number";

export default function NumbersMarketplace() {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_COUNT = 6;

  const displayedNumbers = useMemo(() => {
    return showAll ? vipNumbers : vipNumbers.slice(0, INITIAL_COUNT);
  }, [showAll]);

  const hasMore = vipNumbers.length > INITIAL_COUNT;

  return (
    <main className="relative bg-[#F8F9FA] text-slate-900 min-h-screen">
    
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <section className="border-b border-slate-200 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
          Business Numbers
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Choose your premium mobile number
            </p>
          </div>
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <AnimatePresence mode="popLayout">
            {vipNumbers.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border bg-slate-50">
                  📱
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  No VIP numbers found
                </h3>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
                  Check back soon for new numbers.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {displayedNumbers.map((item) => (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-red-200 hover:shadow-md transition"
                  >
         
                    <div className="p-4">
                
                      <div className="flex items-center justify-between mb-3">
                        <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                          ₹{parseInt(item.price).toLocaleString()}
                        </span>
                     
                      </div>

               
                      <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                        <div className="text-2xl sm:text-3xl font-bold tracking-wider">
                          <span className="text-slate-600">{item.prefix}</span>
                          <span className="text-red-500">{item.highlight}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <button className="flex-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition">
                          Buy Now
                        </button>
                    
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {hasMore && !showAll && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-red-300 transition shadow-sm"
              >
                View All ({vipNumbers.length - INITIAL_COUNT} more)
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </motion.div>
          )}

    
          {showAll && hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() => setShowAll(false)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-red-300 transition shadow-sm"
              >
                Show Less
                <svg
                  className="h-4 w-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}