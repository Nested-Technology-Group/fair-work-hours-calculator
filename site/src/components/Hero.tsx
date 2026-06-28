export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-32 text-center">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-950 via-slate-950 to-violet-950" />
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-3xl" />

      <a
        href="https://nestedclock.com.au"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-block rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 transition hover:bg-indigo-500/20"
      >
        Powered by NestedClock ↗
      </a>

      <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
        Fair Work Hours{' '}
        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          Calculator
        </span>
      </h1>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
        Free, open-source penalty rate calculator for Australian Modern Awards
      </p>

      <a
        href="#calculator"
        className="mt-10 inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40 hover:brightness-110"
      >
        Calculate Pay →
      </a>
    </section>
  );
}
