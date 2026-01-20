import React from "react";
import { Twitter, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";
import Logo from "../assets/domain/aultumpre.png";

const social = [
  { href: "#", label: "X", Icon: Twitter },
  { href: "#", label: "Instagram", Icon: Instagram },
  { href: "#", label: "Facebook", Icon: Facebook },
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "YouTube", Icon: Youtube },
];

const columns = [
  { 
    title: "Product", 
    links: ["Marketplace", "Domains for Sale", "Startup Toolkit", "Pricing"] 
  },
  { 
    title: "Solutions", 
    links: ["Company Registration", "GST & Tax Filing", "Trademark & IP", "Accounting & Compliance", "Startup Visibility"] 
  },
  { 
    title: "Community", 
    links: ["Founder Community", "Free Resources", "Events & Webinars", "Partner Program"] 
  },
  { 
    title: "Resources", 
    links: ["Legal Basics for Founders", "Brand Naming Guide"] 
  },
  { 
    title: "Company", 
    links: ["About Aultum", "How It Works", "Careers", "Contact Us", "Privacy Policy", "Terms of Service"] 
  },
  { 
    title: "Trust & Security", 
    links: ["Secure Payments", "Transparent Pricing", "Founder-First Approach", "India-Focused Compliance"] 
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-14">

          <div className="grid gap-10 lg:gap-12">
            
            {/* Top Section - Logo and Social */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-neutral-800 lg:border-0 lg:pb-0">
         
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6  ml-5">
                <a href="/" className="inline-block">
                  <img 
                    src={Logo} 
                    alt="Aultum" 
                    className="h-10 sm:h-12 w-auto object-contain scale-600" 
                  />
                  {/* <div className="text-sm text-neutral-400">
                  Before the launch, there's{" "}
                  <span className="text-red-500 font-semibold">Aultum</span>.
                </div> */}
                </a>
                
              </div>

              <div className="flex gap-2 sm:gap-3">
                {social.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-neutral-700 bg-black text-white transition-all duration-300 hover:bg-red-600 hover:border-red-600 hover:text-white hover:scale-110"
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-6 lg:gap-8">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    {col.title}
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((label, idx) => (
                      <li key={label + idx}>
                        <a
                          href="#"
                          className="text-sm text-neutral-400 hover:text-red-500 transition-colors duration-200 inline-block"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Bottom - Centered */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-neutral-800">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <div className="text-xs sm:text-sm text-neutral-500">
                © {new Date().getFullYear()}{" "}
                <span className="text-red-500 font-semibold">Aultum</span>. All rights reserved.
              </div>
              <div className="text-xs sm:text-sm text-neutral-400">
                Built for founders, startups-to-be, and dreamers.
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}