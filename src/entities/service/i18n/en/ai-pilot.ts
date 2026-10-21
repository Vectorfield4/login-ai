export const aiPilotEn = {
  ctaBanner: {
    title: "Test the scenario on your data",
    text: "Send the process description and access to two sources: on the call we choose the metric, build an eight-week pilot plan, and fix the launch criterion.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI pilot",
  title: "AI pilot: a scenario test on your data",
  tagline:
    "We build a working prototype of one AI scenario in 6–10 weeks and hand over the metrics for a launch decision.",
  description:
    "A pilot answers one question: does the scenario deliver an effect on your data. In eight weeks you get a prototype, a before-and-after measurement, an economics report, and a scale recommendation.",
  features: [
    {
      title: "One scenario",
      text: "We take a process with a clear owner and a measurable result. The pilot covers one scenario, one data loop, and up to six integrations so the team reaches the measurement inside eight weeks.",
    },
    {
      title: "Metrics before the start",
      text: "In week one we record the baseline: time per operation, processing cost, error rate, and the volume of manual work. The same metrics become the acceptance test for the prototype.",
    },
    {
      title: "Data and access",
      text: "We check two sources, the access rights, and the record quality. When the data is thin, we add manual labeling for 300–500 examples and record the assumptions in the report.",
    },
    {
      title: "Launch decision",
      text: "At the end you get a recommendation: scale the scenario, rework the loop, or close the hypothesis. The decision rests on the measurement, the economics, and the risk list. The demo shows the numbers and the next step.",
    },
  ],
  processSteps: [
    {
      title: "Framing",
      text: "We meet the process owner and record the goal, the boundary, and the metric. The output is one page with the hypothesis and the success criterion.",
      processType: "discovery",
    },
    {
      title: "Data",
      text: "We collect exports from two sources, check completeness and access rights. We mark the gaps and decide which examples we add by hand.",
      processType: "analysis",
    },
    {
      title: "Build",
      text: "We assemble the prototype in your environment or in our cloud. We connect up to six integrations and set up an action log for review.",
      processType: "system-design",
    },
    {
      title: "Measurement",
      text: "We run the scenario on historical data and on the live stream. We compare the result with the baseline and prepare the report for the decision.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A process owner exists",
      text: "The process has a manager who owns the metric and can assign two specialists for interviews and acceptance.",
      positive: true,
    },
    {
      title: "Data in two systems",
      text: "The records already live in a CRM, an ERP, or a task database. Read access saves two weeks of approvals and lowers the preparation cost.",
      positive: true,
    },
    {
      title: "The team is shipping a release",
      text: "A pilot needs three to four hours per week from the process owner and an analyst. With a tight schedule, the start moves to the next quarter.",
      positive: false,
    },
    {
      title: "The budget is already committed",
      text: "A RUB 700,000 project is easier to approve as a separate line. When the budget is closed, start with a readiness audit and return to the pilot.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "What does a pilot cost?",
      answer:
        "The base price is RUB 700,000 for one scenario and one data loop. Each integration adds RUB 80,000, an additional scenario adds RUB 150,000 and two weeks, and extended data preparation adds RUB 120,000.",
    },
    {
      question: "How long does it take?",
      answer:
        "The standard timeline is eight weeks. A six-week option fits ready data, while ten weeks cover two loops and access approvals.",
    },
    {
      question: "Who works on the client side?",
      answer:
        "A process owner, an analyst, and a data engineer. Together with our team they run interviews, check the exports, and accept the result at the demo.",
    },
    {
      question: "What do we need to start?",
      answer:
        "A process description, access to two sources, and the owner's contact. On the call we settle the metric and the integration scope, then fix the estimate.",
    },
    {
      question: "What happens after the pilot?",
      answer:
        "You receive the report, the prototype, and a scale plan. Your team can move the loop to internal development or run the rollout as a separate project.",
    },
  ],
  tradeoffs: [
    {
      title: "One scenario",
      text: "The pilot tests one scenario and one data loop. A second scenario needs a separate build, a new measurement, and its own estimate.",
    },
    {
      title: "Timeline and budget",
      text: "The 6–10 week timeline depends on export readiness and the number of approvals. Every week of delay on the client side moves the demo and the final report.",
    },
    {
      title: "Data access",
      text: "Access to the sources sets the start speed. A two-week export delay moves the prototype build and the measurement date.",
    },
  ],
  deliverables: [
    {
      title: "Pilot report",
      text: "The report holds the hypothesis, the baseline, the measurement result, and the economics. Assumptions and limits sit next to every number.",
    },
    {
      title: "Working prototype",
      text: "The prototype runs the chosen scenario on your data and writes an action log. The code and the deployment guide go to your team.",
    },
    {
      title: "Metrics pack",
      text: "The pack includes a dashboard with four metrics, the calculation method, and a control plan for the launch. It shows how the scenario behaves in daily work.",
    },
  ],
  mechanism: [
    {
      title: "Pilot loop",
      text: "We build the loop from your sources, the model, and a verification layer. The loop runs on historical data, then on the live stream, and the log records every step for review.",
    },
    {
      title: "Metrics",
      text: "The metrics are fixed before the prototype build: the baseline and the target. After the launch we compare the operation time, the cost, the error rate, and the manual work on one sample.",
    },
    {
      title: "Decision",
      text: "The team puts the measurement, the economics, and the risks into one table. At the demo you see the scenario in action, the numbers, and the recommended next step, then decide on scaling.",
    },
  ],
  outcomes: [
    {
      title: "One scenario",
      value: "1",
      text: "The pilot takes one scenario to a working prototype. The report shows the loop boundary and the integration list that came with the delivery.",
    },
    {
      title: "Four metrics",
      value: "4",
      text: "Four metrics: operation time, cost, error rate, and manual work. The comparison runs on your data in the same loop.",
    },
    {
      title: "Eight weeks",
      value: "8 wk",
      text: "The standard pilot runs eight weeks from the kickoff to the demo. The calendar covers the build, the measurement, and the report.",
    },
  ],
};
