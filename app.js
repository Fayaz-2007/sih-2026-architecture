/* =========================================================================
   On-Premise Multi-Model AI Workbench — interactive architecture
   Vanilla JS · no dependencies
   ========================================================================= */
(function () {
  'use strict';

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var NS = 'http://www.w3.org/2000/svg';
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mqStack = window.matchMedia('(max-width: 1080px)');
  var mqWide = window.matchMedia('(min-width: 1280px)');

  /* ===================================================================
     1 · small in-card visuals
     =================================================================== */
  var SMALL = {
    userinput:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="11" y="15" width="42" height="27" rx="6" stroke="#5fe4ff" stroke-opacity=".85" stroke-width="1.6"/>' +
      '<path d="M19 25h20M19 31h13" stroke="#bcd6ff" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="M25 42l-4 7" stroke="#5fe4ff" stroke-opacity=".8" stroke-width="1.6" stroke-linecap="round"/>' +
      '<circle cx="35" cy="47" r="2" fill="#5fe4ff" fill-opacity=".35"/><circle cx="41" cy="47" r="2" fill="#5fe4ff" fill-opacity=".65"/><circle cx="47" cy="47" r="2" fill="#5fe4ff"/></svg>',
    web:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="12" y="14" width="40" height="33" rx="5" stroke="#7ba0ff" stroke-width="1.6" stroke-opacity=".85"/>' +
      '<path d="M12 23h40" stroke="#7ba0ff" stroke-width="1.5" stroke-opacity=".6"/>' +
      '<circle cx="17" cy="18.5" r="1.4" fill="#7ba0ff"/>' +
      '<rect x="26" y="30" width="12" height="10" rx="2" stroke="#46e6a6" stroke-width="1.6"/>' +
      '<path d="M28 30v-2a4 4 0 0 1 8 0v2" stroke="#46e6a6" stroke-width="1.6"/></svg>',
    agent:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="32" cy="32" r="9.5" stroke="#8fb0ff" stroke-width="1.6"/><circle cx="32" cy="32" r="2.6" fill="#8fb0ff"/>' +
      '<circle cx="14" cy="17" r="4" stroke="#5fe4ff" stroke-width="1.5"/><circle cx="50" cy="17" r="4" stroke="#5fe4ff" stroke-width="1.5"/>' +
      '<circle cx="14" cy="47" r="4" stroke="#5fe4ff" stroke-width="1.5"/><circle cx="50" cy="47" r="4" stroke="#5fe4ff" stroke-width="1.5"/>' +
      '<path d="M22.5 25 17 20M41.5 25 47 20M22.5 39 17 44M41.5 39 47 44" stroke="#6f8fd8" stroke-width="1.4"/></svg>',
    router:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M32 10v9" stroke="#46e2ff" stroke-width="1.7" stroke-linecap="round"/>' +
      '<rect x="15" y="19" width="34" height="16" rx="4" stroke="#46e2ff" stroke-width="1.7"/>' +
      '<circle cx="32" cy="27" r="2" fill="#46e2ff"/>' +
      '<path d="M22 35v7M32 35v7M42 35v7" stroke="#8fb0ff" stroke-width="1.5" stroke-linecap="round"/>' +
      '<circle cx="22" cy="47" r="2.2" fill="#8fb0ff"/><circle cx="32" cy="47" r="2.2" fill="#46e6a6"/><circle cx="42" cy="47" r="2.2" fill="#8fb0ff"/></svg>',
    pool:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="9" y="9" width="18" height="18" rx="4" stroke="#b79bff" stroke-width="1.5"/><rect x="37" y="9" width="18" height="18" rx="4" stroke="#b79bff" stroke-width="1.5"/>' +
      '<rect x="9" y="37" width="18" height="18" rx="4" stroke="#b79bff" stroke-width="1.5"/><rect x="37" y="37" width="18" height="18" rx="4" stroke="#46e6a6" stroke-width="1.6"/>' +
      '<circle cx="32" cy="32" r="4.4" fill="#0a0f22" stroke="#c3adff" stroke-width="1.5"/>' +
      '<path d="M22 22l6.5 6.5M42 22l-6.5 6.5M22 42l6.5-6.5M42 42l-6.5-6.5" stroke="#6f8fd8" stroke-width="1.3"/></svg>',
    tools:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M23 15l-9 9 9 9M41 15l9 9-9 9" stroke="#b79bff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<circle cx="32" cy="45" r="7.5" stroke="#5fe4ff" stroke-width="1.6"/>' +
      '<path d="M32 37.5v-3M32 55.5v-3M24.5 45h-3M42.5 45h-3" stroke="#5fe4ff" stroke-width="1.5" stroke-linecap="round"/></svg>',
    verify:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M32 11 17 16.5v11.5c0 10.5 7.2 15.6 15 18.5 7.8-2.9 15-8 15-18.5V16.5L32 11Z" stroke="#46e6a6" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M24.5 31l5.5 5.5L41 24" stroke="#46e6a6" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    output:
      '<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="16" y="12" width="28" height="35" rx="4" stroke="#5fe4ff" stroke-width="1.6"/>' +
      '<path d="M22 22h16M22 28h16M22 34h11" stroke="#bcd6ff" stroke-width="1.5" stroke-linecap="round"/>' +
      '<path d="M45 41l2.2 5.3 5.3 2.2-5.3 2.2L45 56l-2.2-5.3L37.5 48.5l5.3-2.2z" fill="#46e6a6"/></svg>',

    docs:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="4" width="11" height="15" rx="2" stroke="#5ef0b8" stroke-width="1.5"/><path d="M8.5 3H19v14.5" stroke="#5ef0b8" stroke-width="1.3" stroke-opacity=".5"/></svg>',
    ingest:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v9M8 8.5l4 4 4-4" stroke="#5ef0b8" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 16h14v3.5H5z" stroke="#5ef0b8" stroke-width="1.4"/></svg>',
    ocr:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#5ef0b8" stroke-width="1.4"/><path d="M4 12h16" stroke="#5fe4ff" stroke-width="1.6"/><circle cx="8" cy="8" r="1" fill="#5ef0b8"/><circle cx="12" cy="8" r="1" fill="#5ef0b8"/><circle cx="16" cy="8" r="1" fill="#5ef0b8"/></svg>',
    embed:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="9" width="7" height="6" rx="1.5" stroke="#5ef0b8" stroke-width="1.4"/><circle cx="16" cy="6.5" r="1.7" fill="#5ef0b8"/><circle cx="20" cy="12" r="1.7" fill="#5ef0b8"/><circle cx="16" cy="17.5" r="1.7" fill="#5ef0b8"/><path d="M10 12h3.5M14 8l2-1M14 16l2 1" stroke="#5ef0b8" stroke-width="1.2"/></svg>',
    qdrant:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="6" rx="7" ry="3" stroke="#5ef0b8" stroke-width="1.4"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="#5ef0b8" stroke-width="1.4"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="#5ef0b8" stroke-width="1.2" stroke-opacity=".6"/></svg>',
    knowledge:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="10" r="5" stroke="#5ef0b8" stroke-width="1.5"/><path d="M10 17.5h4M10.5 20h3" stroke="#5ef0b8" stroke-width="1.5" stroke-linecap="round"/><path d="M12 3v1.6M4.2 10H2.6M21.4 10h-1.6M6 5 4.9 3.9M18 5l1.1-1.1" stroke="#5ef0b8" stroke-width="1.2" stroke-linecap="round"/></svg>'
  };
  $$('[data-viz]').forEach(function (el) {
    var k = el.getAttribute('data-viz');
    if (SMALL[k]) el.innerHTML = SMALL[k];
  });

  /* ===================================================================
     2 · module content for the detail sheet
     =================================================================== */
  var MODULES = {
    userinput: {
      kicker: 'Entry', name: 'User Input',
      blurb: 'A user submits a prompt, question, document, or image through the workbench. Requests can mix text and files in a single turn. Everything is captured inside the organisation’s network — nothing is sent to a third party.',
      steps: ['CAPTURE', 'VALIDATE', 'QUEUE'],
      tech: ['Web UI', 'REST', 'WebSocket']
    },
    web: {
      kicker: 'Entry point', name: 'Secure Web Interface',
      blurb: 'A hardened web application authenticates every user, applies role-based access rules, and streams responses back token by token. All traffic stays on the internal network, behind the organisation’s firewall.',
      steps: ['AUTHENTICATE', 'AUTHORISE', 'STREAM'],
      tech: ['React', 'FastAPI', 'OAuth2 / OIDC', 'RBAC']
    },
    agent: {
      kicker: 'Coordinator', name: 'Agent Orchestrator',
      blurb: 'The agent is the decision-maker. It interprets the request, hands each step to the Model Router to pick a model, decides when to query the knowledge base, and chooses which tools to run — then loops through the results until the task is done or a limit is reached.',
      steps: ['UNDERSTAND', 'PLAN', 'SELECT TOOLS', 'EXECUTE', 'VERIFY'],
      tech: ['LangGraph', 'Python'],
      note: 'Agent decides → Router selects model → model executes → verify → output'
    },
    router: {
      kicker: 'Dispatcher', name: 'Model Router',
      blurb: 'Analyses the incoming task and selects the most suitable local AI model based on task type and model capability. General reasoning, coding, and vision each map to a different open-weight model, with current GPU load taken into account.',
      steps: ['CLASSIFY', 'SCORE', 'ROUTE'],
      tech: ['Python', 'Ollama'],
      note: 'Coding Task → Qwen2.5-Coder'
    },
    pool: {
      kicker: 'Inference', name: 'Local Multi-Model Pool',
      blurb: 'A pool of quantised open-weight models served by Ollama on local GPUs. The router activates exactly one model per step while the others stay idle, keeping inference fast and hardware use predictable.',
      steps: ['LOAD', 'INFER', 'RETURN'],
      tech: ['Ollama', 'Qwen2.5', 'Qwen2-VL', 'Quantised GGUF'],
      note: 'Qwen2.5-14B · Qwen2.5-Coder · Qwen2-VL-7B · Embeddings'
    },
    tools: {
      kicker: 'Execution', name: 'Tools & Execution Layer',
      blurb: 'A sandboxed layer where the agent runs Python, executes shell commands, queries internal databases, and calls organisational APIs. Every call is scoped to least privilege, time-limited, and written to the audit log.',
      steps: ['RECEIVE CALL', 'SANDBOX', 'RUN', 'RETURN'],
      tech: ['Python', 'Docker sandbox', 'Internal APIs']
    },
    verify: {
      kicker: 'Quality gate', name: 'Verification Layer',
      blurb: 'Generated output is checked before it can reach the user: schema and format validation, groundedness against the retrieved sources, and policy rules. Anything that fails is sent back to the agent for another pass.',
      steps: ['GENERATED RESULT', 'VALIDATION', 'VERIFIED OUTPUT'],
      tech: ['Python', 'Pydantic', 'Rule engine']
    },
    output: {
      kicker: 'Delivery', name: 'Output Generation',
      blurb: 'The verified result is formatted for the user — a direct answer, a document, a table, or code — with citations to any organisational sources used. It is then streamed back through the secure interface.',
      steps: ['FORMAT', 'CITE', 'DELIVER'],
      tech: ['Python', 'Markdown', 'Templating']
    },
    rag: {
      kicker: 'Supporting · Knowledge', name: 'RAG / Knowledge Base',
      blurb: 'A separate supporting component, not a step in the main flow. Documents are ingested, OCR-processed, chunked, embedded and stored in a local Qdrant index. When the agent needs organisational knowledge it sends a query in; the matching passages are returned to the agent as grounding context — a two-way exchange.',
      steps: ['INGEST', 'OCR / CHUNK', 'EMBED', 'INDEX', 'RETRIEVE'],
      tech: ['Qdrant', 'Embedding model', 'OCR / parsing', 'Python'],
      note: 'Agent query → Qdrant search → relevant context back to Agent'
    },
    monitor: {
      kicker: 'Supporting · Observability', name: 'Live Network Monitor',
      blurb: 'The monitor mirrors traffic at the network gateway and records every connection — direction, destination, and outcome. It does not block traffic itself; the egress firewall does that. Its job is to give operators an auditable, real-time view.',
      steps: ['MIRROR', 'INSPECT', 'RECORD', 'ALERT'],
      tech: ['Packet mirror', 'Flow logs', 'Dashboard'],
      note: 'Outbound connections: 0 · System: on-premise'
    },
    security: {
      kicker: 'Cross-cutting', name: 'Security & Sovereignty',
      blurb: 'The workbench runs entirely inside the organisation’s infrastructure. Network isolation and an egress firewall prevent unauthorised outbound traffic, the monitor detects and records any attempt, and dashboards plus audit logs provide the evidence trail.',
      steps: ['ISOLATE', 'DETECT', 'RECORD', 'AUDIT'],
      tech: ['Egress firewall', 'VLAN isolation', 'RBAC', 'Immutable audit log'],
      note: 'Isolation prevents · Monitor detects · Logs prove'
    }
  };

  /* ===================================================================
     3 · large illustration for the detail sheet
     =================================================================== */
  var ACCENT = {
    userinput: '#46e2ff', web: '#5b8bff', agent: '#5b8bff', router: '#46e2ff',
    pool: '#a583ff', tools: '#a583ff', verify: '#46e6a6', output: '#46e2ff',
    rag: '#46e6a6', monitor: '#46e6a6', security: '#5b8bff'
  };
  var GRID = (function () {
    var s = '', x, y;
    for (x = 40; x < 880; x += 40) s += '<line x1="' + x + '" y1="0" x2="' + x + '" y2="268" stroke="#8aa2e0" stroke-opacity=".05"/>';
    for (y = 40; y < 268; y += 40) s += '<line x1="0" y1="' + y + '" x2="880" y2="' + y + '" stroke="#8aa2e0" stroke-opacity=".05"/>';
    return s;
  })();

  function T(x, y, str, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (o.anchor || 'middle') +
      '" font-family="' + (o.family || '\'Space Grotesk\',Inter,sans-serif') + '" font-size="' + (o.size || 12) +
      '" font-weight="' + (o.w || 600) + '" fill="' + (o.fill || '#dbe6ff') + '" fill-opacity="' + (o.op == null ? 1 : o.op) +
      '" letter-spacing="' + (o.ls == null ? 0.4 : o.ls) + '">' + str + '</text>';
  }
  function B(x, y, w, h, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (o.r || 12) +
      '" fill="' + (o.fill || 'rgba(91,139,255,.10)') + '" stroke="' + (o.stroke || '#5b8bff') +
      '" stroke-opacity="' + (o.so == null ? 0.5 : o.so) + '"/>';
  }
  function AR(x1, y1, x2, y2, c) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (c || '#6f9bff') +
      '" stroke-width="1.5" stroke-opacity=".7" marker-end="url(#ah' + (c === '#3fdc9b' ? 'g' : '') + ')"/>';
  }
  function frame(key, inner) {
    var a = ACCENT[key] || '#3a5cc8';
    return '<svg viewBox="0 0 880 268" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" role="img">' +
      '<defs>' +
      '<linearGradient id="bg_' + key + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0d1633"/><stop offset="1" stop-color="#090d1e"/></linearGradient>' +
      '<radialGradient id="gl_' + key + '" cx="50%" cy="40%" r="62%"><stop offset="0" stop-color="' + a + '" stop-opacity=".32"/><stop offset="1" stop-color="' + a + '" stop-opacity="0"/></radialGradient>' +
      '<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#6f9bff" fill-opacity=".8"/></marker>' +
      '<marker id="ahg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#3fdc9b" fill-opacity=".9"/></marker>' +
      '<marker id="ahp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#b79bff" fill-opacity=".9"/></marker>' +
      '</defs>' +
      '<rect width="880" height="268" fill="url(#bg_' + key + ')"/><g>' + GRID + '</g><rect width="880" height="268" fill="url(#gl_' + key + ')"/>' +
      inner + '</svg>';
  }

  function bigViz(key) {
    var i;
    switch (key) {

      case 'router':
        i = T(40, 26, 'ROUTING', { anchor: 'start', size: 10, fill: '#7f97c6', ls: 3 }) +
          B(365, 20, 150, 34, { stroke: '#8fb0ff', fill: 'rgba(120,160,255,.10)' }) + T(440, 42, 'USER TASK', { size: 12 }) +
          AR(440, 55, 440, 83) +
          B(348, 86, 184, 46, { stroke: '#46e2ff', fill: 'rgba(70,226,255,.14)' }) + T(440, 114, 'MODEL ROUTER', { size: 14, fill: '#e6f6ff' }) +
          AR(438, 133, 205, 167) + AR(440, 133, 440, 167) + AR(442, 133, 675, 167) +
          B(110, 168, 190, 32, {}) + T(205, 189, 'GENERAL', { size: 11.5 }) +
          B(345, 168, 190, 32, { stroke: '#46e6a6', fill: 'rgba(70,230,166,.14)' }) + T(440, 189, 'CODE', { size: 11.5, fill: '#c8f6e2' }) +
          B(580, 168, 190, 32, {}) + T(675, 189, 'VISION', { size: 11.5 }) +
          AR(205, 201, 205, 231) + AR(440, 201, 440, 231, '#3fdc9b') + AR(675, 201, 675, 231) +
          B(110, 232, 190, 30, {}) + T(205, 251, 'Qwen2.5-14B', { size: 11 }) +
          B(345, 232, 190, 30, { stroke: '#46e6a6', fill: 'rgba(70,230,166,.16)' }) + T(440, 251, 'Qwen2.5-Coder', { size: 11, fill: '#d6ffee' }) +
          B(580, 232, 190, 30, {}) + T(675, 251, 'Qwen2-VL-7B', { size: 11 });
        return frame(key, i);

      case 'agent':
        i = T(40, 26, 'ORCHESTRATION', { anchor: 'start', size: 10, fill: '#7f97c6', ls: 3 });
        [[150, 60, 'Model Router'], [730, 60, 'RAG'], [150, 176, 'Tools'], [730, 176, 'Files'], [440, 34, 'Memory']].forEach(function (t) {
          i += '<line x1="440" y1="116" x2="' + t[0] + '" y2="' + t[1] + '" stroke="#6f8fd8" stroke-opacity=".3" stroke-width="1.3"/>';
        });
        i += '<circle cx="440" cy="116" r="52" fill="none" stroke="#5b8bff" stroke-opacity=".22"/>' +
          '<circle cx="440" cy="116" r="38" fill="none" stroke="#5b8bff" stroke-opacity=".4"/>' +
          '<circle cx="440" cy="116" r="25" fill="rgba(91,139,255,.16)" stroke="#8fb0ff" stroke-opacity=".75"/>' +
          T(440, 120, 'AGENT', { size: 11, fill: '#e6eeff' });
        [[150, 60, 'Model Router'], [730, 60, 'RAG'], [150, 176, 'Tools'], [730, 176, 'Files'], [440, 34, 'Memory']].forEach(function (t) {
          i += B(t[0] - 62, t[1] - 15, 124, 30, { stroke: '#7f9be0', fill: 'rgba(120,150,220,.10)' }) + T(t[0], t[1] + 4, t[2], { size: 10, w: 500 });
        });
        var pl = ['UNDERSTAND', 'PLAN', 'SELECT TOOLS', 'EXECUTE', 'VERIFY'], px = [22, 194, 366, 538, 710];
        pl.forEach(function (lab, k) {
          i += B(px[k], 226, 148, 30, { stroke: k === 4 ? '#46e6a6' : '#5b8bff', fill: k === 4 ? 'rgba(70,230,166,.12)' : 'rgba(91,139,255,.10)' }) +
            T(px[k] + 74, 245, lab, { size: lab.length > 8 ? 10 : 11, fill: k === 4 ? '#d6ffee' : '#dbe6ff' });
          if (k < 4) i += AR(px[k] + 150, 241, px[k] + 192, 241);
        });
        return frame(key, i);

      case 'pool':
        i = T(40, 26, 'LOCAL INFERENCE', { anchor: 'start', size: 10, fill: '#7f97c6', ls: 3 });
        var cards = [
          [58, 40, 'Qwen2.5-14B', 'General reasoning', 0],
          [572, 40, 'Qwen2.5-Coder', 'Coding', 1],
          [58, 162, 'Qwen2-VL-7B', 'Vision · OCR · multimodal', 0],
          [572, 162, 'Embedding Model', 'Knowledge retrieval', 0]
        ];
        cards.forEach(function (c) {
          i += '<line x1="440" y1="120" x2="' + (c[0] + 125) + '" y2="' + (c[1] + 31) + '" stroke="#6f8fd8" stroke-opacity=".28" stroke-width="1.3"/>';
        });
        i += '<circle cx="440" cy="120" r="40" fill="rgba(165,131,255,.10)" stroke="#a583ff" stroke-opacity=".5"/>' +
          '<circle cx="440" cy="120" r="27" fill="rgba(165,131,255,.16)" stroke="#c3adff" stroke-opacity=".75"/>' +
          T(440, 124, 'OLLAMA', { size: 10.5, fill: '#efeaff', ls: 1 });
        cards.forEach(function (c) {
          var on = c[4];
          i += B(c[0], c[1], 250, 62, { stroke: on ? '#46e6a6' : '#8f9bd8', fill: on ? 'rgba(70,230,166,.12)' : 'rgba(140,155,220,.07)' }) +
            T(c[0] + 16, c[1] + 26, c[2], { anchor: 'start', size: 13, fill: '#eef2ff' }) +
            T(c[0] + 16, c[1] + 46, c[3], { anchor: 'start', size: 10.5, w: 450, fill: '#9fb0dc', ls: 0.2 }) +
            (on ? '<circle cx="' + (c[0] + 232) + '" cy="' + (c[1] + 18) + '" r="4" fill="#46e6a6"/>' : '');
        });
        i += T(440, 250, 'Router activates one model per step — the rest stay idle', { size: 10, fill: '#8aa0cc', w: 450, ls: 0.4 });
        return frame(key, i);

      case 'verify':
        i = T(40, 26, 'QUALITY GATE', { anchor: 'start', size: 10, fill: '#7f97c6', ls: 3 }) +
          '<path d="M366 60l-13 4.5v10c0 8 6 12.5 13 15 7-2.5 13-7 13-15v-10L366 60Z" fill="none" stroke="#8fb0ff" stroke-opacity=".7" stroke-width="1.4"/>' +
          '<path d="M361 74l3.5 3.5L372 70" fill="none" stroke="#8fb0ff" stroke-opacity=".8" stroke-width="1.4" stroke-linecap="round"/>' +
          '<circle cx="430" cy="72" r="8" fill="none" stroke="#46e2ff" stroke-opacity=".8" stroke-width="1.5"/><path d="M436 78l5 5" stroke="#46e2ff" stroke-opacity=".8" stroke-width="1.5" stroke-linecap="round"/>' +
          '<circle cx="486" cy="72" r="9" fill="none" stroke="#46e6a6" stroke-opacity=".8" stroke-width="1.5"/><path d="M481 72l3.5 3.5L491 68" stroke="#46e6a6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
          B(48, 108, 208, 48, { stroke: '#8f9bd8', fill: 'rgba(140,155,220,.08)' }) + T(152, 137, 'GENERATED RESULT', { size: 11 }) +
          AR(258, 132, 318, 132) +
          B(322, 108, 208, 48, { stroke: '#46e2ff', fill: 'rgba(70,226,255,.12)' }) + T(426, 130, 'VALIDATION', { size: 12, fill: '#e6f6ff' }) +
          T(426, 147, 'schema · grounded · policy', { size: 8.5, fill: '#9fb0dc', w: 450, ls: 0.2 }) +
          AR(532, 132, 592, 132, '#3fdc9b') +
          B(596, 108, 232, 48, { stroke: '#46e6a6', fill: 'rgba(70,230,166,.14)' }) + T(712, 137, 'VERIFIED OUTPUT', { size: 12, fill: '#d6ffee' }) +
          '<g transform="rotate(-11 712 205)"><circle cx="712" cy="205" r="30" fill="none" stroke="#46e6a6" stroke-opacity=".6" stroke-dasharray="3 4"/>' + T(712, 209, 'VERIFIED', { size: 9, fill: '#7ff0c6', ls: 1 }) + '</g>' +
          T(184, 205, 'fails → back to the agent for another pass', { anchor: 'start', size: 9.5, fill: '#8aa0cc', w: 450, ls: 0.3 });
        return frame(key, i);

      case 'security':
        i = T(430, 24, 'ON-PREMISE PERIMETER', { size: 10, fill: '#9fb6ec', ls: 2.4 }) +
          '<rect x="150" y="34" width="560" height="150" rx="18" fill="rgba(70,120,255,.05)" stroke="#5b8bff" stroke-opacity=".55" stroke-dasharray="6 6"/>' +
          B(360, 74, 140, 66, { stroke: '#8fb0ff', fill: 'rgba(120,150,230,.10)' }) + T(430, 102, 'AI WORKBENCH', { size: 10.5 }) +
          '<circle cx="398" cy="122" r="4" fill="#5fe4ff"/><circle cx="430" cy="122" r="4" fill="#5fe4ff"/><circle cx="462" cy="122" r="4" fill="#5fe4ff"/>' +
          B(20, 76, 108, 44, { stroke: '#ffb454', fill: 'rgba(255,180,84,.08)', so: 0.6 }) +
          T(74, 94, 'EXTERNAL', { size: 9, fill: '#ffd6a3', ls: 0.6 }) + T(74, 108, 'AI API', { size: 9, fill: '#ffd6a3', ls: 0.6 }) +
          '<line x1="128" y1="98" x2="188" y2="106" stroke="#ffb454" stroke-width="1.6" stroke-dasharray="4 4"/>' +
          '<g stroke="#ff9d5c" stroke-width="2.6" stroke-linecap="round"><line x1="184" y1="99" x2="196" y2="111"/><line x1="196" y1="99" x2="184" y2="111"/></g>' +
          T(150, 150, 'blocked at egress firewall', { anchor: 'start', size: 9, fill: '#ffc890', w: 450, ls: 0.3 }) +
          B(40, 206, 236, 46, {}) + T(158, 224, 'ISOLATION / FIREWALL', { size: 10 }) + T(158, 240, 'prevents outbound traffic', { size: 8.5, fill: '#9fb0dc', w: 450 }) +
          AR(280, 229, 316, 229) +
          B(322, 206, 236, 46, { stroke: '#46e2ff', fill: 'rgba(70,226,255,.10)' }) + T(440, 224, 'NETWORK MONITOR', { size: 10, fill: '#e6f6ff' }) + T(440, 240, 'detects + records attempts', { size: 8.5, fill: '#9fb0dc', w: 450 }) +
          AR(562, 229, 598, 229) +
          B(604, 206, 236, 46, { stroke: '#46e6a6', fill: 'rgba(70,230,166,.10)' }) + T(722, 224, 'DASHBOARD / LOGS', { size: 10, fill: '#d6ffee' }) + T(722, 240, 'provide the evidence', { size: 8.5, fill: '#9fb0dc', w: 450 });
        return frame(key, i);

      case 'monitor':
        i = T(48, 30, 'TRAFFIC — LAST 60 S', { anchor: 'start', size: 10, fill: '#8aa0cc', ls: 2 }) +
          '<polyline points="48,150 48,122 120,126 190,118 260,128 330,120 400,129 470,121 540,127 560,150" fill="rgba(70,230,166,.10)"/>' +
          '<polyline points="48,122 120,126 190,118 260,128 330,120 400,129 470,121 540,127" fill="none" stroke="#46e6a6" stroke-width="1.8" stroke-opacity=".9"/>' +
          '<line x1="48" y1="150" x2="560" y2="150" stroke="#8aa2e0" stroke-opacity=".2"/>' +
          B(590, 36, 250, 44, { stroke: '#46e6a6', fill: 'rgba(70,230,166,.10)' }) + T(606, 58, 'Outbound connections', { anchor: 'start', size: 10, fill: '#9fb0dc', w: 450 }) + T(824, 64, '0', { anchor: 'end', size: 16, fill: '#7ff0c6' }) +
          B(590, 88, 250, 44, {}) + T(606, 110, 'Inbound (LAN) sessions', { anchor: 'start', size: 10, fill: '#9fb0dc', w: 450 }) + T(824, 116, '42', { anchor: 'end', size: 16, fill: '#dbe6ff' }) +
          B(590, 140, 250, 44, { stroke: '#ffb454', fill: 'rgba(255,180,84,.08)' }) + T(606, 162, 'Blocked egress attempts', { anchor: 'start', size: 10, fill: '#9fb0dc', w: 450 }) + T(824, 168, '3', { anchor: 'end', size: 16, fill: '#ffd0a0' }) +
          T(48, 198, '18:42:07  egress → api.openai.com:443        BLOCKED  (firewall)', { anchor: 'start', size: 9.5, fill: '#8fa6cf', w: 400, ls: 0.2, family: 'ui-monospace,Menlo,Consolas,monospace' }) +
          T(48, 218, '18:41:52  egress → huggingface.co:443         BLOCKED  (firewall)', { anchor: 'start', size: 9.5, fill: '#8fa6cf', w: 400, ls: 0.2, family: 'ui-monospace,Menlo,Consolas,monospace' }) +
          T(48, 238, '18:41:31  lan    → 10.0.4.12:11434 (ollama)     ALLOWED', { anchor: 'start', size: 9.5, fill: '#7fb8a0', w: 400, ls: 0.2, family: 'ui-monospace,Menlo,Consolas,monospace' }) +
          T(48, 258, 'illustrative log format · demo data', { anchor: 'start', size: 8.5, fill: '#5f7099', w: 400 });
        return frame(key, i);

      case 'userinput':
        i = T(440, 40, 'TEXT  ·  FILES  ·  IMAGES', { size: 10, fill: '#8aa0cc', ls: 2.4 }) +
          B(210, 54, 460, 152, { stroke: '#5fe4ff', fill: 'rgba(70,226,255,.06)' }) +
          '<circle cx="234" cy="78" r="4" fill="#ff6b6b" fill-opacity=".55"/><circle cx="250" cy="78" r="4" fill="#ffb454" fill-opacity=".55"/><circle cx="266" cy="78" r="4" fill="#46e6a6" fill-opacity=".55"/>' +
          T(232, 122, 'Draft a summary of the Q3 audit and flag risks', { anchor: 'start', size: 12, fill: '#dbe6ff', w: 450, ls: 0.2 }) +
          '<rect x="232" y="134" width="2" height="15" fill="#5fe4ff"/>' +
          B(232, 158, 118, 30, { r: 8, stroke: '#8f9bd8', fill: 'rgba(140,155,220,.08)' }) + T(291, 177, 'audit.pdf', { size: 10, w: 500 }) +
          B(360, 158, 118, 30, { r: 8, stroke: '#8f9bd8', fill: 'rgba(140,155,220,.08)' }) + T(419, 177, 'chart.png', { size: 10, w: 500 }) +
          AR(670, 130, 742, 130) + T(748, 134, 'to workbench', { anchor: 'start', size: 9.5, fill: '#8aa0cc', w: 450 });
        return frame(key, i);

      case 'web':
        i = T(440, 30, 'AUTHENTICATED SESSION', { size: 10, fill: '#8aa0cc', ls: 2.4 }) +
          B(190, 44, 500, 182, { stroke: '#5b8bff', fill: 'rgba(91,139,255,.06)' }) +
          B(214, 62, 452, 26, { r: 8, stroke: '#8f9bd8', fill: 'rgba(140,155,220,.10)' }) +
          '<rect x="233" y="72" width="13" height="9" rx="2" fill="rgba(70,230,166,.25)" stroke="#46e6a6" stroke-opacity=".7"/><path d="M235.5 72v-2a4 4 0 0 1 8 0v2" fill="none" stroke="#46e6a6" stroke-opacity=".7" stroke-width="1.3"/>' +
          T(260, 81, 'workbench.internal', { anchor: 'start', size: 10, fill: '#bfe0cf', w: 450 }) +
          '<circle cx="240" cy="120" r="12" fill="rgba(120,150,230,.15)" stroke="#8fb0ff" stroke-opacity=".6"/>' +
          T(262, 124, 'user@org   ·   role: analyst', { anchor: 'start', size: 10.5, fill: '#dbe6ff', w: 450 }) +
          T(262, 158, '▸ streaming response…', { anchor: 'start', size: 10, fill: '#9fb0dc', w: 450 }) +
          '<rect x="262" y="168" width="360" height="6" rx="3" fill="rgba(150,175,240,.18)"/><rect x="262" y="182" width="300" height="6" rx="3" fill="rgba(150,175,240,.14)"/><rect x="262" y="196" width="332" height="6" rx="3" fill="rgba(150,175,240,.10)"/>';
        return frame(key, i);

      case 'tools':
        i = T(440, 28, 'SANDBOXED EXECUTION', { size: 10, fill: '#8aa0cc', ls: 2.4 });
        var pan = [
          [140, 46, 'shell', 'M0 0'], [520, 46, 'code', ''], [140, 144, 'database', ''], [520, 144, 'internal API', '']
        ];
        pan.forEach(function (p) {
          i += B(p[0], p[1], 220, 78, { stroke: '#8f9bd8', fill: 'rgba(140,155,220,.07)' }) +
            T(p[0] + 16, p[1] + 22, p[2], { anchor: 'start', size: 10, fill: '#9fb0dc', ls: 0.4, w: 500 });
        });
        i += '<path d="M170 88h30M170 96h20" stroke="#5fe4ff" stroke-width="1.6" stroke-linecap="round"/><path d="M164 84l6 6-6 6" fill="none" stroke="#5fe4ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M556 82l-9 8 9 8M604 82l9 8-9 8" fill="none" stroke="#b79bff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<ellipse cx="188" cy="182" rx="18" ry="7" fill="none" stroke="#5ef0b8" stroke-width="1.5"/><path d="M170 182v14c0 3.9 8 7 18 7s18-3.1 18-7v-14" fill="none" stroke="#5ef0b8" stroke-width="1.5"/>' +
          '<circle cx="596" cy="190" r="8" fill="none" stroke="#46e2ff" stroke-width="1.6"/><path d="M596 182v-4M596 202v-4M588 190h-4M608 190h-4" stroke="#46e2ff" stroke-width="1.5" stroke-linecap="round"/>' +
          T(440, 250, 'every call — scoped · time-limited · logged', { size: 10, fill: '#8aa0cc', ls: 0.4, w: 450 });
        return frame(key, i);

      case 'output':
        i = T(440, 28, 'FINAL ANSWER', { size: 10, fill: '#8aa0cc', ls: 2.4 }) +
          B(250, 46, 380, 182, { stroke: '#5fe4ff', fill: 'rgba(70,226,255,.06)' }) +
          T(276, 78, 'Q3 Audit Summary', { anchor: 'start', size: 13, fill: '#eef4ff' }) +
          '<rect x="276" y="90" width="300" height="6" rx="3" fill="rgba(150,175,240,.18)"/><rect x="276" y="104" width="330" height="6" rx="3" fill="rgba(150,175,240,.14)"/><rect x="276" y="118" width="256" height="6" rx="3" fill="rgba(150,175,240,.12)"/>' +
          '<rect x="276" y="150" width="14" height="40" fill="#5b8bff" fill-opacity=".5"/><rect x="298" y="140" width="14" height="50" fill="#46e2ff" fill-opacity=".5"/><rect x="320" y="162" width="14" height="28" fill="#a583ff" fill-opacity=".5"/><rect x="342" y="150" width="14" height="40" fill="#46e6a6" fill-opacity=".5"/>' +
          T(276, 214, 'Sources:  [1] audit_2024.pdf   [2] risk_register', { anchor: 'start', size: 9, fill: '#8fa6cf', w: 450, ls: 0.2 }) +
          AR(630, 137, 700, 137) +
          '<circle cx="722" cy="137" r="13" fill="rgba(120,150,230,.15)" stroke="#8fb0ff" stroke-opacity=".6"/><circle cx="722" cy="132" r="4" fill="none" stroke="#8fb0ff" stroke-opacity=".7" stroke-width="1.4"/><path d="M714 146a8 8 0 0 1 16 0" fill="none" stroke="#8fb0ff" stroke-opacity=".7" stroke-width="1.4"/>';
        return frame(key, i);

      case 'rag':
        i = T(40, 24, 'KNOWLEDGE BASE  —  TWO-WAY WITH THE AGENT', { anchor: 'start', size: 10, fill: '#7f97c6', ls: 2.4 });
        var rn = ['Documents', 'Ingestion', 'OCR / Chunk', 'Embeddings', 'Qdrant', 'Knowledge'];
        var rx = [28, 165, 302, 439, 576, 713];
        rn.forEach(function (lab, k) {
          i += B(rx[k], 60, 128, 42, { stroke: '#5ef0b8', fill: 'rgba(94,240,184,.08)' }) +
            T(rx[k] + 64, 85, lab, { size: 10, fill: '#d6ffe9' });
          if (k < 5) i += AR(rx[k] + 128, 81, rx[k + 1] - 1, 81, '#3fdc9b');
        });
        i += '<rect x="7" y="63" width="11" height="14" rx="2" fill="none" stroke="#5ef0b8" stroke-opacity=".7" stroke-width="1.3"/><rect x="14" y="71" width="11" height="14" rx="2" fill="#0d1633" stroke="#5ef0b8" stroke-opacity=".5" stroke-width="1.3"/>' +
          B(372, 196, 136, 44, { stroke: '#8fb0ff', fill: 'rgba(120,150,230,.14)' }) + T(440, 222, 'AGENT', { size: 12, fill: '#e6eeff' }) +
          '<path d="M408 196 C 408 150, 620 152, 638 104" fill="none" stroke="#b79bff" stroke-width="1.5" stroke-dasharray="5 4" marker-end="url(#ahp)"/>' +
          T(470, 138, 'query', { size: 9.5, fill: '#c9b8ff', ls: 0.6 }) +
          '<path d="M777 104 C 792 152, 512 154, 474 196" fill="none" stroke="#b79bff" stroke-width="1.7" marker-end="url(#ahp)"/>' +
          T(626, 166, 'relevant context', { size: 9.5, fill: '#c9b8ff', ls: 0.4 }) +
          T(28, 256, 'Documents → Document Ingestion → OCR / Chunking → Embeddings → Qdrant → Relevant Knowledge', { anchor: 'start', size: 9.5, fill: '#8aa0cc', w: 450, ls: 0.2 });
        return frame(key, i);
    }
    return frame(key, T(440, 134, MODULES[key] ? MODULES[key].name : ''));
  }

  /* ===================================================================
     4 · connectors + travelling data packets
     =================================================================== */
  var stage = $('.stage');
  var arch = $('#arch');
  var wires = $('#wires');
  var wireLayer = $('#wireLayer');
  var pktLayer = $('#pktLayer');

  // exit/entry sides are derived from live geometry (autoAnchors), so the same
  // graph works in both the vertical and the horizontal layout.
  var CONNECTORS = [
    // main task flow
    { f: 'n-userinput', t: 'n-web', k: 'flow' },
    { f: 'n-web', t: 'n-agent', k: 'flow' },
    { f: 'n-agent', t: 'n-router', k: 'flow' },
    { f: 'n-router', t: 'n-pool', k: 'flow' },
    { f: 'n-pool', t: 'n-tools', k: 'flow' },
    { f: 'n-tools', t: 'n-verify', k: 'flow' },
    { f: 'n-verify', t: 'n-output', k: 'flow' },

    // RAG internal pipeline
    { f: 'r-docs', t: 'r-ingest', k: 'rag' },
    { f: 'r-ingest', t: 'r-ocr', k: 'rag' },
    { f: 'r-ocr', t: 'r-embed', k: 'rag' },
    { f: 'r-embed', t: 'r-qdrant', k: 'rag' },
    { f: 'r-qdrant', t: 'r-knowledge', k: 'rag' },

    // Agent <-> RAG : two-way. Agent sends a query into the knowledge base (to Qdrant),
    // Relevant Knowledge is returned to the Agent as grounding context.
    { f: 'n-agent', t: 'r-qdrant', k: 'retr' },
    { f: 'r-knowledge', t: 'n-agent', k: 'retr' },

    // Agent decides which tool to run (separate from the main Pool -> Tools flow)
    { f: 'n-agent', t: 'n-tools', k: 'ctrl' },

    // Monitoring observes the security boundary
    { f: 'secframe', t: 'n-monitor', k: 'watch' }
  ];
  var SPEED = { flow: 82, rag: 66, retr: 58, ctrl: 62, watch: 46 };
  var FILL = { flow: 'pktFlow', rag: 'pktRag', retr: 'pktRetr', ctrl: 'pktCtrl', watch: 'pktWatch' };
  var MARKC = { flow: '#78d2ff', rag: '#78f0c3', retr: '#bea8ff', ctrl: '#a7b6ff', watch: '#78e0cd' };

  var built = [];
  var spineChain = null, ragChain = null;

  function anchor(id, side, box) {
    var el = document.getElementById(id);
    var r = el.getBoundingClientRect();
    var x = r.left - box.left, y = r.top - box.top;
    if (side === 'top') return [x + r.width / 2, y];
    if (side === 'bottom') return [x + r.width / 2, y + r.height];
    if (side === 'left') return [x, y + r.height / 2];
    if (side === 'right') return [x + r.width, y + r.height / 2];
    return [x + r.width / 2, y + r.height / 2];
  }
  // pick exit/entry sides from the two elements' relative position — layout-agnostic
  function autoAnchors(fr, tr) {
    var dx = (tr.left + tr.width / 2) - (fr.left + fr.width / 2);
    var dy = (tr.top + tr.height / 2) - (fr.top + fr.height / 2);
    if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? ['right', 'left'] : ['left', 'right'];
    return dy >= 0 ? ['bottom', 'top'] : ['top', 'bottom'];
  }
  function pathD(a, b, bow) {
    var dx = b[0] - a[0], dy = b[1] - a[1];
    var horiz = Math.abs(dx) > Math.abs(dy);
    var k = Math.min(Math.max((horiz ? Math.abs(dx) : Math.abs(dy)) * 0.5, 30), 150);
    var c1, c2;
    if (bow && horiz) {
      // arc above / below a row instead of cutting straight through the cards
      var sx = Math.sign(dx) || 1;
      c1 = [a[0] + sx * k, a[1] + bow];
      c2 = [b[0] - sx * k, b[1] + bow];
    } else if (bow) {
      // arc sideways through the gutter instead of cutting straight through a column
      var sy = Math.sign(dy) || 1;
      c1 = [a[0] + bow, a[1] + sy * k];
      c2 = [b[0] + bow, b[1] - sy * k];
    } else if (horiz) {
      c1 = [a[0] + Math.sign(dx) * k, a[1]];
      c2 = [b[0] - Math.sign(dx) * k, b[1]];
    } else {
      c1 = [a[0], a[1] + Math.sign(dy) * k];
      c2 = [b[0], b[1] - Math.sign(dy) * k];
    }
    return 'M ' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + ' C ' + c1[0].toFixed(1) + ' ' + c1[1].toFixed(1) +
      ', ' + c2[0].toFixed(1) + ' ' + c2[1].toFixed(1) + ', ' + b[0].toFixed(1) + ' ' + b[1].toFixed(1);
  }

  function ensureMarkers() {
    var defs = wires.querySelector('defs');
    ['flow', 'rag', 'retr', 'ctrl', 'watch'].forEach(function (kk) {
      if (defs.querySelector('#arw-' + kk)) return;
      var m = document.createElementNS(NS, 'marker');
      m.setAttribute('id', 'arw-' + kk);
      m.setAttribute('viewBox', '0 0 10 10');
      m.setAttribute('refX', '8'); m.setAttribute('refY', '5');
      m.setAttribute('markerWidth', '7'); m.setAttribute('markerHeight', '7');
      m.setAttribute('orient', 'auto-start-reverse');
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', 'M0 0 L10 5 L0 10 z');
      p.setAttribute('fill', MARKC[kk]);
      p.setAttribute('fill-opacity', '0.8');
      m.appendChild(p); defs.appendChild(m);
    });
  }

  function buildWires() {
    var box = stage.getBoundingClientRect();
    wires.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);
    wireLayer.textContent = '';
    pktLayer.textContent = '';
    built = [];
    var stacked = mqStack.matches;
    if (REDUCE) ensureMarkers();

    var wide = mqWide.matches;

    CONNECTORS.forEach(function (c) {
      if (stacked && (c.k === 'retr' || c.k === 'ctrl' || c.k === 'watch')) return;
      var fe = document.getElementById(c.f), te = document.getElementById(c.t);
      if (!fe || !te) return;
      if (!fe.getClientRects().length || !te.getClientRects().length) return;

      var fs, ts, bow = 0;
      if (c.k === 'ctrl') {
        // Agent -> Tools decision arc: route it clear of the cards in either layout
        if (wide) { fs = 'bottom'; ts = 'bottom'; bow = 70; }
        else { fs = 'right'; ts = 'right'; bow = 58; }
      } else if (c.k === 'retr' && wide) {
        // horizontal layout: the RAG strip is a row beneath the spine — exchange runs vertically
        var toAgent = c.t === 'n-agent';
        fs = toAgent ? 'top' : 'bottom';
        ts = toAgent ? 'bottom' : 'top';
      } else {
        var aa = autoAnchors(fe.getBoundingClientRect(), te.getBoundingClientRect());
        fs = aa[0]; ts = aa[1];
      }

      var d = pathD(anchor(c.f, fs, box), anchor(c.t, ts, box), bow);
      var halo = document.createElementNS(NS, 'path');
      halo.setAttribute('d', d);
      halo.setAttribute('class', 'wire-halo k-' + c.k);
      halo.setAttribute('stroke-width', '7');
      var core = document.createElementNS(NS, 'path');
      core.setAttribute('d', d);
      core.setAttribute('class', 'wire-core k-' + c.k);
      core.setAttribute('stroke-width', c.k === 'flow' ? '1.6' : '1.3');
      if (REDUCE) core.setAttribute('marker-end', 'url(#arw-' + c.k + ')');
      wireLayer.appendChild(halo);
      wireLayer.appendChild(core);

      var len = core.getTotalLength() || 1;
      var rec = { core: core, len: len, kind: c.k, fromId: c.f, toId: c.t, pkts: [], off: Math.random() };
      if (!REDUCE) {
        var n = (c.k === 'watch') ? 2
          : (c.k === 'retr' || c.k === 'ctrl') ? Math.max(2, Math.min(4, Math.round(len / 130)))
          : Math.max(1, Math.min(4, Math.round(len / 150)));
        for (var j = 0; j < n; j++) {
          var dot = document.createElementNS(NS, 'circle');
          dot.setAttribute('r', c.k === 'flow' ? '3.4' : '2.8');
          dot.setAttribute('fill', 'url(#' + FILL[c.k] + ')');
          dot.setAttribute('class', 'pkt p-' + c.k);
          pktLayer.appendChild(dot);
          rec.pkts.push(dot);
        }
      }
      built.push(rec);
    });

    spineChain = chainFrom(['n-userinput', 'n-web', 'n-agent', 'n-router', 'n-pool', 'n-tools', 'n-verify', 'n-output']);
    ragChain = chainFrom(['r-docs', 'r-ingest', 'r-ocr', 'r-embed', 'r-qdrant', 'r-knowledge']);
  }

  function chainFrom(ids) {
    var segs = [], i, b;
    for (i = 0; i < ids.length - 1; i++) {
      b = null;
      built.forEach(function (x) { if (x.fromId === ids[i] && x.toId === ids[i + 1]) b = x; });
      if (b) segs.push(b);
    }
    var total = 0;
    segs.forEach(function (s) { total += s.len; });
    return { segs: segs, total: total, firstId: ids[0] };
  }

  /* --- node arrival pulse --- */
  var lastHit = {};
  function pulse(id) {
    var now = performance.now();
    if (lastHit[id] && now - lastHit[id] < 500) return;
    lastHit[id] = now;
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-hit');
    void el.offsetWidth;
    el.classList.add('is-hit');
  }
  document.addEventListener('animationend', function (e) {
    if (e.animationName === 'nodeHit' || e.animationName === 'stepHit') e.target.classList.remove('is-hit');
  });

  /* --- rAF loop --- */
  var running = !REDUCE;
  var visible = true;
  var t0 = performance.now();
  var walkState = { spine: -2, rag: -2 };

  function opacityAt(f) {
    if (f < 0.07) return f / 0.07;
    if (f > 0.93) return (1 - f) / 0.07;
    return 1;
  }
  function walk(chain, elapsed, key) {
    if (!chain || !chain.segs.length) return;
    var tail = 150;
    var head = (elapsed * SPEED.flow) % (chain.total + tail);
    var acc = 0, idx = -1, i;
    for (i = 0; i < chain.segs.length; i++) {
      acc += chain.segs[i].len;
      if (head <= acc) { idx = i; break; }
    }
    if (idx !== walkState[key]) {
      walkState[key] = idx;
      if (idx >= 0) pulse(chain.segs[idx].toId);
      else pulse(chain.firstId);
    }
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (!running || !visible) return;
    var t = (now - t0) / 1000;
    var b, i, f, pt;
    for (var w = 0; w < built.length; w++) {
      b = built[w];
      if (!b.pkts.length) continue;
      var period = b.len / SPEED[b.kind];
      for (i = 0; i < b.pkts.length; i++) {
        f = ((t / period) + b.off + i / b.pkts.length) % 1;
        if (f < 0) f += 1;
        pt = b.core.getPointAtLength(f * b.len);
        b.pkts[i].setAttribute('cx', pt.x.toFixed(1));
        b.pkts[i].setAttribute('cy', pt.y.toFixed(1));
        b.pkts[i].setAttribute('opacity', opacityAt(f).toFixed(2));
        // side connectors (Agent<->RAG, Agent->Tools): glow the receiver when the lead packet lands
        if (i === 0 && (b.kind === 'retr' || b.kind === 'ctrl')) {
          if (b._pf != null && b._pf > 0.75 && f < 0.25) pulse(b.toId);
          b._pf = f;
        }
      }
    }
    walk(spineChain, t, 'spine');
    walk(ragChain, t * 0.8 + 0.6, 'rag');
  }
  requestAnimationFrame(tick);

  /* ===================================================================
     5 · detail sheet (modal)
     =================================================================== */
  var modal = $('#modal');
  var sheet = $('.sheet');
  var lastTrigger = null;

  function openModal(key, trigger) {
    var m = MODULES[key];
    if (!m) return;
    lastTrigger = trigger || null;

    $('#sheetViz').innerHTML = bigViz(key);
    $('#sheetKicker').textContent = m.kicker;
    $('#sheetTitle').textContent = m.name;
    $('#sheetBlurb').textContent = m.blurb;
    $('#sheetFlow').innerHTML = m.steps.map(function (s, i) {
      return (i ? '<i></i>' : '') + '<span>' + s + '</span>';
    }).join('');
    var nb = $('#sheetNoteBlock');
    if (m.note) { $('#sheetNote').textContent = m.note; nb.hidden = false; }
    else nb.hidden = true;
    $('#sheetTech').innerHTML = m.tech.map(function (x) { return '<span>' + x + '</span>'; }).join('');

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    arch.classList.add('is-inspecting');
    var card = trigger && trigger.closest ? (trigger.closest('.node') || trigger.closest('.kb') || trigger.closest('.monitor') || trigger.closest('.secframe')) : null;
    $$('.is-selected').forEach(function (n) { n.classList.remove('is-selected'); });
    if (card) card.classList.add('is-selected');

    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    setTimeout(function () { sheet.focus(); }, 40);
    document.addEventListener('keydown', onKey);
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    arch.classList.remove('is-inspecting');
    $$('.is-selected').forEach(function (n) { n.classList.remove('is-selected'); });
    document.removeEventListener('keydown', onKey);
    window.setTimeout(function () {
      modal.hidden = true;
      $('#sheetViz').innerHTML = '';
    }, 360);
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }

  function onKey(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      var f = $$('.sheet button').filter(function (el) { return !el.disabled && el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  $$('[data-mod]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(btn.getAttribute('data-mod'), btn);
    });
  });
  $$('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  /* ===================================================================
     6 · motion toggle
     =================================================================== */
  var toggle = $('#motionToggle');
  function setRunning(on) {
    running = on;
    toggle.setAttribute('aria-pressed', String(on));
    toggle.querySelector('.toggle__label').textContent = on ? 'Flow' : 'Paused';
    stage.classList.toggle('flow-paused', !on);
  }
  toggle.addEventListener('click', function () { setRunning(!running); });
  if (REDUCE) setRunning(false);

  /* ===================================================================
     7 · monitor sparkline
     =================================================================== */
  var sparkLine = $('#sparkLine');
  var sv = [];
  (function () { for (var i = 0; i < 46; i++) sv.push(35); })();
  window.setInterval(function () {
    if (!running || REDUCE) return;
    var next = 35 + (Math.random() * 20 - 10) - Math.sin(Date.now() / 900) * 4;
    sv.push(Math.max(8, Math.min(62, next)));
    sv.shift();
    var pts = sv.map(function (y, i) {
      return ((i / (sv.length - 1)) * 260).toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    sparkLine.setAttribute('points', pts);
  }, 130);

  /* ===================================================================
     8 · layout / resize
     =================================================================== */
  var rebuildTimer = null;
  function scheduleRebuild() {
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(function () {
      buildWires();
      walkState.spine = -2; walkState.rag = -2;
    }, 120);
  }
  window.addEventListener('resize', scheduleRebuild);
  if (window.ResizeObserver) {
    new ResizeObserver(scheduleRebuild).observe(arch);
  }
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (ents) {
      visible = ents[0].isIntersecting;
    }, { rootMargin: '120px' }).observe(stage);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { buildWires(); });
  }
  window.addEventListener('load', function () { setTimeout(buildWires, 60); });

  buildWires();
})();
