import React from "react";
import StepCard from "../components/StepCard";
import { steps } from "../data/steps";

const HowItWorksSection = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Solution for every startup.
          </h2>
          <h2 className="text-4xl font-medium text-zinc-900 sm:text-5xl lg:text-6xl">
            Powered by one platform.
          </h2>
        </div>

        <div className="space-y-8 md:space-y-12">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
