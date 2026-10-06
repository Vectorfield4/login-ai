export const predictive_analytics_systemsEn = {
  ctaBanner: {
    title: "Let's check your data",
    text: "Show us the history of sales, churn, or failures. We'll estimate what is predictable and show the model error in money.",
    buttonLabel: "Request an estimate",
  },
  navTitle: "Predictive analytics systems",
  title: "Building predictive analytics systems",
  tagline: "The model forecasts demand, churn, and equipment failure ahead of time.",
  description:
    "We build predictive models on your data: demand, churn, and failure forecasts. We validate on history, measure the error, and embed the result into decisions.",
  features: [
    {
      title: "Forecast from history",
      text: "We validate the model on a past period, not on a random sample from the future.",
    },
    {
      title: "Error in money",
      text: "We translate model error into overstock, stockouts, and lost sales, not an abstract percentage.",
    },
    {
      title: "Signals from processes",
      text: "We gather signals from ERP, CRM, and logs, not just one report.",
    },
    {
      title: "Decision next to the forecast",
      text: "The forecast lands where the decision is made: a dashboard, a planning system, or a purchasing rule.",
    },
  ],
  techStack: [
    {
      subtitle: "Data and models",
      description:
        "Data is collected in [ClickHouse], features are computed in [Airflow], models train on [PyTorch] and [scikit-learn], and the result is stored in [PostgreSQL].",
      technologies: [
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "A columnar database for aggregates: it computes features over millions of events before training.",
        },
        {
          id: "airflow",
          name: "Airflow",
          glossary:
            "Pipeline orchestration: feature recomputation and training run on a schedule, not by hand.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "Neural model training: needed where the dependency is complex and a linear model will not describe it.",
        },
        {
          id: "scikit-learn",
          name: "scikit-learn",
          glossary:
            "Classic models and metrics: for tabular data it is often more accurate and faster than heavy networks.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores forecasts and model versions: it shows which model produced a number and on what data.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Data audit",
      text: "We review which signals exist and how far back they go: without history, no model is possible.",
      processType: "discovery",
    },
    {
      title: "Feature schema",
      text: "We fix features and the forecast horizon, and agree on the metric and allowable error.",
      processType: "system-design",
    },
    {
      title: "Training and validation",
      text: "We train on history, validate on a past period, and measure the error in business units.",
      processType: "implementation",
    },
    {
      title: "Embedding into the process",
      text: "We connect the forecast to a dashboard or planning system and add drift monitoring.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Event history exists",
      text: "Sales, churn, and failures are recorded over a sufficient period.",
      positive: true,
    },
    {
      title: "A recurring decision",
      text: "Purchasing, planning, or maintenance repeats: the forecast fits into the cycle.",
      positive: true,
    },
    {
      title: "Too little or one-off data",
      text: "Without history no model is possible, and only an expert forecast remains.",
      positive: false,
    },
    {
      title: "The process will not change",
      text: "A forecast without a process change brings no value even when it is accurate.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Demand forecast",
      text: "The model computed demand from sales history, and purchasing leveled out warehouse overstock.",
      metricValue: "−20%",
      metricLabel: "excess inventory",
    },
  ],
  faqItems: [
    {
      question: "How accurate will the forecast be?",
      answer:
        "It depends on the horizon and process stability. We show the error on historical validation before the start instead of promising a number.",
    },
    {
      question: "What if there is little data?",
      answer:
        "Then we build a simple model or rule and say honestly that deep learning will not pay off.",
    },
    {
      question: "Where does the forecast land?",
      answer:
        "In a dashboard, a planning system, or a purchasing rule, where the decision is made, not a separate report.",
    },
    {
      question: "Who watches quality?",
      answer:
        "Drift monitoring on the platform plus periodic retraining. This is ongoing work, not a one-off project.",
    },
    {
      question: "How do we validate the model before launch?",
      answer:
        "We split the history into training and a held-out set and measure error on periods the model never saw. We also show which features influence the forecast most, so the result can be explained to the business.",
    },
    {
      question: "What do we need from your team?",
      answer:
        "Access to historical data and the business rules: how you count overstock, stockouts, and lost sales. We bake that link into the quality metric, or the model optimizes the wrong thing.",
    },
    {
      question: "How does the forecast reach the process?",
      answer:
        "We wire the output into a dashboard, a planning system, or a purchasing rule over an API. We do not build a separate report nobody reads.",
    },
  ],
  tradeoffs: [
    {
      title: "A regime change is out of scope",
      text: "A new competitor or regulation breaks the learned dependency, and a forecast misses such a regime change. We track these shifts separately, outside the model.",
    },
    {
      title: "Data cleaning",
      text: "Duplicates and mismatched units distort the features, so data cleaning happens before training. Data cleaning is a required step, or the forecast leans on noise.",
    },
    {
      title: "The model goes stale",
      text: "Drift is monitored and the model retrained, so this is ongoing work. The model goes stale, and support is planned as a process.",
    },
    {
      title: "Accuracy and the horizon",
      text: "Long-range forecasts are weaker than short ones almost always. Accuracy depends on the horizon, and we name it honestly for each term.",
    },
  ],
  outcomes: [
    {
      title: "Purchasing on forecast",
      value: "Fewer leftovers",
      text: "Purchasing leans on the forecast, so overstock and stockouts shrink together. Last month stops being the only anchor.",
    },
    {
      title: "Failure before downtime",
      value: "Planned ahead",
      text: "Equipment failure is predicted from telemetry before downtime, and maintenance is planned ahead. The stop goes into a planned schedule.",
    },
    {
      title: "Churn from behavior",
      value: "Before the last call",
      text: "Customer churn shows in behavior changes, and retention kicks in before the last call. The signal comes earlier than the cancellation.",
    },
    {
      title: "Error in money",
      value: "In rubles",
      text: "Overstock, stockouts, and lost sales are counted in money. Model error is visible in the budget, so decisions rest on figures.",
    },
  ],
  mechanism: [
    {
      title: "Data into the model",
      text: "We gather sales history, telemetry, and churn events into one dataset. Here we clean duplicates and align units.",
    },
    {
      title: "Features and horizon",
      text: "From history we pull features: seasonality, promotions, line load, customer activity. The horizon sets how far ahead the forecast goes.",
    },
    {
      title: "Training and validation",
      text: "We split the history into training and a held-out set, train the model, and measure error on periods it never saw.",
    },
    {
      title: "Drift monitoring",
      text: "After launch we watch data drift and production metrics. When the distribution shifts, the model is retrained and compared with the previous version.",
    },
  ],
};
