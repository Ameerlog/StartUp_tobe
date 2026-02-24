import { features } from "../data/features";
import Card from "./Card";

export default function FeaturesSection() {
  return (
    <section className="relative bg-transparent text-white pt-0">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
  
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Includes
            </span>
          </h2>
        </div>

        <div className="mx-auto mt-10 sm:mt-12 grid max-w-2xl grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4 lg:gap-7">
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