import React from "react";
import { useNavigate } from "react-router-dom";
import Logo_white from "../assets/domain/cobrother_Logo_white.svg";
import Logo_black from "../assets/domain/cobrother_Logo_black.svg";
import { useLocation } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // get current path
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 w-full">
      <div className="h-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto">

          <div
            onClick={() => navigate("/")}
            className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          >
           <img
  src={isHome ? Logo_white : Logo_black}
  // <img src={isHome ? "/logo-white.svg" : "/logo-black.svg"} />
  alt="Logo"
  className="
    w-full h-full
    sm:w-24 sm:h-24
    md:w-28 md:h-28
    lg:w-32 lg:h-32
    xl:w-36 xl:h-36
    scale-[2] sm:scale-[1.2] md:scale-[1.5] lg:scale-[1.8]
    drop-shadow-2xl
    ml-8"
/>

          </div>

         

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
