export const information_monitoringEn = {
  ctaBanner: {
    title: "We'll set up monitoring for your topics",
    text: "Name your sources and queries. We'll show a demo dashboard with mentions, sentiment, and dynamics on your data.",
    buttonLabel: "Request a demo",
  },
  navTitle: "Information Monitoring",
  title: "Custom Data Collection and Monitoring",
  tagline: "Parsing, price, competitor, and mention monitoring – the right data at the right time.",
  description:
    "We collect information from open sources: websites, marketplaces, social media, and press. We set up regular monitoring with reports and alerts so you always know what's happening in the market.",
  features: [
    {
      title: "Data parsing",
      text: "Collecting data from websites and marketplaces by custom rules: catalogs, prices, specs, reviews.",
    },
    {
      title: "Competitor monitoring",
      text: "We track competitors' prices, promotions, assortment, and content – changes are captured automatically.",
    },
    {
      title: "Media & social monitoring",
      text: "Brand and topic mentions in news, Telegram, VK, and reviews – with sentiment and sources.",
    },
    {
      title: "Reports and alerts",
      text: "Regular digests, alerts on important changes, and data export to Excel, API, or your CRM.",
    },
  ],
  processSteps: [
    {
      title: "Define the task",
      text: "We fix which data you need: sources, fields, frequency, and delivery format.",
    },
    {
      title: "Build the parser",
      text: "We set up collection for volume, layout changes, and source limits. We build for your stack or deploy a ready one.",
    },
    {
      title: "Test and validation",
      text: "We compare collected data against a control sample. We make sure no numbers are lost or duplicated.",
    },
    {
      title: "Production monitoring",
      text: "We run on schedule, add alerts and reports. We update collection when sources change layout.",
    },
  ],
  fitItems: [
    {
      title: "Market prices and assortment",
      text: "You need to know competitors' prices today, not in a month. Regular parsing gives fresh data and saves manual work.",
      positive: true,
    },
    {
      title: "Mentions and reputation",
      text: "Your brand is discussed across platforms and press. Sentiment monitoring shows where to reply.",
      positive: true,
    },
    {
      title: "A one-off data pull",
      text: "For a single export of a hundred rows, manual work is cheaper than engineering. We estimate which makes sense.",
      positive: false,
    },
    {
      title: "Closed or unstable sources",
      text: "If data is behind a login or the structure changes daily, collection gets expensive and needs support.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Daily competitor price monitoring",
      text: "A parser collected competitor prices and availability into a daily report. Managers stopped double-checking by hand and reacted to the market faster.",
      metricValue: "−80%",
      metricLabel: "time spent on manual price checks",
    },
  ],
  faqItems: [
    {
      question: "Is parsing legal?",
      answer:
        "We collect only open data and respect source terms. For closed data we discuss alternatives and verify the legal side before starting.",
    },
    {
      question: "Which sources are supported?",
      answer:
        "Websites, marketplaces, social media, press, Telegram, and open APIs. Any source with readable HTML or an API can be parsed.",
    },
    {
      question: "How often is data updated?",
      answer:
        "From once an hour to once a day per your spec. We fix the schedule and volumes so collection keeps up with source changes.",
    },
    {
      question: "What do we get at first launch?",
      answer:
        "A working collection, a control check of the data, and configured reports or alerts. Then we support and extend it.",
    },
  ],
  mechanism: [
    {
      title: "We verify a control sample by hand",
      text: "We verify a control sample by hand at the start: fifty catalog and report records. If a number in the parser differs from the source, we find the cause before decisions about pricing are made on that data.",
    },
    {
      title: "Collection records the date and time",
      text: "Collection records the date and time of every export. When a price changes, you see the moment of change, not just the current value, and that separates working monitoring from a simple page screenshot.",
    },
    {
      title: "We fix the data schema",
      text: "We fix the data schema: SKU, manufacturer, price, availability, rating. Fields missing from a supplier page are marked separately, so an empty cell never becomes “out of stock”.",
    },
    {
      title: "A source failure is not masked",
      text: "A source failure is not masked as “data collected”. If a site returns an error, an alert reaches you within an hour instead of appearing in Friday's report looking plausible.",
    },
    {
      title: "We track layout versions automatically",
      text: "We track layout versions automatically. When a store redesigns its catalog page, collection updates within a day and the price history is not interrupted by an outdated selector.",
    },
    {
      title: "We clarify the legal side before starting",
      text: "We clarify the legal side before starting: which sources may be used and under what terms. Then no abrupt letter from a source lands asking you to stop collecting.",
    },
  ],
  sections: [
    {
      title: "Where the collected data goes",
      items: [
        "A report in Excel or Google Sheets is built on schedule: you open fresh numbers on Monday morning instead of spending two hours walking five catalogs by hand.",
        "Alerts fire on events: a competitor price dropped ten percent, a product ran out, a new competitor appeared. A Telegram notification arrives at the moment of change, and you react the same day.",
        "We load data into your CRM or ERP over an API so it enters working processes without intermediate spreadsheets. The integration is tested on a small volume so a format error does not flood the database.",
        "A digest for colleagues who do not have system access is built separately from raw data. The summary shows only what is needed for a decision and does not sink in a thousand rows of source output.",
        "We keep history for three months and longer so a trend is visible, not just a point. Seasonal swings stop looking like a sudden drop or surge in your purchasing department.",
        "If you need data once, we estimate both options: manual collection versus parsing. For an export of a hundred rows, manual work is often cheaper than parser support, and we say so honestly before you commit.",
      ],
    },
  ],
};
