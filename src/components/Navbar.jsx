import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo_white from "../assets/domain/cobrother_Logo_white.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const showLogo = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 sm:h-24 w-full">
      <div className="h-full px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="relative h-full flex items-center justify-between max-w-7xl mx-auto">
          {showLogo && (
            <div
              onClick={() => navigate("/")}
              className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
            >
              <img
                src={Logo_white}
                alt="Cobrother logo"
                className="
                  block
                  border-0
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  shadow-none
                  w-full h-full
                  sm:w-24 sm:h-24
                  md:w-28 md:h-28
                  lg:w-32 lg:h-32
                  xl:w-36 xl:h-36
                  scale-[1] -translate-x-[80px]
                  sm:translate-x-0 sm:scale-[1.2]
                  md:scale-[2.8]
                  lg:scale-[3.3]
                  ml-8
                "
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
