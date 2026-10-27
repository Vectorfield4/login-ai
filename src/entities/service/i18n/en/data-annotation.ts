export const dataAnnotationEn = {
  ctaBanner: {
    title: "Labeling for your dataset",
    text: "Send a sample and a draft taxonomy. We'll build the labeling plan, size a 1–2 week pilot, and quote the work for your volume.",
    buttonLabel: "Discuss labeling",
  },
  navTitle: "Data labeling",
  title: "AI data labeling",
  tagline:
    "We prepare labeled text, images, audio, and video against agreed rules with two review passes.",
  description:
    "We label datasets for model training and evaluation: we write the guidelines and taxonomy, label four modalities, resolve annotator answers through consensus, and hand over a QA report per class.",
  features: [
    {
      title: "Guidelines and taxonomy",
      text: "We build the class tree, definitions, and borderline examples. Guidelines fix what counts as a label and cut the spread between annotators.",
    },
    {
      title: "Four modalities",
      text: "Text, images, audio, and video run through one pipeline: each modality gets its own tool, shared acceptance rules, and a decision log.",
    },
    {
      title: "QA and consensus",
      text: "Every tenth item gets a second pass. We resolve disagreements into consensus and compute agreement per class, then keep it in the report.",
    },
    {
      title: "RLHF and preference pairs",
      text: "We collect answer pairs for RLHF: an annotator picks the better option against a rubric, and disputed pairs go to an expert for arbitration.",
    },
  ],
  techStack: [
    {
      subtitle: "Labeling pipeline",
      description:
        "We write validation and metric scripts in [Python], store tasks and statuses in [PostgreSQL], keep dataset files in [MinIO], run the job queue through [Kafka], and hold batch progress in [Redis].",
      technologies: [
        {
          id: "python",
          name: "Python",
          glossary:
            "We write validation, agreement scoring, and dataset export: the scripts check the schema and catch broken files before handover.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "It stores tasks, statuses, and edit history: the log shows who changed a label and when, and agreement is computed from it.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "It stores images, audio, and video next to the labels: the dataset stays reproducible, and access runs through signed links.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "It passes jobs between annotator queues and the quality service: the buffer holds the batch pace under peak load.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "It caches progress and task locks: the annotator sees the current status, and one item is issued to a single worker.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Taxonomy audit",
      text: "We review the current classes, examples, and borderline cases. We check that each class has a definition and an observable signal.",
      processType: "discovery",
    },
    {
      title: "Guidelines and pilot batch",
      text: "We write the instruction with examples and label a pilot of 200–500 items. We measure agreement and fix ambiguous spots before the stream starts.",
      processType: "system-design",
    },
    {
      title: "Labeling pipeline",
      text: "We set up queues, roles, and acceptance. Batches run on schedule, progress shows in a dashboard, and each label keeps its author and version.",
      processType: "integration",
    },
    {
      title: "QA and handover",
      text: "We run the sample through two passes, resolve disagreements, and assemble the report. We hand over the dataset in the agreed format along with the guidelines.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "+ 10,000 items",
      text: "A volume of 10,000 items or more pays for the guidelines and pipeline setup: batches run as a stream, and quality rests on the sample.",
      positive: true,
    },
    {
      title: "A domain expert on hand",
      text: "An expert sets the labeling reference: the other annotators and QA use their decisions.",
      positive: true,
    },
    {
      title: "No taxonomy",
      text: "Without a class tree and definitions, labeling drifts: the audit and guidelines come first, then the batches.",
      positive: false,
    },
    {
      title: "PII without a policy",
      text: "Personal data needs a retention and anonymization policy: until you agree on it, batches with PII stay on hold.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How do you control labeling quality?",
      answer:
        "Every tenth item gets a second pass, we resolve disagreements into consensus, and we compute agreement per class. We fix the acceptance threshold in the guidelines before the batch starts.",
    },
    {
      question: "Can you label under an NDA and on our own infrastructure?",
      answer:
        "Yes. We sign an NDA, work in your cloud or on an on-prem deployment, grant file access by role, and keep the action log on your side.",
    },
    {
      question: "Which modalities do you label?",
      answer:
        "Text, images, audio, and video. Each modality has its own tool and acceptance rules, while the taxonomy and QA stay shared.",
    },
    {
      question: "How long does a pilot take?",
      answer:
        "The pilot runs 1–2 weeks: a taxonomy audit, the guidelines, and a batch of 200–500 items with an agreement measurement. After the pilot we quote the timeline for the full volume.",
    },
  ],
  tradeoffs: [
    {
      title: "The quality of the guidelines",
      text: "The quality of the guidelines sets the label spread: precise definitions and examples raise agreement and cut fixes at acceptance.",
    },
    {
      title: "Expert availability",
      text: "Expert availability sets the arbitration speed: borderline cases wait for the expert decision, so the expert schedule sits in the batch plan.",
    },
    {
      title: "The PII policy",
      text: "The PII policy defines the workflow: we agree on anonymization and retention before the start, and that adds a step to batch preparation.",
    },
  ],
  deliverables: [
    {
      title: "Guidelines and taxonomy",
      text: "We hand over the taxonomy, class definitions, borderline examples, and an acceptance rubric. The document records its version and is the reference for annotators.",
    },
    {
      title: "A labeled pilot batch",
      text: "We deliver 200–500 items with labels, versions, and a decision log. The pilot batch shows agreement on real data before scaling.",
    },
    {
      title: "A QA report",
      text: "We assemble a report on agreement, disagreements, and class coverage. The QA report shows where the rules hold and which classes need more work.",
    },
  ],
  mechanism: [
    {
      title: "Data intake",
      text: "We accept files in batches, check the format and completeness, route them into queues, and assign an owner to each batch. At intake we filter broken files and duplicates, so the annotator receives a clean set.",
    },
    {
      title: "Labeling",
      text: "Annotators label against the guidelines and rubric, leave a comment on a borderline case, and pass the item to a second pass. Each label keeps its author, time, and instruction version, so the decision history can be restored.",
    },
    {
      title: "QA and consensus",
      text: "A second annotator reviews the sample, disagreements go to expert arbitration, and the final label is fixed through consensus. We compute the agreement metric per class and return disputed definitions to the guidelines.",
    },
  ],
  precedents: [
    {
      title: "10,000 items in the base",
      text: "The base batch covers 10,000 items and gives enough examples for training and a measurement on a held-out split.",
      metricValue: "10,000",
      metricLabel: "10,000 items in the base",
    },
    {
      title: "Text as the base modality",
      text: "The text modality goes first: text acceptance takes one QA pass, and the taxonomy template carries over to images, audio, and video.",
      metricValue: "text",
      metricLabel: "Text as the base modality",
    },
    {
      title: "Two QA passes",
      text: "Two QA passes give agreement per class and show which definitions are worth tightening before scaling.",
      metricValue: "2",
      metricLabel: "Two QA passes",
    },
  ],
};
