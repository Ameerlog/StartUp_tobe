import StepCard from "../components/StepCard";
import { steps } from "../data/steps";

const HowItWorksSection = () => {
  return (
    <section className="relative  text-white pt-0 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 sm:mb-20 text-center">
          <h2 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Solution for every startup.
            </span>
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
            Powered by one platform.
          </h2>
        </div>

        <div className="space-y-6 sm:space-y-10">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
