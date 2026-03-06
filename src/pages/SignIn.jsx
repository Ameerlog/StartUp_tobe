import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowRight, Shield, Sparkles, ChevronLeft } from "lucide-react";

// ── Google SVG Icon ──────────────────────────────────────────────
const GoogleIcon = () => (
  <svg
    viewBox="0 0 48 48"
    className="w-5 h-5"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.08-6.08C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.09 5.51C12.5 13.59 17.77 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.7c-.55 2.97-2.2 5.48-4.67 7.17l7.18 5.57C43.36 37.07 46.52 31.27 46.52 24.5z"
    />
    <path
      fill="#FBBC05"
      d="M10.73 28.27A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.91.73-4.27L3.14 14.22A23.94 23.94 0 0 0 0 24c0 3.87.93 7.53 2.57 10.76l8.16-6.49z"
    />
    <path
      fill="#34A853"
      d="M24 47c5.5 0 10.12-1.82 13.49-4.95l-7.18-5.57C28.5 37.96 26.36 38.5 24 38.5c-6.23 0-11.5-4.09-13.27-9.73l-7.09 5.51C7.07 41.52 14.82 47 24 47z"
    />
    <path fill="none" d="M0 0h48v48H0z" />
  </svg>
);

// ── Main Component ───────────────────────────────────────────────
const SignIn = () => {
  const [mode, setMode] = useState("main"); // "main" | "phone"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState("phone"); // "phone" | "otp"
  const [loading, setLoading] = useState(false);
  const otpRefs = Array.from({ length: 6 }, () => React.useRef(null));

  // ── Handlers ────────────────────────────────────────────────────
  const handleGoogleSignIn = () => {
    // TODO: wire up Google OAuth redirect
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1200);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) otpRefs[index + 1].current?.focus();
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // TODO: redirect after phone verification
    }, 1200);
  };

  const resetPhone = () => {
    setStep("phone");
    setOtp(["", "", "", "", "", ""]);
    setPhone("");
  };

  // ── Shared input class ───────────────────────────────────────────
  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* ── Background glow ────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-700/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* ── Logo + Heading ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CoBrother
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-white/50 text-sm">
            Sign in to your CoBrother account
          </p>
        </motion.div>

        {/* ── Card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative group"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl blur opacity-60" />
          <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* ══ MAIN — two options ══════════════════════════ */}
              {mode === "main" && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Google */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white font-semibold text-sm transition-all duration-200"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-white/30 font-medium">
                      OR
                    </span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Phone */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMode("phone")}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-purple-500/20"
                  >
                    <Phone className="w-4 h-4" />
                    Continue with Phone
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </motion.button>

                  {/* Footer note */}
                  <p className="text-center text-xs text-white/30 pt-2">
                    By continuing, you agree to our{" "}
                    <span className="text-purple-400 cursor-pointer hover:underline">
                      Terms
                    </span>{" "}
                    &{" "}
                    <span className="text-purple-400 cursor-pointer hover:underline">
                      Privacy Policy
                    </span>
                  </p>
                </motion.div>
              )}

              {/* ══ PHONE mode ══════════════════════════════════ */}
              {mode === "phone" && (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Back */}
                  <button
                    onClick={() => {
                      setMode("main");
                      resetPhone();
                    }}
                    className="flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <AnimatePresence mode="wait">
                    {/* ── Step 1: Enter Phone ─────────────────── */}
                    {step === "phone" && (
                      <motion.form
                        key="enter-phone"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleSendOtp}
                        className="space-y-5"
                      >
                        <div>
                          <h2 className="text-xl font-bold text-white mb-1">
                            Enter your number
                          </h2>
                          <p className="text-sm text-white/40">
                            We'll send you a 6-digit OTP
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-white mb-2">
                            Phone Number
                          </label>
                          <div className="flex gap-2">
                            <div className="flex items-center px-3 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm font-medium select-none">
                              🇮🇳 +91
                            </div>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) =>
                                setPhone(
                                  e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 10),
                                )
                              }
                              required
                              placeholder="XXXXX XXXXX"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={loading || phone.length < 10}
                          whileHover={{ scale: loading ? 1 : 1.02 }}
                          whileTap={{ scale: loading ? 1 : 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 rounded-xl text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Sending OTP...
                            </span>
                          ) : (
                            <>
                              Send OTP <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    )}

                    {/* ── Step 2: Enter OTP ───────────────────── */}
                    {step === "otp" && (
                      <motion.form
                        key="enter-otp"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleVerifyOtp}
                        className="space-y-5"
                      >
                        <div>
                          <h2 className="text-xl font-bold text-white mb-1">
                            Verify OTP
                          </h2>
                          <p className="text-sm text-white/40">
                            Sent to{" "}
                            <span className="text-white/70 font-medium">
                              +91 {phone}
                            </span>
                          </p>
                        </div>

                        {/* OTP boxes */}
                        <div className="flex gap-2 justify-between">
                          {otp.map((digit, i) => (
                            <input
                              key={i}
                              ref={otpRefs[i]}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(e.target.value, i)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(e, i)}
                              className="w-11 h-12 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                            />
                          ))}
                        </div>

                        {/* Resend */}
                        <p className="text-xs text-white/30 text-center">
                          Didn't receive it?{" "}
                          <button
                            type="button"
                            onClick={resetPhone}
                            className="text-purple-400 hover:underline"
                          >
                            Resend OTP
                          </button>
                        </p>

                        <motion.button
                          type="submit"
                          disabled={loading || otp.join("").length < 6}
                          whileHover={{ scale: loading ? 1 : 1.02 }}
                          whileTap={{ scale: loading ? 1 : 0.98 }}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 rounded-xl text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <svg
                                className="animate-spin w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v8H4z"
                                />
                              </svg>
                              Verifying...
                            </span>
                          ) : (
                            <>
                              <Shield className="w-4 h-4" />
                              Verify & Sign In
                            </>
                          )}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Bottom note ─────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-white/20 mt-6"
        >
          CoBrother™ · Everything your business needs, in one place.
        </motion.p>
      </div>
    </div>
  );
};

export default SignIn;
