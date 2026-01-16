import React from "react";
import { Twitter, Linkedin, Youtube, Instagram, Facebook } from "lucide-react";
import Logo from "../assets/30Logo.png";
import { href } from "react-router-dom";



const social = [
  { href: "#", label: "X", Icon: Twitter },
  {href:"#",label:"Instagram",Icon:Instagram},
  {href:"#",label:"Facebook",Icon:Facebook},
  { href: "#", label: "LinkedIn", Icon: Linkedin },
  { href: "#", label: "YouTube", Icon: Youtube },
];

const columns = [
  { title: "Product", links: ["Marketplace", "Domains for Sale", "Startup Toolkit", "Pricing"] },
  { title: "Solutions", links: ["Company Registration", "GST & Tax Filing", "Trademark & IP", "Accounting & Compliance", "Startup Visibility"] },
  { title: "Community", links: ["Founder Community", "Free Startup Guides", "Events & Webinars", "Partner Program"] },
  { title: "Resources", links: ["Legal Basics for Founders", "Brand Naming Guide"] },
  { title: "Company", links: ["About StartupToBe", "How It Works", "Careers", "Contact Us", "Privacy Policy", "Terms of Service"] },
  { title: "Trust & Security", links: ["Secure Payments", "Transparent Pricing", "Founder-First Approach", "India-Focused Compliance"] },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <section className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-14">

          <div className="grid gap-y-10 gap-x-12 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
           
         
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="mb-6">
                  <a href="/">
                  <img 
  src={Logo} 
  alt="StartupToBe" 
  className="h-16 w-auto scale-500 ml-5" 
/>
                  </a>
                </div>
                <div className="text-sm text-neutral-400">
                  Before the launch, there's <span className="text-red-500 font-semibold">StartupToBe</span>.
                </div>
              </div>

             
              <div className="flex  gap-1">
                {social.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-black text-white transition hover:bg-red-600 hover:border-red-600 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Columns */}
            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 sm:grid-cols-1 gap-y-10 gap-x-8">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-2">
                  <div className="text-sm font-semibold text-white mb-2">
                    {col.title}
                  </div>
                  {col.links.map((label, idx) => (
                    <a
                      key={label + idx}
                      href="#"
                      className="text-sm text-neutral-400 hover:text-red-500 transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

  
          <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col items-center justify-center gap-1 text-center">
            <div className="text-sm text-neutral-500">
              © 2026 <span className="text-red-500">StartupToBe</span>. All rights reserved.
            </div>
            <div className="text-sm text-neutral-400">
              Built for founders, startups-to-be, and dreamers.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}