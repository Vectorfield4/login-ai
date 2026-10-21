export const aiSupportAutomationEn = {
  ctaBanner: {
    title: "Let's build a pilot on your requests",
    text: "Send the channel list and a month of ticket exports. In three to four weeks we'll launch a pilot on one queue and show the auto-answer share.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "Support Automation",
  title: "AI support automation for customer service",
  tagline:
    "The bot sorts requests from three or more channels, answers from your knowledge base with a source link, and hands hard cases to an operator with context.",
  description:
    "We automate support for teams with three or more channels and around 5,000 requests a month. We bring the channels into one queue and score the quality of every dialog. The pilot runs three to four weeks.",
  features: [
    {
      title: "Triage and routing",
      text: "The bot detects the topic, language, and priority of a request and places it in a queue: delivery, payment, or returns. Operators get urgent tickets, and the bot closes routine ones.",
    },
    {
      title: "Answers with a source link",
      text: "The answer comes from your policies, product cards, and order history. The bot attaches a link to the document or helpdesk record for every fact.",
    },
    {
      title: "Quality scoring across every dialog",
      text: "The scorecard reviews 100% of dialogs rather than a sample: tone, accuracy, policy compliance, and repeat requests. The report shows topics with low quality.",
    },
    {
      title: "Helpdesk and CRM integration",
      text: "We connect Bitrix24, Zendesk, or another system through APIs and webhooks. The bot updates the card and hands the operator a ticket with the transcript.",
    },
  ],
  techStack: [
    {
      subtitle: "Channels, knowledge, and the request queue",
      description:
        "The bot takes messages from [Telegram Bot API] and other channels, keeps tickets and history in [PostgreSQL], holds dialog state in [Redis], passes events through [Kafka], and updates cards in [Битрикс24].",
      technologies: [
        {
          id: "bitrix24",
          name: "Битрикс24",
          glossary:
            "Helpdesk and CRM in one system: the bot reads the customer card and updates the ticket status.",
        },
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary:
            "Telegram's HTTP interface: the bot receives messages and buttons, and a webhook delivers the event to your service.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores tickets and dialog history: the bot restores the request context from these records.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Holds dialog state and the message queue: the bot remembers the customer's step and survives a restart.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "An event bus between channels and the helpdesk: under peak load, messages queue up and arrive in order.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Channel and topic audit",
      text: "We read a month of exports: channels, recurring topics, and the share of requests a template closes. You get a topic map and an auto-answer estimate.",
      processType: "discovery",
    },
    {
      title: "Scenarios and the knowledge base",
      text: "We design dialog branches, auto-answer boundaries, and operator handoff points. We clean the documents, assign a base owner, and approve answers.",
      processType: "system-design",
    },
    {
      title: "Helpdesk and CRM integration",
      text: "We connect channels, the helpdesk API, and the CRM: webhooks, customer sync, and access rights. We test every scenario on a staging queue.",
      processType: "integration",
    },
    {
      title: "Pilot and launch",
      text: "For three to four weeks the bot runs on one queue alongside operators. We compare answers with QA, fix scenarios, and roll the bot out to other channels.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "High volume and three channels",
      text: "Support takes around 5,000 requests a month from chat, email, and messengers. The bot absorbs repetitive topics.",
      positive: true,
    },
    {
      title: "A helpdesk with an open API",
      text: "You run Bitrix24, Zendesk, or another system with a REST API and webhooks. The bot reads cards and updates statuses in the operator interface.",
      positive: true,
    },
    {
      title: "No knowledge owner",
      text: "Documents update at random and contradict each other. We assign an owner for the base first, then build scenarios and answers.",
      positive: false,
    },
    {
      title: "Complex and money cases",
      text: "Refunds, payment disputes, and custom terms stay with a person. The bot gathers context and hands the dialog to an operator.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Online store support",
      text: "In the retail-support-bot project, the bot handled chat and email, pulled orders from the CRM, and answered delivery status questions. Operators took non-standard cases, and processing time fell by 70%.",
      metricValue: "82%",
      metricLabel: "requests without an operator",
    },
  ],
  faqItems: [
    {
      question: "Does the bot replace operators?",
      answer:
        "No. The bot takes repetitive requests: order status, delivery, payment, and standard instructions. Operators handle complex and money cases.",
    },
    {
      question: "Which channels can we connect?",
      answer:
        "Website chat, Telegram, WhatsApp, email, and social networks. We connect a channel through an API or webhook, and the history stays in one helpdesk card.",
    },
    {
      question: "How does quality control work?",
      answer:
        "The scorecard reviews 100% of dialogs: greeting, accuracy, tone, and resolution. Disputed cases go to a team lead, and weak topics feed scenario edits.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "A pilot on one queue takes three to four weeks. A full launch with several channels takes six to ten weeks.",
    },
  ],
  tradeoffs: [
    {
      title: "The knowledge base needs an owner",
      text: "Answers stay accurate when the base has an owner: they approve edits and resolve contradictions. The edit queue shows up in the dashboard.",
    },
    {
      title: "Channels set their own limits",
      text: "Each channel has its own API, message limits, and template rules. We design the queue and retries around those limits, and peak messages wait in Kafka.",
    },
    {
      title: "Complex cases stay with a person",
      text: "Operators own complex cases such as refunds, payment disputes, and custom terms: the bot gathers the history and hands the dialog over with context.",
    },
  ],
  deliverables: [
    {
      title: "Channel and topic audit",
      text: "A report on channels, topics, and the share of repetitive requests over a month. It shows which topics the bot closes itself.",
    },
    {
      title: "Pilot bot",
      text: "A pilot bot runs on one queue with connected channels, scenarios, and the knowledge base. Over three to four weeks it collects auto-answer statistics.",
    },
    {
      title: "Quality dashboard",
      text: "A dashboard with the auto-answer share, escalations, QA scores across all dialogs, and topics to improve.",
    },
  ],
  mechanism: [
    {
      title: "Intake and triage",
      text: "A webhook takes a message from chat, email, or a messenger and normalizes it into one format. The triage step detects the topic and priority, and the ticket enters a queue.",
    },
    {
      title: "RAG answer with a source",
      text: "The bot looks for an answer in the knowledge base and order history: retrieval finds close fragments, and PostgreSQL returns the order status. The model builds the answer and attaches a document link.",
    },
    {
      title: "QA and operator handoff",
      text: "The scorecard rates every dialog and flags weak topics. When a scenario reaches its boundary, the bot assembles the transcript, the reason, and the next step for the operator.",
    },
  ],
  outcomes: [
    {
      title: "2 channels in the base package",
      value: "2",
      text: "The base package includes two channels and one queue: website chat and email or a messenger. The pilot takes three to four weeks.",
    },
    {
      title: "5,000 requests a month",
      value: "5 000",
      text: "The estimate and scenarios cover a flow of around 5,000 tickets a month. The Kafka queue and the Redis cache absorb peaks.",
    },
    {
      title: "82% of requests without an operator",
      value: "82%",
      text: "In an online store project, the bot closed 82% of requests without an operator: it handled chat and email, pulled orders from the CRM, and answered status questions. Processing time fell by 70%.",
    },
  ],
};
