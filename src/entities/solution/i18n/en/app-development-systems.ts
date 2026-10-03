export const app_development_systemsEn = {
  ctaBanner: {
    title: "We'll scope your application",
    text: "Tell us about platforms, load, and deadlines. We'll come back with architecture, team composition, and a staged release plan.",
    buttonLabel: "Get a plan",
  },
  navTitle: "App Development Systems",
  title: "Building Application Development Systems",
  tagline:
    "We build an AI development pipeline: agent workers, smart harnesses, and cost-efficient models.",
  description:
    "We build your own application development systems on top of leading agent harnesses – pi.dev, Hermes, and similar. The system writes code, runs checks, fixes errors, and delivers finished tasks under developer supervision.",
  features: [
    {
      title: "Leading agent harnesses",
      text: "We connect pi.dev, Hermes, and other top agent harnesses – the system works like an autonomous dev team: code, tests, review, and deploy.",
    },
    {
      title: "Smart cost-efficient model choice",
      text: "We pick the optimal models for each task: cheap fast models for routine, powerful ones for complex logic. Pay for results, not overpay.",
    },
    {
      title: "Integration with your stack",
      text: "We embed the system into your existing workflow: Git, CI/CD, code review, and task trackers – no team restructuring.",
    },
    {
      title: "Quality control and audit",
      text: "Every change passes automated checks and is recorded: you always see what the system did and why.",
    },
  ],
  processSteps: [
    {
      title: "Development audit",
      text: "We see where the team spends time: routine tasks, code review, builds, and reports. We estimate potential savings.",
    },
    {
      title: "Pilot on a real task",
      text: "We run the system on one project or sprint: it writes code, runs tests, and suggests fixes under developer control.",
    },
    {
      title: "Fit to your stack",
      text: "We embed into Git, CI/CD, and the task tracker. We choose models for the budget and task complexity.",
    },
    {
      title: "Handover to the team",
      text: "We train developers to work with the system and define review rules and ownership.",
    },
  ],
  fitItems: [
    {
      title: "Routine in development",
      text: "Template code, tests, migrations, and reports eat half a sprint.",
      positive: true,
    },
    {
      title: "Savings on hiring",
      text: "Workload grows faster than the hiring budget. The system covers part of the routine without adding headcount.",
      positive: true,
    },
    {
      title: "Unique legacy architecture",
      text: "Old code with undocumented dependencies and no tests. The system will stumble until we tidy the base.",
      positive: false,
    },
    {
      title: "Strict security requirements",
      text: "If dev data cannot leave the cloud and there is no self-hosted model infrastructure, implementation hits limits.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Faster routine tasks without losing control",
      text: "The system took routine jobs: updates, scripts, tests, and refactoring. A developer reviewed the result as with normal PR review. Manual routine stopped eating sprints.",
      metricValue: "2×",
      metricLabel: "faster routine tasks",
    },
  ],
  faqItems: [
    {
      question: "Will the system replace developers?",
      answer:
        "No. It removes routine, and the developer owns architecture, quality, and releases. The role shifts from writing code to managing and reviewing it.",
    },
    {
      question: "How big are the savings?",
      answer:
        "On typical tasks, speed at least doubles. On complex architectural work the gain is smaller: human decisions matter more there.",
    },
    {
      question: "Will it fit our stack?",
      answer:
        "We work with TypeScript, Python, Go, C#, and Java. Any language works if models and the build support it.",
    },
    {
      question: "What about code quality?",
      answer:
        "Code passes automated checks, tests, and developer review. Every change is recorded and can be rolled back.",
    },
  ],
  sections: [
    {
      title: "How the app factory works from the inside",
      items: [
        "A task enters the system from your task tracker, most often Jira, YouTrack, or Linear. It breaks the task into steps, writes the code, runs the tests, and opens a pull request on its own. You review the result the usual way, and the tracker updates itself on its own.",
        "Before the first sprint, the system reads your whole repository: code, documentation, conventions, and change history. In the first days it answers cautiously and asks for clarifications, that is normal. After a week of context, suggestions get sharper and you fix fewer outputs by hand. Context piles up once and serves for months.",
        "Every deliverable goes through an automated loop: linter, unit tests, build, and type checks. A failing test does not stop the work, the code goes back for a rework with the error log attached. The loop closes by itself, all you do is review the final diff and accept it. Some outputs fail on the first pass, that is part of the process.",
        "The system runs several agents in parallel, so a dozen routine tasks get finished in a day, not across a sprint. Load spreads the way it does between developers: queue, priorities, and deadlines stay under your control. One click on a priority, and the next agent picks exactly that task. Priorities change right in the tracker.",
        "You define what counts as done: tests, code style, coverage, and updated documentation. The system checks every item of the list and refuses to hand over work while something falls short. For financial logic we require a human review, internal utilities pass with automated checks, the bar is stricter on critical modules. The rules change any time you want.",
        "You watch the work through a dashboard: how many tasks sit in the queue, what share passed tests on the first attempt, and how many tokens a sprint consumed. These numbers show where the system burns effort for nothing and where to point it in the next cycle. Each sprint ends with a short report for planning.",
      ],
    },
    {
      title: "AI development economics: cost per task",
      items: [
        "A small task has no reason to pay for a strong model. The system routes requests: simple generation goes to fast and cheap models, complex logic to strong ones. A sprint costs about a third less than calling one expensive model for every situation. The price gap is enormous.",
        "An average routine task costs two or three dollars: generation, checks, and a couple of iterations. A hard refactor may spend tens of dollars, but those are the jobs you would not hand to a random outsourcing team anyway. The bill still stays below a junior's wage for the same manual work over four days.",
        "We show you the token breakdown: how much went to code, tests, explanations, and failed attempts. You see at once where the system burns the budget and clamp down on stages that produce nothing. An open bill, like a utility bill, but with limits you set yourself. Caps are set in under a minute.",
        "Similar tasks get solved fast because the system reuses past answers: results come from a cache instead of being recalculated every time. On a stable codebase the cache share reaches a third of all requests, so the bill grows more slowly than the volume of work. The effect shows on mass edits of a single module.",
        "The savings become obvious from the third month, when the system covers routine that used to keep a developer busy. Then you face two options: ship more with the same team or spend the freed hours on product work. The choice is yours, not the technology's. Both options lead to growth.",
        "The honest price includes tokens and more: monitoring, prompt tuning for your stack, and on-call duty sit on top. On two or three sprints per month the system will cost more than a junior developer. It pays off reliably from ten tasks a week, below that volume look for another tool.",
      ],
    },
    {
      title: "Factory limits: where to expect trouble",
      items: [
        'The system does not guess what you meant by "fix the interface". While requirements stay vague, the output matches the letter, not the spirit of the task. Spend twenty minutes clarifying it and the quality rises noticeably, that is the biggest lever you have. Clarification beats an hour of reruns.',
        "A new codebase means a cold start: for the first two weeks the system makes more mistakes and demands more edits. This is a normal context-building stage, put it in the plan. Start with easy tasks and push complex architecture closer to the middle of the project. A buffer in the plan removes the anxiety.",
        "Legacy without tests leaves the system blind: there is nothing to run, and the mistake surfaces later, on someone else's task. First we cover critical modules with tests, then we switch generation on. Otherwise the budget goes to waste and the order is not up for discussion. Tests give the only feedback, without them the system works blind.",
        "Architectural decisions with a dozen dependent services stay with a human for now. The system writes isolated modules confidently but slips where you must weigh trade-offs between teams. Keep it on self-contained tasks and do the integration between services yourself. Roles are easier to assign at the start.",
        "Critical paths where a mistake is expensive, payment flows for example, demand a close human eye. We switch off the autonomous mode on such paths and require approval for every step. Speed drops, but the risk of an unnoticed defect drops even harder. The trade-off is intentional, safety costs more than a single run here.",
        "The factory's success depends on how carefully your team writes task specifications. The skill turns into practice: you retrain developers, add task templates, and review the wording the way you review code. It is dull routine, but it is exactly what predicts the final result. Write down the spec recipe, new members of the team will thank you.",
      ],
    },
  ],
};
