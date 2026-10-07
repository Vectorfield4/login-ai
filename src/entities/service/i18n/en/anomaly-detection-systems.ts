export const anomaly_detection_systemsEn = {
  ctaBanner: {
    title: "Let's look at your stream",
    text: "Show us logs, transactions, or telemetry for a period. We'll say what can be treated as normal and size a pilot.",
    buttonLabel: "Request a pilot",
  },
  navTitle: "Anomaly detection systems",
  title: "Building anomaly detection systems",
  tagline:
    "The system catches atypical behavior in a stream, including failures outside the known list.",
  description:
    "We build anomaly detection over logs, transactions, and telemetry: we find deviations without pre-written rules and explain what exactly changed.",
  features: [
    {
      title: "No hand-written rules",
      text: "The system learns normal from history and spots a deviation no rule describes yet.",
    },
    {
      title: "Explained finding",
      text: "Each anomaly comes with the feature that went out of range and by how much.",
    },
    {
      title: "Fewer false alarms",
      text: "Threshold and seasonality are tuned so a nightly peak does not wake the on-call engineer.",
    },
    {
      title: "Alert to a channel",
      text: "The alert goes to the on-call channel with context and a link to the raw data.",
    },
  ],
  techStack: [
    {
      subtitle: "Stream and models",
      description:
        "The event stream runs through [Kafka], aggregates are computed in [ClickHouse], models train on [PyTorch], alerts are sent by [Grafana], and rules are stored in [PostgreSQL].",
      technologies: [
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: the log and transaction stream reaches the detector without losing order.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "Computes feature aggregates per window: normal and deviation are derived from them.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "Trains normal models: autoencoders and sequence models catch complex deviations.",
        },
        {
          id: "grafana",
          name: "Grafana",
          glossary:
            "Dashboard and alerts: the alert arrives in the on-call channel with a chart and context.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores thresholds, alert history, and triage notes: false alarms are visible from them.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Stream audit",
      text: "We review which events exist and at what rate: normal cannot be built from a sparse stream.",
      processType: "discovery",
    },
    {
      title: "Feature and normal schema",
      text: "We fix features, window, and seasonality, and agree on the allowable false-alarm rate.",
      processType: "system-design",
    },
    {
      title: "Training and thresholds",
      text: "We train the normal model and set the threshold from triage of pilot alerts.",
      processType: "implementation",
    },
    {
      title: "On-call and triage",
      text: "We connect alerts to the on-call channel and start triage: false alarms refine the threshold.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A steady event stream",
      text: "Logs, transactions, or telemetry flow continuously: normal is built from enough volume.",
      positive: true,
    },
    {
      title: "History exists for normal",
      text: "At least one full period is recorded, seasonal peaks included.",
      positive: true,
    },
    {
      title: "You need a deterministic rule",
      text: "If the decision must be explainable as a rule, a statistical model will not fit.",
      positive: false,
    },
    {
      title: "No on-call owner",
      text: "Without an on-call owner the system becomes noise that is soon ignored.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Fintech transactions",
      text: "The system marked atypical operations by feature deviation, and false alarms dropped as it was tuned.",
      metricValue: "3×",
      metricLabel: "fewer false alarms after tuning",
    },
  ],
  faqItems: [
    {
      question: "How is this better than threshold rules?",
      answer:
        "Rules describe known failures. The model catches a deviation from normal for which no rule is written yet.",
    },
    {
      question: "How explainable are the findings?",
      answer:
        "Each anomaly carries the feature and the magnitude of deviation. The model does not give the full cause but points where to look.",
    },
    {
      question: "What about false alarms?",
      answer:
        "The threshold is tuned in the pilot: for the first weeks we triage alerts with the on-call engineer and refine the boundary.",
    },
    {
      question: "Can it catch a targeted attack?",
      answer:
        "Detection catches deviations, not disguise. An attack that looks like normal needs other methods.",
    },
    {
      question: "How much history is needed to start?",
      answer:
        "Normal needs an observation period, usually several weeks, to account for seasonality and working hours. With no history we start from manual labeling and move the boundary to the model gradually.",
    },
    {
      question: "How does it fit the current monitoring?",
      answer:
        "We deliver alerts into your bus or messenger over a webhook, so the on-call engineer works in a familiar tool. Each event arrives with the deviating feature and raw data for triage.",
    },
    {
      question: "What to do with a found anomaly?",
      answer:
        "The on-call engineer triages the event from the attached data: it shows which feature crossed the boundary and by how much. Feedback from triage goes back into the model to refine the threshold.",
    },
    {
      question: "What if there are too many alerts?",
      answer:
        "We raise the threshold through triage: if the alert stream outpaces the team, the boundary gets stricter. Some findings go to a digest instead of an urgent channel.",
    },
  ],
  tradeoffs: [
    {
      title: "Threshold for new behavior",
      text: "New legitimate behavior patterns look anomalous at first, so the threshold is softened. The threshold returns to its working level once normal updates on new data.",
    },
    {
      title: "A cold start",
      text: "A cold start needs an observation period or manual labeling, so the system accumulates history over the first weeks. A cold start is the price of an accurate normal.",
    },
    {
      title: "Disguise as normal",
      text: "Detection catches deviations, so deliberate disguise as normal slips past. Such attacks are hunted with other methods, separately from statistics.",
    },
    {
      title: "The model needs upkeep",
      text: "A change in business or scale shifts normal, and it has to be recomputed. The model needs upkeep: normal is revisited on a schedule and after major changes.",
    },
  ],
  mechanism: [
    {
      title: "Normal is built from history",
      text: "Normal is built from history: seasonality, working hours, and holidays are folded into the model. A nightly peak lands inside the usual range, so the on-call engineer reacts only to a real deviation.",
    },
    {
      title: "Features are combined",
      text: "Features are combined into one score: the operation amount, a new device, and customer activity combine. A plain operation passes quietly, so an alert comes from a combination that steps outside the learned normal.",
    },
    {
      title: "Each finding is explained",
      text: "Each finding is explained: you see which feature crossed the boundary and by how much. Context travels with the anomaly, so the on-call engineer grasps the cause fast and decides what to do next.",
    },
    {
      title: "The alert carries the raw data",
      text: "The alert carries the raw data, so the on-call engineer triages the event in place. The deviating feature arrives with the raw event, and the response takes less time.",
    },
  ],
  deliverables: [
    {
      title: "A data and baseline audit",
      text: "A data and baseline audit shows which baseline to treat as normal and which features to combine into a score.",
    },
    {
      title: "A model and threshold",
      text: "We train the model on history and tune the threshold in the pilot, so false alarms stay rare and keep attention on real events.",
    },
    {
      title: "Alert integration",
      text: "Alert integration delivers events into your bus or messenger with the deviating feature, so the engineer triages them in place.",
    },
    {
      title: "A pilot with triage",
      text: "For the first weeks we triage alerts with your on-call engineer and refine the boundary before the system enters the process.",
    },
  ],
};
