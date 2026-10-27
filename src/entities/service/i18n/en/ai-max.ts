export const aiMaxEn = {
  ctaBanner: {
    title: "Launch a MAX bot with the KYC package",
    text: "Send your legal entity details, documents, and an audience brief. In 6–8 weeks we build the bot, mini app, and payments, with legal support through the MAX decision.",
    buttonLabel: "Discuss the launch",
  },
  navTitle: "AI bots in MAX",
  title: "AI bots in MAX: KYC, legal support, launch",
  tagline:
    "We launch an AI bot in MAX for Russian businesses: scenarios, a mini app, and payments come with a KYC package, entity review, and legal support.",
  description:
    "We build AI bots for MAX. We check KYC readiness, assemble documents, and provide legal support, then connect the MAX Bot API, mini app, and payments on legal terms. A launch takes 6–8 weeks.",
  features: [
    {
      title: "MAX scenarios",
      text: "We build scenarios for MAX: requests, orders, delivery status, and support. The bot runs the dialog, and the mini app opens from the chat.",
    },
    {
      title: "KYC package and legal opinion",
      text: "We review the legal entity and ownership structure, prepare the KYC package and a legal opinion. Lawyers support the application through the MAX decision.",
    },
    {
      title: "Mini app inside MAX",
      text: "We build a mini app for the catalog, order, status, and account area. A user opens it from the bot; the bot, PostgreSQL, and Redis run in your perimeter or in a closed cloud under the contract.",
    },
    {
      title: "Payments on legal terms",
      text: "We connect payments in MAX: acquiring, receipts, refunds, and transaction statuses. We fix the terms in the contract and agree them with accounting.",
    },
  ],
  techStack: [
    {
      subtitle: "Channel, data, and queue",
      description:
        "The bot works through [MAX Bot API], keeps profiles and orders in [PostgreSQL], passes events to [Kafka], holds dialog state in [Redis], and runs services in [Kubernetes].",
      technologies: [
        {
          id: "max-bot-api",
          name: "MAX Bot API",
          glossary:
            "MAX's HTTP interface: the bot receives messages, buttons, and attachments, and a webhook delivers the event to your service.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores profiles, orders, and conversation history: the bot restores context from these records and answers status questions.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "Passes bot and payment events into a queue: services read the stream without message loss under peak load.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Holds dialog state and a response cache: the bot remembers the customer's step, survives a pod restart, and returns an answer in milliseconds.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "Runs the bot services in containers and spreads load across pods: it adds replicas as traffic grows and keeps the service live.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "KYC readiness audit",
      text: "We review the legal entity, ownership structure, and documents. We record the ready papers and the timeline of each review stage.",
      processType: "discovery",
    },
    {
      title: "Legal package and entity",
      text: "We check the charter, registration details, and owners, assemble the KYC package, and prepare the application. Lawyers handle MAX correspondence.",
      processType: "system-design",
    },
    {
      title: "Bot and mini app",
      text: "We connect the MAX Bot API, build scenarios, the mini app, and payments. We link the bot to the CRM, catalog, and inventory, and set roles.",
      processType: "integration",
    },
    {
      title: "Launch after approval",
      text: "After the MAX decision, we move the bot into the live channel, run acceptance scenarios, and hand over a report.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "MAX audience and a legal entity",
      text: "You run a business in Russia and see demand in MAX. We register the bot to a legal entity, and the company passes the MAX review.",
      positive: true,
    },
    {
      title: "Documents and owners",
      text: "The charter, registration details, and ownership records form one package; the company appoints a compliance owner. The package takes one or two weeks to assemble.",
      positive: true,
    },
    {
      title: "Legal entity and ownership records",
      text: "The MAX KYC process requires a legal entity, registration details, and owner confirmation. We prepare these documents before the bot launch.",
      positive: false,
    },
    {
      title: "Launch after approval",
      text: "We schedule the bot and payment launch after KYC approval. Before approval we assemble the documents and check the registration details.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "What does MAX KYC require?",
      answer:
        "A review of the legal entity, ownership structure, and documents about your business. MAX matches the applicant, owners, and payment details.",
    },
    {
      question: "Which documents does KYC need?",
      answer:
        "The charter, registration certificate, tax ID, bank details, ownership records, and the director's passport data. MAX confirms the exact list at kickoff.",
    },
    {
      question: "How long does a launch with KYC take?",
      answer:
        "Six to eight weeks. Document review takes 3–5 weeks, and development runs in parallel and takes 4–6 weeks. The timeline depends on the document package.",
    },
    {
      question: "Can we reuse a Telegram bot?",
      answer:
        "We carry over scenario logic and texts, and build the integration anew: MAX has its own Bot API and a separate KYC process. The Telegram bot keeps running.",
    },
  ],
  tradeoffs: [
    {
      title: "The KYC timeline depends on documents",
      text: "Review takes 3–5 weeks and starts when the package is complete. MAX comments add a few days, so we audit the documents in the first week.",
    },
    {
      title: "Legal support is part of the project",
      text: "Lawyers check the package, prepare the application, and handle correspondence through the decision. Support is included in the base estimate.",
    },
    {
      title: "State fees and outside counsel are quoted separately",
      text: "State fees, notary work, and outside counsel follow actual tariffs. These costs land in the estimate separately.",
    },
  ],
  deliverables: [
    {
      title: "KYC package and legal opinion",
      text: "A document set for review, an ownership chart, a compliance opinion, and an application. The package goes to MAX with lawyer support.",
    },
    {
      title: "Bot and scenarios in MAX",
      text: "A bot with scenarios, menus, operator handoff, and analytics. The MAX Bot API, CRM, and catalog are connected, and the event log keeps every step.",
    },
    {
      title: "Launch report",
      text: "A report with dialog volume, the closed-request share, application conversion. It comes with access, instructions, and a support plan.",
    },
  ],
  mechanism: [
    {
      title: "KYC and onboarding",
      text: "Onboarding starts with a review of the entity, documents, and ownership structure, then we prepare the application and send it to MAX. Lawyers handle the correspondence, and the bot, PostgreSQL, and Redis run in your perimeter or in a closed cloud.",
    },
    {
      title: "Bot and scenarios in MAX",
      text: "The bot takes a message through the MAX Bot API, detects the topic, and runs the dialog along its scenario. State lives in Redis, events pass through Kafka, and the bot pulls answers and orders from PostgreSQL.",
    },
    {
      title: "Mini app and payments",
      text: "The mini app opens from the bot and shows the catalog, order, status. The payment module takes the charge, issues a receipt, and returns the result to the dialog.",
    },
  ],
  precedents: [
    {
      title: "Launch in 6–8 weeks",
      text: "A launch with the KYC package takes 6–8 weeks. Review runs alongside development, so the bot and payments reach MAX by approval.",
      metricValue: "6–8 wks",
      metricLabel: "Launch in 6–8 weeks",
    },
    {
      title: "KYC package in the base estimate",
      text: "The base estimate includes the KYC package, entity review, and legal support. State fees and outside counsel are quoted separately.",
      metricValue: "KYC package",
      metricLabel: "KYC package in the base estimate",
    },
    {
      title: "One bot in the base configuration",
      text: "The base configuration includes one bot with scenarios, menus, and analytics. Extra bots, the mini app, and payments join as separate options.",
      metricValue: "1",
      metricLabel: "One bot in the base configuration",
    },
  ],
};
