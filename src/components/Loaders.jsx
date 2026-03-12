import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
      <div
        className="relative w-[180px] h-[180px] animate-rotate"
        style={{ filter: "url(#goo)" }}
      >
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>

      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"
            />
          </filter>
        </defs>
      </svg>

      <style>{`
        .dot{
          position:absolute;
          width:60px;
          height:60px;
          border-radius:50%;
          inset:0;
          margin:auto;
        }

        /* Updated Colors */
        .dot1{
          background:#3b82f6; /* blue */
          animation:move1 2s infinite ease;
        }

        .dot2{
          background:#8b5cf6; /* purple */
          animation:move2 2s infinite ease;
        }

        .dot3{
          background:#ec4899; /* pink */
          animation:move3 2s infinite ease;
        }

        @keyframes move1{
          50%{ transform:translate(70px,40px) scale(.5); }
        }

        @keyframes move2{
          50%{ transform:translate(-70px,40px) scale(.5); }
        }

        @keyframes move3{
          50%{ transform:translateY(-70px) scale(.5); }
        }

        .animate-rotate{
          animation:rotate 2s infinite ease-in-out;
        }

        @keyframes rotate{
          50%{ transform:rotate(180deg); }
          100%{ transform:rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;