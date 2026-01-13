import React from "react";
import { Twitter, Linkedin, Youtube } from "lucide-react";
import Logo from "../assets/30 (1).svg";

const BlueskyIcon = ({ className }) => (
  <div
    className={[
      "grid h-6 w-6 place-items-center rounded-full border border-current text-[10px] font-semibold leading-none",
      className,
    ].join(" ")}
  >
    ST
  </div>
);

const social = [
  { href: "#", label: "X", Icon: Twitter },
  { href: "#", label: "Bluesky", Icon: BlueskyIcon },
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
    <footer className="bg-white text-zinc-900">
      <section className="border-t border-zinc-200 ">
        <div className="mx-auto max-w-6xl px-4 py-14 bottom-4">

          <div className="grid gap-y-10 gap-x-12 lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1">
           
            <div className="flex flex-col justify-between gap-6">
              <div>
                <div className="mb-6">
                  <a href="/">
                    <img src={Logo} alt="StartupToBe" className="h-16 w-auto scale-600 ml-8" />
                  </a>
                </div>
                <div className="text-sm text-zinc-600">
                  Before the launch, there’s StartupToBe.
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {social.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 transition hover:bg-pink-500 hover:text-zinc-950"
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
                  <div className="text-sm font-semibold text-zinc-900">
                    {col.title}
                  </div>
                  {col.links.map((label, idx) => (
                    <a
                      key={label + idx}
                      href="#"
                      className="text-sm text-zinc-600 hover:text-zinc-950"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-10 border-t border-zinc-200 pt-6 flex flex-col items-center justify-center gap-1 text-center">
            <div className="text-sm text-zinc-500">
              © 2026 StartupToBe. All rights reserved.
            </div>
            <div className="text-sm text-zinc-500">
              Built for founders, startups-to-be, and dreamers.
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
