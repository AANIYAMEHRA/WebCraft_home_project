// Content for the Services page. Text is copied from the Webcraft services.html.
// Kept in one file so the CMS can later read and write the same shape.

export const hero = {
  tag: "Engineering & Digital Services",
  headline: ["Build It Right.", "Scale It Smart."],
  body: "From custom product development and cloud enablement to UX design and legacy modernization - Webcraft provides the engineering depth to turn strategies into working software.",
  cta: { label: "Start a Conversation", href: "/contact" },
  chips: [
    { label: "01", value: "Strategy", tone: "teal" },
    { label: "02", value: "AI & Auto", tone: "blue" },
    { label: "03", value: "Engineering", tone: "green" },
    { label: "04", value: "Cloud & Ops", tone: "teal" },
  ],
};

export const capabilitiesIntro = {
  tag: "Six Capabilities",
  title: { before: "Everything you need to ", accent: "ship software that matters", after: "." },
  body: "From first strategy deck to post-launch iteration - one team, six capabilities, one standard of craft.",
};

export const capabilities = [
  {
    num: "01",
    name: "Strategy & Research",
    title: { before: "Strategy & ", accent: "Research" },
    pitch: "We start before the code. Market sizing, user interviews, product discovery, competitive teardown - so you build the right thing, not just any thing.",
    subs: [
      { title: "Product discovery sprints", body: "1-to-3 week engagements that replace six months of internal debate with tested prototypes." },
      { title: "Market & competitor analysis", body: "Primary research with buyers and users - not a deck of TAM charts pulled from Google." },
      { title: "Jobs-to-be-done interviews", body: "Structured qualitative research that maps why your users switch, stay, or leave." },
      { title: "Roadmap & prioritisation", body: "A 12-month plan your team can actually run - sequenced by risk, revenue and readiness." },
    ],
  },
  {
    num: "02",
    name: "AI & Automation",
    title: { before: "AI & ", accent: "Automation" },
    pitch: "We build AI into products and internal operations - assistants, copilots, classifiers, agents - with evaluation and guardrails from day one.",
    subs: [
      { title: "LLM applications & copilots", body: "Domain-tuned assistants with retrieval, tool use, and human-in-the-loop checkpoints." },
      { title: "Predictive ML models", body: "Forecasting, scoring, and classification pipelines - trained, monitored, retrained." },
      { title: "Process automation", body: "Workflow and document automation that removes busywork without replacing judgment." },
      { title: "Evaluation & safety", body: "Eval harnesses, red-teaming, and observability so you can ship AI with confidence." },
    ],
  },
  {
    num: "03",
    name: "Engineering",
    title: { before: "Engineering & ", accent: "Product" },
    pitch: "Full-stack product teams - design, frontend, backend, data, QA - working in short cycles with demos every two weeks.",
    subs: [
      { title: "Web applications", body: "React, Next.js, TypeScript - accessible, performant, measured." },
      { title: "Mobile (iOS + Android)", body: "Native where it matters, React Native where it doesn't." },
      { title: "API & backend services", body: "Typed, tested, documented - Node, Go, Python, Rust." },
      { title: "UX & product design", body: "Wireframes, prototypes, design systems - shipped, not just presented." },
    ],
  },
  {
    num: "04",
    name: "Cloud & Platform",
    title: { before: "Cloud & ", accent: "Platform" },
    pitch: "Production platforms on AWS, Azure and GCP - built with infrastructure-as-code, observability, and cost in mind from the first commit.",
    subs: [
      { title: "Cloud migrations", body: "Lift-shift, replatform, or refactor - staged with rollback at every milestone." },
      { title: "Kubernetes & containers", body: "Hardened clusters, GitOps delivery, and sensible autoscaling." },
      { title: "Data platforms", body: "Warehouses, lakes, streaming - Snowflake, BigQuery, Kafka, dbt." },
      { title: "Security & compliance", body: "SOC 2, ISO 27001, HIPAA - built in, not bolted on." },
    ],
  },
  {
    num: "05",
    name: "Modernization",
    title: { before: "Legacy ", accent: "Modernization" },
    pitch: "We untangle systems that have grown past their original design - monoliths, Oracle Forms, VB6, stored-proc spaghetti - without stopping the business.",
    subs: [
      { title: "Strangler-fig rewrites", body: "Incremental replacement; the old system keeps running until the new one earns trust." },
      { title: "Data migration", body: "Schema mapping, backfills, and dual-writes validated against reconciliation checks." },
      { title: "Integration layers", body: "APIs and event buses that let old and new systems coexist for as long as needed." },
      { title: "Risk-reviewed cutovers", body: "Rollback-capable releases with production shadowing before every go-live." },
    ],
  },
  {
    num: "06",
    name: "Sustain & Support",
    title: { before: "Sustain & ", accent: "Support" },
    pitch: "Software doesn't end at launch. We keep products healthy - monitoring, on-call, continuous improvement - so small issues stay small.",
    subs: [
      { title: "24x7 monitoring & on-call", body: "Paging with clear runbooks, and humans who already know the system." },
      { title: "Managed maintenance", body: "Dependency updates, security patching, and performance tuning on a monthly cadence." },
      { title: "Continuous improvement", body: "Small features, experiments, and polish shipped every sprint - not once a year." },
      { title: "SLA-backed support", body: "Tiered response times aligned to what the system actually costs you when it's down." },
    ],
  },
];

