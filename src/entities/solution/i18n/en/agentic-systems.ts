export const agentic_systemsEn = {
  ctaBanner: {
    title: "We'll build an agent on your process",
    text: "Pick an operation with clear rules, such as lead processing. We'll assemble an agent prototype and show the result on your data in two weeks.",
    buttonLabel: "Request a pilot",
  },
  navTitle: "Agentic Systems",
  title: "Business Process Modernization with Agentic Systems",
  tagline: "Automate routine operations and speed up decision-making with AI agents.",
  description:
    "Agentic systems are AI assistants that plan, execute, and control tasks on their own. We deploy them into your business processes so your team focuses on strategy instead of routine.",
  features: [
    {
      title: "Routine automation",
      text: "Agents handle lead processing, document filling and approvals – 24/7 without errors.",
    },
    {
      title: "CRM and ERP integration",
      text: "We connect agents to 1C, Bitrix24, amoCRM and other systems – data is always in one place.",
    },
    {
      title: "Smart employee assistants",
      text: "Internal assistants answer questions, prepare reports, and suggest next steps.",
    },
    {
      title: "Control and transparency",
      text: "Every agent action is logged: you always see what was done and why.",
    },
  ],
  processSteps: [
    {
      title: "Process audit",
      text: "We find operations suitable for automation: repetitive, with clear rules. We estimate volume and impact.",
    },
    {
      title: "Blueprint and prototype",
      text: "We show how an agent fits into your work: access rights, data, scenarios, and control points.",
    },
    {
      title: "Pilot in 2–4 weeks",
      text: "We run agents on a narrow area and measure quality, speed, and errors before scaling.",
    },
    {
      title: "Scaling",
      text: "We roll out to other processes and set up monitoring and ongoing support.",
    },
  ],
  fitItems: [
    {
      title: "Repetitive operations",
      text: "Requests, documents, approvals, and tickets that eat hours of your team's days.",
      positive: true,
    },
    {
      title: "Growth without hiring",
      text: "Workload grows, but a new role does not pay off. An agent covers the volume without expanding the team.",
      positive: true,
    },
    {
      title: "Processes without clear rules",
      text: "If decisions rely on gut feeling and employee experience, there is nothing to automate yet.",
      positive: false,
    },
    {
      title: "Fragmented systems",
      text: "Without proper CRM or ERP records, the base has to come first – otherwise the agent gets no data.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Store support without operators",
      text: "An AI agent handled chat and email requests, clarified details, and placed orders. Operators stayed for edge cases only. Average response time dropped, and tickets no longer needed manual work.",
      metricValue: "−38%",
      metricLabel: "average client response time",
    },
  ],
  faqItems: [
    {
      question: "How long does implementation take?",
      answer:
        "A pilot runs in 2–4 weeks on one process. After the result is confirmed, we scale to the remaining areas.",
    },
    {
      question: "Which systems do you connect?",
      answer:
        "1C, Bitrix24, amoCRM, Telegram, email, and most systems with an API. If a system has no API, we discuss integration options separately.",
    },
    {
      question: "What if an agent makes a mistake?",
      answer:
        "Every action is logged, and for financial or sensitive operations we add human approval. We catch errors in the pilot, before scaling.",
    },
    {
      question: "Do we need to change processes for AI?",
      answer:
        "No. The agent fits into your current processes and systems. Only the manual work your team no longer does changes.",
    },
  ],
  sections: [
    {
      title: "Measure agent rollout economics with real numbers",
      items: [
        "Count the cost of one operation before you start: the operator's salary, the time spent on each claim and the price of a mistake. For claim processing the figure usually lands between 120 and 450 rubles per unit depending on the industry. An agent cuts it three times over, while AI costs rarely exceed thirty rubles per operation.",
        "Measure payback in time, not in the number of automated tasks. A pilot on a process with two hundred claims a day pays for itself within a month of work; every operation handed to the agent after that adds savings with almost no extra spend. Fix the break-even date in advance and do not move it without a reason.",
        "Start with a process that has a steady volume and written rules: incoming claims, standard certificates and approvals. On such an area an agent reaches the quality of an experienced employee in two to three weeks of fine-tuning on your data. That is the shortest route to a first result and to the budget for the next areas.",
        "Do not chase full automation: leave eighty percent of typical cases to the agent and pass the complicated ones to people. That way you keep quality at the edges and do not burn three quarters of the budget on rare cases. Half the success is an honest dividing line between automation and people, proven on pilot data.",
        "Track the savings in numbers before and after: processing time, rework count, and the share of overdue approvals. Without measurements the effect feels like a gut feeling, while the owner decides on facts. Collect baseline metrics before the agent goes live, so you have something to compare and show later.",
        "Budget for support from the start: models need retraining, processes change, integrations need fixes. Fifteen percent of the implementation cost per year keeps the agent working reliably. Skipping support leads to a quiet drop in quality that you notice late, only when work starts failing.",
      ],
    },
    {
      title: "Integration, data quality and access rights",
      items: [
        "An agent needs access to your systems through APIs: read 1C, write to amoCRM, pull attachments from email. Setup takes days, not months, when vendors keep their interfaces open. Without obvious gaps in the data the agent never works properly, no matter how good the model is.",
        "Check that CRM records follow the rules: duplicate cards, empty fields, and free-form comments break an agent worse than no system at all. One week of cleaning directories and statuses saves months of future support, so start with order in the data instead of buying a new CRM.",
        "Start with one accounting system, not the whole data bus: the claim agent takes a card from CRM and a status from ERP. Syncing two systems delivers eighty percent of the effect without complex architecture and extra vendor negotiations. That is enough for claims and documents.",
        "Plan how the agent behaves when a system fails: timeout, retry, escalation to an operator. The queue must not hang unanswered, so failure scenarios matter more than speed on a normal day. Write them down before launch, not at the moment of the first error in production, when you have seconds to respond.",
        "Assign roles and rights before the agent goes live: it must not see personal data unrelated to the task. Role-based access and an operation log answer most security questions already at the pilot stage. The lawyer signs off on the policy once, not after every failure.",
        "Ask the vendor for an integration map and a data schema: who writes where, which fields are required, what happens on failure. With such a schema a two-week pilot becomes manageable instead of chaotic. Without it you collect the truth from logs, chats and calls, and that gets expensive.",
      ],
    },
    {
      title: "Control, logs and new roles for the team",
      items: [
        "Every agent action is logged, but logs on their own are useless: build a one-screen summary with the number of operations, errors and escalations. An operator reads such a report in five minutes a day. Show trends and deviations instead of raw records, and team meetings get shorter.",
        "For money operations keep human approval: the agent prepares the decision, an employee checks and clicks approve. Claims get a third faster while the risk of an unauthorized payment stays near zero. The control point takes an employee a minute, and the decision clears by the evening.",
        "An honest limit: an agent will not replace an expert in contentious cases where the decision depends on experience and context. The boundary between automatic and manual work is shown by accuracy numbers on your data, not by promises on a slide deck. You will see that boundary within a month on the pilot, and such a check does not cost much.",
        "Give your team a new role: handle the cases the agent passes over, retrain it on results and edit the scenarios. People manage quality instead of doing the routine over again. The team grows stronger instead of smaller, and hiring for repetitive tasks is no longer needed. Write the responsibilities down so disputes do not eat the project.",
        "Track the agent with standing metrics: the share of tasks solved without a person, the time from submission to closure, and the error share. The numbers from the first thirty days become the basis for the scaling decision. One leading indicator beats three in a report, and the team reviews it weekly.",
        "Do not switch off control after launch: models drift, directories go stale, new cases do not look like old ones. A review every month and retraining every quarter keep quality at the pilot level. A missed quarter rolls you six months back, and getting the level back is harder than keeping it.",
      ],
    },
  ],
};
