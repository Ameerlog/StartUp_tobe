import React from "react";
import { Twitter, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";
import Logo from "../assets/domain/cobrotheraultum_Logo.svg";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";




const social = [
  { href: "https://x.com/CoBrother141506", label: "X", Icon: Twitter },
  {href:"https://www.instagram.com/cobrother__?igsh=bXE3YnR4dDJ6NnVi",label:"Instagram",Icon:Instagram},
  {href:"https://www.facebook.com/share/16vjEWTjHi/",label:"Facebook",Icon:Facebook},
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "YouTube", Icon: Youtube },
];

const columns = [
  { title: "Product", links: ["Marketplace", "Domains for Sale", "Startup Toolkit", "Pricing"] },
  { title: "Solutions", links: ["Company Registration", "GST & Tax Filing", "Trademark & IP", "Accounting & Compliance", "Startup Business"] },
  { title: "Co-Working", links: ["CoFounder", "CoInvestor"] },
  { title: "Resources", links: ["Legal Basics for Founders", "Brand Naming Guide"] },
  { title: "Company", links: ["About Cobrother", "How It Works", "Careers", "Contact Us", "Privacy Policy", "Terms of Service"] },
  { title: "Trust & Security", links: ["Secure Payments", "Transparent Pricing", "Founder-First Approach", "India-Focused Compliance"] },
];

  // back to top
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-2 py-6">

          <div className="grid gap-y-10 gap-x-18 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
           
         
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="mb-6">
                  <a href="/">
                  <img 
  src={Logo} 
  alt="CobrotherAultum" 
  className="     h-18 sm:h-20 md:h-22 lg:h-24 xl:h-23
      w-auto shrink-0
      transform origin-left
      scale-[1.8] sm:scale-[2.2] md:scale-[2.6] lg:scale-[3] xl:scale-[2.5]

    " 
/>
                  </a>
                </div>
                <div className="text-sm text-neutral-400">
                  {/* Before the launch, there's  */}
                  Everything your business needs, in oneplace. <br />
                  <span className="text-white font-semibold">CoBrother &trade; </span>
                </div>
              </div>

             
              <div className="flex  gap-2">
                {social.map(({ label, Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-8 w-12 items-center justify-center border rounded-xl bg-black text-white/50 transition  hover:text-white"
                  >
                    <Icon className="h-5 w-5 " />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Columns */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 sm:grid-cols-1 gap-y-10 gap-x-8">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-white/90 mb-2">
                    {col.title}
                  </div>

                  {/* {col.links.map((label, idx) => (
                    
                    <a
                      key={label + idx}
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ))} */}
                  {/* To redirect Cofounder and Coinvestor */}
                    {col.links.map((label, idx) => {
  const isCommunityLink =
    label === "CoFounder" || label === "CoInvestor";

  return isCommunityLink ? (
    <Link
      key={label + idx}
      to="/community"
      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
    >
      {label}
    </Link>
  ) : (
    <span
      key={label + idx}
      className="text-sm text-gray-500 cursor-default"
    >
      {label}
    </span>
  );
})}


                </div>
              ))}
            </div>
          </div>

  
          <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col items-center justify-center gap-1 text-center">
            <div className="text-sm text-neutral-500">
              © 2026 <span className="text-white">CoBrother &trade; </span>.  All rights reserved.
            </div>
            <div className="text-sm text-neutral-400">
             Everything your business needs, in oneplace.
            </div>
          </div>
        </div>
      </section>
      {/* back to top button*/}
        <div className="flex justify-end pb-4 pr-4">
          <button
            onClick={scrollToTop}
            aria-label="Go to top"
            className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
          >
            <ArrowUp className="h-7 w-7 text-white pb" />
          </button>
        </div>
    </footer>
  );
}