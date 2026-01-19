

function FeaturedIcon({ Icon }) {
  return (
    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-zinc-200 bg-zinc-50/50 shadow-sm transition-colors group-hover:bg-white group-hover:shadow-md">
      <Icon className="h-6 w-6 text-zinc-900 transition-transform duration-300 group-hover:scale-110" />
    </div>
  );
}
const Card = ({ Icon, title, desc,price }) => {
  return (
    <div className="group relative flex h-full flex-col rounded-[2rem] border border-zinc-200 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
      <div className="mb-6">
        <FeaturedIcon Icon={Icon} />
      </div>
      <h3 className="mb-3 text-xl font-bold tracking-tight text-zinc-900">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-zinc-600 antialiased">
        {desc}
      </p>
      <p className="text-base leading-relaxed text-zinc-600 antialiased">
      {price}
      </p>
    </div>
  );
}

export default Card
