import React from "react";
import {
  Globe,
  Trophy,
  Star,
  Medal,
  ArrowRight,
  Users,
  UploadCloud,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";

const challenges = [
  {
    title: "Brand Identity Challenge",
    desc: "Design a complete brand identity including logo, colors, and typography.",
    category: "Design / Branding",
    reward: "₹10,000",
  },
  {
    title: "Landing Page Concept",
    desc: "Create a high-converting landing page concept for a startup idea.",
    category: "Marketing / Design",
    reward: "₹7,500",
  },
  {
    title: "Marketing Campaign Strategy",
    desc: "Plan a digital marketing campaign to drive early traction and growth.",
    category: "Marketing / Growth",
    reward: "₹15,000",
  },
  {
    title: "Product Feature Idea",
    desc: "Suggest a valuable product feature that solves a real user problem.",
    category: "Product / Tech",
    reward: "₹12,000",
  },
  {
    title: "Domain & Naming Suggestions",
    desc: "Propose brandable domain names and naming ideas for a startup.",
    category: "Brand / Naming",
    reward: "₹5,000",
  },
];

const howItWorks = [
  {
    title: "Pick a Challenge ",
    desc: "Explore open challenges from startups and brands.",
    icon: <Globe size={24} />,
  },
  {
    title: "Submit Your Solution",
    desc: "Share your ideas, designs, or strategies.",
    icon: <UploadCloud size={24} />,
  },
  {
    title: "Collaborate",
    desc: "Get feedback, refine, and discuss with the community.",
    icon: <Users size={24} />,
  },
  {
    title: "Get Rewarded",
    desc: "Top solutions are recognized and showcased.",
    icon: <CheckCircle2 size={24} />,
  },
];

const highlights = [
  {
    title: "Top Contributors",
    desc: "Builders delivering high-impact solutions.",
    icon: <Trophy size={24} />,
  },
  {
    title: "Most Loved Solutions",
    desc: "Community-voted ideas with the highest engagement.",
    icon: <Star size={24} />,
  },
  {
    title: "Hall of Fame",
    desc: "Challenges that became funded startups.",
    icon: <Medal size={24} />,
  },
];

export default function CoCreation() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-6xl mx-auto px-6 pt-36 pb-24 text-center z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Build Something Together
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Collaborate. Solve. Build.
          </span>
        </h1>

        <p className="text-neutral-400 max-w-2xl mx-auto mb-10 text-lg">
          Welcome to CoBrother’s Virtual Workspace — where challenges meet
          collaborators and ideas turn into action.
        </p>

        <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-semibold inline-flex items-center gap-2">
          Start Solving Challenges <ArrowRight />
        </button>
      </motion.div>

      <section className="relative max-w-6xl mx-auto px-6 pb-24 z-10">
        <SectionHeader
          title="Challenges Waiting for Solutions"
          subtitle="Pick a challenge, contribute your skills, and get recognized rewards, visibility, and real impact await."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {challenges.map((item, i) => (
            <ChallengeCard key={i} item={item} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium">
            Browse All Challenges →
          </button>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24 z-10">
        <SectionHeader
          title="Solve Challenges in 4 Easy Steps"
          subtitle="From idea selection to real-world recognition"
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((item, i) => (
            <InfoCard key={i} item={item} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium inline-flex items-center gap-2">
            Start Solving <ArrowRight />
          </button>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24 z-10 text-center">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Got a Problem? Let the Community Solve It
          </h2>

          <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
            Submit your business challenge and get actionable solutions from
            co-founders, investors, and experts. CoBrother guides your challenge
            to the right collaborators.
          </p>

          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium inline-flex items-center gap-2">
            Submit Challenge <MessageSquare size={18} />
          </button>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-6 pb-24 z-10">
        <SectionHeader
          title="Community Highlights"
          subtitle="Connect with co-founders, investors, and expert collaborators."
          center
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <InfoCard key={i} item={item} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium">
            Join the Community →
          </button>
        </div>
      </section>
    </div>
  );
}

const SectionHeader = ({ title, subtitle, center }) => (
  <div className={`mb-12 ${center ? "text-center" : ""}`}>
    <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
    {subtitle && (
      <p className="text-neutral-400 max-w-2xl mx-auto">{subtitle}</p>
    )}
    <div
      className={`mt-6 h-px w-24 bg-neutral-700 ${center ? "mx-auto" : ""}`}
    />
  </div>
);

const ChallengeCard = ({ item }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
    <div className="flex justify-between mb-4">
      <span className="text-xs px-3 py-1 rounded-full bg-neutral-800">
        {item.category}
      </span>
      <span className="text-sm font-semibold text-purple-400">
        {item.reward}
      </span>
    </div>
    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
    <p className="text-sm text-neutral-400 mb-6">{item.desc}</p>
    <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-sm mx-auto block">
      Join Challenge →
    </button>
  </div>
);

const InfoCard = ({ item }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center">
    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-neutral-800 flex items-center justify-center text-purple-400">
      {item.icon}
    </div>
    <h3 className="font-semibold mb-2">{item.title}</h3>
    <p className="text-sm text-neutral-400">{item.desc}</p>
  </div>
);
