export const computer_vision_systemsEn = {
  ctaBanner: {
    title: "Let's assess your line",
    text: "Send a video of the section and the defect list. We'll say which are visible to a camera and size a pilot on one station.",
    buttonLabel: "Request an assessment",
  },
  navTitle: "Computer vision systems",
  title: "Building computer vision systems",
  tagline: "Cameras find the defect before an operator, and borderline cases go to a person.",
  description:
    "We build computer vision for quality control: camera and lighting selection, model labeling and training, line integration, and manual review of borderline cases.",
  features: [
    {
      title: "Camera and lighting selection",
      text: "Capture matters more than the model: we size geometry, lighting, and line speed for the task.",
    },
    {
      title: "Labeling and training",
      text: "We build the dataset, train the model, and measure accuracy on a held-out split, not the training one.",
    },
    {
      title: "Manual review",
      text: "Borderline cases go to an operator, and their decisions return to the labeling set.",
    },
    {
      title: "Line integration",
      text: "The result stops the line, writes to MES, or stays in a log, following the production rules.",
    },
  ],
  techStack: [
    {
      subtitle: "Capture and inference",
      description:
        "Models train on [PyTorch], line inference runs through [TensorRT], frames and labels are stored in [MinIO], and the decision log lives in [PostgreSQL].",
      technologies: [
        {
          id: "pytorch",
          name: "PyTorch",
          glossary:
            "Vision model training: it adapts to non-standard tasks and rare defect classes.",
        },
        {
          id: "tensorrt",
          name: "TensorRT",
          glossary:
            "Accelerated GPU inference: it cuts latency to tens of milliseconds so the decision lands before the next item.",
        },
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "Stores frames and labels locally: the dataset never leaves the perimeter and stays reproducible.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "The decision and operator-confirmation log: accuracy is computed from it, and every frame has a trace.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Line audit",
      text: "We inspect the product, defects, and conveyor speed: which defects a camera can distinguish at all.",
      processType: "discovery",
    },
    {
      title: "Capture scheme",
      text: "We select cameras, lighting, and angle, and fix accuracy and miss-rate requirements.",
      processType: "system-design",
    },
    {
      title: "Model training",
      text: "We build and label the dataset, train, and measure accuracy on a held-out split.",
      processType: "implementation",
    },
    {
      title: "Launch and retraining",
      text: "We deploy inference on the line and close the loop: operator decisions return to the labeling set.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A visible defect",
      text: "Chips, cracks, and incomplete assembly are visible in a photo: a camera handles them.",
      positive: true,
    },
    {
      title: "Stable lighting and angle",
      text: "Capture is controlled: the model does not retrain on random shadows.",
      positive: true,
    },
    {
      title: "A defect with no optical difference",
      text: "A scratch under paint or an internal defect is invisible to a camera and needs other sensors.",
      positive: false,
    },
    {
      title: "No reference labeling",
      text: "Without an agreed defect definition, the model has no correct answer to learn from.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "A packaging line",
      text: "The camera rejected clear defects, and borderline decisions went to an operator and back into labeling.",
      metricValue: "96%",
      metricLabel: "of defects caught without an operator",
    },
  ],
  faqItems: [
    {
      question: "How much data is needed to train?",
      answer:
        "It depends on the defect: a common one needs a few hundred labeled frames, a rare one thousands, including rare classes.",
    },
    {
      question: "Who labels the defects?",
      answer:
        "A process engineer or operator labels with an agreed defect definition. We resolve disagreements before training, not after.",
    },
    {
      question: "What about accuracy on new defects?",
      answer:
        "A new defect type is a new dataset. The model will not guess it, so the retraining loop is built in from the start.",
    },
    {
      question: "How long does a pilot take?",
      answer:
        "A pilot on one station starts at four weeks: capture, dataset, training, and measurements on the live line.",
    },
    {
      question: "Can it run on several stations?",
      answer:
        "Yes, one capture scheme copies to identical stations. We build it once, then move the cameras and switch thresholds.",
    },
    {
      question: "What changes for the operators?",
      answer:
        "The operator stops checking every item and reviews only borderline frames. Their decisions return to labeling, so the load drops but does not disappear.",
    },
  ],
  tradeoffs: [
    {
      title: "Borderline cases stay with a person",
      text: "Borderline cases stay forever: stains and blurred edges are resolved with a person, and that is a standing cost.",
    },
    {
      title: "A product change is a new dataset",
      text: "A product change needs retraining: new geometry and a new defect make a separate dataset, so the threshold is tuned again and accuracy is confirmed by new measurements.",
    },
    {
      title: "The defect boundary is subjective",
      text: "Labeling is subjective: two operators draw the defect boundary differently, and the model learns from those disagreements.",
    },
    {
      title: "Accuracy drops without retraining",
      text: "Without retraining, accuracy drops: the defect distribution shifts, so the model is periodically updated on new confirmations.",
    },
    {
      title: "The number of defect classes",
      text: "Each new defect class needs its own frames and labeling. The number of defect classes drives the labeling volume and the project cost.",
    },
    {
      title: "The share of borderline cases",
      text: "The higher the share of borderline cases, the more manual review continues after launch. The share of borderline cases sets the operator load.",
    },
    {
      title: "Line speed",
      text: "The faster the flow, the tighter the inference latency requirement. Line speed sets the compute and hardware budget.",
    },
    {
      title: "Product change frequency",
      text: "Frequent changeovers require regular retraining, so the model is updated per product. Product change frequency sets the support cycle.",
    },
  ],
  mechanism: [
    {
      title: "Capture matters more than the model",
      text: "Capture matters more than the model: the right lighting and angle beat a different architecture. We start with optics, not training.",
    },
    {
      title: "The dataset comes from real line frames",
      text: "The dataset comes from real line frames, rare defects included, or the model learns only the frequent classes.",
    },
    {
      title: "We measure accuracy on a held-out split",
      text: "We measure accuracy on a held-out split and count defect misses separately: a miss on the line costs more than a false alarm.",
    },
    {
      title: "Inference runs next to the line",
      text: "Inference runs next to the line: latency in tens of milliseconds so the decision lands before the next item.",
    },
  ],
  sections: [
    {
      title: "What the pilot covers",
      items: [
        "A station audit: we inspect the product, line speed, and the list of defects to catch.",
        "A capture scheme: camera, lens, and lighting selected for the item geometry.",
        "Dataset and labeling: real frames collected, the defect definition agreed, and the set labeled.",
        "Training and measurement: accuracy and miss rate on a held-out split, broken down by defect class.",
        "Integration and acceptance: output wired to the line, a decision log, and an agreed trigger threshold.",
      ],
    },
  ],
};
