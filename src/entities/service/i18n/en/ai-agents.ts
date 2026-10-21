export const aiAgentsEn = {
  ctaBanner: {
    title: "Let's review your scenario",
    text: "Send a process description and a list of systems. We'll build the task and tool map and estimate a six-week pilot.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI Agent Development",
  title: "AI agents for business: from pilot to production",
  tagline:
    "The agent runs a multi-step process across CRM, ERP, and the knowledge base: it calls APIs, keeps context, and hands risky steps to a person.",
  description:
    "We build a production agent for your process: it calls tools through the CRM, ERP, and warehouse APIs, keeps task context in memory, and passes an evaluation on 100–300 real tasks before launch. A person approves risky actions, and monitoring shows the cost per step, the step count, and tool errors.",
  features: [
    {
      title: "Action through an API",
      text: "The agent creates an order, files a task, and updates a card: every step goes through your system's API under a technical account's rights.",
    },
    {
      title: "Evaluation before launch",
      text: "Before production the agent runs 100–300 real tasks from your history: we measure step accuracy, cost, and the share of handoffs.",
    },
    {
      title: "Rights and approval",
      text: "Risky actions such as a refund or a status change wait for an employee's approval, and role rights limit access to data.",
    },
    {
      title: "Production monitoring",
      text: "Langfuse shows the cost per task, step count, latency, and tool errors: the team uses this data to fix prompts and scenarios.",
    },
  ],
  techStack: [
    {
      subtitle: "The agent stack",
      description:
        "The planner on [LangGraph] calls models through [OpenAI API], task state lives in [PostgreSQL], knowledge search runs through [pgvector], and [Langfuse] collects traces and scores.",
      technologies: [
        {
          id: "langgraph",
          name: "LangGraph",
          glossary:
            "A library for the agent's step graph: it sets the transitions between tool calls and the point where a person steps in.",
        },
        {
          id: "openai-api",
          name: "OpenAI API",
          glossary:
            "HTTP access to language models: the agent gets a reply, calls a function, and returns the result to its step graph.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "A relational database: it stores task state, the step log, and the reference data the agent checks against.",
        },
        {
          id: "pgvector",
          name: "pgvector",
          glossary:
            "A PostgreSQL extension for vector search: it finds knowledge-base fragments close to the query and passes them to the agent.",
        },
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Tracing and evaluation for LLM apps: it shows task steps, cost, latency, and quality scores for every run.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Task discovery",
      text: "We walk the process step by step: which tasks the agent takes, which systems it needs, and where an employee approves an action.",
    },
    {
      title: "System design",
      text: "We build the tool and permission map, prepare a set of 100–300 tasks with reference answers, and design the memory schema.",
    },
    {
      title: "Pilot agent",
      text: "We write the agent on LangGraph, connect the APIs and the knowledge base, run the task set, and fix scenarios from the errors.",
    },
    {
      title: "Evaluation and launch",
      text: "We compare answers with the reference, measure accuracy and cost per task, then move the agent to production with monitoring.",
    },
  ],
  fitItems: [
    {
      title: "A process with APIs",
      text: "Your CRM, ERP, or warehouse exposes data through an API: the agent reads statuses, creates records, and returns the result to the system.",
      positive: true,
    },
    {
      title: "An owner and real tasks",
      text: "The process has an owner and a history of 100–300 tasks: we measure accuracy on that history before launch.",
      positive: true,
    },
    {
      title: "A process without APIs",
      text: "Data lives in files and manual exports: the work starts with an integration or migration, then the agent.",
      positive: false,
    },
    {
      title: "Full autonomy over money",
      text: "Decisions on payments, refunds, and legal obligations stay with an employee; the agent prepares the data and a proposed action.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Where does the agent write results?",
      answer:
        "Into the systems where work happens: a CRM card, an ERP order, a tracker task. The agent writes every action through an API and leaves a record in the step log.",
    },
    {
      question: "How do you measure accuracy?",
      answer:
        "On a set of 100–300 real tasks with reference answers. We measure the share of correct steps, the share of tasks without edits, and the cost per task, and we hand over the report before launch.",
    },
    {
      question: "How long does the project take?",
      answer:
        "The pilot takes six weeks: process review, tool map, agent, and evaluation. A full launch with several systems and approvals takes 8–12 weeks.",
    },
    {
      question: "What if a system has no API?",
      answer:
        "We build the integration first: an export, an event bus, or a wrapper over the database. The agent connects once data moves through a stable channel.",
    },
  ],
  tradeoffs: [
    {
      title: "You need a process owner",
      text: "The owner sets the step rules and takes disputed cases. Their involvement speeds up the pilot and keeps the scenarios current.",
    },
    {
      title: "Integrations drive the timeline",
      text: "Every system adds access and field-mapping work. Three integrations stretch the launch, so we fix the system map at the start.",
    },
    {
      title: "Evaluation needs a task set",
      text: "Accuracy is measured on real tasks with reference answers. The owner provides 100–300 examples, and this set defines the quality bar.",
    },
  ],
  deliverables: [
    {
      title: "Task and tool map",
      text: "A list of tasks the agent takes, the available APIs, and the rights for each system. The map shows the pilot boundary and the scope of work.",
    },
    {
      title: "Pilot agent",
      text: "A working agent on LangGraph with tools, memory, and approval for risky steps. The code, configuration, and runbook go to your team.",
    },
    {
      title: "Task set and report",
      text: "A set of 100–300 tasks with reference answers and a report on accuracy, cost per task, and tool errors. The report is the fix plan after launch.",
    },
  ],
  mechanism: [
    {
      title: "Planner and tools",
      text: "The planner on LangGraph splits the task into steps and picks a tool: read an order, create a record, search the knowledge base. Every call returns a result to the graph, and the agent picks the next step from the fact.",
    },
    {
      title: "Memory and context",
      text: "Task context lives in PostgreSQL, and the agent finds regulation fragments and conversation history through pgvector. Memory holds the thread of the conversation and passes facts between steps, so the employee sees the full picture.",
    },
    {
      title: "Evaluation and approval",
      text: "A set of 100–300 tasks with reference answers shows step accuracy and launch cost. The agent sends risky actions to an employee for approval, and the step reaches the system after the reply.",
    },
  ],
  outcomes: [
    {
      title: "From pilot to production",
      value: "6 wks",
      text: "Six weeks cover the process review, the pilot agent, and an evaluation on your tasks; production starts with monitoring and a fix plan.",
    },
    {
      title: "Tasks in the evaluation set",
      value: "100–300",
      text: "That many real tasks with reference answers the agent runs before launch. The set defines the accuracy bar and the base for repeat runs.",
    },
    {
      title: "Gartner forecast for 2028",
      value: "33%",
      text: "Gartner expects agentic functions in 33% of enterprise applications by 2028 (Gartner, 2024).",
    },
  ],
};
