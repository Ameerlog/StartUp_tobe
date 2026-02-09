function FeaturedIcon({ Icon }) {
  return (
    <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
      <Icon className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-6" />
    </div>
  );
}

const Card = ({ Icon, title, desc, price }) => {
  return (
    <div className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
      <div className="mb-5">
        <FeaturedIcon Icon={Icon} />
      </div>

      <h3 className="mb-2 text-lg sm:text-xl font-semibold tracking-tight text-white">
        {title}
      </h3>

      <p className="text-sm sm:text-base leading-relaxed text-neutral-400 flex-1">
        {desc}
      </p>

      {price && (
        <p className="mt-4 text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          {price}
        </p>
      )}
    </div>
  );
};

export default Card;
