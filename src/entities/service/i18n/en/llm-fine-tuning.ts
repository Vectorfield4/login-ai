export const llmFineTuningEn = {
  ctaBanner: {
    title: "Fine-tune an LLM on your sample",
    text: "Send 200–300 task examples and describe the behavior you need. We review the data, size the job, and name the metric that compares the base and tuned versions.",
    buttonLabel: "Discuss fine-tuning",
  },
  navTitle: "LLM fine-tuning",
  title: "LLM fine-tuning on your data",
  tagline:
    "We tune a 7B–70B model with LoRA, SFT, or DPO and show quality on a held-out set before launch.",
  description:
    "We prepare the dataset, train an adapter or a full model, and deploy it in your perimeter on vLLM. The metric is fixed before training, both versions run on one held-out set, and you get a report with numbers.",
  features: [
    {
      title: "Dataset preparation",
      text: "We assemble 1,000–50,000 instruction-response pairs, check the labels for consistency, and split the array into training and held-out parts.",
    },
    {
      title: "LoRA, SFT, and DPO",
      text: "We pick the method for the task: LoRA trains 0.1–1% of the weights, SFT sets the answer format, and DPO tunes the choice on preference pairs.",
    },
    {
      title: "Evaluation before and after",
      text: "The base and tuned models run on one held-out set: accuracy, format compliance, and answer completeness land side by side.",
    },
    {
      title: "Deployment in your perimeter",
      text: "The model runs on vLLM inside Kubernetes, weights live in MinIO, and metrics and versions stay in PostgreSQL.",
    },
  ],
  techStack: [
    {
      subtitle: "Training and serving",
      description:
        "Training runs on [PyTorch], inference on [vLLM], data and artifacts sit in [MinIO], metrics and versions in [PostgreSQL], and [Kubernetes] handles rollout and scaling.",
      technologies: [
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "The training framework: it holds gradients, mixed precision, and distributed runs across several GPUs, and exports the finished adapter to safetensors.",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary:
            "An inference server with PagedAttention and continuous batching: it holds 20–40 concurrent requests on one GPU and streams tokens back.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores adapter versions, run metrics, and experiment settings: a record shows which dataset and checkpoint produced the current quality.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "S3-compatible storage for datasets and weights: it stays inside your perimeter and supports object versioning plus presigned URL delivery.",
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          glossary:
            "The rollout layer: it deploys vLLM, assigns GPUs through the device plugin, restarts pods after a failure, and keeps replicas under load.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Dataset audit",
      text: "We review volume, labels, and topic coverage: count duplicates, check answer consistency, and find gaps in the examples.",
      processType: "discovery",
    },
    {
      title: "Method and model choice",
      text: "We pick a base model from 7B to 70B and a method: LoRA for a fast start, SFT for format, DPO for preferences. The metric and GPU budget are fixed here.",
      processType: "system-design",
    },
    {
      title: "Training",
      text: "We build the config, run jobs on 2–8 GPUs, watch loss and validation, save checkpoints, and compare versions against each other.",
      processType: "integration",
    },
    {
      title: "Evaluation and deployment",
      text: "We run the held-out set, compare against the base model, and bring vLLM up in Kubernetes. You get a report with metrics and a runbook.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "1,000+ examples",
      text: "You have 1,000 or more labeled instruction-response pairs for the target task: enough for LoRA and an honest held-out set.",
      positive: true,
    },
    {
      title: "A held-out set",
      text: "There are 200–500 examples that stay out of training: they show whether the skill transfers to new phrasing.",
      positive: true,
    },
    {
      title: "No data yet",
      text: "Without a corpus of examples, training collapses into paraphrasing the docs. Collect and label at least 1,000 pairs first.",
      positive: false,
    },
    {
      title: "New knowledge without RAG",
      text: "Fine-tuning changes style, format, and decisions on familiar topics. Fresh facts and closed documents come from RAG, where the model reads them from an index at request time.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How is fine-tuning different from RAG?",
      answer:
        "RAG puts fresh fragments into the context and answers from documents. Fine-tuning changes model behavior: style, format, and handling of typical tasks. Together they give indexed facts and a stable answer format.",
    },
    {
      question: "How much data does fine-tuning need?",
      answer:
        "LoRA needs 1,000–5,000 instruction-response pairs. SFT on 10,000–50,000 examples gives a stable format, and DPO needs 2,000–10,000 preference pairs. We size the exact volume after the dataset audit.",
    },
    {
      question: "How long does the project take?",
      answer:
        "4–6 weeks: the data audit takes 3–5 days, preparation and training 2–3 weeks, and evaluation plus deployment another 1–2 weeks. A 7B run on 4 GPUs takes 8–20 hours, and we plan 2–3 runs.",
    },
    {
      question: "Where does the model run after training?",
      answer:
        "In your perimeter: vLLM in Kubernetes, weights in MinIO, metrics in PostgreSQL. For an external contour, we build the same stack in your cloud and close network access.",
    },
  ],
  tradeoffs: [
    {
      title: "Data quality",
      text: "Data quality sets the result ceiling: 1,000 clean pairs beat 20,000 noisy ones. The audit takes 3–5 days and saves weeks of training.",
    },
    {
      title: "Catastrophic forgetting",
      text: "Catastrophic forgetting shows on a narrow task: the model loses part of its general skills. We mix the target examples with 5–10% general instructions and check both sets on held-out data.",
    },
    {
      title: "GPU cost",
      text: "We price the GPU cost before the start: 7B on LoRA fits 1–2 A100 40 GB cards, 70B on 8 cards. A 7B run takes 8–20 hours, and you pay for the rental as it runs.",
    },
  ],
  deliverables: [
    {
      title: "Dataset",
      text: "You get the labeled and cleaned dataset in JSONL: the training and held-out splits plus a data card that describes fields and labeling rules.",
    },
    {
      title: "Adapter or model",
      text: "We hand over the LoRA adapter or full weights in safetensors, the training config, and a script that reproduces the run on your infrastructure.",
    },
    {
      title: "Evaluation report",
      text: "The evaluation report holds metrics for the base and tuned model on one set, an error breakdown, and recommendations for the next cycle.",
    },
  ],
  mechanism: [
    {
      title: "Data preparation",
      text: "The dataset goes through cleaning and labeling: we drop duplicates, bring answers to one format, and split the array 90/10 into training and held-out parts. The held-out part stays sealed until the final evaluation.",
    },
    {
      title: "Training",
      text: "A training run goes on 2–8 GPUs: the model takes batches of 8–32 examples, the learning rate stays in the 1e-5 to 2e-4 range, and validation fires every 200 steps. Checkpoints land in MinIO, so any run can be reproduced.",
    },
    {
      title: "Evaluation and rollout",
      text: "Evaluation runs on the held-out set: we measure accuracy, format compliance, and the share of correct refusals, then compare the numbers with the base model. After sign-off, vLLM comes up in Kubernetes and traffic moves to the new version.",
    },
  ],
  precedents: [
    {
      title: "A 7B model in the base package",
      text: "The base 7B model after LoRA holds the target answer format and fits 1–2 A100 40 GB GPUs, so it can run in your perimeter around the clock.",
      metricValue: "7B",
      metricLabel: "A 7B model in the base package",
    },
    {
      title: "A 10 GB dataset",
      text: "10 GB of raw logs yields a dataset of 1,000–5,000 clean instruction-response pairs with a data card and a held-out part for evaluation.",
      metricValue: "10 GB",
      metricLabel: "A 10 GB dataset",
    },
    {
      title: "Eval before and after",
      text: "The evaluation layer compares the base and tuned versions on one set: accuracy, format, and answer cost show up in a single report.",
      metricValue: "eval",
      metricLabel: "Eval before and after",
    },
  ],
};
