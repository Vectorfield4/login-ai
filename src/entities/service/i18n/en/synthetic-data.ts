export const syntheticDataEn = {
  ctaBanner: {
    title: "Let's start with your sample",
    text: "Send a real sample and a target metric. We will say which rows the generator needs and what the holdout will show after training.",
    buttonLabel: "Discuss the data",
  },
  navTitle: "Synthetic data",
  title: "Synthetic data for model training",
  tagline: "The generator adds rare cases, and the model is checked on real data.",
  description:
    "We build synthetic data generators for model training: rare classes, privacy, augmentation, and validation against a real holdout.",
  features: [
    {
      title: "Rare-case generation",
      text: "We build rare classes and borderline combinations by rule: the generator adds cases your dataset holds in single digits and keeps the links between features.",
    },
    {
      title: "Privacy inside the perimeter",
      text: "We de-identify records and train the generator in a closed environment: source rows stay in local storage, and only synthetic rows leave.",
    },
    {
      title: "Validation on a real holdout",
      text: "We keep 10-15% of real rows aside and measure precision, recall, and rare-class share: the report shows the synthetic contribution per class.",
    },
    {
      title: "Dataset augmentation",
      text: "We add synthetic rows to the real set: we balance classes, add gaps and noise, and preserve field types and business rules.",
    },
  ],
  techStack: [
    {
      subtitle: "Generation and storage",
      description:
        "We write generators in [Python], train on [PyTorch], store rows and metadata in [PostgreSQL], keep artifacts in [MinIO], and run and scale jobs on [Kubernetes].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "The language for generators, validation, and glue: statistics and ML libraries give one reproducible pipeline across the stack.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "Generative model training: managed layers and autograd help fit the distribution to rare classes and tabular features.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores metadata, schemas, and the run log: it shows which generator and which rules produced a given row set.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "Local object storage for datasets and artifacts: source and synthetic rows stay inside your perimeter.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "Runs generation and validation: jobs scale with row count, and the pipeline repeats on the same cluster.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Data audit",
      text: "We inspect real rows, rare classes, and privacy limits: we count distributions, gaps, and links between fields.",
      processType: "discovery",
    },
    {
      title: "Generator design",
      text: "We pick the generator model and mixing rules: we fix the field schema, types, and target holdout metrics.",
      processType: "system-design",
    },
    {
      title: "Generation and validation",
      text: "We generate the set, compare distributions, and measure precision and recall on held-out real rows.",
      processType: "integration",
    },
    {
      title: "Pilot and handover",
      text: "We run the generator in your environment, hand over the config and report, and train your team to repeat the cycle.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Rare classes",
      text: "Your dataset has hundreds of rows and you need thousands: the generator adds rare cases and balances classes.",
      positive: true,
    },
    {
      title: "A real holdout exists",
      text: "You have 10-15% of held-out rows for checks: synthetic quality is confirmed on live data.",
      positive: true,
    },
    {
      title: "No real rows at all",
      text: "The generator leans on real distributions: you need a starter sample of at least a few hundred rows.",
      positive: false,
    },
    {
      title: "Regulated decisions without validation",
      text: "Credit and medical decisions need a holdout and a responsible sign-off: synthetic data without a check does not fit here.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Why use synthetic data when real data exists?",
      answer:
        "Synthetic data covers rare classes and private scenarios: a rare defect may have ten real rows, and the generator produces thousands of consistent examples. Training mixes both sets.",
    },
    {
      question: "How do you protect privacy?",
      answer:
        "We de-identify records, train the generator in a closed environment, and test recovery attacks. Source rows stay in local storage, and synthetic rows pass a closeness check against real records.",
    },
    {
      question: "What formats do you deliver?",
      answer:
        "Tables come as CSV and Parquet, text as JSONL, images as PNG with JSON labels. We fix the field schema and types in the generator contract.",
    },
    {
      question: "How long does the launch take?",
      answer:
        "A pilot takes two to four weeks: data audit, generator design, generation, and a holdout check. Config handover and team training are part of the term.",
    },
  ],
  tradeoffs: [
    {
      title: "Synthetic fidelity",
      text: "Synthetic rows follow the real distribution to within 2-3% on key features, and rare combinations need separate calibration for every new product.",
    },
    {
      title: "Pseudonymization and reconstruction checks",
      text: "We pseudonymize rows with k-anonymity and test reconstruction attacks: this adds two weeks to the launch, and the generator runs on your hardware.",
    },
    {
      title: "Validation on a real holdout",
      text: "Validation runs on a real holdout: the model trains on synthetic rows, and you confirm the metric on the held-out 10-15% of real rows.",
    },
  ],
  deliverables: [
    {
      title: "A generator",
      text: "A generator with a config, mixing rules, and launch scripts: you reproduce the set with one command and change parameters for a new product.",
    },
    {
      title: "A synthetic dataset",
      text: "A synthetic dataset in tabular format with field descriptions, limits, and links: 10,000 rows start training, and the volume grows with your task.",
    },
    {
      title: "A validation report",
      text: "A validation report with holdout metrics: precision, recall, and a confusion matrix per class, plus a side-by-side with training on the source sample.",
    },
  ],
  mechanism: [
    {
      title: "Fitting to real data",
      text: "We fit the generator to real data: we count distributions, correlations, and rare combinations in your sample, then fix the feature schema and the validation rules.",
    },
    {
      title: "Rare-case generation",
      text: "The generator creates rare classes by set rules: it mixes features, adds noise, and builds combinations that appear fewer than a hundred times in the source sample while keeping field links intact.",
    },
    {
      title: "A check on a real holdout",
      text: "We check every generated set on a real holdout: we count precision and recall per rare class, compare distributions, and deliver a report with metrics before and after the synthetic rows.",
    },
  ],
  precedents: [
    {
      title: "Rows in the base set",
      text: "The starter set holds 10,000 tabular rows, so the model sees rare feature combinations before you collect more real cases.",
      metricValue: "10,000",
      metricLabel: "Rows in the base set",
    },
    {
      title: "Tables as the base modality",
      text: "Tables cover the starter scenario: the generator builds rows with features, types, and gaps, then scales to text and images.",
      metricValue: "tables",
      metricLabel: "Tables as the base modality",
    },
    {
      title: "Privacy review on request",
      text: "A privacy review adds a recovery-attack test and a data-flow map, and your security team signs off before the first generated batch.",
      metricValue: "privacy review",
      metricLabel: "Privacy review on request",
    },
  ],
};
