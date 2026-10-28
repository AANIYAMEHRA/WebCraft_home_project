// All text content of the AI Solutions page lives here, so it is easy to edit
// (and later easy to replace with data coming from the CMS / API).

export const heroBadges = [
    {
        label: 'GenAI', pos: '-top-4 -left-4', border: 'border-gm-teal/20', shadow: 'shadow-gm-teal/10',
        iconBg: 'bg-gradient-to-br from-gm-teal to-gm-green', delay: '0s',
        icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z'
    },
    {
        label: 'Predictive ML', pos: '-bottom-6 -left-6', border: 'border-gm-blue/20', shadow: 'shadow-gm-blue/10',
        iconBg: 'bg-gradient-to-br from-gm-blue to-gm-teal', delay: '1.5s',
        icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6'
    },
    {
        label: 'Automation', pos: 'top-1/2 -right-6', border: 'border-gm-green/20', shadow: 'shadow-gm-green/10',
        iconBg: 'bg-gradient-to-br from-gm-green to-gm-mint', delay: '3s',
        icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
    },
]

// text is split so the highlighted parts (em: true) can be styled
export const manifesto = [
    { text: "The question isn't " },
    { text: 'what can AI do', em: true },
    { text: ' — the interesting question is ' },
    { text: 'where does it actually help.', em: true },
    { text: ' We build AI that moves business metrics, not demos that win conference slides. That means starting with the problem, evaluating ruthlessly, and shipping only when the cost-to-value math works — which is more often than the industry admits, and less often than the industry claims.' },
]

export const panels = [
    {
        num: "01",
        title: "Generative AI & LLM Integration",
        body: "Harness the power of large language models to transform how your business creates content, processes information, and serves customers at scale. We design and deploy custom generative AI solutions built on GPT-4, Claude, Gemini, and open-source LLMs, augmented with your proprietary data through Retrieval-Augmented Generation pipelines. Our implementations include AI writing assistants, intelligent document analysis platforms, product description engines, customer-facing knowledge bases, and internal copilots for finance, HR, and operations teams. Every deployment is hardened for enterprise use — with robust data governance, granular access controls, hallucination mitigation strategies, and token cost management — so your generative AI solution performs reliably in production, not just impressively in a demo.",
        numColor: "text-gm-teal",
        linkColor: "text-gm-teal",
        image: "/images/generative-ai.webp",
        imageClass: "shadow-gm-teal/10 border-gm-teal/8",
        imageLeft: true,
        border: true,
    },
    {
        num: "02",
        title: "ML Predictive Analytics",
        body: "Turn historical business data into forward-looking intelligence that drives smarter operational and strategic decisions. Our machine learning engineers build production-grade models for demand forecasting, customer churn prediction, revenue attribution, supply chain optimisation, and risk scoring — each selected for business impact, not technical novelty. We begin every engagement by identifying your highest-value prediction problems, then choose the right model architecture: gradient boosting, time-series forecasting, or deep learning networks. All models ship with explainability layers using SHAP and LIME, so your leadership team understands not just what is predicted, but why. Seamless integration with your existing BI dashboards, CRM, and ERP systems ensures insights translate into action from day one.",
        numColor: "text-gm-blue",
        linkColor: "text-gm-blue",
        image: "/images/ml-predictive.webp",
        imageClass: "shadow-gm-blue/10 border-gm-blue/8",
        imageLeft: false,
        border: true,
    },
    {
        num: "03",
        title: "Intelligent Automation & RPA",
        body: "Free your teams from repetitive, rule-based work with intelligent automation that combines robotic process automation with AI-driven decision intelligence. Unlike traditional bots that follow rigid scripts, our AI-enhanced automation adapts to exceptions, learns from edge cases, and escalates to humans only when genuine judgement is required. We design end-to-end workflows for invoice processing, HR onboarding, compliance monitoring, customer onboarding, and procurement approvals — typically reducing processing time by 60–80% and error rates to near zero. Our automation stack integrates directly with SAP, Salesforce, ServiceNow, and custom ERP environments. Every automation is monitored, version-controlled, and fully auditable, ensuring long-term reliability as your processes evolve.",
        numColor: "text-gm-green",
        linkColor: "text-gm-green",
        image: "/images/intelligent-automation.webp",
        imageClass: "shadow-gm-green/10 border-gm-green/8",
        imageLeft: true,
        border: false,
    },
    {
        num: "04",
        title: "AI-Driven Data & Analytics",
        body: "We build the complete analytics stack — from cloud ingestion pipelines and warehouses on BigQuery, Snowflake, and Databricks through dbt transformation layers to executive dashboards in Looker and Power BI. Our AI layer adds forecasting, anomaly alerting, and natural language querying so every team can access reliable, context-aware insight without writing SQL. We build data governance, lineage tracking, and role-based access directly into the foundation — ensuring the insights leadership acts on are accurate, timely, and trustworthy. From raw event streams to board-ready narratives, we turn data from a cost centre into a decision-making asset.",
        numColor: "text-gm-navy",
        linkColor: "text-gm-navy",
        image: "/images/data-analytics.webp",
        imageClass: "shadow-gm-navy/10 border-gm-navy/8",
        imageLeft: false,
        border: true,
    },
    {
        num: "05",
        title: "Conversational AI & Chatbots",
        body: "Deploy LLM-backed virtual agents that handle nuanced, multi-turn conversations with dynamic context memory and intelligent human handoff. We build customer support bots, sales qualification agents, and internal helpdesks across web, mobile, and WhatsApp channels — each grounded in your knowledge base, not the open internet. Our agents follow strict guardrails, respect your brand voice, and escalate gracefully when judgement is required. Clients typically achieve 40–60% ticket deflection and measurably higher satisfaction scores within 90 days of go-live, with full conversation analytics feeding back into continuous improvement.",
        numColor: "text-gm-blue",
        linkColor: "text-gm-blue",
        image: "/images/ai-chatbots.webp",
        imageClass: "shadow-gm-blue/10 border-gm-blue/8",
        imageLeft: true,
        border: false,
    },
]

