import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DESIGNS } from "../data/design";

const themes = ["All", "Technology", "Fashion", "Others"];

export default function MarketPlace() {
  const [theme, setTheme] = useState("All");
  const [cloneableOnly, setCloneableOnly] = useState(false);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    return DESIGNS.filter((d) => {
      const themeOk = theme === "All" ? true : d.theme === theme;
      const cloneOk = cloneableOnly ? d.cloneable === true : true;
      return themeOk && cloneOk;
    });
  }, [theme, cloneableOnly]);

  return (
    <main className="min-h-screen bg-white text-zinc-950">

      <section className="relative overflow-hidden border-b border-zinc-200">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-fuchsia-500/15 via-indigo-500/10 to-transparent blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mx-auto mb-5 sm:mb-6 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl border border-zinc-200 bg-white/70">
              <span className="text-lg">🖌️</span>
            </div>

            <h1 className="font-semibold tracking-tight text-[clamp(2rem,6vw,4.5rem)]">
              Premium Domain Marketplace
            </h1>

            <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base text-zinc-600">
              A premium, brand-ready domain built for modern startups.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {themes.map((t) => {
                const active = t === theme;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={[
                      "rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm transition",
                      active
                        ? "border-zinc-300 bg-zinc-100 text-zinc-950"
                        : "border-zinc-200 bg-transparent text-zinc-700 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
                  
              })}
            </div>

            <label className="flex w-full sm:w-auto cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-transparent px-4 py-2 text-xs sm:text-sm text-zinc-700 hover:bg-zinc-50">
              <input
                type="checkbox"
                className="h-4 w-4 accent-zinc-950"
                checked={cloneableOnly}
                onChange={(e) => setCloneableOnly(e.target.checked)}
              />
              Cloneable themes only
            </label>
          </div>
        </div>
      </section>

      <section className="bg-white pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10 text-center"
              >
                <div className="mx-auto mb-5 sm:mb-6 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-2xl border border-zinc-200 bg-white">
                  <span className="text-lg">📋</span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold">Cloneable designs coming soon!</h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600">
                  Were currently working on some fabulous designs using custom CSS and animations.
                </p>
              </motion.div>
            ) : (
              <motion.div key="grid" layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <motion.article
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300"
                  >

                    <button
                      type="button"
                      onClick={() => navigate(`/marketplace/${item.slug}`)}
                      className="absolute inset-0 z-10"
                      aria-label={`Open ${item.title}`}
                    />

                    <div className="border-b border-zinc-200 bg-zinc-50 p-3">
                      <div className="aspect-4/3 overflow-hidden rounded-xl bg-white flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-zinc-900/5 px-2 py-1 text-[11px] tracking-wider text-zinc-700">
                          {item.badge.label}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/marketplace/${item.slug}`);
                          }}
                          className="relative z-20 rounded-full bg-zinc-950 px-3 py-1.5 text-[11px] font-semibold text-white hover:opacity-95"
                        >
                          Buy now
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="text-sm font-semibold">{item.title}</div>

                      <p className="mt-2 text-xs text-zinc-600 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-600">
                        {item.tags.map((t) => (
                          <span key={t} className="rounded-full border border-zinc-200 px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pointer-events-none absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/70 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                      ↗
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
