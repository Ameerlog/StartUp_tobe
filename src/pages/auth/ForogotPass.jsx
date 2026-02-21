import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  KeyRound,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleResend = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="bg-[#111113] border border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header */}
          <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-4 text-center">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-2xl blur-xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-white/[0.08] rounded-2xl flex items-center justify-center">
                <KeyRound className="w-8 h-8 sm:w-10 sm:h-10 text-violet-400" strokeWidth={1.5} />
              </div>
            </div>

            {!isSubmitted ? (
              <>
                <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                  Forgot your password?
                </h1>
                <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-sm mx-auto">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                  Check your email
                </h1>
                <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-sm mx-auto">
                  We've sent a password reset link to{" "}
                  <span className="text-violet-400 font-medium">{email}</span>
                </p>
              </>
            )}
          </div>

          {/* Content */}
          <div className="px-6 sm:px-10 py-6 sm:py-8 space-y-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-300 font-medium">
                    Email address
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                        focusedField === "email"
                          ? "text-violet-400"
                          : "text-gray-500"
                      }`}
                    >
                      <Mail className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-white/[0.03] border rounded-xl 
                        pl-12 pr-4 py-3.5 text-sm sm:text-base text-white 
                        placeholder:text-gray-600 outline-none 
                        transition-all duration-200
                        hover:bg-white/[0.05] hover:border-white/[0.12]
                        focus:bg-white/[0.05] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20
                        ${
                          error
                            ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50 focus:ring-red-500/20"
                            : "border-white/[0.08]"
                        }`}
                    />
                  </div>
                  {error && (
                    <p className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {error}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 sm:py-4 rounded-xl 
                    bg-gradient-to-r from-violet-600 to-indigo-600
                    hover:from-violet-500 hover:to-indigo-500
                    text-white text-sm sm:text-base font-semibold
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:shadow-violet-500/25
                    active:scale-[0.98] disabled:opacity-50 
                    disabled:cursor-not-allowed disabled:hover:shadow-none
                    disabled:active:scale-100
                    flex items-center justify-center gap-2.5 group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send reset link</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-5">
                {/* Success Message */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-emerald-400 font-medium">Email sent successfully!</p>
                    <p className="text-gray-400 mt-1">
                      Please check your inbox and spam folder. The link will expire in 24 hours.
                    </p>
                  </div>
                </div>

                {/* Resend Button */}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="w-full py-3.5 sm:py-4 rounded-xl 
                    bg-white/[0.03] border border-white/[0.08]
                    hover:bg-white/[0.06] hover:border-white/[0.12]
                    text-white text-sm sm:text-base font-semibold
                    transition-all duration-300 ease-out
                    active:scale-[0.98] disabled:opacity-50 
                    disabled:cursor-not-allowed
                    flex items-center justify-center gap-2.5"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Resending...</span>
                    </>
                  ) : (
                    <span>Resend email</span>
                  )}
                </button>

                {/* Open Email Button */}
                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 sm:py-4 rounded-xl 
                    bg-gradient-to-r from-violet-600 to-indigo-600
                    hover:from-violet-500 hover:to-indigo-500
                    text-white text-sm sm:text-base font-semibold
                    transition-all duration-300 ease-out
                    hover:shadow-lg hover:shadow-violet-500/25
                    active:scale-[0.98]
                    flex items-center justify-center gap-2.5 group"
                >
                  <Mail className="w-5 h-5" />
                  <span>Open email app</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 sm:px-10 py-5 sm:py-6">
            <Link
              to="/signin"
              className="flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm sm:text-base font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to sign in
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-gray-600 text-xs sm:text-sm mt-6 sm:mt-8 px-4 leading-relaxed">
          Need help?{" "}
          <Link
            to="/contact"
            className="text-gray-500 hover:text-violet-400 underline underline-offset-2 transition-colors"
          >
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;