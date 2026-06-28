import { useState } from 'react';
import { calculate } from '@nested-tech/fair-work-calculator';
import type {
  AwardType,
  EmploymentType,
  AustralianState,
  Shift,
  CalculationResult,
} from '@nested-tech/fair-work-calculator';

const AWARDS: { value: AwardType; label: string }[] = [
  { value: 'retail', label: 'General Retail' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'fast-food', label: 'Fast Food' },
  { value: 'cleaning', label: 'Cleaning Services' },
];

const EMPLOYMENT_TYPES: { value: EmploymentType; label: string }[] = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'casual', label: 'Casual' },
];

const STATES: AustralianState[] = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function emptyShift(): Shift & { id: number } {
  return { id: Date.now(), date: todayStr(), startTime: '09:00', endTime: '17:00', breakMinutes: 30 };
}

export default function Calculator() {
  const [award, setAward] = useState<AwardType>('retail');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('casual');
  const [baseRate, setBaseRate] = useState(23.23);
  const [state, setState] = useState<AustralianState>('NSW');
  const [shifts, setShifts] = useState<(Shift & { id: number })[]>([emptyShift()]);
  const [result, setResult] = useState<CalculationResult | null>(null);

  function updateShift(id: number, field: keyof Shift, value: string | number) {
    setShifts((s) => s.map((sh) => (sh.id === id ? { ...sh, [field]: value } : sh)));
  }

  function handleCalculate() {
    const res = calculate({ award, employmentType, baseRate, shifts, state });
    setResult(res);
  }

  return (
    <section id="calculator" className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold text-white">Calculate Your Pay</h2>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
        {/* Top controls */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-sm text-slate-400">Award</label>
            <select
              value={award}
              onChange={(e) => setAward(e.target.value as AwardType)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
            >
              {AWARDS.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">Base Rate ($/hr)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={baseRate}
              onChange={(e) => setBaseRate(parseFloat(e.target.value) || 0)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value as AustralianState)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Shifts */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-medium text-slate-400">Shifts</h3>
          {shifts.map((shift) => (
            <div key={shift.id} className="grid grid-cols-2 gap-3 rounded-lg border border-slate-700/50 bg-slate-800/50 p-3 sm:grid-cols-5">
              <div>
                <label className="text-xs text-slate-500">Date</label>
                <input
                  type="date"
                  value={shift.date}
                  onChange={(e) => updateShift(shift.id, 'date', e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Start</label>
                <input
                  type="time"
                  value={shift.startTime}
                  onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">End</label>
                <input
                  type="time"
                  value={shift.endTime}
                  onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500">Break (min)</label>
                <input
                  type="number"
                  min="0"
                  value={shift.breakMinutes ?? 0}
                  onChange={(e) => updateShift(shift.id, 'breakMinutes', parseInt(e.target.value) || 0)}
                  className="w-full rounded border border-slate-700 bg-slate-800 px-2 py-1.5 text-sm text-white"
                />
              </div>
              <div className="flex items-end">
                {shifts.length > 1 && (
                  <button
                    onClick={() => setShifts((s) => s.filter((x) => x.id !== shift.id))}
                    className="rounded px-3 py-1.5 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setShifts((s) => [...s, emptyShift()])}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-500 hover:text-white"
          >
            + Add Another Shift
          </button>
          <button
            onClick={handleCalculate}
            className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-2 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:shadow-indigo-500/40"
          >
            Calculate
          </button>
        </div>
      </div>

      {/* Results */}
      {result && <Results result={result} baseRate={baseRate} />}
    </section>
  );
}

function Results({ result, baseRate }: { result: CalculationResult; baseRate: number }) {
  const { summary } = result;
  const total = summary.ordinaryHours + summary.overtimeHours;

  return (
    <div className="mt-8 space-y-6">
      {/* Total pay */}
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 p-6 text-center">
        <p className="text-sm text-slate-400">Total Pay</p>
        <p className="text-4xl font-bold text-white">${result.totalPay.toFixed(2)}</p>
        <p className="mt-1 text-sm text-slate-400">{result.totalHours} hours worked</p>
      </div>

      {/* Summary bar */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h4 className="mb-3 text-sm font-medium text-slate-400">Hours Breakdown</h4>
        <div className="flex h-4 overflow-hidden rounded-full">
          {summary.ordinaryHours > 0 && (
            <div className="bg-indigo-500" style={{ width: `${(summary.ordinaryHours / total) * 100}%` }} />
          )}
          {summary.overtimeHours > 0 && (
            <div className="bg-violet-500" style={{ width: `${(summary.overtimeHours / total) * 100}%` }} />
          )}
          {summary.publicHolidayHours > 0 && (
            <div className="bg-amber-500" style={{ width: `${(summary.publicHolidayHours / total) * 100}%` }} />
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-indigo-500" /> Ordinary: {summary.ordinaryHours}h</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-violet-500" /> Overtime: {summary.overtimeHours}h</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2 w-2 rounded-full bg-amber-500" /> Public Holiday: {summary.publicHolidayHours}h</span>
          <span>Penalty Hours: {summary.penaltyHours}h</span>
        </div>
      </div>

      {/* Shift breakdown table */}
      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-left text-slate-400">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Hours</th>
              <th className="px-4 py-3">Rates Applied</th>
              <th className="px-4 py-3 text-right">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {result.shifts.map((shift, i) => (
              <tr key={i} className="border-b border-slate-800/50">
                <td className="px-4 py-3 text-white">
                  {shift.date}
                  {shift.isPublicHoliday && <span className="ml-2 rounded bg-amber-500/20 px-1.5 py-0.5 text-xs text-amber-400">PH</span>}
                </td>
                <td className="px-4 py-3">{shift.hoursWorked}h</td>
                <td className="px-4 py-3">
                  {shift.appliedRates.map((r, j) => (
                    <div key={j} className="text-xs text-slate-400">
                      {r.description}: {r.hours}h × ${baseRate} × {r.multiplier} = ${r.amount.toFixed(2)}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-3 text-right font-medium text-white">${shift.totalPay.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
