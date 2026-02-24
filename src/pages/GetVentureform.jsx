import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import confetti from "canvas-confetti";
import {
  Phone,
  MapPin,
  User,
  Rocket,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

const ventureSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  gstNo: z
    .string()
    .length(15, "GST number must be 15 characters")
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/,
      "Invalid GST number format",
    ),

  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number")
    .max(10, "Phone number must be 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters"),
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
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="relative"
  >
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
  </motion.div>
);

const GetVentureForm = () => {
  const [focused, setFocused] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const submitLockRef = useRef(false);

  useEffect(() => {
    if (!submitSuccess) return;

    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [submitSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(ventureSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      location: "",
      gstNo: "",
    },
  });

  const onSubmit = async (data) => {
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    try {
      const payload = {
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        location: data.location.trim(),
        gstNo: data.gstNo,
      };

      console.log("Submitting:", payload);

      const response = await fetch(
        "https://cobrother-api.onrender.com/api/CreateJointVenture",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSubmitSuccess(true);
      reset();

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      submitLockRef.current = false;
    }
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    reset();
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="relative z-10 max-w-md w-full"
        >
          <GlassCard glowColor="from-green-600/40 to-emerald-600/40">
            <div className="p-8 sm:p-10 text-center relative overflow-hidden">
              <FloatingParticles count={6} />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="relative mx-auto mb-6"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-green-500/20 rounded-2xl blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl font-bold mb-3"
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Request
                </span>{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Submitted!
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-neutral-400 text-sm sm:text-base mb-8 max-w-sm mx-auto"
              >
                Thank you for your interest! Our team will contact you shortly
                to discuss your venture.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="group relative overflow-hidden rounded-full inline-flex items-center gap-2 shadow-2xl shadow-purple-500/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />
                <span className="relative px-8 py-3.5 font-semibold text-white text-sm flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  Submit Another
                </span>
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      <AnimatedBackground />

      <div className="mt-26 relative z-10 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 relative"
        >
          <FloatingParticles count={6} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-5 shadow-lg shadow-purple-500/20"
          >
            <Sparkles className="w-4 h-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Start Your Journey
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Get
            </span>{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              Venture
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto"
          >
            Leave your details and our team will reach out to discuss your
            venture opportunities.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard glowColor="from-purple-600/30 to-pink-600/30">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-neutral-800/50">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  className="w-11 h-11 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center"
                >
                  <Rocket className="w-5 h-5 text-purple-400" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Details</h2>
                  <p className="text-xs text-neutral-500">
                    We'll contact you within 24 hours
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                  icon={User}
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="FullName"
                  register={register}
                  error={errors.fullName}
                  focused={focused}
                  setFocused={setFocused}
                  maxLength={50}
                />

                <InputField
                  icon={Phone}
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  register={register}
                  error={errors.phone}
                  focused={focused}
                  setFocused={setFocused}
                  maxLength={10}
                />
                <InputField
                  icon={MapPin}
                  label="GST Number"
                  name="gstNo"
                  type="text"
                  placeholder="29AAAAA0000A1Z5"
                  register={register}
                  error={errors.gstNo}
                  focused={focused}
                  setFocused={setFocused}
                  maxLength={100}
                />
                <InputField
                  icon={MapPin}
                  label="Location"
                  name="location"
                  type="text"
                  placeholder="City, State"
                  register={register}
                  error={errors.location}
                  focused={focused}
                  setFocused={setFocused}
                  maxLength={100}
                />

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="relative w-full group/btn overflow-hidden rounded-xl shadow-xl shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
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
                        <Rocket className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        <span className="font-semibold text-base">
                          Get Started
                        </span>
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default GetVentureForm;
