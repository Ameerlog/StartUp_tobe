import React from "react";
import Marquee from "react-fast-marquee";
import { complianceServices } from "../data/compliance";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Receipt,
  UserCog,
  Factory,
  Globe,
  Store,
  ShieldCheck,
  FileText,
} from "lucide-react";

const serviceIcons = {
  "Business Registration": Building2,
  "GST Services": Receipt,
  "DIN & Director Services": Factory,
  "MSME / Udyam": Factory,
  "Import Export Code (IEC)": Globe,
  "Trade & Local Licenses": Store,
  "Brand & Digital Compliance": ShieldCheck,
  "Annual & Basic Filings": FileText,
};

export default function ComplianceCards() {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-black pt-8 pb-16 relative">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-bold">
        Compliance Services
      </h2>

      <div className="relative mt-6">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

        {/* Marquee */}
        <Marquee speed={25} gradient={false} pauseOnHover>
          {complianceServices.map((service) => {
            const Icon = serviceIcons[service.name];

            return (
              <div key={service.id} className="shrink-0 w-[380px] px-5">
                
                {/* CARD */}
                <div
                  className="
                    min-h-75
                    rounded-[20px]
                    border border-white/20
                    bg-gray-900/50
                    p-6
                    flex flex-col
                    backdrop-blur-sm
                    transition-transform duration-300
                    hover:-translate-y-1
                  "
                >
                  {/* CONTENT */}
                  <div className="flex-1 flex gap-6">
                    {/* LEFT CONTENT */}
                    <div className="flex-1">
                      <h3 className="text-[18px] text-white font-semibold">
                        {service.name}
                      </h3>

                      <p className="mt-1 text-red-400 text-sm font-medium">
                        Starting at {service.price}
                      </p>

                      <div className="mt-4 space-y-2 line-clamp-4">
                        {service.points.map((point, index) => (
                          <p
                            key={index}
                            className="text-[13px] text-gray-400 flex items-start gap-2"
                          >
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                            {point}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* ICON */}
                    {Icon && (
                      <div className="flex items-start justify-center pt-1">
                        <div className="h-14 w-14 rounded-full bg-red-500/10 flex items-center justify-center">
                          <Icon className="h-7 w-7 text-red-400" />
                        </div>
                      </div>
                    )}
                  </div>

             
                  <div className="mt-6 flex gap-3">
                    

                    <button
                      onClick={() => navigate("/compliance")}
                      className="
                        flex-1
                        rounded-full
                        bg-red-600 hover:bg-red-500
                        px-4 py-2
                        text-sm font-medium text-white
                        transition-all
                        shadow-lg hover:shadow-red-500/25
                      "
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}