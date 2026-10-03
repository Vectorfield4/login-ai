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
  ],
  sections: [
    {
      title: "What we test",
      items: [
        "Injection through data: a malicious instruction in a document or email tries to make the agent take an extra action.",
        "Rights boundaries: the agent must not read or change what its task does not need, even when it technically can.",
        "Leaks between users: an answer must not contain data available to another role or tenant.",
        "System prompt disclosure: instructions and internal rules must not reach the user's answer.",
      ],
    },
    {
      title: "Audit limits",
      items: [
        "An audit gives no absolute guarantee: new attack scenarios appear all the time, so the test has to be repeated.",
        "Without tracing some findings are not reproducible: we turn on logs first, then hunt the cause.",
        "Production tests are limited by agreement: the full run happens on staging, production is sampled.",
        "An AI-layer audit does not replace an infrastructure pentest: they are separate jobs, often ordered together.",
      ],
    },
  ],
};
