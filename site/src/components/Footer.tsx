export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-4 py-12">
      <div className="mx-auto max-w-4xl text-center text-sm text-slate-400">
        <p className="mb-4">
          Built by the team at{' '}
          <a href="https://nestedclock.com.au" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
            NestedClock
          </a>
        </p>
        <p className="mb-4">
          <a
            href="https://nestedclock.com.au"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300 transition hover:bg-indigo-500/20"
          >
            Need full time &amp; attendance management? Try NestedClock →
          </a>
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
          <a
            href="https://github.com/nested-tech/fair-work-hours-calculator"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300"
          >
            GitHub
          </a>
          <span>MIT License</span>
          <span>Data sourced from Fair Work Australia. Always verify with <a href="https://www.fairwork.gov.au" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">fairwork.gov.au</a></span>
        </div>
      </div>
    </footer>
  );
}
