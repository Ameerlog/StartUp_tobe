import React from "react";
import { ArrowRight } from "lucide-react";

const StepCard = ({ step }) => {
  const isRightAligned = step.align === "right";

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-200 transition-all duration-300 hover:shadow-xl hover:ring-zinc-300 xl:p-10">
      <div
        className={`flex flex-col gap-12 lg:items-center lg:flex-row ${
          isRightAligned ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-zinc-900 ring-1 ring-zinc-200 transition-transform group-hover:scale-110">
              <step.icon className="h-6 w-6" strokeWidth={1.5} />
            </div>

            <h3 className="mb-4 text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">
              {step.title}
            </h3>

            <p className="mb-8 text-lg leading-relaxed text-zinc-500">
              {step.description}
            </p>

            <button className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-zinc-800 hover:ring-2 hover:ring-zinc-900 hover:ring-offset-2">
              {step.buttonText}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 ring-1 ring-zinc-200">
            <img
              src={step.image}
              alt={step.title}
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
