import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { domainCards } from "../data/domain";

const themes = ["All", "Technology", "Fashion", "Others"];

export default function MarketPlace() {
  const [theme, setTheme] = useState("All");
  const [cloneableOnly, setCloneableOnly] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return domainCards.filter((d) => {
      const themeOk = theme === "All" || d.theme === theme;
      const cloneOk = !cloneableOnly || d.cloneable === true;
      return themeOk && cloneOk;
    });
  }, [theme, cloneableOnly]);

  return (
    <main className="relative bg-[#F8F9FA] text-slate-900">

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />

      <section className="border-b border-slate-200 bg-transparent">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {themes.map((t) => {
                const active = t === theme;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={[
                      "rounded-full border px-3 py-1.5 text-xs sm:text-sm transition",
                      active
                        ? "border-slate-300 bg-red-500 text-slate-900"
                        : "border-slate-200 text-slate-700 hover:bg-white/50",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 px-4 py-1.5 text-xs sm:text-sm text-slate-700 hover:bg-white/50">
              <input
                type="checkbox"
                className="h-4 w-4 accent-red-500"
                checked={cloneableOnly}
                onChange={(e) => setCloneableOnly(e.target.checked)}
              />
              Cloneable themes only
            </label>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-10 sm:pb-14">
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center"
              >
                <div className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border bg-slate-50">
                  📋
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Cloneable designs coming soon
                </h3>
                <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-500">
                  We are working on custom CSS and animated themes.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                layout
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((item) => (
                  <motion.article
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-red-200 hover:shadow-md transition"
                  >
                    <button
                      onClick={() => navigate(`/marketplace/${item.slug}`)}
                      className="absolute inset-0 z-10"
                      aria-label={`Open ${item.title}`}
                    />

                    <div className="border-b border-slate-200 bg-slate-50 p-3">
                      <div className="aspect-4/3 flex items-center justify-center overflow-hidden rounded-xl bg-white">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">
                          {item.badge.label}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/marketplace/${item.slug}`);
                          }}
                          className="relative z-20 rounded-full bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-red-600 transition"
                        >
                          Buy now
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>

                      <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-slate-200 px-2 py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
