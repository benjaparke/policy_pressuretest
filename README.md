# 🔬 Policy Pressure Test

> **The policy auditor that finds the problems your legal team missed** _(but won't admit it)_

## What is This?

Policy Pressure Test is an AI-powered analysis tool that transforms your boring, potentially problematic workplace policies into a detailed risk report in seconds. Paste a policy. Hit one button. Get crushed by reality.

Backed by GPT-4 and delivered through a sleek React interface, this tool identifies the ambiguities, edge cases, fairness gaps, and compliance landmines lurking in your company's policy documents before they become expensive legal lessons.

### Think of it as:
- **Policy MRI** - X-rays your policies to expose hidden issues
- **Compliance speedrun** - Risk assessment in <30 seconds
- **Auditor's best friend** - Catch problems before they catch you

---

## 🎯 What It Does

Submit any workplace policy and get structured risk analysis across **eight critical dimensions**:

| Dimension | What It Checks |
|-----------|---|
| **Ambiguities** | Unclear language that employees will interpret three different ways |
| **Edge Cases** | Weird scenarios nobody thought about (until it's too late) |
| **Potential Misuse** | How creative people will exploit loopholes |
| **Fairness & Consistency** | Whether the policy treats everyone equally |
| **Compliance & Legal Risk** | Regulatory violations and legal exposure |
| **Employee Experience** | How this policy will affect morale and retention |
| **Recommended Improvements** | Specific, actionable fixes |
| **Overall Robustness Score** | A verdict on your policy's strength |

Each finding comes with a severity rating, so you know whether to panic immediately or schedule it for next quarter.

---

## ✨ Features

- **Live Policy Editor** – Full-height editor with your policy text front and center
- **Quick Examples** – One-click sample policies (PTO, Remote Work, Expenses, Code of Conduct) to test drive the tool
- **One-Click Analysis** – The beautifully simple "Run Pressure Test" button
- **Rich Results Dashboard**
  - Overall robustness verdict with score and risk badge
  - Color-coded severity indicators (Red = Yikes, Yellow = Hmm, Green = OK)
  - Progress bar showing policy health
  - Detailed finding cards with recommendations
- **Smart Loading States** – Spinner and skeleton UI while the AI works
- **Graceful Error Handling** – Helpful error messages when things go wrong

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|---------|
| **React** | Component-based UI |
| **Vite** | Lightning-fast dev server and builds |
| **CSS Modules** | Scoped, maintainable styling |
| **OpenAI API** | GPT-4o for policy analysis |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- An OpenAI API key (or Anthropic key as fallback)

### Installation

1. **Clone and install:**
   ```bash
   git clone https://github.com/benjaparke/policy_pressuretest.git
   cd policy_pressuretest
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

3. **Add your API key:**
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   # Optional fallback:
   VITE_ANTHROPIC_API_KEY=your_anthropic_key
   ```

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

---

## 📋 How to Use

1. **Paste or select** – Drop your policy into the editor, or pick a quick example
2. **Run test** – Click the "Run Pressure Test" button
3. **Review findings** – Read through the structured analysis
4. **Act** – Fix the issues the tool found before your employees find them for you

---

## 🎬 Demo

_(Add your live deployment URL here)_

---

## 📁 Project Structure

```
src/
├── components/        # React components (Editor, Results, etc.)
├── styles/           # CSS Modules
├── hooks/            # Custom React hooks
├── lib/              # API calls and utilities
└── App.jsx           # Main component
```

---

## 🔧 Configuration

The app expects these environment variables:

- `VITE_OPENAI_API_KEY` – Your OpenAI API key (primary)
- `VITE_ANTHROPIC_API_KEY` – Anthropic key (optional fallback)

Get your OpenAI key: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

---

## ⚖️ Important Notes

- **This is not legal advice.** Policy Pressure Test is a tool for finding potential issues, not a substitute for a qualified employment lawyer.
- **API costs apply.** Each analysis uses the OpenAI API. Monitor your usage.
- **Privacy matters.** Don't paste sensitive data you don't want sent to an LLM. Consider anonymizing before testing.

---

## 🤝 Contributing

Found a bug? Have an idea? Open an issue or submit a PR. Contributions welcome!

---

## 📄 License

[Add your license here]

---

**Built with 🔍 and ☕ by [benjaparke](https://github.com/benjaparke)**
