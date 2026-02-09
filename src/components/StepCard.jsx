import { ArrowRight } from "lucide-react";

const StepCard = ({ step }) => {
  const isRightAligned = step.align === "right";

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-6 sm:p-8 xl:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
      <div
        className={`flex flex-col gap-10 lg:items-center lg:flex-row ${
          isRightAligned ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative z-10 w-full lg:w-1/2">
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <step.icon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>

            <h3 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              {step.title}
            </h3>

            <p className="mb-6 text-base sm:text-lg leading-relaxed text-neutral-400">
              {step.description}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={step.image}
              alt={step.title}
              className="relative h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
