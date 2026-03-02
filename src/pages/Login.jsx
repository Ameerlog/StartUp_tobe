// import { useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Login() {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = params.get("token");
//     if (token) {
//       localStorage.setItem("token", token);

//       // ✅ FIX: Read saved redirect
//       const savedRedirect = localStorage.getItem("redirectAfterLogin") || "/";
//       localStorage.removeItem("redirectAfterLogin");

//       navigate(savedRedirect); // Goes to /coworker-form
//       return;
//     }
//   }, [navigate]);

//   const handleLinkedInLogin = (redirectTo = "/coworker-form") => {
//     // Save redirect destination before redirecting to LinkedIn
//     localStorage.setItem("redirectAfterLogin", redirectTo);

//     // Redirect to LinkedIn OAuth
//     window.location.href = import.meta.env.VITE_BACKEND_URL + "/auth/linkedin";
//   };
//   return (
//     <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
//       {/* Animated gradient orbs */}
//       <motion.div
//         className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
//         animate={{ x: [0, 50, -30, 0], y: [0, -60, 30, 0] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
//         animate={{ x: [0, -40, 40, 0], y: [0, 50, -30, 0] }}
//         transition={{
//           duration: 8,
//           delay: 2,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="relative z-10 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-10 w-full max-w-md mx-4 flex flex-col items-center gap-6 shadow-2xl"
//       >
//         {/* Glow border */}
//         <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl blur opacity-20 pointer-events-none" />

//         {/* Logo / Title */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="text-center"
//         >
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
//             Welcome to CoBrother
//           </h1>
//           <p className="text-neutral-400 text-sm">
//             Sign in to access your co-ventures, branding & more
//           </p>
//         </motion.div>

//         {/* Divider */}
//         <div className="w-full h-px bg-neutral-800" />

//         {/* LinkedIn Button */}
//         <motion.button
//           onClick={handleLinkedInLogin}
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="relative w-full group overflow-hidden rounded-full"
//         >
//           {/* Gradient bg */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#00a0dc] transition-opacity duration-300" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#00a0dc] opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

//           <div className="relative flex items-center justify-center gap-3 px-8 py-4">
//             {/* LinkedIn Icon */}
//             <svg
//               className="w-5 h-5 text-white"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//             </svg>
//             <span className="font-semibold text-white text-base">
//               Continue with LinkedIn
//             </span>
//           </div>
//         </motion.button>

//         {/* Footer note */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.6 }}
//           className="text-xs text-neutral-500 text-center"
//         >
//           By continuing, you agree to our{" "}
//           <span className="text-purple-400 cursor-pointer hover:underline">
//             Terms
//           </span>{" "}
//           &{" "}
//           <span className="text-purple-400 cursor-pointer hover:underline">
//             Privacy Policy
//           </span>
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// }
