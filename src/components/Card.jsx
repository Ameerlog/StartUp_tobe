function FeaturedIcon({ Icon }) {
  return (
    <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
      <Icon className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-6" />
    </div>
  );
}

const Card = ({ Icon, title, desc, price }) => {
  return (
    <div className="group relative flex h-60 w-52 sm:w-56 md:w-60 shrink-0 flex-col rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
      
      <div className="mb-4">
        <FeaturedIcon Icon={Icon} />
      </div>

      <h3 className="mb-1 text-sm font-semibold tracking-tight text-white">
        {title}
      </h3>

      <p className="text-xs text-neutral-400 leading-relaxed flex-1">
        {desc}
      </p>

      {price && (
        <p className="mt-3 text-xs font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {price}
        </p>
      )}
    </div>
  );
};

export default Card;
