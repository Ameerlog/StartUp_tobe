import { features } from "../data/features";
import Card from "./Card";

export default function FeaturesSection() {
  return (
    <section className="relative text-white py-3 sm:py-2 md:py-5 lg:py-1">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
  
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Includes
            </span>
          </h2>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16
                        flex flex-wrap justify-center
                        gap-3 xs:gap-2 sm:gap-4 md:gap-4">
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