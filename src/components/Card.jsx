function FeaturedIcon({ Icon }) {
  return (
    <div className="relative grid h-12 w-12 sm:h-11 sm:w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
      <Icon className="h-6 w-6 sm:h-5 sm:w-5 text-white transition-transform duration-300 group-hover:rotate-6" />
    </div>
  );
}

const Card = ({ Icon, title, desc, price }) => {
  return (
    <div className="group relative flex h-full min-h-[250px] w-full flex-col rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      <div className="mb-5">
        <FeaturedIcon Icon={Icon} />
      </div>

      <h3 className="mb-2 text-base font-semibold tracking-tight text-white">
        {title}
      </h3>

      <p className="flex-1 text-sm text-neutral-400 leading-relaxed">
        {desc}
      </p>

      {/* Price
      {price && (
<<<<<<< HEAD
        <p className="mt-4 sm:mt-3 text-sm sm:text-xs font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
=======
        <p className="mt-5 text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
>>>>>>> latest-one
          {price}
        </p>
      )} */}
    </div>
  );
};

export default Card;