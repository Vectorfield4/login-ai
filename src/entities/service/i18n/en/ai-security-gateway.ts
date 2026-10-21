export const aiSecurityGatewayEn = {
  ctaBanner: {
    title: "Let's review the perimeter",
    text: "Send the application diagram and model list: on the call we define interception points and filtering rules.",
    buttonLabel: "Discuss the gateway",
  },
  navTitle: "AI application security",
  title: "AI security gateway",
  tagline:
    "We place a gateway in front of the LLM: prompt injection filters, DLP, PII masking, and a request log.",
  description:
    "We intercept model requests and check them before and after generation. The gateway blocks injections, masks personal data, limits access, and writes a log for review.",
  features: [
    {
      title: "Input filters",
      text: "We check prompts and attachments with rules and a classifier. Suspicious patterns are blocked or sent for human review.",
    },
    {
      title: "DLP and PII",
      text: "We find personal data, keys, and contract numbers in requests and responses. We mask fields before sending to the model and restore them after.",
    },
    {
      title: "Access and limits",
      text: "We bind the gateway to roles and application keys. We count requests per user and project and add quotas and rate limits.",
    },
    {
      title: "Log and review",
      text: "We write the request, response, triggered rules, and latency to a log. An incident shows which prompt passed and what the model returned.",
    },
  ],
  techStack: [
    {
      subtitle: "Gateway and observability",
      description:
        "We run the gateway in [Kubernetes], check roles through [Keycloak], trace requests in [Langfuse], store rules and logs in [PostgreSQL], and send events to [Kafka].",
      technologies: [
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary: "The gateway platform: containers scale with load and survive a node failure.",
        },
        {
          id: "keycloak",
          name: "Keycloak",
          glossary:
            "Roles and application keys: the gateway checks who may call a model and which data they can reach.",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Request tracing: it shows the prompt path, triggered rules, and latency for each step.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores rules, exceptions, and the log: an incident can be traced back to the original request and response.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The security event stream: alerts and metrics reach the SIEM and monitoring without blocking a request.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Threat model",
      text: "We review the application, models, and data. We record which attacks and leaks are critical for the perimeter.",
      processType: "discovery",
    },
    {
      title: "Gateway design",
      text: "We choose interception points, rules, and a masking scheme. We calculate the latency budget and throughput.",
      processType: "system-design",
    },
    {
      title: "Integration",
      text: "We connect the gateway to the application and models. We set roles, keys, quotas, and the log.",
      processType: "integration",
    },
    {
      title: "Red team",
      text: "We test the gateway with attacks and legitimate requests. We tune thresholds and record false positives.",
      processType: "testing",
    },
  ],
  fitItems: [
    {
      title: "An external LLM",
      text: "The application sends data to a cloud model. The gateway checks requests and responses on the way to the provider.",
      positive: true,
    },
    {
      title: "PII in requests",
      text: "Users send names, phones, addresses, or documents. DLP masks fields before they reach the model.",
      positive: true,
    },
    {
      title: "No application owner",
      text: "The gateway sits in the application flow and needs an owner for releases and rules. Without one the project stops at design.",
      positive: false,
    },
    {
      title: "A 5 ms latency budget",
      text: "Filters add 15–40 ms. With a hard 5 ms budget we move part of the checks into an asynchronous stage.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does the gateway cost?",
      answer:
        "The base delivery starts at RUB 600,000 and covers the gateway, rules, logging, and red team. The number of applications and traffic affect the timeline and estimate.",
    },
    {
      question: "How much latency does it add?",
      answer:
        "On a test perimeter the filters add 15–40 ms per request. We move heavy checks, such as document parsing, into an asynchronous stage.",
    },
    {
      question: "What about false positives?",
      answer:
        "We tune thresholds on a pilot with a labelled request set. Exceptions live in a list with an owner and a review date.",
    },
    {
      question: "Where do you deploy the gateway?",
      answer:
        "In your cloud or on your servers. We support Kubernetes and virtual machines, and connect external models through their API.",
    },
  ],
  tradeoffs: [
    {
      title: "Latency",
      text: "Filters add 15–40 ms per request. For chat the delay stays invisible, while a voice flow gets a separate latency measurement and heavy checks move to an asynchronous stage.",
    },
    {
      title: "False positives",
      text: "DLP rules produce false positives on non-standard data. We tune the threshold on a pilot and keep an exception list with an owner.",
    },
    {
      title: "Rules and owner",
      text: "The gateway applies rules approved by security. We deliver the policy and update process, and the risk decision stays with the owner.",
    },
  ],
  deliverables: [
    {
      title: "Gateway",
      text: "The gateway intercepts requests and responses, applies rules, and exposes metrics. Code, configuration, and the deployment scheme are included.",
    },
    {
      title: "Rule pack",
      text: "The rule pack covers injections, PII, keys, and blocked topics. Every rule has a test and an owner.",
    },
    {
      title: "Dashboard",
      text: "The dashboard shows requests, blocks, latency, and false positives. Security sees load and incidents in one place.",
    },
    {
      title: "Runbook",
      text: "The runbook covers incident response, rule updates, and a post-release check. The on-call team follows the steps.",
    },
  ],
  mechanism: [
    {
      title: "Interception",
      text: "The gateway sits between the application and the model and intercepts every request. It sees the prompt, attachments, user, and context, so checks rest on the real data flow.",
    },
    {
      title: "Input checks",
      text: "On input, rules and a classifier look for injections, PII, and blocked data. On output, the gateway restores masked placeholders, checks the response for new leaks, and masks any fragments it finds before returning the response to the application.",
    },
    {
      title: "Logging",
      text: "Logging keeps every request, response, and triggered rule in a record with per-step latency. The record provides material for incident review and threshold tuning.",
    },
  ],
  outcomes: [
    {
      title: "Latency 15–40 ms",
      value: "15–40 ms",
      text: "Filters add 15–40 ms per request on a test perimeter. We measure latency at each step and show it on the dashboard.",
    },
    {
      title: "100% of requests",
      value: "100%",
      text: "Every model request passes through the gateway and enters the log. A record holds the user, rule, and check result.",
    },
    {
      title: "2 weeks",
      value: "2 weeks",
      text: "A pilot on one application takes about two weeks. The timeline includes the threat model, integration, and red team.",
    },
  ],
};
