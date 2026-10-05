export const ai_cms_integrationEn = {
  ctaBanner: {
    title: "Let's fill your content with an agent",
    text: "Show us the CMS and the content plan. We'll build drafts and translations on your materials in two weeks.",
    buttonLabel: "Request a pilot",
  },
  navTitle: "AI + CMS integration",
  title: "Integrating AI agents with a CMS",
  tagline:
    "The agent prepares pages, translations, and meta tags in the CMS, and the editor only approves.",
  description:
    "We connect AI agents to your CMS: page drafts, translations, meta tags, and product cards are created through the API, and publishing requires editor approval.",
  features: [
    {
      title: "Page drafts",
      text: "The agent assembles the page structure and text from the brief and catalog data, leaving the editor a ready draft.",
    },
    {
      title: "Translations without re-markup",
      text: "The agent translates and moves markup between locales while keeping links and components.",
    },
    {
      title: "Meta tags and structured data",
      text: "The agent fills title, description, and schema.org from a template instead of leaving fields empty.",
    },
    {
      title: "Publishing on approval",
      text: "The draft goes to review, and the page reaches production after the editor approves it.",
    },
  ],
  techStack: [
    {
      subtitle: "CMS and publishing",
      description:
        "The agent works with [Strapi], [WordPress], and [Contentful] through their APIs. Content events run through [Kafka], and revision history is stored in [PostgreSQL].",
      technologies: [
        {
          id: "strapi",
          name: "Strapi",
          glossary:
            "A headless CMS with content types: the agent writes into components and fields without breaking the page structure.",
        },
        {
          id: "wordpress",
          name: "WordPress",
          glossary:
            "A classic CMS with a REST API: the agent creates post drafts, terms, and meta fields.",
        },
        {
          id: "contentful",
          name: "Contentful",
          glossary:
            "A model-first content platform: the agent fills entries against the defined field model.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: publications, edits, and translations reach the agent without polling the CMS.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores draft versions and the edit log: it shows what the agent created and what the editor changed.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Content and CMS audit",
      text: "We review content types, locales, and roles: where the agent may create drafts and what a template locks.",
      processType: "discovery",
    },
    {
      title: "Content model",
      text: "We fix page templates and field-filling rules so the agent does not invent the structure.",
      processType: "system-design",
    },
    {
      title: "Integration and templates",
      text: "We connect to the CMS API, move markup into components, and set up drafts and translations.",
      processType: "integration",
    },
    {
      title: "Pilot on one section",
      text: "Two weeks on one section: we measure drafts accepted without a rewrite and the editor's edits.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A CMS with an API and roles",
      text: "Strapi, WordPress, or Contentful offer an API and rights: the agent creates drafts only.",
      positive: true,
    },
    {
      title: "An editor and a content plan exist",
      text: "Direction and tone are set: the agent speeds up output instead of replacing the editorial team.",
      positive: true,
    },
    {
      title: "Content ships once a quarter",
      text: "With rare publishing, automation does not pay off and preparing the material by hand is simpler.",
      positive: false,
    },
    {
      title: "Publishing without an editor",
      text: "We do not auto-publish text without human review: factual-error risk outweighs the gain.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Content for a media project",
      text: "The agent prepared article drafts and translations, and the editor edited and published; the release cycle shrank.",
      metricValue: "−45%",
      metricLabel: "editor time per release",
    },
  ],
  faqItems: [
    {
      question: "Does the agent publish itself?",
      answer:
        "No, by default a draft waits for editor approval. We enable auto-publishing only for standard cards on a strict template.",
    },
    {
      question: "How is markup preserved?",
      answer:
        "The agent works with CMS components, not raw HTML: blocks, links, and images stay in place.",
    },
    {
      question: "What about text uniqueness?",
      answer:
        "Templates set the structure and data comes from the catalog. The editor checks facts and tone before publishing.",
    },
    {
      question: "How long does the rollout take?",
      answer:
        "A pilot on one section takes two weeks; a full launch with several locales starts at six weeks.",
    },
  ],
  tradeoffs: [
    {
      title: "Editorial team sets the plan",
      text: "The editorial team sets direction and tone, so the agent follows the content plan. Without it the agent produces lots of text on its own, and you cap the volume by hand.",
    },
    {
      title: "A person confirms the facts",
      text: "The agent double-checks numbers, names, and legal wording, and a person confirms them. That keeps a factual error under the editorial team's control.",
    },
    {
      title: "CMS components first",
      text: "Rigid markup breaks the layout, so we move templates into CMS components first. A component structure holds the markup together as pages are generated.",
    },
    {
      title: "Template support gets expensive",
      text: "The more locales and content types, the more expensive template support becomes. We fix the scope before the start so the estimate stays predictable.",
    },
  ],
  sections: [
    {
      title: "What changes for the editorial team",
      items: [
        "A page draft appears from the brief and catalog data: the editor starts from ready text and structure, not a blank field.",
        "Translations stop needing a rebuild: the agent moves blocks and links between locales, and the editor checks the wording.",
        "Meta tags and structured data are filled from a template, so a page does not ship with empty title and description.",
        "Publishing stays with a person: the agent proposes, the editor approves, and the log shows who changed what.",
      ],
    },
  ],
};
