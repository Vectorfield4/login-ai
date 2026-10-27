export const aiForecastingEn = {
  ctaBanner: {
    title: "Let's check your history",
    text: "Send a sales history export and your SKU list: in two weeks we assemble the history audit and the first backtest on your sample.",
    buttonLabel: "Discuss the forecast",
  },
  navTitle: "AI forecasting",
  title: "AI demand and load forecasting",
  tagline:
    "We build demand, sales, and load forecasts on your history and validate them on a backtest.",
  description:
    "We build demand, sales, warehouse, and equipment load forecasts on your history. We backtest on past periods, measure error in units and money, and set up monitoring and retraining.",
  features: [
    {
      title: "A dataset for forecasting",
      text: "We assemble sales, stock, and promotion events into one dataset with a shared unit of measure and an event calendar. The model sees seasonality and discount effects in one series.",
    },
    {
      title: "Signals from data",
      text: "We collect seasonality, promotions, prices, stock, calendar, and line load. Airflow computes the features on a schedule, so the forecast refreshes with the data.",
    },
    {
      title: "Error before launch",
      text: "A backtest on past periods gives the error for each SKU category in units and money. You see where the forecast holds the plan and where stock needs a buffer.",
    },
    {
      title: "Monitoring and retraining",
      text: "We watch feature drift and production error. When the distribution shifts, we retrain the model and compare the new version with the previous one on the same backtest.",
    },
  ],
  techStack: [
    {
      subtitle: "Data and models",
      description:
        "We collect history in [ClickHouse], compute features in [Airflow], train models on [Python] and [PyTorch], and store forecasts and versions in [PostgreSQL].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "The pipeline language: it prepares data, trains the model, runs the backtest, and serves the forecast through an API.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "Neural network training for complex dependencies: promotions, campaigns, and demand spikes in new categories.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores forecasts, model versions, and backtest metrics: you can see which version produced a number.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "A columnar database for sales and event history: it aggregates millions of rows into features in minutes.",
        },
        {
          id: "airflow",
          name: "Airflow",
          glossary:
            "The pipeline orchestrator: feature recomputation, training, and backtest run on a schedule, and the result lands in PostgreSQL.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "History audit",
      text: "We review history depth, coverage, and quality: gaps, duplicates, changed units and source systems. We record which series can support training.",
      processType: "discovery",
    },
    {
      title: "Feature design",
      text: "We pick features and horizon: seasonality, promotions, prices, stock, and load. We agree on the error metric and the acceptable level by category.",
      processType: "system-design",
    },
    {
      title: "Model and backtest",
      text: "We train the model and test it on held-out periods. We measure error in units and money for each category.",
      processType: "integration",
    },
    {
      title: "Pilot and monitoring",
      text: "We run the forecast on part of the SKUs, add a dashboard and drift alerts. We expand the scope and enable scheduled retraining.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A year of history",
      text: "Sales or load records cover at least 12 months with enough detail by SKU and channel.",
      positive: true,
    },
    {
      title: "A forecast owner",
      text: "Someone in the company owns the purchasing or load plan and makes decisions from the forecast.",
      positive: true,
    },
    {
      title: "Zero history",
      text: "With zero history we start by collecting data or category analogs: an accurate forecast needs at least a year of sales.",
      positive: false,
    },
    {
      title: "A new product with no analogs",
      text: "For an item with no history and no analogs we forecast from expert rules or the launch plan, and the model starts after the first sales.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How accurate will the forecast be?",
      answer:
        "We name the error after the backtest: we compare the forecast with actuals over 6–12 months of history. The base scope gives MAPE 10–15% for stable categories and 15–25% for promo SKUs. We fix the exact figure in the contract after the audit.",
    },
    {
      question: "What horizon do you forecast?",
      answer:
        "The base horizon is 3 months with weekly detail. At 12 months the forecast gives a category plan, and weekly detail stays on the first quarter. You pick the horizon from your purchasing or shift planning cycle.",
    },
    {
      question: "What data do you need?",
      answer:
        "A sales export by SKU and day, stock, prices and promotions, and the delivery calendar. For load we add events, shifts, and equipment telemetry. We accept a CSV or a database export and discuss API access separately.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "A pilot on 500 SKUs takes 4-6 weeks: history audit, features, model, backtest, and dashboard. Expanding to the full assortment adds 2-3 weeks for data cleaning and metric sign-off.",
    },
  ],
  tradeoffs: [
    {
      title: "History quality",
      text: "History depth and cleanliness set the accuracy ceiling, so the audit takes the first week. We close gaps and unit changes during data preparation, and the model receives an even series.",
    },
    {
      title: "Horizon and accuracy",
      text: "Accuracy drops as the horizon grows, so we name a separate error for each term. At 3 months the model keeps weekly detail, at 12 months it gives a category plan.",
    },
    {
      title: "Retraining",
      text: "We retrain the model on a schedule and after the assortment changes, so support runs as a separate cycle. We compare each new version with the previous one on the same backtest.",
    },
  ],
  deliverables: [
    {
      title: "Dataset",
      text: "A ready dataset with features, cleaned history, and field descriptions: your analytics team repeats the collection and refresh.",
    },
    {
      title: "Model",
      text: "A trained model with code, configuration, and backtest: you see the error by category and can retrain the model on new data.",
    },
    {
      title: "Dashboard",
      text: "A dashboard with forecast, actuals, and error by SKU: the purchasing and load plan refreshes every week with the data.",
    },
  ],
  mechanism: [
    {
      title: "History",
      text: "We collect sales, stock, prices, and promotions into one dataset with a daily step. At this stage we align units and restore gaps, so the features compute on an even series. History depth sets the number of seasons the model can learn.",
    },
    {
      title: "Features and model",
      text: "From history we compute seasonality, promotions, price, stock, and line load, then train the model on Python and PyTorch. Airflow refreshes the features on a schedule, so next week's forecast builds on fresh data.",
    },
    {
      title: "Backtest and monitoring",
      text: "We split history into training and held-out periods and run a backtest: we compare the forecast with actuals and measure error in units and money. After the pilot the monitoring shows drift and fresh metrics in the dashboard, and retraining runs on a schedule.",
    },
  ],
  precedents: [
    {
      title: "500 SKUs in the base scope",
      text: "The base scope covers 500 SKUs, and each gets a demand forecast with weekly detail. At this volume the pilot checks the model and the dashboard in 4-6 weeks.",
      metricValue: "500",
      metricLabel: "500 SKUs in the base scope",
    },
    {
      title: "3 years of history",
      text: "Three years of history give three full seasonal cycles, and the model accounts for annual demand spikes. On such a series the backtest checks holidays and promotions from past years.",
      metricValue: "3 years",
      metricLabel: "3 years of history",
    },
    {
      title: "A 3 month horizon",
      text: "A 3 month horizon covers the purchasing and shift planning cycle, so the forecast lands in the weekly plan. For a longer plan the model returns a monthly breakdown for the year.",
      metricValue: "3 months",
      metricLabel: "A 3 month horizon",
    },
  ],
};
