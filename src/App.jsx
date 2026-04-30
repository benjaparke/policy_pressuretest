import { useMemo, useState } from 'react'
import styles from './App.module.css'

const examples = {
  'PTO policy': 'Employees accrue 1.5 PTO days per month. PTO requests should be submitted at least 48 hours in advance. Managers may deny requests during peak periods.',
  'Remote work': 'Employees may work remotely up to 3 days per week with manager approval. Core hours are 10am-3pm local time. Employees must maintain secure internet and attend required meetings.',
  'Expense policy': 'All expenses over $50 require receipts. Travel bookings must use approved vendors unless unavailable. Reimbursements are processed monthly.',
  'Code of conduct': 'Employees must treat everyone respectfully and avoid harassment. Violations may result in disciplinary action up to termination after HR review.'
}

const hiddenDimensions = ['Communication', 'Overall robustness']

const promptSchema = `
Return a JSON object with keys:
- overall: { score: number 1-10, risk_level: string, summary: string }
- dimensions: exactly 6 items.

The dimensions must include these 3 required categories:
1. Clarity
2. Compliance
3. Fairness

Choose exactly 3 additional categories that are most relevant to the policy based on highest risk and usefulness.

Suggested optional categories include:
Misuse Risk, Enforceability, Edge Cases, Employee Experience, Operational Burden, Fraud Risk, Manager Discretion, Documentation Risk, Implementation Risk.

Each dimension must include:
{
  title: string,
  score: number 1-10,
  risk_level: string,
  findings: [{ text: string, severity: string }],
  recommendations: [string]
}

Recommendations should be specific, actionable improvements. Only include recommendations where a change is actually useful. Do not force recommendations for strong areas.

Return ONLY valid JSON.
`

const scoreColor = (score) => score >= 7 ? '#0F6E56' : score >= 4 ? '#854F0B' : '#A32D2D'
const badgeStyle = (score) => ({ background: score >= 7 ? '#d9f2e9' : score >= 4 ? '#f7ebd7' : '#f9dfdf', color: scoreColor(score) })

export default function App() {
  const [policy, setPolicy] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const runTest = async () => {
    setLoading(true); setError('')
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      if (!apiKey) throw new Error('Missing API key. Add VITE_ANTHROPIC_API_KEY (or VITE_OPENAI_API_KEY) in .env.')
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-4o',
          temperature: 0.2,
          messages: [
            { role: 'system', content: `You are a policy risk analyst. ${promptSchema} Return ONLY valid JSON with no markdown or prose.` },
            { role: 'user', content: `Policy text:\n${policy}` }
          ]
        })
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.error?.message || 'API request failed')
      const parsed = JSON.parse(payload.choices?.[0]?.message?.content || '{}')
      setResult(parsed)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

const stripData = useMemo(() => {
  if (!result) return []

  const all = (result.dimensions || []).filter(
    (d) => !hiddenDimensions.includes(d.title)
  )

  const required = ['Clarity', 'Compliance', 'Fairness']

  // Find required categories (flexible matching)
  const requiredItems = required
    .map((r) =>
      all.find((d) =>
        d.title.toLowerCase().includes(r.toLowerCase())
      )
    )
    .filter(Boolean)

  // Fill remaining slots
  const others = all.filter(
    (d) => !requiredItems.includes(d)
  )

  const final = [...requiredItems, ...others].slice(0, 6)

  return final.map((d) => ({
    title: d.title,
    score: d.score
  }))
}, [result])

return <div className={styles.app}>
  <nav className={styles.topNav}>
  <div className={styles.brand}>
    <div className={styles.logoMark}>→</div>
    <div className={styles.brandText}>
      <h1>Policy Pressure Test</h1>
      <p>built with Codex</p>
    </div>
  </div>

  <div className={styles.navActions}>
    <div className={styles.navTooltip}>
      <span className={styles.navLink}>How it works</span>
      <div className={styles.navTooltipBox}>
        Evaluate how your workplace policy performs in real-world scenarios. 
        We score clarity, fairness, compliance, and risk, then suggest improvements where needed.
      </div>
    </div>

    <a
      className={styles.navLink}
      href="https://github.com/benjaparke/policy_pressure_test"
      target="_blank"
      rel="noreferrer"
    >
      GitHub
    </a>
  </div>
