import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Handshake, Rocket, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: "01",
      icon: Users,
      title: "Sign Up & Create Profile",
      description:
        "Join CoBrother and tell us about your business, skills, and what you're looking for in a partnership.",
      color: "from-purple-400 to-pink-500",
    },
    {
      number: "02",
      icon: Handshake,
      title: "Find Your Match",
      description:
        "Browse opportunities or get matched with businesses that align with your goals, industry, and values.",
      color: "from-pink-500 to-fuchsia-500",
    },
    {
      number: "03",
      icon: Rocket,
      title: "Collaborate & Launch",
      description:
        "Use our tools to plan, communicate, and execute your partnership strategy with confidence.",
      color: "from-fuchsia-500 to-purple-600",
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Grow Together",
      description:
        "Track progress, share resources, and scale your success through strategic collaboration.",
      color: "from-purple-600 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 md:pt-28 pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            How{" "}
            <span className="bg-gradient-to-r from-red-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              CoBrother
            </span>{" "}
            Works
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Four simple steps to unlock powerful partnerships and grow your
            business faster together.
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-12 group`}
            >
              {/* Icon & Number Side */}
              <div className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                  className="relative cursor-pointer"
                >
                  {/* Gradient Background - Intensifies on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} blur-3xl opacity-30 group-hover:opacity-50 rounded-full transition-opacity duration-300`}
                  />

                  {/* Icon Container */}
                  <motion.div
                    whileHover={{
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 20px 60px rgba(168, 85, 247, 0.4)",
                    }}
                    className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 transition-all duration-300"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="w-16 h-16 md:w-20 md:h-20 text-white group-hover:drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] transition-all duration-300" />
                      </motion.div>
                      <div
                        className={`absolute -top-4 -right-4 text-6xl md:text-7xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                      >
                        {step.number}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Content Side */}
              <motion.div
                whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                transition={{ duration: 0.3 }}
                className="flex-1 text-center md:text-left"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`inline-block px-4 py-1.5 rounded-full bg-gradient-to-r ${step.color} text-white text-sm font-semibold mb-4 cursor-pointer`}
                >
                  Step {step.number}
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {step.title}
                </h2>
                <p className="text-base sm:text-lg text-white/70 group-hover:text-white/90 leading-relaxed transition-colors duration-300">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-violet-500 to-purple-500 blur-2xl opacity-40 rounded-full" />
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-4 bg-gradient-to-r from-red-500 via-violet-500 to-purple-500 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
