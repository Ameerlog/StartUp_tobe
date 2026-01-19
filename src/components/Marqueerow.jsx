function Badge({ children }) {
  return (
    <span
      className="
        whitespace-nowrap rounded-full
        border border-black/40 bg-black/15
        px-3 py-1.5 sm:px-4 sm:py-2
        text-xs sm:text-sm
        text-black
        backdrop-blur-xl
      "
    >
      {children}
    </span>
  );
}

export default function MarqueeRow() {
  return (
    <div className="mt-5 sm:mt-2">
      <p className="flex items-center justify-center gap-2 text-black font-bold mb-5">
        What do you want to manage today?
      </p>

      <div className="mx-auto max-w-6xl px-2 sm:px-4">
        <div className="marquee">
          <span className="marquee__line marquee__line--left" />
          <span className="marquee__line marquee__line--right" />

          <div className="marquee__viewport">
            <div className="marquee__track">
              <div className="marquee__group">
                <Badge>Projects</Badge>
                <Badge>Tasks</Badge>
                <Badge>Marketing</Badge>
                <Badge>Design</Badge>
                <Badge>CRM</Badge>
                <Badge>Software</Badge>
                <Badge>IT</Badge>
                <Badge>Operations</Badge>
                <Badge>Product</Badge>
              </div>

              <div className="marquee__group" aria-hidden="true">
                <Badge>Projects</Badge>
                <Badge>Tasks</Badge>
                <Badge>Marketing</Badge>
                <Badge>Design</Badge>
                <Badge>CRM</Badge>
                <Badge>Software</Badge>
                <Badge>IT</Badge>
                <Badge>Operations</Badge>
                <Badge>Product</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
