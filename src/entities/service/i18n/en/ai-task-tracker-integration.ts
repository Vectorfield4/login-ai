export const ai_task_tracker_integrationEn = {
  ctaBanner: {
    title: "Let's build an agent for your tracker",
    text: "Give us access to a test board or send the workflow. We'll show auto-created tasks on your requests in two weeks.",
    buttonLabel: "Request a pilot",
  },
  navTitle: "AI + task-tracker integration",
  title: "Integrating AI agents with a task tracker",
  tagline:
    "The agent creates, updates, and links tasks in Jira, YouTrack, or Asana as work happens.",
  description:
    "We connect AI agents to your task tracker: tasks appear from dialogs and incidents, statuses update automatically, and irreversible changes are confirmed by a person.",
  features: [
    {
      title: "Tasks from a request",
      text: "The agent turns a message or incident into a ticket with context, a source link, and a proposed priority.",
    },
    {
      title: "Statuses without manual entry",
      text: "Stage transitions are recorded from CI events, logs, and threads, not moved by hand.",
    },
    {
      title: "Links and duplicates",
      text: "The agent merges and links similar tickets so one problem does not live in three cards.",
    },
    {
      title: "Estimate from history",
      text: "The agent proposes an estimate and assignee from similar closed tasks; the final call stays with a person.",
    },
  ],
  techStack: [
    {
      subtitle: "Tracker and event flow",
      description:
        "The agent works with [Jira], [YouTrack], and [Asana] through their APIs. Changes arrive by webhook through [Kafka], and task history is stored in [PostgreSQL].",
      technologies: [
        {
          id: "jira",
          name: "Jira",
          glossary:
            "A tracker with a rich REST API and webhooks: the agent creates tasks, reads transitions, and listens to status changes.",
        },
        {
          id: "youtrack",
          name: "YouTrack",
          glossary:
            "A flexible tracker with custom workflows: the agent's status mapping matches your transition scheme.",
        },
        {
          id: "asana",
          name: "Asana",
          glossary:
            "Task management with an API: the agent runs cards and sections without breaking the team's views.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: CI runs, logs, and ticket changes converge into one stream without polling the tracker.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores the status mapping and the agent action log: you see which task it created or moved, and why.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Process audit",
      text: "We review the board, statuses, and transition rules: where tasks appear, who files them, and what breaks on handoff.",
      processType: "discovery",
    },
    {
      title: "Status schema",
      text: "We fix the mapping of events to transitions and block irreversible actions without confirmation.",
      processType: "system-design",
    },
    {
      title: "Agent integration",
      text: "We connect to the API and webhooks and build scenarios for creating, updating, and linking tasks.",
      processType: "integration",
    },
    {
      title: "Pilot on one queue",
      text: "Two weeks on the real flow: we measure tasks filed without a person and the number of edits after the agent.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A dedicated tracker with an API",
      text: "Jira, YouTrack, or Asana offer an API and webhooks: the agent connects with no workarounds.",
      positive: true,
    },
    {
      title: "Transition rules defined",
      text: "There is a status list with conditions: the agent follows it instead of inventing its own.",
      positive: true,
    },
    {
      title: "Tasks live in email",
      text: "If tickets live in threads, we move the process into the tracker first.",
      positive: false,
    },
    {
      title: "Irreversible transitions on autopilot",
      text: "The agent does not close epics or delete tasks on its own.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Platform development",
      text: "The agent filed tasks from support requests and updated statuses from CI events; manual filing stayed only for large features.",
      metricValue: "−35%",
      metricLabel: "time spent filing and moving tasks",
    },
  ],
  faqItems: [
    {
      question: "Does the agent file tasks itself?",
      answer:
        "Yes, if it has create rights. Filing is reversible, so it does not need human confirmation on every step.",
    },
    {
      question: "Who closes tasks?",
      answer:
        "A person or a CI event by project rules. The agent closes only those clearly tied to a successful run.",
    },
    {
      question: "What about non-standard tickets?",
      answer:
        "They go to a manual triage queue with a note and a reason instead of dissolving into the general list.",
    },
    {
      question: "How long does the rollout take?",
      answer:
        "A pilot on one queue takes two weeks; a full launch with several projects starts at five weeks.",
    },
    {
      question: "Can the tracker connect to other systems?",
      answer:
        "Yes, events arrive from CI, email, and messengers, and the agent merges them into one stream and files tasks in the tracker. External systems need no shared bus, just a webhook.",
    },
    {
      question: "What does the pilot report show?",
      answer:
        "How many tasks were filed without a person, how many edits were needed, and on which types the agent erred. Few edits mean we widen the queue; many mean we add rules.",
    },
  ],
  tradeoffs: [
    {
      title: "The team defines transition rules",
      text: "The agent follows the same transition scheme as the team, so the team defines the statuses. Where the rules stay silent, the agent repeats the mess.",
    },
    {
      title: "Planning stays with the team",
      text: "The agent removes routine around tasks, while the team plans sprint priorities. Planning stays with people, and the agent takes the busywork off their plate.",
    },
    {
      title: "Support grows with the project count",
      text: "With dozens of projects, support time grows: each status set needs its own mapping. We fix the support scope before the start so the load stays planned.",
    },
    {
      title: "Tracker connection over API",
      text: "Without an API the integration is limited to email triage, and a person moves tasks by hand again. A tracker webhook gives the normal mode and removes manual moves.",
    },
  ],
  outcomes: [
    {
      title: "Tasks survive the thread",
      value: "A ticket in minutes",
      text: "The agent files a ticket while the problem is fresh and attaches the conversation and files. Tasks from threads reach the tracker.",
    },
    {
      title: "Shorter standups",
      value: "Statuses from events",
      text: "Statuses come from events, so the meeting discusses decisions while the agent moves the cards. Standups get shorter.",
    },
    {
      title: "Duplicates get linked",
      value: "One ticket",
      text: "The agent links similar requests to an already open task. Duplicates get linked, tracker load drops, and finding the right ticket takes seconds.",
    },
    {
      title: "Honest estimates",
      value: "History-based forecast",
      text: "The agent proposes a priority and an estimate from closed tasks, and the gap against reality shows on a chart. Estimates get more honest.",
    },
  ],
};
