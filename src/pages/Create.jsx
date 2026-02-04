// Co-creation page :
import React from "react";
import {
  Layout,
  PenTool,
  Globe,
  Trophy,
  Star,
  Medal,
  ArrowRight,
  Rocket,
} from "lucide-react";
import BackgroundImage from "../assets/domain/bg1_white.svg";

const templates = [
  {
    title: "Landing Page",
    desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    icon: <Globe size={24} />,
  },
  {
    title: "Dashboard",
    desc: "Ut enim ad minim veniam quis nostrud exercitation.",
    icon: <Layout size={24} />,
  },
  {
    title: "Blog Template",
    desc: "Duis aute irure dolor in reprehenderit voluptate.",
    icon: <PenTool size={24} />,
  },
  {
    title: "E-Commerce",
    desc: "Excepteur sint occaecat cupidatat non proident.",
    icon: <Rocket size={24} />,
  },
];

const hallOfFame = [
  {
    title: "Best Design",
    desc: "Lorem ipsum dolor sit amet consectetur.",
    icon: <Trophy size={24} />,
  },
  {
    title: "Most Popular",
    desc: "Ut enim ad minim veniam quis nostrud.",
    icon: <Star size={24} />,
  },
  {
    title: "Top Rated",
    desc: "Duis aute irure dolor in reprehenderit.",
    icon: <Medal size={24} />,
  },
];

const sideItems = [
  { title: "Getting Started", desc: "Lorem ipsum dolor sit amet." },
  { title: "Documentation", desc: "Ut enim ad minim veniam." },
  { title: "API Reference", desc: "Duis aute irure dolor." },
  { title: "Community", desc: "Excepteur sint occaecat." },
  { title: "Support", desc: "Sunt in culpa qui officia." },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={BackgroundImage}
          alt="Background"
          className="fixed w-full h-full object-cover object-center opacity-[0.06]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Build Something Amazing
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto mb-8">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <button className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800">
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Popular Templates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Hall of Fame
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {hallOfFame.map((item, i) => (
                  <Card key={i} item={item} />
                ))}
              </div>
            </section>
          </div>

          <aside>
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Quick Links
            </h2>
            <div className="space-y-3">
              {sideItems.map((item, i) => (
                <SideCard key={i} item={item} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

const Card = ({ item }) => (
  <div className="p-6 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4 text-slate-600">
      {item.icon}
    </div>
    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
    <p className="text-sm text-slate-500">{item.desc}</p>
  </div>
);

const SideCard = ({ item }) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors">
    <div>
      <h4 className="font-medium text-slate-900">{item.title}</h4>
      <p className="text-sm text-slate-500">{item.desc}</p>
    </div>
    <ArrowRight size={16} className="text-slate-400" />
  </div>
);
