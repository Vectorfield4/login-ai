export const llmEvaluationEn = {
  ctaBanner: {
    title: "We score your model live",
    text: "Send the model endpoint and your task list. We run the first golden-set pass and show the metrics for your domain.",
    buttonLabel: "Discuss the evaluation",
  },
  navTitle: "LLM quality evaluation",
  title: "LLM quality evaluation and red teaming",
  tagline: "We measure accuracy, faithfulness to sources, and model resilience on your tasks.",
  description:
    "We build a golden set from your tasks, run the model through an eval harness, and keep metrics under control in Langfuse. You see the hallucination rate, faithfulness to sources, and regressions between versions before release.",
  features: [
    {
      title: "A golden set from your tasks",
      text: "We assemble 150–300 reference examples with an answer and a source: the set reflects real phrasing, length, and edge cases in the domain.",
    },
    {
      title: "Hallucinations and faithfulness",
      text: "We label answers by fact and grounding: faithfulness shows the share of claims confirmed by a source, and the hallucination rate counts invented details.",
    },
    {
      title: "Red teaming",
      text: "We test the model with 200–400 adversarial prompts: injections, system-instruction overrides, context leaks, and harmful requests. Each scenario gets a verdict and a priority.",
    },
    {
      title: "Observability and regressions",
      text: "Every call lands in Langfuse with the prompt, context, cost, and score. A nightly run compares the new version with the baseline and blocks a release when metrics fall below the threshold.",
    },
  ],
  techStack: [
    {
      subtitle: "Evaluation bench and observability",
      description:
        "We build the bench on [Python], store traces and scores in [Langfuse], keep reference examples and run results in [PostgreSQL], send the job stream through [Kafka], and run the workers in [Kubernetes].",
      technologies: [
        {
          id: "langfuse",
          name: "Langfuse",
          glossary:
            "Call and score tracing: one place shows the prompt, context, judge answer, and the cost of a run.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "The language for the eval harness and judges: libraries for calling models, computing metrics, and running concurrent passes.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores the golden set, set versions, and run results: they drive version comparison and the report.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The job queue: a run splits into messages, workers pick them up and write the result back.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "Runs the evaluation and judge workers: load rises during a run and returns to baseline afterwards.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Task and metric audit",
      text: "We review the model tasks, context sources, and current checks. We fix 4–6 metrics, thresholds, and the way you make a release decision.",
      processType: "discovery",
    },
    {
      title: "Golden-set assembly",
      text: "A domain expert labels 150–300 examples: question, reference answer, required facts, and acceptable wording. The set lives in a repository with versions.",
      processType: "system-design",
    },
    {
      title: "Eval harness",
      text: "We write the bench in Python: model calls, a judge with a rubric, metric computation, and a report. A 300-example run takes 20–40 minutes on 4 workers.",
      processType: "integration",
    },
    {
      title: "Regressions and observability",
      text: "We connect Langfuse to production, compare every version with the baseline, and set a release threshold. The metric report arrives after every run.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A working version exists",
      text: "You have a working assistant on real tasks. The team is preparing a release and wants a quality measurement on a wider sample.",
      positive: true,
    },
    {
      title: "You have a domain expert",
      text: "A domain expert can label 150–300 examples and confirm reference answers: their labels set the bar for the judge.",
      positive: true,
    },
    {
      title: "No golden set",
      text: "Without a reference set, evaluation rests on team opinion, and version comparison loses its anchor. Start with the task audit.",
      positive: false,
    },
    {
      title: "A one-off test without regression",
      text: "A single pre-release run shows a snapshot, and the next version needs manual review again. You need a repeatable loop.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Which metrics do you compute?",
      answer:
        "Answer accuracy, faithfulness, hallucination rate, completeness, instruction following, and injection resilience. The set depends on the task: data extraction adds exact match and F1, dialogue adds a rubric score.",
    },
    {
      question: "How do you build the golden set?",
      answer:
        "We take real requests from logs and edge cases named by the expert. Each example gets a reference answer and a list of required facts, then the set goes through double labeling.",
    },
    {
      question: "What does red teaming cover?",
      answer:
        "200–400 adversarial prompts: context injections, role-change attempts, system-instruction leaks, and harmful or forbidden topics. Each scenario gets a verdict, a priority, and a fix recommendation.",
    },
    {
      question: "How long does the project take?",
      answer:
        "3–4 weeks for the base loop: audit and metrics in 3 days, golden set in 7–10 days, harness in a week, regressions and observability in 5 days. Red teaming adds 1–2 weeks.",
    },
  ],
  tradeoffs: [
    {
      title: "The cost of a golden set",
      text: "A golden set takes expert time: 150–300 labeled examples take 7–10 days. The investment returns through repeatable runs and version comparison.",
    },
    {
      title: "Judge-model limits",
      text: "A judge model errs on subtle wording, so the rubric sets anchors and examples. A sample of 30–50 answers goes to manual review.",
    },
    {
      title: "Regression discipline",
      text: "Regressions work when every run uses one golden-set version and one parameter set. Set versions are fixed in PostgreSQL together with the result.",
    },
  ],
  deliverables: [
    {
      title: "Golden set",
      text: "The golden set holds 150–300 labeled examples with reference answers, required facts, and a version in the repository.",
    },
    {
      title: "Eval harness",
      text: "The eval harness in Python runs the model, the judge, and metric computation on a schedule, writes results to PostgreSQL, and sends a report.",
    },
    {
      title: "Quality report",
      text: "The report shows metrics per task, the movement between versions, and a list of priority fixes for the next release.",
    },
  ],
  mechanism: [
    {
      title: "Golden set",
      text: "The golden set sets a shared baseline: every run uses the same 150–300 examples, so the new version's metrics compare with the base and show the real shift.",
    },
    {
      title: "Judge and metrics",
      text: "The judge model scores an answer against a rubric with anchors, and the script rolls scores into faithfulness, hallucination rate, and completeness. The rubric fixes the criteria, and every run gives the same count.",
    },
    {
      title: "Regressions and observability",
      text: "Regressions run nightly: the pass compares the new version with the baseline and publishes a report with the delta for each metric. Observability in Langfuse keeps production traces, so a quality drop shows on real traffic the same day.",
    },
  ],
  precedents: [
    {
      title: "Models in the base",
      text: "The base loop covers two models: the current one and the release candidate. Both run the same golden set and compare on identical metrics.",
      metricValue: "2",
      metricLabel: "Models in the base",
    },
    {
      title: "Test sets",
      text: "Three sets cover the main scenarios: data extraction, customer dialogue, and long-context work. Each set is stored separately with a version.",
      metricValue: "3",
      metricLabel: "Test sets",
    },
    {
      title: "Red teaming as a layer",
      text: "Red teaming plugs into the base loop as a separate layer. It adds 200–400 adversarial prompts and a report on resilience to injections and leaks.",
      metricValue: "Red teaming",
      metricLabel: "Red teaming as a layer",
    },
  ],
};