export const stackTags = [
    'PyTorch', 'TensorFlow', 'LangChain', 'LlamaIndex', 'OpenAI', 'Anthropic', 'Hugging Face', 'Ray',
    'MLflow', 'Weights & Biases', 'Pinecone', 'Qdrant', 'Databricks', 'Snowflake', 'Kubeflow',
]

// radius / speed / items are used by the rotating orbit animation
export const orbitRings = [
    {
        radius: 90, speed: 1, items: [
            { angle: 0, label: 'PyTorch' }, { angle: 120, label: 'TF' }, { angle: 240, label: 'Ray' }]
    },
    {
        radius: 160, speed: -0.6, items: [
            { angle: 30, label: 'LangChain' }, { angle: 110, label: 'MLflow' }, { angle: 200, label: 'HF' }, { angle: 290, label: 'W&B' }]
    },
    {
        radius: 220, speed: 0.4, items: [
            { angle: 15, label: 'OpenAI' }, { angle: 80, label: 'Anthropic' }, { angle: 160, label: 'Pinecone' },
            { angle: 240, label: 'Qdrant' }, { angle: 310, label: 'Kubeflow' }]
    },
]

export const philSteps = [
    {
        title: 'Evaluate', body: 'Before build: baseline, benchmarks, failure modes, and an honest cost-to-value estimate.',
        desc: 'Stage one — before build: baseline benchmarks, failure-mode analysis, honest cost-to-value estimates. Most ideas die here, which is exactly the point.'
    },
    {
        title: 'Guardrail', body: "Constraints, validators, hand-off rules. The system knows when it doesn't know.",
        desc: "Stage two — we add constraints. Validators, output schemas, confidence thresholds, hand-off rules. The system must know when it doesn't know."
    },
    {
        title: 'Deploy', body: 'Shadow mode first, then canary, then rollout. Never a big-bang launch.',
        desc: 'Stage three — shadow mode first, then canary, then progressive rollout. Never a big-bang launch. Roll-back must be one command away.'
    },
    {
        title: 'Monitor', body: 'Drift detection, quality metrics, retraining cadence. Models decay; ours are watched.',
        desc: 'Stage four — models decay, data drifts, users adapt. We monitor quality metrics in production and retrain on a cadence that matches your signal.'
    },
]
