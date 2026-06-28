# ⏰ Fair Work Hours Calculator

> Australian Modern Award pay calculator — calculate penalty rates, overtime, and public holiday loadings with precision.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![npm version](https://img.shields.io/npm/v/@nested-tech/fair-work-calculator)](https://www.npmjs.com/package/@nested-tech/fair-work-calculator)
[![CI](https://github.com/Nested-Technology-Group/fair-work-hours-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/Nested-Technology-Group/fair-work-hours-calculator/actions/workflows/ci.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen?logo=github)](https://nested-technology-group.github.io/fair-work-hours-calculator/)

---

## Features

- 📋 **Multiple Award support** — Retail, Hospitality, Fast Food, and Cleaning awards
- 💰 **Penalty rate calculation** — weekday, Saturday, Sunday, and public holiday multipliers
- ⏱️ **Overtime detection** — automatic daily threshold detection with tiered rates
- 🎉 **Public holiday awareness** — state-specific holiday calendars for all states/territories
- 👤 **Employment types** — full-time, part-time, and casual (with casual loading)
- 🕐 **Time-of-day penalties** — early morning, evening, and night shift loadings
- 🧮 **Multi-shift calculation** — batch calculate across multiple shifts in one call

## Live Demo

Try the interactive calculator: **[Fair Work Hours Calculator →](https://nested-technology-group.github.io/fair-work-hours-calculator/)**

## Supported Awards

| Award | Key | Coverage |
|-------|-----|----------|
| General Retail Industry Award | `retail` | Retail employees |
| Hospitality Industry (General) Award | `hospitality` | Hospitality workers |
| Fast Food Industry Award | `fast-food` | Fast food & takeaway |
| Cleaning Services Award | `cleaning` | Cleaning staff |

## Installation

```bash
npm install @nested-tech/fair-work-calculator
```

## Quick Start

```typescript
import { calculate } from '@nested-tech/fair-work-calculator';

const result = calculate({
  award: 'retail',
  employmentType: 'casual',
  baseRate: 25.00,
  state: 'NSW',
  shifts: [
    { date: '2025-04-25', startTime: '09:00', endTime: '17:00', breakMinutes: 30 },
    { date: '2025-04-26', startTime: '10:00', endTime: '16:00' },
  ],
});

console.log(`Total pay: $${result.totalPay.toFixed(2)}`);
console.log(`Total hours: ${result.totalHours}`);
console.log(`Overtime hours: ${result.summary.overtimeHours}`);
```

## API Reference

### `calculate(options)`

Main calculation function. Returns a detailed breakdown of pay for each shift.

```typescript
calculate(options: CalculateOptions): CalculationResult
```

**Options:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `award` | `'retail' \| 'hospitality' \| 'fast-food' \| 'cleaning'` | Modern Award to apply |
| `employmentType` | `'full-time' \| 'part-time' \| 'casual'` | Employment classification |
| `baseRate` | `number` | Hourly base rate in AUD |
| `shifts` | `Shift[]` | Array of shifts to calculate |
| `state` | `AustralianState` | State/territory for public holidays |

**Returns** `CalculationResult` with `totalHours`, `totalPay`, per-shift breakdowns, and a summary of ordinary/overtime/penalty/public holiday hours.

### `isPublicHoliday(date, state)`

Check if a given date is a public holiday in the specified state.

### `getPublicHolidays(state, year)`

Get all public holidays for a state in a given year.

### `getAward(awardType)`

Retrieve the full award definition including penalty rates, overtime thresholds, and casual loading.

## Calculator UI

The interactive web calculator is deployed to GitHub Pages and built with React, Vite, and Tailwind CSS. It provides a visual interface for selecting awards, entering shifts, and viewing detailed pay breakdowns.

**[Open the Calculator →](https://nested-technology-group.github.io/fair-work-hours-calculator/)**

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Disclaimer

⚠️ The rates and calculations in this tool are provided for **informational purposes only**. Award rates change periodically and individual circumstances may vary. Always verify current rates with the [Fair Work Ombudsman](https://www.fairwork.gov.au/) before relying on any calculation for payroll or compliance purposes.

## About

Built by [NestedClock](https://nestedclock.com.au) — a modern time & attendance platform for Australian businesses. If you need automated award interpretation, rostering, and compliance tracking, check us out.

## License

[MIT](./LICENSE) © 2024–2026 Nested Technology Group
