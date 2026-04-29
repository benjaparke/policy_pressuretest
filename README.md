# Policy Pressure Test

A React + Vite web app that stress-tests workplace policies by sending the policy text to an LLM and rendering structured risk analysis results.

## Features

- Paste a policy into a full-height editor in a fixed left panel.
- Quick example chips for PTO, remote work, expenses, and code of conduct.
- One-click **Run pressure test** action.
- Structured analysis across eight dimensions, including:
  - Ambiguities & unclear language
  - Edge cases & unusual scenarios
  - Potential misuse or abuse
  - Fairness & consistency risks
  - Compliance & legal risk areas
  - Employee experience impact
  - Recommended improvements
  - Overall robustness
- Overall robustness verdict card with score, risk badge, progress bar, and summary text.
- Score strip and detailed finding cards with severity-tinted rows.
- Loading state with spinner + skeleton bars.
- Error state with API error details.

## Tech Stack

- React
- Vite
- Plain CSS Modules
- OpenAI Chat Completions API (model: `gpt-4o`)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file and set your API key:
   ```bash
   cp .env.example .env
   ```
3. Add your API key to `.env`:
   ```env
   VITE_ANTHROPIC_API_KEY=your_api_key_here
   # Optional fallback:
   VITE_OPENAI_API_KEY=your_api_key_here
   ```
4. Run locally:
   ```bash
   npm run dev
   ```

## Live Demo

- _Add your deployed URL here_
