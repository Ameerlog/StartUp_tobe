import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  Loader2,
  Linkedin,
} from "lucide-react";


const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    navigate("/");
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

    
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      </div>

      <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl">
        
     

        <div className="bg-[#111113] border border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/50 overflow-hidden">
         
          <div className="px-6 sm:px-10 pt-8 sm:pt-10 pb-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>

      
          <div className="px-6 sm:px-10 py-6 sm:py-8 space-y-6">
          
            <button
              type="button"
              onClick={() =>
                (window.location.href =
                  "https://www.linkedin.com/oauth/v2/authorization")
              }
              className="w-full flex items-center justify-center gap-3 px-5 py-3.5 
                rounded-xl bg-[#0A66C2] hover:bg-[#0857a3]
                text-white font-medium text-sm sm:text-base
                transition-all duration-300 ease-out
                hover:shadow-lg hover:shadow-[#0A66C2]/20
                active:scale-[0.98] group"
            >
              <Linkedin className="w-5 h-5 transition-transform group-hover:scale-110" />
              Continue with LinkedIn
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                or
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

    
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
      
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
                    placeholder="you@gamil.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-white/[0.03] border rounded-xl 
                      pl-12 pr-4 py-3.5 text-sm sm:text-base text-white 
                      placeholder:text-gray-600 outline-none 
                      transition-all duration-200
                      hover:bg-white/[0.05] hover:border-white/[0.12]
                      focus:bg-white/[0.05] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20
                      ${
                        errors.email
                          ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50 focus:ring-red-500/20"
                          : "border-white/[0.08]"
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-300 font-medium">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div
                    className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                      focusedField === "password"
                        ? "text-violet-400"
                        : "text-gray-500"
                    }`}
                  >
                    <Lock className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full bg-white/[0.03] border rounded-xl 
                      pl-12 pr-12 py-3.5 text-sm sm:text-base text-white 
                      placeholder:text-gray-600 outline-none 
                      transition-all duration-200
                      hover:bg-white/[0.05] hover:border-white/[0.12]
                      focus:bg-white/[0.05] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20
                      ${
                        errors.password
                          ? "border-red-500/50 bg-red-500/5 focus:border-red-500/50 focus:ring-red-500/20"
                          : "border-white/[0.08]"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" strokeWidth={1.8} />
                    ) : (
                      <Eye className="w-5 h-5" strokeWidth={1.8} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.password}
                  </p>
                )}
              </div>

             
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 sm:px-10 py-5 sm:py-6">
            <p className="text-center text-gray-400 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
              >
                Create free account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs sm:text-sm mt-6 sm:mt-8 px-4 leading-relaxed">
          By continuing, you agree to our{" "}
          <Link
            to="/terms-of-service"
            className="text-gray-500 hover:text-violet-400 underline underline-offset-2 transition-colors"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-gray-500 hover:text-violet-400 underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;