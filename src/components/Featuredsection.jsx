import { features } from "../data/features";
import Card from "./Card";

export default function FeaturesSection() {
  return (
    <section className="relative bg-black text-white pt-0 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Includes
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-16 sm:mt-20 grid max-w-2xl grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              Icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              price={feature.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