export const techStack = {
  tag: "The Stack",
  title: { before: "Fluent in the tools that ship in ", accent: "production", after: "." },
  items: [
    "Python", "TypeScript", "React", "Next.js", "Node.js", "Go", "Rust", "PostgreSQL",
    "Kafka", "Redis", "AWS", "Azure", "GCP", "Kubernetes", "Terraform", "PyTorch",
    "LangChain", "Figma",
  ],
};

export const engagementModels = {
  tag: "Engagement Models",
  title: { before: "Three shapes, one standard of ", accent: "accountability", after: "." },
  models: [
    {
      kicker: "01",
      title: "Project-based",
      lede: "Fixed scope. Fixed outcome. Ideal when you already know what you want built.",
      points: [
        "Milestone-based billing with a defined end date",
        "Scoped statement of work signed before start",
        "Hand-off documentation and training at close",
        "Typical range: 8-16 weeks, 3-7 people",
      ],
    },
    {
      kicker: "02",
      title: "Team extension",
      lede: "Embedded engineers, designers and PMs who work in your workflow, not ours.",
      points: [
        "Dedicated people - not a rotating bench",
        "Monthly billing, 90-day minimum commitment",
        "Daily stand-up in your tooling (Slack, Linear, Jira)",
        "Typical range: 2-6 people, 6-18 months",
      ],
    },
    {
      kicker: "03",
      title: "Retainer",
      lede: "Always-on support, maintenance and continuous improvement for live systems.",
      points: [
        "Agreed SLA on response and resolution times",
        "Monthly hours bucket - carries forward, not wasted",
        "Named technical lead who knows your codebase",
        "Typical range: 40-160 hours / month",
      ],
    },
  ],
};

export const cases = {
  tag: "Selected Work",
  title: { before: "A few things we're ", accent: "proud of", after: "." },
  items: [
    {
      num: "01",
      tag: "Healthcare · AI",
      title: { before: "Clinical ", accent: "co-pilot", after: "." },
      body: "Built a clinician-facing assistant that drafts visit notes from ambient audio. Doctors spend 42% less time on documentation and see 2 more patients per day.",
      stat: { value: "-42%", label: "time on notes" },
    },
    {
      num: "02",
      tag: "Commerce · Platform",
      title: { before: "Bilingual B2B ", accent: "commerce", after: "." },
      body: "Rebuilt a wholesale marketplace across English and Hindi with unified catalogue, pricing and fulfilment. 3× GMV in 9 months, with 60% mobile orders.",
      stat: { value: "3×", label: "GMV in 9 months" },
    },
    {
      num: "03",
      tag: "Finance · Modernisation",
      title: { before: "Risk systems, ", accent: "rebuilt", after: "." },
      body: "Replaced a fragile legacy risk engine with an event-driven Go service. Settlement latency dropped from 4.5s to 180ms - and regulators stopped flagging exceptions.",
      stat: { value: "180ms", label: "settlement latency" },
    },
    {
      num: "04",
      tag: "Industrial · IoT",
      title: { before: "Factory ", accent: "unfrozen", after: "." },
      body: "Wired a plant's disconnected PLCs into a single real-time dashboard with predictive maintenance. Unplanned downtime down 63%, OEE up 14 points.",
      stat: { value: "-63%", label: "unplanned downtime" },
    },
  ],
};

export const faq = {
  tag: "FAQ",
  title: { before: "Questions we ", accent: "usually get", after: "." },
  items: [
    {
      q: "How do you price engagements?",
      a: "We price based on the shape of the work. Fixed-scope projects get a milestone-based fee with a defined end date. Team-extension engagements bill monthly on a per-role rate, with a 90-day minimum. Retainers bill monthly for an hours bucket. We send a written estimate before any work begins.",
    },
    {
      q: "Do you sign NDAs and DPAs?",
      a: "Yes. We sign NDAs before any discovery conversation that involves specifics. For regulated industries - healthcare, financial services, public sector - we also sign data-processing addenda, BAAs (HIPAA), and can work inside your security review process.",
    },
    {
      q: "Can you work alongside our existing team?",
      a: "Yes - most of our engagements look like that. Our engineers work inside your GitHub, your Slack, your standups. We're good at being the second team, not the only team. We align on code review standards, branching model and release cadence in week one.",
    },
    {
      q: "How fast can you start?",
      a: "For a typical team-extension engagement, 10-14 days from signed SOW to people on your standup. Fixed-scope projects usually take 2-3 weeks because discovery runs first. Urgent retainer coverage can start within 72 hours for incidents on live systems.",
    },
    {
      q: "What if our priorities shift mid-engagement?",
      a: "That's the normal case, not the exception. Team-extension engagements let you re-point the team sprint by sprint. Fixed-scope projects have a written change-order process, but we'd rather catch the shift in a weekly check-in and adapt than push a change order after the fact.",
    },
    {
      q: "Where is your team located?",
      a: "Our engineering, design and research teams are based in Indore, India. We work with clients across the US, EU, UK, UAE and APAC. We overlap with US Eastern time in the morning and with EU / APAC through most of the day, and we run written-first so timezone is rarely the bottleneck.",
    },
  ],
};

export const servicesCta = {
  tag: "Next Step",
  title: { before: "Tell us what you're", accent: "trying to build." },
  body: "One short note. One reply within a business day. No sales dance.",
  button: { label: "Start a conversation", href: "/contact" },
  email: "admin@webcraft.co.in",
};