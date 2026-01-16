import { ArrowRight } from "lucide-react";
import { features } from "../data/features";
import Card from "./Card";

export default function FeaturesSection() {
  return (
     <section className="bg-zinc-50/50 pb-24 text-zinc-900 md:pb-32 mt-15">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-medium tracking-tight text-zinc-900 sm:text-5xl md:text-6xl">
           Includes 
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              Icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-zinc-800 hover:shadow-xl"
          >
         Get Started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 " />
          </a>
        </div>
      </div>
    </section>
  );
}
