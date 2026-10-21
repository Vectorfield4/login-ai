export const aiTelegramEn = {
  ctaBanner: {
    title: "Let's build a pilot on your channel",
    text: "Send a brief on the channel and audience: request topics, subscriber count, and the bot's jobs. In two weeks we launch a pilot on one queue and show the share of dialogs handled without an operator.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI bots in Telegram",
  title: "AI bots and mini apps in Telegram",
  tagline:
    "A Telegram bot answers from your documents and orders, moves the customer to payment in a mini app, and hands a complex dialog to an operator with context.",
  description:
    "We build AI bots for Telegram: scenarios with buttons and commands, answers from the knowledge base and order history, a mini app with a cart and payment, and operator handoff with a transcript. A pilot on one queue takes two weeks.",
  features: [
    {
      title: "A bot with scenarios",
      text: "The bot takes commands, buttons, and free text, walks the customer through scenario branches, and stores the dialog step. State lives in Redis, so the conversation continues after a service restart.",
    },
    {
      title: "Answers from documents and orders",
      text: "The bot looks for a fact in the knowledge base and order history: pgvector finds close fragments, and PostgreSQL returns the purchase status. The bot attaches a source link to every answer, and an operator checks the basis in one click.",
    },
    {
      title: "A mini app inside Telegram",
      text: "A button opens the storefront right inside Telegram: the customer browses the catalog, fills a cart, and pays. It runs on iOS and Android from one Web App.",
    },
    {
      title: "Operator handoff",
      text: "When a dialog moves past the scenario edge, the operator gets the transcript, the reason, and the next step. The customer continues from the same place, and the operator's answer joins the knowledge base as a candidate.",
    },
  ],
  techStack: [
    {
      subtitle: "Channel, knowledge, and event queue",
      description:
        "The bot runs through [Telegram Bot API], keeps orders and dialog history in [PostgreSQL], searches the knowledge base through [pgvector], holds conversation state in [Redis], and sends payment events to [Kafka].",
      technologies: [
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary:
            "Telegram's HTTP interface: the bot receives messages, button taps, and payments, and a webhook delivers the event to your service.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores orders, dialog history, and scenario settings: the bot answers the customer from these records and restores context.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "A PostgreSQL extension for vector search: it finds close knowledge-base fragments and passes them to the model for an answer.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Stores dialog state and the message queue: the bot remembers the customer's step and continues the scenario after a service restart.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "An event bus for orders and payments: a payment from the mini app reaches the CRM and the warehouse within a second.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Channel and topic audit",
      text: "We read a month of conversation exports, count daily requests, and measure the share of recurring questions. We find the topics scenarios can close and estimate the operator load.",
      processType: "discovery",
    },
    {
      title: "Scenarios and knowledge base",
      text: "We build the scenario map, edit documents for answers, and assign a knowledge owner. Here we fix auto-answer boundaries, operator handoff points, and the list of topics for manual review.",
      processType: "system-design",
    },
    {
      title: "Bot, mini app, and payment",
      text: "We connect the Bot API, the CRM, and the knowledge base, set up webhooks, and sync orders. For the storefront we build a mini app, connect the payment gateway, and set access rights to customer data.",
      processType: "integration",
    },
    {
      title: "Pilot and launch",
      text: "For two weeks the bot runs on dialogs from one queue. We compare auto-answers with operator ratings, fix scenarios, and roll the bot out to the whole channel.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A Telegram audience and repetitive requests",
      text: "You have a channel or chat with subscribers, and support gets hundreds of similar questions about orders, payment, and delivery. The bot takes that load, and operators handle complex topics.",
      positive: true,
    },
    {
      title: "Content and order sources with an owner",
      text: "You have documents, price lists, and order history, plus a person who approves edits and keeps them current. The bot answers precisely from this data and shows the source.",
      positive: true,
    },
    {
      title: "No content owner and no moderation",
      text: "Documents update at random and contradict each other. We assign a knowledge owner and a review process first, then build scenarios and answers.",
      positive: false,
    },
    {
      title: "Payment and legal terms without a legal entity",
      text: "Taking payments requires a legal entity, a provider contract, and tax accounting. Before that stage we launch the bot with consultations and orders, and add payment later.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Online store support",
      text: "In an online store support project, the agent handled chat and email requests, pulled orders from the CRM, and answered on status. Operators took non-standard cases, and processing time fell by 70%.",
      metricValue: "82%",
      metricLabel: "requests without an operator",
    },
  ],
  faqItems: [
    {
      question: "How is a Telegram bot different from a bot in another channel?",
      answer:
        "In Telegram the bot works through the Bot API and gets access to buttons, payments, and mini apps. Other channels are separate projects: each has its own API, its own limits, and its own scenario.",
    },
    {
      question: "What can a mini app do?",
      answer:
        "It is a storefront inside Telegram: catalog, product card, cart, and payment. The customer opens it with a button in one tap and stays in a familiar messenger.",
    },
    {
      question: "Can the bot take payments?",
      answer:
        "Yes. We connect a payment gateway to the bot or the mini app: Telegram Pay, YooKassa, or another provider. The contract, legal entity, and taxes stay with the business.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "A pilot on one queue takes two weeks. A full launch with a mini app and payment starts at four weeks and depends on the number of integrations.",
    },
  ],
  tradeoffs: [
    {
      title: "Telegram Bot API limits",
      text: "Bot API limits: about 30 messages per second and files up to 50 MB. We put a queue in Kafka and split broadcasts into batches, so the bot keeps pace on a base of 100,000 subscribers.",
    },
    {
      title: "Content moderation",
      text: "The knowledge owner approves new answers and retires outdated documents. We set up a moderation queue in the dashboard and rules for topics that need a person.",
    },
    {
      title: "Payment and legal terms on the business side",
      text: "The payment provider contract, legal entity, and tax accounting stay with you. We connect the chosen gateway and pass payment events to the CRM and accounting.",
    },
  ],
  deliverables: [
    {
      title: "A Telegram bot",
      text: "A Telegram bot with a menu, commands, scenarios, and dialog state, connected to your channel, CRM, and knowledge base.",
    },
    {
      title: "Knowledge base and scenarios",
      text: "Marked-up documents, a scenario map, and answer rules with operator handoff points and an edit queue.",
    },
    {
      title: "A metrics dashboard",
      text: "A dashboard with the auto-answer share, escalation count, payment conversion, and a list of topics for scenario work.",
    },
  ],
  mechanism: [
    {
      title: "Message intake in the bot",
      text: "A Bot API webhook takes a message and passes it to the bot service, which detects the topic and the scenario step. Dialog state lives in Redis, so the customer continues the conversation from the same place, even after a restart.",
    },
    {
      title: "RAG over documents and orders",
      text: "The bot looks for an answer in the knowledge base and order history: pgvector finds close document fragments, and PostgreSQL returns the order status and contents. The model builds the answer from the facts it finds and attaches a source link, and the operator checks the basis in one click.",
    },
    {
      title: "Mini app and payment",
      text: "A button opens a mini app inside Telegram: the customer builds an order in the storefront and pays through the connected gateway. The payment event goes to Kafka, the CRM updates the status, and the bot sends a receipt and the next order step.",
    },
  ],
  outcomes: [
    {
      title: "1 bot in the base",
      value: "1",
      text: "The base launch includes one Telegram bot with scenarios and answers from the knowledge base. We quote extra bots and modules as separate items in the calculator.",
    },
    {
      title: "A two-week pilot",
      value: "2 wks",
      text: "The pilot runs for two weeks on one request queue: we collect auto-answer statistics, fix scenarios, and show the economics on your dialogs.",
    },
    {
      title: "A mini app as a separate layer",
      value: "mini app",
      text: "The storefront and payment connect to a ready bot as a separate layer: catalog, cart, and payment gateway appear in the Telegram interface.",
    },
  ],
};
