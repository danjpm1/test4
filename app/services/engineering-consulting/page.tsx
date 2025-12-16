{/* Proof / Outcomes Section */}
<section className="w-full bg-white text-black">
  <div className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left: stats */}
      <div className="space-y-10 md:space-y-12">
        <div className="flex items-start gap-6">
          <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">500k+</div>
          <div className="pt-2">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-black uppercase">
              Client savings
            </div>
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-black uppercase">
              delivered
            </div>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">100%</div>
          <div className="pt-2">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-black uppercase">
              Permitting
            </div>
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-black uppercase">
              success
            </div>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">10+</div>
          <div className="pt-2">
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-black uppercase">
              Construction disputes
            </div>
            <div className="text-xs md:text-sm font-bold tracking-[0.2em] text-black uppercase">
              resolved
            </div>
          </div>
        </div>
      </div>

      {/* Right: headline + CTA */}
      <div className="relative">
        {/* subtle divider line (desktop) */}
        <div className="hidden lg:block absolute -left-8 top-0 h-full w-px bg-black/10" />

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-right">
          <span className="text-[#6b6b6b]">WHAT CAN</span>
          <br />
          <span className="text-[#c6912c]">ANTOVA BUILDERS</span>
          <br />
          <span className="text-[#6b6b6b]">DO FOR YOU?</span>
        </h2>

        <div className="mt-8 flex justify-end">
          <a
            href="/projects"
            className="inline-flex items-center gap-3 border border-[#c6912c] px-6 py-3 text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-[#c6912c] hover:bg-[#c6912c] hover:text-black transition-colors"
          >
            View our success stories
            <span aria-hidden className="text-lg leading-none">›</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
