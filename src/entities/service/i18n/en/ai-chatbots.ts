export const aiChatbotsEn = {
  ctaBanner: {
    title: "Let's build a pilot on your dialogs",
    text: "Send a month of conversation exports and the channel list. In two weeks we'll launch the bot on one queue and show the auto-answer share on real requests.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI Chatbot Development",
  title: "AI chatbots for support and sales",
  tagline:
    "One bot answers in chat, messengers, and email, grounds replies in your documents, and hands a hard dialog to an operator with context.",
  description:
    "We build chatbots for business: we bring chat, Telegram, WhatsApp, and email into one scenario, answer from your knowledge base and order history, and hand the operator a transcript, the reason, and the next step.",
  features: [
    {
      title: "One bot across channels",
      text: "The bot takes website chat, Telegram, WhatsApp, and email in one scenario: the customer writes in a familiar channel, and the team sees a single history.",
    },
    {
      title: "Answers from documents and orders",
      text: "The answer comes from the knowledge base and order history. The bot attaches a link to the document or CRM record for every fact, so an operator checks the source in one click.",
    },
    {
      title: "Handoff with context",
      text: "When the bot reaches the edge of a scenario, the operator gets the transcript, the reason, and the next step. The customer continues the conversation without retelling the story.",
    },
    {
      title: "Quality dashboard",
      text: "We track the auto-answer share, escalation count, and dialog sentiment. The metrics show which topics the bot closes itself and where the scenario needs work.",
    },
  ],
  techStack: [
    {
      subtitle: "Channels, knowledge, and dialog state",
      description:
        "The bot connects to [Telegram Bot API] and [WhatsApp Cloud API], keeps orders in [PostgreSQL], searches the knowledge base through [pgvector], and holds the dialog in [Redis].",
      technologies: [
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary:
            "Telegram's HTTP interface: the bot receives messages and buttons, and a webhook delivers the event to your service.",
        },
        {
          id: "whatsapp-cloud-api",
          name: "WhatsApp Cloud API",
          glossary:
            "The official WhatsApp channel: templates, attachments, and delivery statuses arrive in one webhook.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores orders, conversation history, and scenario settings: the bot answers from these records and restores context.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "A PostgreSQL extension for vector search: it finds close knowledge-base fragments and passes them to the model.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Stores dialog state and the message queue: the bot remembers the customer's step and survives a restart.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Request audit",
      text: "We review topics, frequency, and channels: we read a month of exports, find recurring questions, and estimate the auto-answer share.",
      processType: "discovery",
    },
    {
      title: "Scenarios and knowledge base",
      text: "We build the scenario map, edit documents for answers, and assign a knowledge owner. Here we fix the auto-answer boundaries and operator handoff points.",
      processType: "system-design",
    },
    {
      title: "Integrations",
      text: "We connect channels, the CRM, and the knowledge base: webhooks, order sync, and access rights to customer data.",
      processType: "integration",
    },
    {
      title: "Pilot and launch",
      text: "For two weeks the bot runs on dialogs from one queue. We compare auto-answers with operator ratings, fix scenarios, and roll the bot out to other channels.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A high volume of repetitive requests",
      text: "Support and sales get hundreds of similar questions about orders, payment, and delivery. The bot takes that load and frees operators for complex topics.",
      positive: true,
    },
    {
      title: "A knowledge base with an owner",
      text: "You have documents, policies, and FAQ answers, plus a person who keeps them current and approves edits.",
      positive: true,
    },
    {
      title: "No knowledge owner",
      text: "Documents update at random and contradict each other. We assign an owner first, then build scenarios and answers.",
      positive: false,
    },
    {
      title: "Complex price negotiation",
      text: "Discounts, bargaining, and custom terms stay with a manager. The bot prepares a customer summary and passes the dialog to a person.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Online store support",
      text: "The agent handled chat and email requests, pulled orders from the CRM, and answered on delivery status. Operators took non-standard cases, and request processing time fell by 70%.",
      metricValue: "82%",
      metricLabel: "requests without an operator",
    },
  ],
  faqItems: [
    {
      question: "Which channels does the bot support?",
      answer:
        "Website chat, Telegram, WhatsApp, and email. We connect channels through APIs and webhooks, so the conversation history stays in one customer card.",
    },
    {
      question: "Where do the answers come from?",
      answer:
        "From your documents, policies, and order history. The model answers from retrieved fragments and shows a source link for a check.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "A pilot on one queue takes two weeks. A full launch with several channels starts at six weeks and depends on the number of integrations.",
    },
    {
      question: "What happens when the bot cannot answer?",
      answer:
        "It hands the dialog to an operator with the transcript, the reason, and the next step. The operator's answer joins the knowledge base as a candidate for a scenario.",
    },
  ],
  tradeoffs: [
    {
      title: "Scenarios are refined on real dialogs",
      text: "We build the first scenario from conversation exports, and exact wording appears after two weeks on real dialogs. The pilot shows topics to expand.",
    },
    {
      title: "The knowledge base needs an owner",
      text: "Answers stay current when the base has an owner: they approve edits, retire outdated documents, and watch for contradictions. The edit queue shows up in the dashboard.",
    },
    {
      title: "Complex and money cases stay with a person",
      text: "Discounts, refunds, and disputed charges stay with a manager: the bot gathers context and passes the dialog with its history. The boundary keeps money decisions under control.",
    },
  ],
  deliverables: [
    {
      title: "Scenario map",
      text: "A scenario map of topics, branches, and auto-answer boundaries with operator handoff points. It shows which requests the bot closes itself and which go to a person.",
    },
    {
      title: "Connected channels",
      text: "Website chat, Telegram, WhatsApp, and email are connected to one scenario. Conversation history and customer data reach the CRM through webhooks.",
    },
    {
      title: "Quality dashboard",
      text: "A dashboard with the auto-answer share, escalation count, sentiment, and a list of topics to improve. You plan scenario edits and operator load from it.",
    },
  ],
  mechanism: [
    {
      title: "Channel routing",
      text: "A webhook takes a message from chat, Telegram, WhatsApp, or email and normalizes it into one format. The router detects the topic and language, so the dialog continues in the channel the customer chose, and the operator sees one history.",
    },
    {
      title: "RAG over documents and orders",
      text: "The bot looks for an answer in the knowledge base and order history: pgvector finds close fragments, and PostgreSQL returns the order status. The model builds the answer from the facts and attaches a source link for a check.",
    },
    {
      title: "Escalation with context",
      text: "When a scenario reaches its edge, the bot assembles the transcript, the escalation reason, and the next step. The operator gets a card with the history and continues the dialog from where the customer stopped.",
    },
  ],
  outcomes: [
    {
      title: "82% of requests without an operator",
      value: "82%",
      text: "In an online store project, the agent closed 82% of requests without an operator and cut processing time by 70%. It handled chat and email, pulled orders from the CRM, and passed complex cases to operators.",
    },
    {
      title: "Round-the-clock support",
      value: "24/7",
      text: "The bot answers in chat and email around the clock, and an operator joins complex dialogs with ready context. Night and weekend requests get an answer in the same minute.",
    },
    {
      title: "A two-week pilot",
      value: "2 wks",
      text: "We run the pilot on one channel and one queue: in two weeks we collect auto-answer statistics, fix scenarios, and show the economics.",
    },
  ],
};
