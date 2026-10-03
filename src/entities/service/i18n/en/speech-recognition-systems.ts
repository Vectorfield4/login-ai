export const speech_recognition_systemsEn = {
  ctaBanner: {
    title: "Let's measure recognition on your recordings",
    text: "Send a few hours of audio and a glossary of terms. We'll show WER on your domain before the project starts.",
    buttonLabel: "Request a benchmark",
  },
  navTitle: "Speech recognition systems",
  title: "Building speech recognition systems",
  tagline: "Speech to text for your domain: terms, names, and multiple speakers.",
  description:
    "We build speech recognition for your domain: phone calls and meetings, diarization, term glossaries, and WER measured on real recordings.",
  features: [
    {
      title: "Domain and glossary",
      text: "We plug in a glossary of terms and names so the model does not confuse professional vocabulary.",
    },
    {
      title: "Diarization",
      text: "We separate speakers in a call or meeting instead of dumping lines into one stream.",
    },
    {
      title: "Noise and channels",
      text: "Telephony, microphones, and poor links are handled separately, not with one preset.",
    },
    {
      title: "WER on your recordings",
      text: "We measure quality on your recordings, not a vendor's generic metric.",
    },
  ],
  techStack: [
    {
      subtitle: "Audio and models",
      description:
        "Audio is stored in [MinIO], recognition models train on [PyTorch], inference runs on [vLLM], and the processing queue is in [Kafka].",
      technologies: [
        {
          id: "minio",
          name: "MinIO",
          glossary:
            "Stores recordings locally: audio never reaches an external provider and stays available for repeat benchmarks.",
        },
        {
          id: "pytorch",
          name: "PyTorch",
          glossary: "Fine-tunes recognition models for the domain, terms, and a specific channel.",
        },
        {
          id: "vllm",
          name: "vLLM",
          glossary:
            "Fast inference for post-processing: punctuation, transcription, and summary of the transcript.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The audio queue: recordings are processed as they arrive without blocking the call flow.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Recording audit",
      text: "We listen to real recordings: channels, noise, accent, and the glossary to support.",
      processType: "discovery",
    },
    {
      title: "Glossary and diarization schema",
      text: "We fix the term glossary, speaker-splitting rules, and output format requirements.",
      processType: "system-design",
    },
    {
      title: "Training and adaptation",
      text: "We fine-tune the model for the domain and channel, and measure WER on held-out recordings.",
      processType: "implementation",
    },
    {
      title: "Launch into the stream",
      text: "We connect recognition to the call queue and set up error review.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Recordings exist for evaluation",
      text: "A few hours of real audio give an honest WER before the start.",
      positive: true,
    },
    {
      title: "A stable channel",
      text: "Microphone and line quality are steady: the model does not retrain on random noise.",
      positive: true,
    },
    {
      title: "Critical names and amounts",
      text: "Where an error in a number is unacceptable, recognition needs manual review.",
      positive: false,
    },
    {
      title: "No term glossary",
      text: "Without a list of terms and names, the model confidently writes the wrong word.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "A contact center",
      text: "Recognition was adapted to terms and names, and diarization separated the agent and the customer.",
      metricValue: "−30%",
      metricLabel: "WER after glossary adaptation",
    },
  ],
  faqItems: [
    {
      question: "Do recordings leave the perimeter?",
      answer:
        "By default no: recognition runs inside your perimeter. An external service only if you allow it.",
    },
    {
      question: "What about multiple speakers?",
      answer:
        "Diarization splits voices into tracks. Accuracy drops when people speak at once, and the benchmarks show it.",
    },
    {
      question: "How is quality measured?",
      answer:
        "WER on your held-out recordings by domain, separately by channel and speech type, not a vendor's single number.",
    },
    {
      question: "How long does adaptation take?",
      answer:
        "The first domain adaptation starts at three weeks, including labeling and a benchmark on real recordings.",
    },
  ],
  sections: [
    {
      title: "How recognition is built",
      items: [
        "The glossary of terms and names is added before training: without it the model confidently writes the wrong word.",
        "Diarization separates speakers, so a call transcript reads as a dialog, not a monologue.",
        "Quality depends on the channel: phone recordings and meeting microphones are handled with different settings.",
        "WER is measured on your domain recordings, not a provider's generic sample.",
      ],
    },
    {
      title: "Where recognition errs",
      items: [
        "Names, amounts, and part numbers stay weak: similar numbers and surnames get confused.",
        "Noise and overlapping speech cut accuracy: words are lost where people talk at once.",
        "A domain change needs adaptation: a meeting model is not a call model without fine-tuning.",
        "Speech without term adaptation gives confident but wrong transcripts, and they must not be taken as fact.",
      ],
    },
  ],
};
