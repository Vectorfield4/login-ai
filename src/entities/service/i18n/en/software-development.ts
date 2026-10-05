export const software_developmentEn = {
  ctaBanner: {
    title: "Let's discuss your build",
    text: "Tell us about the product, timeline, and constraints. We'll come back with a stage, team, and cost estimate within one business day.",
    buttonLabel: "Get a project estimate",
  },
  navTitle: "Software Development",
  title: "Custom Software Development",
  tagline: "We build reliable software for your needs: from web services to AI platforms.",
  description:
    "We design and develop full-cycle software: requirements analysis, architecture, development, testing, and maintenance. We pick a best-practice stack for each product type – so the system is fast, secure, and scalable.",
  features: [
    {
      title: "Full-cycle development",
      text: "From prototype and architecture to release and support: you get a finished product, not a pile of code.",
    },
    {
      title: "Solid architecture",
      text: "We design modular, testable, and scalable systems – ready for load and business growth.",
    },
    {
      title: "Quality and security",
      text: "Automated tests, code review, security audits, and industry-standard compliance.",
    },
    {
      title: "Support and growth",
      text: "We maintain the product after launch: updates, new features, and optimization.",
    },
  ],
  techStack: [
    {
      subtitle: "Web apps and high-load SaaS",
      description:
        "We write the client side in [React] and [Next.js], and [TypeScript] catches type errors before release. The backend runs on [Node.js]; where we need fault tolerance, we write services in [Go] and [Python].",
      technologies: [
        {
          id: "typescript",
          glossary:
            "JavaScript with types: the compiler finds a type error before release instead of your users in production.",
        },
        {
          id: "react",
          glossary:
            "UI library: the page is built from components, and a state change re-renders only the parts that changed.",
        },
        {
          id: "nextjs",
          glossary:
            "React framework with server rendering and build-time page generation, so the first paint arrives fast.",
        },
        {
          id: "nodejs",
          glossary:
            "JavaScript runtime on the V8 engine, so the backend shares one language with the frontend.",
        },
        {
          id: "go",
          glossary:
            "Compiled language from Google: goroutines hold thousands of connections without a large number of threads.",
        },
        {
          id: "python",
          glossary:
            "Language with ready libraries for data, APIs, and automation, so a prototype comes together faster.",
        },
      ],
    },
    {
      subtitle: "Mobile ecosystems",
      description:
        "Native iOS code is written in [Swift], Android code in [Kotlin]. When one codebase has to cover both, we pick [Flutter] or [React Native] and ship sooner.",
      technologies: [
        {
          id: "swift",
          glossary:
            "Apple's language for iOS with safe memory handling, direct access to system APIs, and strict checks at build time.",
        },
        {
          id: "kotlin",
          glossary:
            "The official Android language: null safety in the type system and interop with existing Java code.",
        },
        {
          id: "flutter",
          glossary:
            "Google's Dart UI framework: it draws its own widget layer, so both platforms look the same.",
        },
        {
          id: "react-native",
          glossary:
            "Real iOS and Android components rendered from JavaScript: shared logic, native performance.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Requirements analysis",
      text: "We break down the task and fix goals, users, and constraints. You get a spec and a quote.",
    },
    {
      title: "Architecture",
      text: "We design modules, data, and integrations. We agree the stack and plan before writing code.",
    },
    {
      title: "Sprint development",
      text: "We work in short sprints with demos: you see the product and reprioritize every 1–2 weeks.",
    },
    {
      title: "Testing and release",
      text: "Automated tests, code review, load, and security audit. After release we support and grow the product.",
    },
  ],
  fitItems: [
    {
      title: "A product from scratch or a refactor",
      text: "A new service, platform, or legacy modernization. You need the full cycle: from idea to production.",
      positive: true,
    },
    {
      title: "Growth without hiring",
      text: "More tasks than the team can handle. An external team adds capacity without a long hiring process.",
      positive: true,
    },
    {
      title: "A two-week project",
      text: "A short one-off script or prototype: a full dev process outweighs the formalities.",
      positive: false,
    },
    {
      title: "Tight deadlines without a spec",
      text: "If the product is needed “yesterday” and requirements are unknown, we plan iteratively instead of a fixed quote.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "A platform for corporate processes",
      text: "We built a web system with ERP integration and analytics: from design to release. Data stopped living in spreadsheets, and manual exports disappeared.",
      metricValue: "−50%",
      metricLabel: "time spent on manual reports",
    },
  ],
  faqItems: [
    {
      question: "How is the cost formed?",
      answer:
        "From the spec and scope. We give a quote before start, agree the scope and stage payments, and track changes through spec updates.",
    },
    {
      question: "Who owns the code?",
      answer:
        "You do. Code, documentation, and access are handed to you; the code lives in your repository from day one.",
    },
    {
      question: "How do you control quality?",
      answer:
        "Automated tests, code review, and security audits. We run load and failure scenarios before release, not after.",
    },
    {
      question: "What happens after release?",
      answer:
        "Support: updates, new features, and optimization. The SLA format is agreed separately.",
    },
  ],
  scope: [
    {
      title: "Requirements and scenarios",
      text: "We gather requirements through interviews with key stakeholders: scenarios, load constraints, integration requirements. A gap in the spec costs more than any code revision.",
    },
    {
      title: "Architecture on a prototype",
      text: "We validate architecture on a prototype: a load test with 10k users exposes bottlenecks while they're still cheap to fix, not when the system is already in production.",
    },
    {
      title: "Stack for the product type",
      text: "We align the stack to the product type: one set of technologies for an internal system, another for a public service. The decision is documented with justification.",
    },
    {
      title: "Risks and fallback plans",
      text: "We assess risks upfront: dependency on external suppliers, legacy data migration, version compatibility. Each risk gets its own fallback plan.",
    },
    {
      title: "Metrics before the start",
      text: "We define success metrics before the start: response time, conversion, availability. Without numbers you can't tell whether the release succeeded or merely shipped.",
    },
    {
      title: "First version boundaries",
      text: "We lock the first version's boundaries: what's mandatory for launch and what can wait. A narrow MVP saves budget and shortens the path to a usable result.",
    },
  ],
  mechanism: [
    {
      title: "We work in 1–2 week sprints",
      text: "We work in 1–2 week sprints and show working code at the end of each one — you see the product, not slide decks.",
    },
    {
      title: "Sprint priorities are agreed upfront",
      text: "Sprint priorities are agreed upfront. Changing the plan before the start is cheaper than reworking a finished result.",
    },
    {
      title: "The developer owns the task end-to-end",
      text: "The developer owns the task end-to-end: from analysis to their own test. Handoffs between specialists eat time and hide small errors.",
    },
    {
      title: "Every change goes through code review",
      text: "Every change goes through code review. A second pair of eyes catches bugs and makes architectural decisions deliberate rather than accidental.",
    },
    {
      title: "Build and deploy to staging run every sprint",
      text: "Build and deploy to staging run every sprint. Integrations are tested on a staging environment, not introduced to production for the first time.",
    },
    {
      title: "Notes from demos feed into the next sprint's plan",
      text: "Notes from demos feed into the next sprint's plan, so the product adapts to your vision gradually, not in jumps after release.",
    },
  ],
  outcomes: [
    {
      title: "Code in your repository",
      value: "Yours to keep",
      text: "The code stays yours and in your repository. The system keeps evolving even if the team changes, and you stay the owner.",
    },
    {
      title: "Documentation with the code",
      value: "Days to onboard",
      text: "Documentation travels with the code: architecture, integration points, data schema. A new person gets up to speed in days.",
    },
    {
      title: "Observability before launch",
      value: "A failure in five minutes",
      text: "Monitoring and alerts are configured before launch: response time, error rate, server load. A failure is visible in five minutes.",
    },
    {
      title: "Tests catch regression",
      value: "Automated run",
      text: "Automated tests cover critical scenarios, so regression after a new feature is caught automatically. Production users see a working screen.",
    },
    {
      title: "A security audit",
      value: "Fixed before attack",
      text: "Security is audited after release too: dependency updates, access audits, data encryption. A vulnerability is closed before it can be exploited.",
    },
    {
      title: "Response time",
      value: "An hour per incident",
      text: "The SLA defines the response time: a critical incident is resolved within business hours. Support volume is scaled to your budget.",
    },
  ],
};
