import React from "react";
import { ArrowRight } from "lucide-react";
import { aiRoboticsData } from "../data/aiRobotics";

export default function AIRoboticsPage() {
  return (
    <main className="w-full min-h-screen bg-[#F8F9FA] text-slate-900">

  
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

   
      <section className="relative px-4 pt-30 pb-14 text-center max-w-4xl mx-auto z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
          AI & Robotics
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium">
          We enable intelligence inside everyday products.
          <br className="hidden sm:block" />
          <span className="text-slate-900">
            Hardware stays yours. Intelligence is ours.
          </span>
        </p>

      </section>

    
      <section className="relative px-4 pb-20 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {aiRoboticsData.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-red-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-6 right-6 text-xs font-mono font-bold text-slate-200 group-hover:text-red-100">
                  {card.id.toString().padStart(2, "0")}
                </div>

                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-700 mb-2">
                    {card.subtitle}
                  </p>

                  {card.desc && (
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {card.desc}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <button className="w-full flex items-center justify-between text-sm font-bold hover:text-red-600 transition-colors">
                    Get Started
                    <span className="bg-slate-100 p-1.5 rounded-full group-hover:bg-red-50 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <button className="group flex items-center gap-2 rounded-full bg-slate-900 text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-red-600 hover:shadow-red-600/30 hover:scale-105 transition-all duration-300">
            Partner With Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

    </main>
  );
}
