export const aiReadinessAuditEn = {
  ctaBanner: {
    title: "Let's check readiness",
    text: "Send your AI initiative list and access to system documentation: on the first call we define five domains and the interview plan.",
    buttonLabel: "Discuss the audit",
  },
  navTitle: "AI readiness audit",
  title: "Company AI readiness audit",
  tagline:
    "We score data, processes, team, and infrastructure across five domains and deliver a 90-day plan.",
  description:
    "We check what is ready for an AI project and what slows the launch. We collect evidence across five domains, assign maturity scores, and deliver a 90-day plan.",
  features: [
    {
      title: "Five domains",
      text: "We assess data, infrastructure, processes, team, and risk management. Each domain gets evidence: documents, exports, interviews, and access.",
    },
    {
      title: "Maturity scores",
      text: "We score 20 criteria from 1 to 5. A score rests on an artifact or example, so the picture is repeatable and comparable across units.",
    },
    {
      title: "Gaps and risks",
      text: "We show which gaps block the first scenario and which risks need closure before a pilot. Every gap has an owner and a work estimate.",
    },
    {
      title: "90-day plan",
      text: "We assemble the first quarter: what to do before the pilot, who owns it, and which result counts as success.",
    },
  ],
  processSteps: [
    {
      title: "Assessment frame",
      text: "We agree on five domains, 20 criteria, and the scale. We fix which evidence counts as sufficient.",
      processType: "discovery",
    },
    {
      title: "Evidence collection",
      text: "We request documents, exports, and access. We interview data, process, and infrastructure owners.",
      processType: "analysis",
    },
    {
      title: "Scoring",
      text: "We assign scores for each criterion and check them against artifacts. We discuss disputed scores with the domain owner.",
      processType: "system-design",
    },
    {
      title: "Plan",
      text: "We turn gaps into a 90-day plan with priorities and owners. We review the plan with the sponsor.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "An AI initiative exists",
      text: "The company has a scenario or program and needs to understand its starting point and the order of work.",
      positive: true,
    },
    {
      title: "Three or more systems",
      text: "Data sits across CRM, ERP, inventory, or analytics. The audit shows how to connect them into one scope.",
      positive: true,
    },
    {
      title: "No access to artifacts",
      text: "Without documents, exports, and interviews the review runs on descriptions. The report shows structure, and scores carry an assumption note.",
      positive: false,
    },
    {
      title: "A model next week",
      text: "An urgent launch fits a pilot with a ready scenario. The audit takes 3–4 weeks and sets the base for the next step.",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "ERP reconciliation after cleanup",
      text: "Our team removed 1,200 duplicate counterparties and linked stock to orders. Reconciliation now takes 5 minutes, and discrepancies in reports fell by 90%.",
      metricValue: "−90%",
      metricLabel: "report discrepancies",
    },
    {
      title: "5 domains",
      text: "The audit covers five domains: data, infrastructure, processes, team, and risk management. Each has a score and evidence.",
      metricValue: "5",
      metricLabel: "5 domains",
    },
    {
      title: "20 criteria",
      text: "Twenty criteria give a comparable picture across departments. Scores rest on artifacts and interviews.",
      metricValue: "20",
      metricLabel: "20 criteria",
    },
    {
      title: "90 days",
      text: "The plan covers 90 days and leads from gaps to the first pilot. Every step has an owner and a result.",
      metricValue: "90 days",
      metricLabel: "90 days",
    },
  ],
  faqItems: [
    {
      question: "How much does a readiness audit cost?",
      answer:
        "The base program starts at RUB 300,000 and covers five domains, 20 criteria, and a 90-day plan. The number of sources and interviews affects the timeline and estimate.",
    },
    {
      question: "How long does the audit take?",
      answer:
        "Three to four weeks for four sources and eight interviews. The timeline grows with many departments and access approvals.",
    },
    {
      question: "How is it different from a data audit?",
      answer:
        "A data audit covers sources, quality, and PII. A readiness audit looks wider: data, infrastructure, processes, team, and risk management.",
    },
    {
      question: "What happens after the audit?",
      answer:
        "You pick the first step from the 90-day plan and start a pilot. The first pilot runs on one scenario with a metric, an owner, and a deadline. We can run the pilot as a separate project or hand the plan to your team.",
    },
  ],
  tradeoffs: [
    {
      title: "Evidence",
      text: "The score rests on artifacts and interviews. With an incomplete evidence set, the score gets a note and an assumption.",
    },
    {
      title: "Self-assessment",
      text: "Team self-assessment speeds up data collection, and artifact checks make scores comparable. We combine both sources.",
    },
    {
      title: "Audit and implementation",
      text: "The audit ends with scores, gaps, and a plan. We price the pilot, infrastructure purchase, and development as separate projects.",
    },
  ],
  deliverables: [
    {
      title: "Maturity scorecard",
      text: "The scorecard shows scores across five domains and 20 criteria. Every score has an artifact or example beside it.",
    },
    {
      title: "Gap register",
      text: "The register lists gaps, risks, owners, and work estimates. It shows what to close before the pilot.",
    },
    {
      title: "90-day plan",
      text: "The plan splits the first 90 days into steps with a result and an owner. It links gaps to budget and team.",
    },
  ],
  mechanism: [
    {
      title: "Criteria",
      text: "We fix five domains and 20 criteria for the readiness review. Each criterion describes an artifact or practice that can be checked.",
    },
    {
      title: "Evidence",
      text: "For each criterion we collect evidence: documents, exports, interviews, and access. The score uses a 1–5 scale and is backed by an example.",
    },
    {
      title: "Plan",
      text: "Gaps turn into a 90-day plan with priorities and owners. The first step closes the gap that blocks the chosen scenario.",
    },
  ],
};
