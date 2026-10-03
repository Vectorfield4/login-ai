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
  ],
  sections: [
    {
      title: "How the system is built",
      items: [
        "Capture matters more than the model: the right lighting and angle beat a different architecture. We start with optics, not training.",
        "The dataset comes from real line frames, rare defects included, or the model learns only the frequent classes.",
        "We measure accuracy on a held-out split and count defect misses separately: a miss on the line costs more than a false alarm.",
        "Inference runs next to the line: latency in tens of milliseconds so the decision lands before the next item.",
      ],
    },
    {
      title: "Where the system errs",
      items: [
        "Borderline cases stay forever: stains and blurred edges are resolved with a person, and that is a standing cost.",
        "A product change needs retraining: new geometry and a new defect mean a new dataset, not a threshold tweak.",
        "Labeling is subjective: two operators draw the defect boundary differently, and the model learns from those disagreements.",
        "Without retraining, accuracy drops: the defect distribution shifts, so the model is periodically updated on new confirmations.",
      ],
    },
  ],
};
