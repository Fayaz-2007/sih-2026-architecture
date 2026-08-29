# On-Premise Multi-Model AI Workbench — Interactive Architecture Section

A self-contained, dependency-free section that explains the full AI system
architecture through animated data flow and click-to-expand module detail panels.
Built for an SIH judge presentation on a laptop/desktop; responsive down to mobile.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Markup for the section (drop into any page, or embed via `<iframe>`) |
| `styles.css` | All styling — dark enterprise theme, glassmorphism, layout, responsive, reduced-motion |
| `app.js` | Connectors + travelling data packets, module glow, detail modal, monitor sparkline |
| `serve.py` | Tiny local static server (optional — any static server works) |

No build step. No external JS/CSS except Google Fonts (degrades gracefully offline).

## Run locally

```bash
python serve.py
```

Then open **http://localhost:4173/** . Or use any static server:

```bash
npx serve .
# or
python -m http.server 4173
```

## Embed in the main site

- **Same page:** copy the `<main class="page">` … `</main>` block and the `<div class="modal">` block from `index.html`, then link `styles.css` and `app.js`.
- **Isolated:** `<iframe src="/architecture-section/" style="width:100%;border:0;height:...">`.

## Interaction model

- **Static layout** = the design you can read at a glance.
- **Moving packets** = how a request actually flows.
  - **Main flow (cyan):** User Input → Secure Web Interface → Agent Orchestrator → **Model Router** → Local Multi-Model Pool → Tools & Execution → Verification → Output. The Agent always goes *through* the Router to reach the model pool — never around it.
  - **Agent ↔ RAG (purple, two-way):** the Agent sends a query into the knowledge base (to Qdrant); Relevant Knowledge is returned to the Agent as grounding context. RAG stays a separate supporting component with its own internal pipeline: Documents → Document Ingestion → OCR / Chunking → Embeddings → Qdrant → Relevant Knowledge.
  - **Agent → tools (blue):** the Agent decides which tool to run — shown as its own connector, distinct from the sequential Pool → Tools step.
  - **Monitoring (teal):** the Live Network Monitor taps the Security & Sovereignty boundary. Network isolation / the egress firewall *prevents* unauthorised outbound connections; the monitor only *observes and records* them.
- The message it should leave: **Agent decides → Router selects the model → the local model executes → the Agent pulls in RAG / tools when needed → Verification checks → final output.**
- **Click any module** = it expands into a detail panel (large visual, 2–4 sentence explanation, a `UNDERSTAND → PLAN → …` sequence, and the technologies). `Esc`, the close button, or the backdrop closes it; the background animation keeps running.
- **Flow** button in the header pauses/resumes all motion. `prefers-reduced-motion` is respected automatically (packets off, static arrowheads shown).

## Notes

- The Network Monitor log lines and counters are illustrative demo data.
- The security logic shown is deliberate: the **egress firewall / network isolation prevents** unauthorised outbound traffic, the **monitor detects and records** attempts, and **dashboards + audit logs provide the evidence** — monitoring itself is not claimed to prevent leakage.
