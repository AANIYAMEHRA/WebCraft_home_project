// Research page copy and data. Mirrors the pattern of aiSolutionsData.js.
// Internal links are router paths; the header and footer come from Layout.
// Keep this shape stable: the CMS step will load/save this same structure.

export const hero = {
  tag: 'Research',
  headline: ['Research That Informs', 'Better Decisions'],
  body:
    "Market research, competitive intelligence, UX research, innovation testing, and strategic advisory — to ensure you're building the right thing.",
  cta: { label: 'Start a Conversation', href: '/contact' },
  chips: [
    { label: 'User', value: 'Interviews', tone: 'teal' },
    { label: 'Market', value: 'Studies', tone: 'blue' },
    { label: 'Strategic', value: 'Reports', tone: 'green' },
    { label: 'Sharp', value: 'Insights', tone: 'teal' },
  ],
};

// Each segment: { text, em? }. Rendered word-by-word for the scrubbed reveal.
export const manifesto = {
  tag: 'Our Position',
  segments: [
    { text: 'Every expensive mistake we’ve watched an enterprise make started as ' },
    { text: 'a decision made too early.', em: true },
    {
      text:
        ' A product built before the need was validated. A platform migrated before the cost was understood. An AI system deployed before the baseline was measured. Research isn’t a preliminary step — it’s the discipline that decides whether the expensive step is even worth taking.',
    },
  ],
};

export const practicesIntro = {
  tag: 'Four Practices',
  heading: { before: 'Four research ', accent: 'disciplines,', after: 'one integrated team.' },
  body:
    'Every engagement draws on one or more of these. Each has a dedicated lead, a methodology library, and a track record of saying "not yet" when that\'s the honest answer.',
};

export const practices = [
  {
    id: 'practice-1',
    visual: 'market',
    tag: 'Practice 01 · Market Research',
    title: 'Market',
    accent: 'research.',
    body:
      'Sizing, segmentation, competitive analysis, and market dynamics. We help you answer the foundational questions: is this a real opportunity, how big is it, who\'s already there, and what would it take to win.',
    features: ['Market sizing', 'Segmentation', 'Competitive audit', 'Pricing analysis', 'Trend mapping', 'Opportunity sizing'],
  },
  {
    id: 'practice-2',
    visual: 'product',
    tag: 'Practice 02 · Product Research',
    title: 'Product',
    accent: 'research.',
    body:
      'Feasibility, desirability, and viability — the three questions that decide whether a product idea survives contact with reality. User journey mapping, MVP scoping, feature prioritization, and the ruthless editing that protects your roadmap.',
    features: ['Feasibility study', 'Journey mapping', 'Feature scoping', 'MVP definition', 'Prototype testing', 'Prioritization'],
  },
  {
    id: 'practice-3',
    visual: 'user',
    tag: 'Practice 03 · User Research',
    title: 'User',
    accent: 'research.',
    body:
      'Structured interviews, contextual inquiry, usability testing, diary studies, and behavioural analytics. We go where the users are, speak their language, and bring back the insights that shouldn\'t have needed to be rediscovered — but usually do.',
    features: ['Interviews', 'Contextual inquiry', 'Usability testing', 'Diary studies', 'Surveys', 'Behavioural analytics'],
    quotes: [
      { text: 'I stopped using it after the third week — it felt like work inside of my work.', source: 'Interview · P04 · Financial Services' },
      { text: 'The dashboard is fine. What I actually need is a weekly email with the three things I should worry about.', source: 'Interview · P07 · Operations' },
      { text: 'I\'d pay for a tool that told me nothing was wrong. That would be the product.', source: 'Interview · P11 · Executive' },
      { text: 'We have five of these. We use two. I couldn\'t tell you why we picked any of them.', source: 'Interview · P15 · IT Manager' },
    ],
  },
  {
    id: 'practice-4',
    visual: 'strategic',
    tag: 'Practice 04 · Strategic Research',
    title: 'Strategic',
    accent: 'research.',
    body:
      'Technology assessments, build-vs-buy analyses, make-vs-partner decisions, regulatory scans, scenario planning. The research that sits upstream of investment decisions — where a wrong answer costs years, not quarters.',
    features: ['Technology assessment', 'Build-vs-buy', 'Make-vs-partner', 'Regulatory scan', 'Scenario planning', 'Risk mapping'],
  },
];

export const method = {
  tag: 'The Research Method',
  heading: { before: 'Five ', accent: 'stages,', after: ' one discipline.' },
  intro:
    'Every research engagement follows the same five-stage arc. No exceptions — for two-week sprints, for six-month programmes, for quick feasibility checks. Stage one ends most bad ideas before stage two begins.',
  stages: [
    {
      title: 'Scope',
      short: 'Define the real question. What do you need to decide, and by when?',
      long:
        'Stage one · scope. Before anything else, we define the real question. Most research dies here — because the question wasn\'t the right one, or the decision wasn\'t really waiting on it.',
    },
    {
      title: 'Investigate',
      short: 'Primary & secondary sources. Interviews, data, analogues, prior art.',
      long:
        'Stage two · investigate. Primary sources (interviews, observation, experiments) and secondary sources (data, literature, prior art). We don\'t privilege one over the other.',
    },
    {
      title: 'Synthesize',
      short: 'From findings to frameworks. Patterns, outliers, what changes the decision.',
      long:
        'Stage three · synthesize. Findings become frameworks. We look for the patterns, the outliers, and the things that would make a thoughtful decision-maker change their mind.',
    },
    {
      title: 'Recommend',
      short: 'A written report with a clear point of view — and what we\'d do next.',
      long:
        'Stage four · recommend. A written report with a clear point of view. Not a menu of options — a recommendation, defended, with the trade-offs made visible.',
    },
    {
      title: 'Validate',
      short: 'Pressure-test the recommendation. Red-team the logic. Ship when it survives.',
      long:
        'Stage five · validate. We pressure-test the recommendation before we hand it over. Red team the logic. Sanity-check the math. Ship the research only when it survives.',
    },
  ],
};

