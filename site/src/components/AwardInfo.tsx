const AWARD_DATA = [
  {
    name: 'General Retail Industry Award',
    id: 'retail',
    rates: [
      { day: 'Saturday', permanent: '125%', casual: '150%' },
      { day: 'Sunday', permanent: '200%', casual: '200%' },
      { day: 'Public Holiday', permanent: '250%', casual: '275%' },
      { day: 'Evening (6pm–12am)', permanent: '+25%', casual: '+25%' },
    ],
  },
  {
    name: 'Hospitality Industry Award',
    id: 'hospitality',
    rates: [
      { day: 'Saturday', permanent: '125%', casual: '150%' },
      { day: 'Sunday', permanent: '150%', casual: '175%' },
      { day: 'Public Holiday', permanent: '250%', casual: '275%' },
      { day: 'Evening Mon–Fri', permanent: '+15%', casual: '+15%' },
    ],
  },
  {
    name: 'Fast Food Industry Award',
    id: 'fast-food',
    rates: [
      { day: 'Saturday', permanent: '125%', casual: '150%' },
      { day: 'Sunday', permanent: '150%', casual: '175%' },
      { day: 'Public Holiday', permanent: '250%', casual: '275%' },
      { day: 'Late Night/Early AM', permanent: '+15%', casual: '+15%' },
    ],
  },
  {
    name: 'Cleaning Services Award',
    id: 'cleaning',
    rates: [
      { day: 'Saturday', permanent: '150%', casual: '175%' },
      { day: 'Sunday', permanent: '200%', casual: '200%' },
      { day: 'Public Holiday', permanent: '250%', casual: '275%' },
    ],
  },
];

export default function AwardInfo() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Supported Awards</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {AWARD_DATA.map((award) => (
          <div key={award.id} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-3 text-lg font-semibold text-white">{award.name}</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="pb-2">Period</th>
                  <th className="pb-2">Permanent</th>
                  <th className="pb-2">Casual</th>
                </tr>
              </thead>
              <tbody>
                {award.rates.map((r) => (
                  <tr key={r.day} className="border-t border-slate-800/50">
                    <td className="py-2 text-slate-300">{r.day}</td>
                    <td className="py-2 font-mono text-indigo-400">{r.permanent}</td>
                    <td className="py-2 font-mono text-violet-400">{r.casual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
