import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CtaVenture = () => {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-purple-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug"
        >
          Build It Yourself — With the Right System.
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-neutral-400"
        >
          Aultum is the operations engine behind our co-ventures.
          <br className="hidden sm:block" />
          <span className="text-white font-medium">
            Now available for your business.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-2 rounded-full overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.35)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

            <a
              href="https://aultum.com/"
              className="relative px-8 py-4 text-base sm:text-lg font-semibold text-white flex items-center gap-2"
            >
              Get Aultum Automation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaVenture;
