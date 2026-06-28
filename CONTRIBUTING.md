# Contributing

Thanks for your interest in contributing to the Fair Work Hours Calculator!

## Getting Started

1. Fork the repository
2. Clone your fork and install dependencies:
   ```bash
   git clone https://github.com/<your-username>/fair-work-hours-calculator.git
   cd fair-work-hours-calculator
   npm install
   ```
3. Build the core package:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Development

- **Core package** (`packages/core`) — the calculation engine
- **Site** (`site`) — the interactive GitHub Pages calculator

Start the dev server for the site:
```bash
npm run dev
```

## Submitting Changes

1. Create a feature branch: `git checkout -b feat/my-change`
2. Make your changes and add tests where applicable
3. Ensure all tests pass: `npm test`
4. Commit with a clear message describing the change
5. Push and open a Pull Request against `main`

## Guidelines

- Keep PRs focused — one feature or fix per PR
- Add tests for new calculation logic
- Update documentation if you change the public API
- Follow existing code style and conventions

## Reporting Issues

Open a GitHub issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
