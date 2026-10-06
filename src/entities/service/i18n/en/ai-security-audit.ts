export const ai_security_auditEn = {
  ctaBanner: {
    title: "Let's audit your AI system",
    text: "Describe the loop: models, tools, and data. We'll give a test plan and an estimate in two days.",
    buttonLabel: "Request an audit",
  },
  navTitle: "AI security audit",
  title: "AI security audit",
  tagline: "We check that the agent stays within its rights and resists an injection.",
  description:
    "We test the AI system for prompt injection, data leaks through tools, and excessive rights; the result is a prioritized list of findings with concrete fixes.",
  features: [
    {
      title: "Prompt injection",
      text: "We test whether a document or a user can steer the agent off task and make it do something extra.",
    },
    {
      title: "Tool rights",
      text: "The agent must not reach what its task does not need: we check the rights scope and the accounts.",
    },
    {
      title: "Leaks through output",
      text: "We check whether the model returns other users' data or reveals the system prompt.",
    },
    {
      title: "Prioritized report",
      text: 'Findings with a risk rating and a concrete fix, not a generic "consider improving" list.',
    },
  ],
  techStack: [
    {
      subtitle: "Loop and observability",
      description:
        "Tests rely on [Langfuse] tracing, rights in [Keycloak], [Kubernetes] configuration, and logs in [PostgreSQL].",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Chain tracing: it shows at which input the agent left the task and what it called.",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary:
            "Rights management: it shows which roles and accounts are available to the agent and its tools.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "Loop configuration: network policies and secrets show what the agent can reach from inside.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary: "Logs and metadata: they reconstruct what data the agent read and wrote.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Perimeter review",
      text: "We map the agent, tools, sources, and data: what it reads, what it writes, and what it can reach.",
      processType: "discovery",
    },
    {
      title: "Threat model",
      text: "We fix attack scenarios: injection through a document, a leak through a tool, privilege escalation.",
      processType: "system-design",
    },
    {
      title: "Tests",
      text: "We run the scenarios on the staging rig and in production by agreement, and record reproducible findings.",
      processType: "testing",
    },
    {
      title: "Report and fixes",
      text: "We deliver prioritized findings and verify the fixes with a repeat run.",
      processType: "analysis",
    },
  ],
  fitItems: [
    {
      title: "The agent uses tools",
      text: "The more actions the agent can take, the more the rights boundary matters.",
      positive: true,
    },
    {
      title: "External sources in context",
      text: "Documents and web pages in the prompt are the main injection channel.",
      positive: true,
    },
    {
      title: "A chat with no actions",
      text: "If the bot only answers with text and calls no tools, the risk is lower and a deep audit is unnecessary.",
      positive: false,
    },
    {
      title: "No logs",
      text: "Without tracing and logs the attack path cannot be reconstructed, so we add observability first.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "An internal assistant",
      text: "After the audit we closed the agent's access to extra tools and added incoming-document checks.",
      metricValue: "3",
      metricLabel: "critical findings closed before release",
    },
  ],
  faqItems: [
    {
      question: "Do you break production?",
      answer:
        "Production tests run only by agreement and on separate accounts. The bulk happens on the staging rig.",
    },
    {
      question: "Is this a pentest?",
      answer:
        "This is an audit of the AI layer itself: injections, tool rights, and leaks, not a general infrastructure pentest.",
    },
    {
      question: "What is in the report?",
      answer:
        "Reproducible scenarios, a risk rating, a concrete fix, and the result of a repeat run.",
    },
    {
      question: "How often should it be repeated?",
      answer: "After major changes to the agent, prompts, or the tool set.",
    },
    {
      question: "Do you need the source code?",
      answer:
        "No, most tests only need access to the agent, its tools, and the logs. Code matters only where we check input filters and validation.",
    },
    {
      question: "What if there are no findings?",
      answer:
        "Then the report records the scenarios and boundaries that held. That is a result too: you show it at a review and to an external auditor.",
    },
  ],
  scope: [
    {
      title: "Prompt injection through data",
      text: "A malicious instruction hides in a document, an email, or a form field and tries to make the agent take an extra action. We pass such data through the agent and see whether it steps outside its task.",
    },
    {
      title: "Rights boundaries",
      text: "The agent reaches only the data and tools its task needs, even when more is technically available. We check that excess rights cannot reach another tenant's data or trigger irreversible actions.",
    },
    {
      title: "Leaks between users",
      text: "A user's answer carries only their own data, with no fragments available to another role or tenant. We test isolation from different accounts and roles.",
    },
    {
      title: "System prompt disclosure",
      text: "System instructions and internal rules stay inside and do not reach the answer. We separately test attempts to pull the prompt out through rephrased questions.",
    },
  ],
  tradeoffs: [
    {
      title: "Guarantees are bounded",
      text: "New attack scenarios appear all the time, so an audit gives a snapshot at the test date. Guarantees are bounded, and the test is repeated after major changes.",
    },
    {
      title: "Tracing for reproduction",
      text: "Without tracing some findings can only be described in words. Tracing gives reproduction: we turn on logs first, then hunt the cause.",
    },
    {
      title: "Production by agreement",
      text: "The full run happens on staging, while production tests are sampled and run by agreement. That keeps production under your team's control.",
    },
    {
      title: "AI-layer audit is separate",
      text: "An AI-layer audit checks injections, rights, and leaks, while an infrastructure pentest is a separate job. Teams often order them together.",
    },
  ],
  deliverables: [
    {
      title: "A perimeter map",
      text: "A perimeter map shows the tools, sources, and data the agent can reach. Excess rights are flagged separately so they stay visible.",
    },
    {
      title: "A threat model",
      text: "Attack scenarios are written so the team can reproduce them. A threat model makes the risks clear through concrete steps.",
    },
    {
      title: "Reproducible findings",
      text: "Each finding carries reproduction steps, a risk rating, and a concrete fix. Reproducible findings rest on a repeatable scenario.",
    },
    {
      title: "A prioritized fix plan",
      text: "A fix plan splits findings by priority: what to close before release and what can wait without risk. The order of work is visible to the team ahead of time.",
    },
    {
      title: "A summary for management",
      text: "A short summary shows how many findings there are and which are critical. Management sees the scope without reading the full report.",
    },
    {
      title: "A repeat run",
      text: "A repeat run after the fixes confirms the closed findings stopped reproducing. What is left is recorded as a separate list.",
    },
  ],
  mechanism: [
    {
      title: "Reproducing a finding",
      text: "We run each scenario as a test: set the input, the expected extra behavior, and the actual result. A finding without a reproduction does not enter the report.",
    },
    {
      title: "Risk assessment",
      text: "For a reproduced finding we estimate the risk: which data opens up, which actions become possible, and whether the attacker must be inside the perimeter.",
    },
    {
      title: "Fix priority",
      text: "We rank fixes by priority: what to close before release, what can wait for the next sprint. Each carries a concrete fix, not a generic recommendation.",
    },
    {
      title: "Verifying the fix",
      text: "After the fixes we verify the fix with a repeat run and confirm the finding no longer reproduces. The remainder goes into a separate list with a rating.",
    },
  ],
  sections: [
    {
      title: "When to call an audit",
      items: [
        "Before releasing an agent that reaches internal data or tools.",
        "After a major change: a new tool, a model swap, a rewritten system prompt.",
        "After an incident: the agent took an extra action or returned another tenant's data.",
        "Before a security review or a regulator request that needs a documented result.",
      ],
    },
  ],
};
