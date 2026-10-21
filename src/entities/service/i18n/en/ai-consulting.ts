export const aiConsultingEn = {
  ctaBanner: {
    title: "Let's review your processes",
    text: "Send the system list and process owners: on the call we pick three scenarios and assess the data for a pilot.",
    buttonLabel: "Discuss consulting",
  },
  navTitle: "AI consulting",
  title: "AI consulting: strategy and roadmap",
  tagline: "We pick three scenarios with a return and assemble a six-month implementation plan.",
  description:
    "We interview process owners, model the economics of each scenario, and hand over a roadmap. It shows what to implement first, which data is available, and the budget for the first stage.",
  features: [
    {
      title: "Process map",
      text: "We collect 12–15 processes from sales, operations, and support into one map. Each process gets an owner, frequency, volume, and the systems involved.",
    },
    {
      title: "Scenario shortlist",
      text: "We score scenarios by impact, data complexity, and time to launch. The shortlist holds three scenarios that produce a measurable result in the first six months.",
    },
    {
      title: "Economics",
      text: "We calculate the baseline process cost in hours and money, the automation effect, and payback. Each scenario gets a range with its assumptions.",
    },
    {
      title: "Roadmap",
      text: "We split implementation into stages with dependencies, team, and budget. The plan accounts for data availability and the order of integrations.",
    },
  ],
  processSteps: [
    {
      title: "Interviews",
      text: "We talk to process owners and department heads. We record current steps, bottlenecks, and the metrics that define the effect.",
      processType: "discovery",
    },
    {
      title: "Data and systems",
      text: "We review which data exists for each process and which systems hold it. We mark sources, access, and gaps that affect the scenario choice.",
      processType: "analysis",
    },
    {
      title: "Scoring",
      text: "We put impact, cost, data, and risk into one table. We rank the scenarios and test the assumptions with the team.",
      processType: "system-design",
    },
    {
      title: "Plan review",
      text: "We present the roadmap to the sponsor and budget owners. We fix the first stage, the metrics, and the team.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A sponsor exists",
      text: "The initiative has a C-level leader or business owner who decides on budget and priorities.",
      positive: true,
    },
    {
      title: "12+ processes",
      text: "The company has described its core processes or is ready to do so. On that base the map and scoring take 3–4 weeks.",
      positive: true,
    },
    {
      title: "A working pilot first",
      text: "When the task is to launch a model within a month, we start with a readiness audit and a pilot, and build the strategy alongside.",
      positive: false,
    },
    {
      title: "No access to owners",
      text: "Interviews with process owners provide half of the input. Without them the map stays at the level of hypotheses.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How much does consulting cost?",
      answer:
        "The base program starts at RUB 300,000 and covers interviews, the process map, scoring, and the roadmap. The number of systems and workshops affects the timeline and the final estimate.",
    },
    {
      question: "How long does it take?",
      answer:
        "Three to four weeks for 12 processes and three workshops. The timeline grows by a week at 30+ processes or several legal entities.",
    },
    {
      question: "What do we get?",
      answer:
        "A process map, a scenario table with impact and cost, a six-month roadmap, and a presentation for the sponsor.",
    },
    {
      question: "Do you implement after consulting?",
      answer:
        "Yes, we run the pilot and implementation as a separate project. The decision stays with you: the plan can go to an internal team or another contractor.",
    },
  ],
  tradeoffs: [
    {
      title: "The sponsor decides",
      text: "Scoring gives priorities and numbers, and the scenario choice stays with the sponsor. We show the price and risk of each option so the decision rests on facts.",
    },
    {
      title: "Source data quality",
      text: "Scenario economics rests on process data. With incomplete exports we calculate from interviews and record the assumptions in the plan.",
    },
    {
      title: "Strategy and pilot",
      text: "Strategy ends with a plan and a sponsor review. We price the pilot, integrations, and support as a separate project with its own estimate.",
    },
  ],
  deliverables: [
    {
      title: "Process map",
      text: "The map lists processes, owners, systems, and metrics. It shows where the work happens and which data a scenario needs.",
    },
    {
      title: "Business case",
      text: "The business case shows impact, cost, and payback for three scenarios. Assumptions and ranges sit next to the numbers.",
    },
    {
      title: "Roadmap",
      text: "The roadmap splits the first stage into six months with a team, budget, and dependencies. Every step has a result and a metric.",
    },
  ],
  mechanism: [
    {
      title: "Interviews",
      text: "We interview process owners and record steps, volumes, and metrics in one map. The map shows where work takes the most time and which systems participate in each step.",
    },
    {
      title: "Scoring",
      text: "Scoring puts impact, cost, data readiness, and risk into one table. The ranking shows three scenarios with the best impact-to-complexity ratio, and a workshop tests the assumptions.",
    },
    {
      title: "Roadmap",
      text: "The roadmap turns the chosen scenarios into stages with dependencies, team, and budget. The first stage runs six months, and every step has a metric the sponsor uses to decide.",
    },
  ],
  outcomes: [
    {
      title: "12 processes",
      value: "12",
      text: "The base map covers 12 processes from sales, operations, and support. Each one shows an owner, volume, and systems.",
    },
    {
      title: "3 scenarios",
      value: "3",
      text: "The shortlist holds three scenarios with impact and cost estimates. The sponsor picks the first by numbers, effect, and risk.",
    },
    {
      title: "6 months",
      value: "6 mo",
      text: "The roadmap covers the first stage over six months. The plan includes the team, budget, dependencies, and control metrics.",
    },
  ],
};
