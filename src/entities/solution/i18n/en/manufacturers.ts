export const manufacturersEn = {
  navTitle: "Solutions for manufacturers",
  title: "AI solutions for manufacturing",
  tagline: "We automate requests, documents, and quality control on the production floor.",
  description:
    "We bring AI agents and computer vision to manufacturing: automating requests, documents, and approvals, and putting quality control on the line.",
  ctaBanner: {
    title: "Let's run a pilot on your section",
    text: "Describe a process with clear rules and a stable request volume. We'll launch a pilot in two to four weeks.",
    buttonLabel: "Request a pilot",
  },
  audiences: ["audiences.manufacturers"],
  tags: ["technologies.computerVision", "technologies.agentic"],
  features: [
    {
      title: "Routine automation",
      text: "Agents take over requests, documents, and approvals and work without breaks between shifts.",
    },
    {
      title: "ERP and CRM integration",
      text: "We connect the agent to 1C, CRM, and accounting systems so the data stays in one loop.",
    },
    {
      title: "Quality control on the line",
      text: "Computer vision rejects clear defects and sends borderline cases to an operator.",
    },
    {
      title: "Assistant for the team",
      text: "An internal assistant answers policy questions and prepares document drafts.",
    },
    {
      title: "Transparent actions",
      text: "Every agent action is logged: you see what was done and on what basis.",
    },
    {
      title: "Pilot before scaling",
      text: "We launch on one process, measure the share of operations closed without a person, and only then expand.",
    },
  ],
  processSteps: [
    {
      title: "Process audit",
      text: "We break down requests and rules: which tasks are described, where the volume is stable, and what pays off first.",
      processType: "discovery",
    },
    {
      title: "Data and integration schema",
      text: "We fix access to the systems and the roles, and agree on the boundary between automation and manual control.",
      processType: "prototyping",
    },
    {
      title: "Agent build",
      text: "We connect the agent to the systems, train it on your data, and set up the log and confirmations.",
      processType: "integration",
    },
    {
      title: "Pilot and scaling",
      text: "A pilot on one process with clear metrics, then a rollout to the next sections.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Repeating operations",
      text: "Requests, documents, and approvals that eat up employees' hours.",
      positive: true,
    },
    {
      title: "Growth without hiring",
      text: "The volume grows but a new position does not pay off: the agent covers the flow without expanding the team.",
      positive: true,
    },
    {
      title: "Processes without rules",
      text: "If decisions depend on an employee's experience and are not described, there is nothing to automate.",
      positive: false,
    },
    {
      title: "Disconnected systems",
      text: "Without clean accounting in CRM and ERP the agent has nowhere to get data: put the data in order first.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Online-store support",
      text: "The agent handled chat and email, clarified details, and placed orders; operators stayed for non-standard cases.",
      metricValue: "−38%",
      metricLabel: "average customer response time",
    },
  ],
  faqItems: [
    {
      question: "How long does the rollout take?",
      answer:
        "A pilot on one process takes two to four weeks. After the result is confirmed, we move to the next sections.",
    },
    {
      question: "Which systems do you integrate with?",
      answer:
        "1C, CRM, Telegram, email, and most systems with an API. If there is no API, we discuss the integration method separately.",
    },
    {
      question: "What if the agent makes a mistake?",
      answer:
        "Actions are logged, and operations with money require human confirmation. We catch errors in the pilot, before scaling.",
    },
    {
      question: "Do we need to change our processes?",
      answer:
        "The agent fits into the current processes and systems; only the manual work of employees changes.",
    },
  ],
  sections: [
    {
      title: "What we count before the start",
      items: [
        "We count the cost of one operation before launch: employee time, the price of a mistake, and the request volume. For order processing this is usually 120–450 rubles per item, depending on the industry.",
        "We count payback in time, not in the number of tasks. A pilot on a process with 200 requests a day pays off in a month, and each next operation the agent closes with almost no added cost.",
        "We start with a process where the volume is stable and the rules are described: incoming requests, typical clarifications, and approvals. On such a section the agent reaches the level of an experienced employee in two to three weeks.",
        "We do not promise full automation: the agent takes 80% of typical cases and complex ones go to a person. An honest boundary between machine and human is cheaper than trying to close everything.",
        "We fix the pilot metrics in advance: the share of operations without a person, response time, and the number of errors. Without these numbers a conversation about results stays an opinion.",
        "We confirm the saving on your data, not on industry averages: the figure for your section is computed from the actual requests and the hourly cost.",
      ],
    },
    {
      title: "Integration, data quality, and rights",
      items: [
        "The agent needs API access to the systems: read 1C, write to CRM, fetch attachments from email. With open interfaces the setup takes days.",
        "We check that CRM records follow the rules: duplicate cards and empty fields break the agent more than a missing system. A week of cleaning reference data saves months of support.",
        "We start with one accounting system, not the whole data chain: for requests the agent needs a CRM card and an ERP status. Linking two systems gives 80% of the effect.",
        "We describe failure behavior: timeout, retry, escalation to an operator. The queue must not hang without an answer, so emergency scenarios matter more than speed on a normal day.",
        "Roles and rights are set before the start: the agent does not see personal data unrelated to the task. Access separation and the operation log close most security questions.",
        "We agree on the external loop and personal data in advance: what goes to the provider and what stays inside. This is fixed in a policy, not decided along the way.",
      ],
    },
    {
      title: "Control, log, and new roles",
      items: [
        "Every agent action is logged, but the raw records are useless: we build a summary on one screen with operations, errors, and escalations. An operator reads the report in five minutes a day.",
        "For operations with money we keep human confirmation: the agent prepares a decision, an employee checks and approves it. Requests speed up by a third, and the risk of an unauthorized payment stays close to zero.",
        "An honest limitation: in disputed cases where the decision depends on experience and context, the agent yields to an expert. The boundary between machine and human is shown by accuracy figures on your data.",
        "Employees get a new role: review the cases passed to the agent, train it on the results, and fix the scenarios. The team is strengthened, and hiring for routine tasks becomes unnecessary.",
        "We fix responsibility in writing: who owns the process, who decides disputed cases, and who is responsible for labeling quality. That way questions are resolved without disputes.",
        "We include team training in the launch: employees must understand where the agent errs and how to stop the automation. Without this the pilot stays a black box.",
      ],
    },
    {
      title: "Support and evolution",
      items: [
        "After the pilot we fix an SLA: incident response time, the window for scenario updates, and the escalation path. This protects the automation from a silent failure, when the agent stops answering and nobody notices.",
        "We watch quality on the live flow: the share of operations without a person, the number of escalations, and accuracy on a control sample. The metrics go into one dashboard, not scattered reports.",
        "We retrain the model on new cases once a quarter: we collect disputed examples, label them, and update the scenarios. Without this, accuracy slowly drops on new request types. We label disputed cases together with your specialists, so the model learns from the right examples.",
        "We count the cost of ownership up front: inference, data storage, and support hours. For an average section this starts at ten thousand rubles a month, and the figure does not grow with volume.",
        "We route process changes through a policy: a new request or rule first lands in a draft scenario, passes a test on the staging stand, and only then reaches the live flow.",
        "We train the team on real examples: we show where the agent errs and how to stop it. That way support stops depending on one engineer and moves to your team. After the launch we hand over the scenario and log documentation, so support does not break when an engineer changes.",
      ],
    },
  ],
};
