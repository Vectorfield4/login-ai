export const promptEngineeringEn = {
  ctaBanner: {
    title: "Let's build the library",
    text: "Send three scenarios and access to the model API: on the call we assess prompts and the test set.",
    buttonLabel: "Discuss prompts",
  },
  navTitle: "Prompt engineering",
  title: "Prompt engineering for business",
  tagline: "We turn prompts into a versioned library, backed by tests and guardrails.",
  description:
    "We build prompts by scenario, cover them with tests and rules, and give the team templates, metrics, and an update process. Prompts live next to the tests, so every change goes through review.",
  features: [
    {
      title: "Prompt library",
      text: "We build prompts by scenario: support, sales, internal tasks. Every prompt has a version, an owner, and a purpose.",
    },
    {
      title: "Tests",
      text: "We build a set of requests with reference answers. We measure accuracy, completeness, and cost for every version. One command runs the tests and returns a report by scenario.",
    },
    {
      title: "Guardrails",
      text: "We describe blocked topics, formats, and data limits. Checks run before and after the model.",
    },
    {
      title: "Team handover",
      text: "We show how to update a prompt and run the tests. The team runs the library without us. The handover includes a short process and a walkthrough of two changes.",
    },
  ],
  techStack: [
    {
      subtitle: "Prompts and checks",
      description:
        "We store prompt versions in [PostgreSQL], call the model through [OpenAI API], and collect traces in [Langfuse] to see the quality and cost of each request.",
      technologies: [
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary:
            "The model the prompts are built for: the API version is fixed together with the prompt.",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Request tracing: it shows which prompt ran, what the request cost, and where the answer drifted from the reference.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores prompt versions, test sets, and run results: you see which version produced which metric.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Scenarios",
      text: "We review tasks, audience, and data. We pick scenarios where a prompt produces a measurable effect.",
      processType: "discovery",
    },
    {
      title: "Prompts",
      text: "We write the first prompt version and fix the answer format. Each scenario gets an owner.",
      processType: "system-design",
    },
    {
      title: "Tests",
      text: "We collect reference requests and answers. We run the versions and compare metrics.",
      processType: "testing",
    },
    {
      title: "Rollout",
      text: "We connect the library to the application and hand it to the team. We set up updates and test runs.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "3+ scenarios",
      text: "The model runs in support, sales, or internal tasks. Several scenarios make the library pay off.",
      positive: true,
    },
    {
      title: "A model API exists",
      text: "The application already calls a model. We connect to the same API and keep the architecture.",
      positive: true,
    },
    {
      title: "A couple of prompts",
      text: "Two or three requests need point tuning. A library and tests matter when the number of scenarios grows.",
      positive: false,
    },
    {
      title: "No prompt owner",
      text: "The library needs a person who approves changes. Without an owner, prompts scatter across the team.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does prompt engineering cost?",
      answer:
        "The base program starts at RUB 250,000 and covers three scenarios, the library, and the test set. The number of prompts and checks affects the estimate.",
    },
    {
      question: "How long does it take?",
      answer:
        "Two to three weeks for three scenarios and 20 prompts. Tests and guardrails add a week.",
    },
    {
      question: "How is it different from training?",
      answer:
        "Prompt engineering delivers the library and tests. Team training explains how to use them and runs as a separate program.",
    },
    {
      question: "What happens when the model changes?",
      answer:
        "The library and tests let you compare a new model on the same requests. The switch decision rests on metrics.",
    },
    {
      question: "Can we update prompts without a developer?",
      answer:
        "Yes, the library and tests are built for a product team. The prompt owner edits the text, runs the tests, and compares metrics with the previous version. A developer steps in when the answer format or integration changes.",
    },
  ],
  tradeoffs: [
    {
      title: "Model quality",
      text: "A prompt sets the frame, and model quality sets the ceiling. Tests show where a prompt helps and where another model is needed.",
    },
    {
      title: "Cost",
      text: "A long prompt and a large context raise the bill. We measure request cost and cut instructions that add nothing. Cost is measured per request and per monthly volume. The report directly compares request cost with the previous version.",
    },
    {
      title: "Updates",
      text: "Prompt updates move together with the model and data. The library needs an owner and regular test runs.",
    },
  ],
  deliverables: [
    {
      title: "Library",
      text: "The library stores prompts by scenario with versions and owners. Any version can be compared with the previous one.",
    },
    {
      title: "Test set",
      text: "The test set holds requests and reference answers. It measures quality and cost for every version.",
    },
    {
      title: "Guardrail pack",
      text: "The guardrail pack describes blocked topics, formats, and data limits. Checks are built into the model call.",
    },
  ],
  mechanism: [
    {
      title: "Scenarios",
      text: "We review tasks and collect scenarios where the model already runs. Each scenario gets an input, an expected answer, and a metric for quality.",
    },
    {
      title: "Tests",
      text: "Tests collect requests and reference answers into one set. A run on a new version shows accuracy, completeness, and cost, so a prompt change rests on numbers.",
    },
    {
      title: "Guardrails",
      text: "Guardrails check model input and output against rules. Blocked topics and formats are stopped, and an incident lands in the log with the prompt version and request.",
    },
  ],
  outcomes: [
    {
      title: "30 prompts",
      value: "30",
      text: "The base library covers up to 30 prompts from three scenarios. Each has a version and an owner.",
    },
    {
      title: "100 tests",
      value: "100",
      text: "The test set holds up to 100 requests with reference answers. It compares prompt versions.",
    },
    {
      title: "2 weeks",
      value: "2 wk",
      text: "We build the first library in two weeks. The timeline covers scenarios, prompts, and the first test run.",
    },
  ],
};
