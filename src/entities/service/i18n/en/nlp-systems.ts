export const nlp_systemsEn = {
  ctaBanner: {
    title: "Let's show metrics on your texts",
    text: "Send a labeled sample and typical examples. We'll show per-class accuracy and the errors before the project starts.",
    buttonLabel: "Request an estimate",
  },
  navTitle: "Natural language processing systems",
  title: "Building natural language processing systems",
  tagline: "We extract meaning from text: sentiment, entities, classification, and summarization.",
  description:
    "We build NLP systems on your texts: request classification, entity extraction, sentiment, and summarization. Models are trained and measured on a labeled sample.",
  features: [
    {
      title: "Request classification",
      text: "We route the stream by topic and priority instead of keywords.",
    },
    {
      title: "Entity extraction",
      text: "We pull dates, amounts, addresses, and part numbers out of text into structured fields.",
    },
    {
      title: "Sentiment with a threshold",
      text: "The model returns a probability, not a binary label, and the threshold is calibrated to the task.",
    },
    {
      title: "Summarization",
      text: "We compress long threads into a short brief that keeps the facts.",
    },
  ],
  techStack: [
    {
      subtitle: "Texts and models",
      description:
        "Texts are stored in [Elasticsearch], features and labels in [PostgreSQL], models train on [PyTorch], and inference runs on [vLLM].",
      technologies: [
        {
          id: "elasticsearch",
          name: "Elasticsearch",
          glossary:
            "Text search and storage: it finds similar requests and assembles a sample for labeling.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores labels and model probabilities: accuracy per class is computed from them.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "Trains and fine-tunes models on your texts, rare classes included.",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary:
            "Fast inference for generative tasks: summarization and parsing of long threads.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Text audit",
      text: "We inspect the corpus and frequencies: which classes exist, which are rare, and what is even distinguishable from text.",
      processType: "discovery",
    },
    {
      title: "Labeling schema",
      text: "We agree on class definitions and a labeling guide before the work starts.",
      processType: "system-design",
    },
    {
      title: "Training and evaluation",
      text: "We train on the labeled sample, compute per-class metrics, and review the errors.",
      processType: "implementation",
    },
    {
      title: "Embedding into the process",
      text: "We connect the model to the stream and add operator labeling of ambiguous cases.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A labeled sample exists",
      text: "A few hundred labeled examples per class give a starting point.",
      positive: true,
    },
    {
      title: "A uniform text stream",
      text: "Requests, reviews, or tickets are similar in structure: the model catches the pattern.",
      positive: true,
    },
    {
      title: "Absolute accuracy required",
      text: "Language is ambiguous: no model reaches 100% on real texts.",
      positive: false,
    },
    {
      title: "No class definitions",
      text: "Without agreed classes the labeling is contradictory, and the model learns noise.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Support requests",
      text: "The classifier routed requests by topic, and sentiment with a threshold separated ambiguous cases from clear ones.",
      metricValue: "82%",
      metricLabel: "topic classification accuracy",
    },
  ],
  faqItems: [
    {
      question: "How many examples are needed?",
      answer:
        "From a few hundred per class for typical topics; rare classes need more or a separate strategy.",
    },
    {
      question: "Who labels?",
      answer:
        "Your specialists by an agreed guide. We measure annotator agreement and resolve conflicts before training.",
    },
    {
      question: "What about new topics?",
      answer:
        "The classifier does not know a class it never saw. New topics go to a manual queue first, then to labeling.",
    },
    {
      question: "How is quality checked?",
      answer: "Metrics are computed on a held-out sample per class, not as a single average.",
    },
  ],
  tradeoffs: [
    {
      title: "Irony stays a weak spot",
      text: 'The model reads "Awful, how fast" as negative, so irony and sarcasm stay a weak spot. We label such cases by hand and add them as examples.',
    },
    {
      title: "New topics outpace labeling",
      text: "The classifier knows only the classes present in training, while new topics outpace labeling. We add new classes as examples accumulate.",
    },
    {
      title: "Moving to another domain",
      text: "A model trained on reviews loses accuracy on legal texts, so moving to another domain needs fine-tuning. The domain and the text style set the data requirements.",
    },
    {
      title: "Language shifts",
      text: "Slang and new product names require periodic labeling updates. Language shifts, and we refresh the class dictionary on a schedule.",
    },
  ],
  sections: [
    {
      title: "How the NLP system is built",
      items: [
        "Class definitions are agreed before labeling: if two specialists read a topic differently, the model learns a contradiction.",
        "Sentiment returns a probability and the threshold is calibrated: a binary label on ambiguous text always lies.",
        "Metrics are computed per class: an average hides the rare but important class the model misses.",
        "Summarization is checked against facts: a compression that drops an amount or a deadline is worse than no brief at all.",
      ],
    },
  ],
};
