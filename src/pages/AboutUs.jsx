// src/pages/AboutUs.jsx
import React from "react";
import logoo from "../assets/icons/herobg.png";

export default function AboutUs() {
  return (
    <div className="relative min-h-screen bg-white text-black text-center">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:24px_24px]" />
        <img
        src={logoo}
        alt="About Us Logo"
        className=" fixed inset-0 pointer-events-none z--10 w-160 
        bg-[radial-gradient(circle,#8080801a_1px,transparent_1px)] 
        bg-[size:24px_24px]0

        transform rotate-40 pt-40 ml-10
        opacity-50
        "
      />
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        {/* Page Header */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-8">
          About Us
        </h1>

        {/* Overview Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            Overview
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4 text-xl ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates atque reiciendis delectus nemo corrupti nisi eum, nostrum ad aliquid, rem nesciunt, ex iste explicabo! Quasi itaque nostrum praesentium fuga consequatur!.
          </p>
        </section>

        {/* Mission / Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
             Mission
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
          </p>
          <p className="text-gray-800 leading-relaxed text-xl">
            In condimentum facilisis porta. Sed nec diam eu diam mattis viverra. 
            Nulla fringilla, orci ac euismod semper, magna diam.
          </p>
        </section>

        {/* Team / Story Section */}
        <section>
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
            Story
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Curabitur sed semper lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <p className="text-gray-8000 leading-relaxed text-xl">
            Fusce ut placerat orci nulla pellentesque dignissim enim sit amet. 
            Amet purus gravida quis blandit turpis cursus in hac habitasse platea.
          </p>
        </section>
      </div>
    </div>
  );
}
