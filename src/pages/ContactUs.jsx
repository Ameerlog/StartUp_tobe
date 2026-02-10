import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),
});

const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -60, 30, 0],
        scale: [1, 1.2, 0.8, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      animate={{
        x: [0, -40, 40, 0],
        y: [0, 50, -30, 0],
        scale: [1, 0.9, 1.1, 1],
      }}
      transition={{
        duration: 8,
        delay: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
      animate={{
        x: [0, 30, -40, 0],
        y: [0, -40, 40, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: 8,
        delay: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>
);

const FloatingParticles = ({ count = 6 }) => (
  <>
    {[...Array(count)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-purple-400 rounded-full pointer-events-none"
        style={{
          left: `${15 + i * (70 / count)}%`,
          top: `${25 + (i % 3) * 25}%`,
          filter: "blur(0.5px)",
        }}
        animate={{
          y: [0, -40, 0],
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: 3 + i * 0.3,
          repeat: Infinity,
          delay: i * 0.5,
          ease: "easeInOut",
        }}
      />
    ))}
  </>
);

const GlassCard = ({
  children,
  className = "",
  glowColor = "from-purple-600/30 to-blue-600/30",
}) => (
  <div className={`relative group ${className}`}>
    <div
      className={`absolute -inset-0.5 bg-gradient-to-r ${glowColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition duration-500`}
    />
    <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl hover:border-neutral-700/50 transition-all duration-300 h-full">
      {children}
    </div>
  </div>
);

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  focused,
  setFocused,
  maxLength,
}) => (
  <div className="relative">
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label}{" "}
      <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
        *
      </span>
    </label>
    <div className="relative group">
      <div
        className={`absolute -inset-[1px] bg-gradient-to-r from-purple-500/0 to-pink-500/0 rounded-xl opacity-0 transition-all duration-500 blur-sm ${
          focused === name
            ? "from-purple-500/30 to-pink-500/30 opacity-100"
            : "group-hover:opacity-30"
        }`}
      />
      <div className="relative flex items-center">
        <div
          className={`absolute left-4 transition-colors duration-300 ${
            focused === name
              ? "text-purple-400"
              : error
                ? "text-red-400"
                : "text-neutral-500"
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>
        <input
          type={type}
          {...register(name)}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused("")}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full pl-11 pr-4 py-3.5 bg-neutral-900/80 border rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 text-sm backdrop-blur-sm ${
            error
              ? "border-red-500/60 focus:border-red-500/60 focus:ring-red-500/30"
              : "border-neutral-800/60"
          }`}
        />
      </div>
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -5, height: 0 }}
          className="text-red-400 text-xs mt-2 flex items-center gap-1.5"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const InfoCard = ({
  icon: Icon,
  title,
  value,
  description,
  gradient,
  iconBg,
  iconColor,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="relative group/card"
  >
    <div
      className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-0 group-hover/card:opacity-60 transition duration-500`}
    />
    <div className="relative bg-gradient-to-br from-neutral-900/95 to-neutral-950/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-5 hover:border-neutral-700/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div
          className={`p-3 bg-gradient-to-br ${iconBg} rounded-xl flex-shrink-0 transition-transform duration-300 group-hover/card:rotate-6 group-hover/card:scale-110`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-neutral-200 text-sm mb-1">
            {title}
          </h4>
          <p className="text-white font-medium text-sm mb-1 break-words">
            {value}
          </p>
          <p className="text-xs text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Stat Item Component
const StatItem = ({ number, label }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-neutral-800/50 last:border-0">
    <span className="text-sm text-neutral-400">{label}</span>
    <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      {number}
    </span>
  </div>
);

const ContactUs = () => {
  const [focused, setFocused] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name.trim(),
        phone: data.phone.trim(),
        city: data.city.trim(),
      };

      console.log("Submitting:", payload);

      // Replace with your actual API endpoint
      const response = await fetch(
        "http://192.168.29.184:8080/api/SupportContactUs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitSuccess(true);
      reset();

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full bg-black text-white min-h-screen overflow-hidden">
      <AnimatedBackground />

      <section className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24 text-center"
        >
          <FloatingParticles count={6} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-6 shadow-lg shadow-purple-500/20"
          >
            <MessageSquare className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              We'd Love to Hear From You
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Let's Start a
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              Conversation
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-neutral-400 text-base sm:text-lg leading-relaxed"
          >
            Leave your details and we'll get back to you within 24 hours.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <GlassCard glowColor="from-purple-600/30 to-pink-600/30">
              <div className="p-6 sm:p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-neutral-800/50">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center"
                  >
                    <Send className="w-6 h-6 text-purple-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      Get in Touch
                    </h2>
                    <p className="text-sm text-neutral-500">
                      Fill out the form and we'll call you back
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-green-400 font-medium text-sm">
                        Details submitted successfully! We'll call you soon.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                  <InputField
                    icon={User}
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    register={register}
                    error={errors.name}
                    focused={focused}
                    setFocused={setFocused}
                    maxLength={50}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField
                      icon={Phone}
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="98765432312"
                      register={register}
                      error={errors.phone}
                      focused={focused}
                      setFocused={setFocused}
                      maxLength={10}
                    />
                    <InputField
                      icon={MapPin}
                      label="City"
                      name="city"
                      type="text"
                      placeholder="Hubli"
                      register={register}
                      error={errors.city}
                      focused={focused}
                      setFocused={setFocused}
                      maxLength={50}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="relative w-full group/btn overflow-hidden rounded-xl shadow-xl shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 blur-xl transition duration-500" />
                    <div className="relative px-8 py-4 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-semibold text-base">
                            Submitting...
                          </span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                          <span className="font-semibold text-base">
                            Submit
                          </span>
                        </>
                      )}
                    </div>
                  </motion.button>
                </form>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-semibold mb-4 px-1">
              Reach Us Directly
            </h3>

            <InfoCard
              icon={Mail}
              title="Email"
              value="cobrother.com@gmail.com"
              description="We'll respond within 24 hours"
              gradient="from-purple-500/20 to-purple-600/20"
              iconBg="from-purple-500/20 to-purple-600/20"
              iconColor="text-purple-400"
              delay={0.9}
            />

            <InfoCard
              icon={Phone}
              title="Phone"
              value="+91 8085758575"
              description="Mon-Fri from 9am to 6pm IST"
              gradient="from-blue-500/20 to-blue-600/20"
              iconBg="from-blue-500/20 to-blue-600/20"
              iconColor="text-blue-400"
              delay={1.0}
            />

            <InfoCard
              icon={MapPin}
              title="Office"
              value="Hubballi, Karnataka"
              description="Visit us for a coffee"
              gradient="from-pink-500/20 to-pink-600/20"
              iconBg="from-pink-500/20 to-pink-600/20"
              iconColor="text-pink-400"
              delay={1.1}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <GlassCard glowColor="from-purple-500/20 to-blue-500/20">
                <div className="p-5">
                  <h4 className="font-semibold mb-4 text-sm">
                    Why Contact Us?
                  </h4>
                  <div className="space-y-1">
                    <StatItem number="< 24h" label="Response Time" />
                    <StatItem number="98%" label="Client Satisfaction" />
                    <StatItem number="24/7" label="Support Available" />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Visit Our
              </span>{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Office
              </span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              Located in the heart of Hubballi, Karnataka
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard glowColor="from-purple-600/20 to-blue-600/20">
              <div className="overflow-hidden rounded-2xl">
                <iframe
                  title="Office Location"
                  className="w-full h-[350px] sm:h-[450px] grayscale hover:grayscale-0 transition-all duration-500"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61595.77414076641!2d75.08403107910156!3d15.364708000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d711c0bfffff%3A0x35f38faa3ba428e9!2sHubli%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
