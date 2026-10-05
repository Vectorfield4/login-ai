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
  sections: [
    {
      title: "What changes for the team",
      items: [
        "Tasks no longer fall out of threads: the agent files a ticket while the problem is fresh and attaches the conversation and files. The team does not rebuild context a day later.",
        "Standups get shorter: statuses come from events, not memory. The meeting discusses decisions instead of moving cards between columns.",
        "Duplicates stop piling up: the agent links similar requests to an already open task. Tracker load drops, and finding the right ticket takes seconds.",
        "Estimates get more honest: the agent proposes a priority and estimate from closed tasks, and the gap against reality shows on a chart, not at quarter end.",
      ],
    },
    {
      title: "Where the integration will not work",
      items: [
        "If transition rules are not described, the agent repeats the mess: it follows the same scheme as the team, gaps included.",
        "The agent does not replace planning. It removes routine around tasks, while sprint priorities stay with the team.",
        "With dozens of projects and different workflows, maintenance grows: each status set needs its own mapping, so we fix the scope before the start.",
        "If the tracker cannot be connected via API, the integration is limited to email triage, which is the worst mode: people move tasks by hand again.",
      ],
    },
  ],
};