export const deliverablesIntro = {
  tag: 'What You Get',
  heading: { before: 'Four deliverables', accent: 'we actually hand over.' },
  body:
    'Every engagement produces something you can read, share, and act on — written for decision-makers, not impressed onlookers. Scroll through what you can expect.',
};

export const deliverables = [
  {
    number: 'Deliverable 01',
    title: 'The written',
    accent: 'research report.',
    body:
      'Typically 20–40 pages. Executive summary up front, methodology and evidence in the middle, a clear recommendation at the end. Every claim has a source. Every source is listed. Every unknown is flagged. Written to be read, not skimmed.',
    specs: [
      ['Format', 'PDF · Notion · Google Doc'],
      ['Length', '20 – 40 pages'],
      ['Includes', 'Raw data appendix'],
    ],
  },
  {
    number: 'Deliverable 02',
    title: 'The executive',
    accent: 'briefing.',
    body:
      'A one-hour live walkthrough of the findings with your decision-makers in the room. We answer questions, defend the thinking, and get challenged — which is how the recommendation either earns the room or doesn\'t. Recorded if you want a reference.',
    specs: [
      ['Format', '60-minute live session'],
      ['For', 'Executive team, board'],
      ['Includes', 'Deck · Q&A · recording'],
    ],
  },
  {
    number: 'Deliverable 03',
    title: 'The raw',
    accent: 'evidence base.',
    body:
      'Everything we collected and used to reach our conclusions — interview transcripts, competitive teardowns, market data, source lists. Your team keeps the full evidence base so future decisions can build on it. Nothing hidden, nothing summarized away.',
    specs: [
      ['Format', 'Shared workspace'],
      ['Contents', 'Transcripts · datasets · sources'],
      ['Access', 'Your team, forever'],
    ],
  },
  {
    number: 'Deliverable 04',
    title: 'The next-step',
    accent: 'memo.',
    body:
      'A short document — 2 to 5 pages — on what we\'d do next if this were our business. Specific, opinionated, and independent of whether you engage us for it. If the answer is "do nothing for six months", it says that. If the answer is "hire a CTO before you hire us", it says that too.',
    specs: [
      ['Format', '2 – 5 page memo'],
      ['Perspective', 'If this were our business'],
      ['Tone', 'Direct, opinionated, free'],
    ],
    last: true,
  },
];

export const chart = {
  tag: 'From Our Research',
  heading: { before: 'A sample of what ', accent: 'we ask', after: ', charted.' },
  body:
    'Across 240+ engagements we keep track of the questions that repeatedly surface in discovery — and the issues that most often block progress. Here\'s an illustrative snapshot of common enterprise-transformation blockers, ranked by how frequently they appear in our opening interviews.',
  title: 'Most common transformation blockers · Webcraft research interviews',
  sampleSize: 'n = 240 engagements',
  rows: [
    { label: 'Unclear priorities', value: 68 },
    { label: 'Legacy architecture', value: 61 },
    { label: 'Data fragmentation', value: 54 },
    { label: 'Unclear ownership', value: 47 },
    { label: 'Skills gap', value: 41 },
    { label: 'Budget misalignment', value: 33 },
    { label: 'Regulatory', value: 22 },
  ],
  source: 'Source · Webcraft research engagements, 2006 – 2026',
  note: '* Illustrative · not a formal survey',
};

export const engage = {
  tag: 'Before You Engage',
  heading: { before: 'When research ', accent: 'helps', after: ' — and when it doesn\'t.' },
  yes: {
    title: { before: 'When research ', accent: 'is the right move.' },
    items: [
      { title: 'Before a large investment', body: 'You\'re about to spend millions and want evidence, not conviction, behind the decision.' },
      { title: 'Before a build-vs-buy decision', body: 'You suspect the answer is obvious — which is exactly when it often isn\'t.' },
      { title: 'After a failed initiative', body: 'Something didn\'t work and you need to understand why before the next attempt.' },
      { title: 'When you\'re entering a new market', body: 'You need a real map before you invest in territory you don\'t know.' },
      { title: 'When internal opinion is split', body: 'Your leadership team is divided and you need an outside evidence-based view.' },
    ],
  },
  no: {
    title: { before: 'When research ', accent: 'is probably not it.' },
    items: [
      { title: 'When the decision is already made', body: 'You\'re looking for a report to rubber-stamp a foregone conclusion. We\'d rather you hire someone else.' },
      { title: 'When speed beats rigor', body: 'You need to ship by Friday and research won\'t close in time. Build a quick prototype instead.' },
      { title: 'When the problem is execution', body: 'You know what to do — you just haven\'t done it yet. Engineering, not research, is the fix.' },
      { title: 'When there\'s no real decision', body: 'No threshold where the answer would change your action. Save the money.' },
      { title: 'When you need confidence theater', body: 'A leather-bound report to calm the board isn\'t research. It\'s expensive comfort.' },
    ],
  },
};

export const cta = {
  tag: 'Start With A Question',
  title: { before: 'Tell us what you\'re', accent: 'trying to decide.' },
  body:
    'A sentence is enough to start. We\'ll reply with questions of our own — and if research isn\'t the right next step, we\'ll say that too.',
  button: { label: 'Start a research engagement →', href: '/contact' },
};