</nav>
    <main className={styles.main}>
     <section className={styles.leftPanel}>
        <div className={styles.label}>Put your policy to the test:</div>
        <textarea className={styles.textarea} value={policy} onChange={(e)=>setPolicy(e.target.value)} placeholder="Paste a workplace policy here..."/>
        <div className={styles.footerStack}>
          <div className={styles.chipsRow}>{Object.keys(examples).map((k)=><button key={k} className={styles.chip} onClick={()=>setPolicy(examples[k])}>{k}</button>)}</div>
          <button className={styles.runBtn} disabled={loading || !policy.trim()} onClick={runTest}>Run pressure test</button>
          <div className={styles.verdict}>
            <div className={styles.muted}>Overall robustness</div>
            <div className={styles.scoreRow}>
              <div className={styles.bigScore}>{result?.overall?.score?.toFixed?.(1) ?? '—'}</div><div className={styles.outOf}>/ 10</div>
              <span className={styles.badge} style={badgeStyle(result?.overall?.score || 0)}>{result?.overall?.risk_level || 'No verdict'}</span>
            </div>
            <div className={styles.progressTrack}><div className={styles.progressFill} style={{ width: `${(result?.overall?.score || 0) * 10}%` }} /></div>
            <p className={styles.summary}>{result?.overall?.summary || 'Run the pressure test to generate a robustness verdict and concise risk summary.'}</p>
          </div>
        </div>
      </section>

      <section className={styles.rightPanel}>
        <div className={styles.strip}>{stripData.map((d) => <div className={styles.cell} key={d.title}><div className={styles.cellLabel}>{d.title}</div>
          <div className={styles.cellScore} style={{color: scoreColor(d.score)}}>{d.score || '—'}</div><div className={styles.cellBarTrack}>
            <div className={styles.cellBarFill} style={{ width: `${(d.score || 0) * 10}%`, background: scoreColor(d.score || 0) }} /></div></div>)}</div>
        {loading && <div className={styles.loadingWrap}><div className={styles.spinner} /><div className={styles.skeleton}>{Array.from({length:6}).map((_,i)=><div key={i} className={styles.skelBar} style={{width:`${70 + (i%3)*10}%`}} />)}</div></div>}
        {!!error && <div className={styles.error}>Error: {error}</div>}
        
 {!loading && !error && (
  <div className={styles.cards}>
    {(result?.dimensions || [])
      .filter((d) => !['Communication', 'Overall robustness'].includes(d.title))
      .map((d) => (
        <article className={styles.card} key={d.title}>
          <div className={styles.cardHeader}>
            <div className={styles.icon}>⚑</div>
            <div className={styles.title}>{d.title}</div>
            <span className={styles.risk} style={badgeStyle(d.score)}>
              {d.score}/10 · {d.risk_level}
            </span>
            <span className={styles.chev}>⌄</span>
          </div>

          <ul className={styles.findings}>
            {(d.findings || []).map((f, idx) => (
              <li
                key={idx}
                className={styles.finding}
                style={{
                  borderLeftColor:
                    f.severity === 'high'
                      ? '#A32D2D'
                      : f.severity === 'medium'
                      ? '#854F0B'
                      : f.severity === 'improvement'
                      ? '#0c62d6'
                      : '#0F6E56'
                }}
              >
                {f.text}
              </li>
            ))}
          </ul>

          {d.score <= 6 && d.recommendations?.length > 0 && (
            <div className={styles.recs}>
              <div className={styles.recsTitle}>
                {d.score <= 4 ? 'Critical fixes' : 'Recommended improvements'}
              </div>
              <ul className={styles.recsList}>
                {d.recommendations.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
  </div>
)}     
      </section>
    </main>
  </div>
}
