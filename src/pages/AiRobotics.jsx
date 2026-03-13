import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { aiRoboticsData } from "../data/aiRobotics";
import { pricingPlans } from "../data/pricingPlans";

export default function AIRoboticsPage() {
  return (
    <main className="w-full min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div
        className="fixed inset-0 pointer-events-none 
        bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),
        linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
        bg-[size:24px_24px]"
      />

      {/* HERO */}
      <section className="relative px-4 pt-32 pb-14 text-center max-w-4xl mx-auto z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter font-display">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Co-Operation
          </span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent leading-relaxed max-w-2xl mx-auto font-medium">
          Intelligent Business Operations
          <br className="hidden sm:block" />
          <span className="text-neutral-400">
            We streamline internal systems using automation, dashboards, and
            AI-driven operational intelligence.
          </span>
        </p>
      </section>

      {/* OUR OPERATIONS PRODUCTS */}
      <section className="relative px-4 pb-20 max-w-7xl mx-auto z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Our Operations Products
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {aiRoboticsData.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="group relative rounded-2xl p-6 sm:p-8 flex flex-col
                bg-neutral-900/90 border border-neutral-800/60
                hover:border-neutral-700 hover:-translate-y-1
                transition-all duration-300"
              >
                <div
                  className="absolute -inset-0.5 rounded-2xl blur 
                  bg-gradient-to-r from-purple-600/30 to-blue-600/30
                  opacity-0 group-hover:opacity-60 transition"
                />

                <div className="absolute top-6 right-6 text-xs font-mono font-bold text-neutral-500 group-hover:text-white">
                  {card.id.toString().padStart(2, "0")}
                </div>

                <div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6
                  bg-gradient-to-br from-purple-500/10 to-blue-500/10
                  border border-neutral-800 group-hover:border-white transition"
                >
                  <Icon className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors" />
                </div>

                <div className="relative flex-1">
                  <h3 className="text-xl font-bold mb-3 text-neutral-300 group-hover:text-white">
                    {card.title}
                  </h3>

                  <p className="text-sm font-medium text-neutral-400 mb-2">
                    {card.subtitle}
                  </p>

                  {card.desc && (
                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {card.desc}
                    </p>
                  )}
                </div>

                <div className="relative mt-6 pt-5 border-t border-neutral-800">
                  <button className="w-full flex items-center justify-between text-sm font-bold text-neutral-400 group-hover:text-white transition">
                    List Your Creation
                    <span className="bg-neutral-800 p-1.5 rounded-full">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="relative px-4 pb-28 max-w-7xl mx-auto z-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Pricing Plans
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col bg-neutral-900 border
              ${
                plan.highlight
                  ? "border-purple-500/60 scale-[1.03]"
                  : "border-neutral-800"
              }`}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2
                  text-xs font-bold px-3 py-1 rounded-full
                  bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-3xl font-extrabold mb-1">{plan.price}</p>
              <p className="text-sm text-neutral-400 mb-6">per month</p>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-neutral-300"
                  >
                    <Check className="w-4 h-4 text-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="mt-8 w-full rounded-full py-3 text-sm font-bold
                bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
              >
                List Your Creation
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
