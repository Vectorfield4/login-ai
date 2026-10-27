export const aiGovernanceComplianceEn = {
  ctaBanner: {
    title: "Let's build the AI register",
    text: "Send the model and scenario list: on the call we define jurisdictions, risk categories, and the document set.",
    buttonLabel: "Discuss governance",
  },
  navTitle: "AI governance and compliance",
  title: "AI governance and compliance",
  tagline:
    "We build an AI system register, risk classification, and a policy pack for the EU AI Act and ISO 42001.",
  description:
    "We describe which AI systems you use, which risks they create, and which documents are required. We deliver a register, risk assessment, policies, and model cards for an internal audit.",
  features: [
    {
      title: "AI system register",
      text: "We collect every AI system and scenario in one register: owner, purpose, model, data, users, and status. The register becomes the base for classification.",
    },
    {
      title: "Risk classification",
      text: "We assign a risk category under the EU AI Act and an internal matrix. Each system gets prohibited practices, obligations, and evidence.",
    },
    {
      title: "Policy pack",
      text: "We write an AI use policy, roles, and an approval process. The policy describes how to launch a system, handle incidents, and update a model.",
    },
    {
      title: "Model cards",
      text: "We prepare model cards and an evidence pack: data, limits, metrics, tests, and owners. The documents are ready for an internal audit and legal review.",
    },
  ],
  techStack: [
    {
      subtitle: "Evidence and control",
      description:
        "We collect the model inventory through [OpenAI API], trace requests in [Langfuse], manage roles in [Keycloak], and store the evidence pack in [PostgreSQL].",
      technologies: [
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary:
            "The external model in the register: we record its purpose, data, limits, and API version.",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Request and response tracing: the log shows which scenarios run and which tests accompany them.",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary:
            "Roles and access: the policy references the groups that can run a system and see its data.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores the system register, risk model, and evidence pack: document versions stay linked to a system.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Scope",
      text: "We define jurisdictions, systems, and the documentation level. We fix which requirements apply.",
      processType: "discovery",
    },
    {
      title: "Inventory",
      text: "We collect the AI system register and owners. We check which models and data are in use.",
      processType: "analysis",
    },
    {
      title: "Risk assessment",
      text: "We classify systems and score risk by likelihood and harm. High-risk systems get evidence of controls.",
      processType: "system-design",
    },
    {
      title: "Policies and rollout",
      text: "We agree policies with legal and security. We introduce a review process for new systems.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "AI in several units",
      text: "Models and scenarios run in sales, support, and operations. The register shows the whole picture and the owners.",
      positive: true,
    },
    {
      title: "A policy template",
      text: "A ready template describes general rules. The register, risk assessment, and evidence need a separate project.",
      positive: false,
    },
    {
      title: "No system register",
      text: "We build the register in the first stage: without it, classification and evidence stay incomplete.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does a governance project cost?",
      answer:
        "The base program starts at RUB 500,000 and covers the register, risk assessment, policies, and model cards. The number of systems and jurisdictions affects the document volume.",
    },
    {
      question: "How long does it take?",
      answer:
        "Four to six weeks for six systems and one jurisdiction. Several jurisdictions add 1–2 weeks for requirement checks.",
    },
    {
      question: "Does the EU AI Act apply to us?",
      answer:
        "The act covers systems placed on the EU market or affecting people in the EU. During scoping we check roles, users, and the risk category.",
    },
    {
      question: "Is ISO 42001 included?",
      answer:
        "Yes, the pack can follow ISO/IEC 42001: policy, roles, risk assessment, objectives, and an internal audit.",
    },
  ],
  tradeoffs: [
    {
      title: "Legal review",
      text: "Your legal team reviews the policy pack. We provide the structure, wording, and evidence, and the final decision stays with the lawyers.",
    },
    {
      title: "Register and reality",
      text: "The register rests on interviews and technical documentation. With incomplete data a system gets a status and an evidence collection plan.",
    },
    {
      title: "Documents and work",
      text: "Governance documents describe requirements and controls. We implement guardrails, DLP, and monitoring as a separate project.",
    },
  ],
  deliverables: [
    {
      title: "AI system register",
      text: "The register lists systems, owners, models, data, and status. It shows which obligations apply to each system.",
    },
    {
      title: "Risk assessment",
      text: "The risk assessment shows category, likelihood, harm, and controls for each system. High risk gets a separate evidence plan.",
    },
    {
      title: "Policy pack",
      text: "The policy pack describes roles, launch, incidents, and model updates. The documents are ready for legal and security review.",
    },
    {
      title: "Model cards",
      text: "Model cards record data, limits, metrics, and owners for each model. The cards join the evidence pack for an audit.",
    },
  ],
  mechanism: [
    {
      title: "Register",
      text: "We collect AI systems, owners, and models in one register. Each record has a purpose, data, users, and status, so the register stays a checkable base for assessment.",
    },
    {
      title: "Classification",
      text: "Classification maps a system to a risk category and the EU AI Act requirements. For high risk we record obligations, controls, and the evidence needed before launch.",
    },
    {
      title: "Policies",
      text: "Policies and model cards link requirements to roles and processes. An internal audit checks the evidence, and a model update triggers a fresh risk assessment.",
    },
  ],
  precedents: [
    {
      title: "4 artifacts",
      text: "The project delivers four artifacts: a system register, risk assessment, policy pack, and model cards. The register and model cards carry a system ID. Policies describe the shared perimeter.",
      metricValue: "4",
      metricLabel: "4 artifacts",
    },
    {
      title: "30 days",
      text: "The base program for one jurisdiction takes about 30 days. The timeline covers interviews, classification, and document review.",
      metricValue: "30 days",
      metricLabel: "30 days",
    },
    {
      title: "3 jurisdictions",
      text: "The program covers up to three jurisdictions with different requirements. Each one gets applicable rules and evidence.",
      metricValue: "3",
      metricLabel: "3 jurisdictions",
    },
  ],
};
