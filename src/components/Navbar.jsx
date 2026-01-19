import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/domain/pre.png";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 w-full">
      <div className="h-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto">

          <div
            onClick={() => navigate("/")}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 hover:scale-110"
          >
           <img
  src={Logo}
  alt="Logo"
  className="
    w-20 h-20
    sm:w-24 sm:h-24
    md:w-28 md:h-28
    lg:w-32 lg:h-32
    xl:w-36 xl:h-36
    scale-[2] sm:scale-[2] md:scale-[2] lg:scale-[1.8]
    drop-shadow-2xl
  "
/>

          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-semibold text-black border border-white/30 bg-white/30 backdrop-blur-md rounded-full transition-all duration-300 hover:bg-white/20 active:scale-95"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-bold text-white bg-linear-to-r from-red-600 to-red-500 rounded-full transition-all duration-300 hover:from-red-500 hover:to-red-400 active:scale-95"
            >
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
