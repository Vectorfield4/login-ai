export const speechAnalyticsEn = {
  ctaBanner: {
    title: "Send a call sample and a scorecard",
    text: "We'll take one call and your scorecard draft, run both through recognition and scoring, and show the score for each item plus a three-week pilot plan.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "Speech analytics",
  title: "AI speech analytics for calls",
  tagline:
    "We score every call: recognize speech, check the QA scorecard, surface objections, and flag script violations.",
  description:
    "We put speech analytics into your contact center: recognize 100% of calls, score each one against the QA scorecard, collect sales insights, and flag compliance issues. The base covers 1,000 hours per month, with a 150k RUB/month retainer and a 300k RUB setup.",
  features: [
    {
      title: "Scoring every call",
      text: "We recognize 100% of recordings and score every conversation: an agent sees the score, the scorecard items, and the excerpts that lowered it.",
    },
    {
      title: "A scorecard from your script",
      text: "The scorecard comes from your script: greeting, needs discovery, next step, and forbidden phrases become weighted items with a threshold.",
    },
    {
      title: "Sales insights",
      text: "We collect objections, reasons for refusal, and the next step named across all calls: a manager sees topic frequency, customer wording, and example dialogs.",
    },
    {
      title: "Compliance flags",
      text: "We mark script violations and forbidden phrases: each flag carries a timecode, a quote, and a link to the recording, so review runs on evidence.",
    },
  ],
  techStack: [
    {
      subtitle: "Recognition and storage",
      description:
        "We recognize call recordings through [Whisper] and [Yandex SpeechKit], pass scoring events through [Kafka], store scores and scorecards in [PostgreSQL], and compute hourly and topic aggregates in [ClickHouse].",
      technologies: [
        {
          id: "whisper",
          name: "Whisper",
          glossary:
            "A speech recognition model: it transcribes recordings in batches, runs on your server, and we switch to it on difficult recordings.",
        },
        {
          id: "yandex-speechkit",
          name: "Yandex SpeechKit",
          glossary:
            "A cloud service for Russian speech recognition: it returns text and timecodes and helps on phone channels with narrow bandwidth and noise.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: it carries call start, the finished transcript, and the scoring result into a queue while keeping message order per call.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores transcripts, scorecards, scores, and compliance flags: we build reports from this data and review disputed calls with the QA lead.",
        },
        {
          id: "clickhouse",
          name: "ClickHouse",
          glossary:
            "Computes aggregates by hour, agent, and topic: average score, flag share, and objection frequency across millions of rows in seconds.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Recording and telephony audit",
      text: "We listen to 3-5 hours of recordings, check the codec, channels, and archive, and compare your script and scorecard with real conversations.",
      processType: "discovery",
    },
    {
      title: "Scorecard and taxonomy",
      text: "We build the scorecard items, weights, and thresholds, then set objection topics and the list of forbidden phrases with the QA lead.",
      processType: "system-design",
    },
    {
      title: "ASR and scoring pipeline",
      text: "We connect recognition and diarization, set scoring rules, check accuracy on a labeled sample, and fix disputed items.",
      processType: "integration",
    },
    {
      title: "Pilot and retainer",
      text: "We launch a pilot on your stream, compare scores with a manual QA sample, ship the dashboard, and move to a monthly retainer.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "From 500 recorded hours per month",
      text: "At that volume the sample covers every channel and shift, so we tune the scorecard and thresholds on enough statistics.",
      positive: true,
    },
    {
      title: "A scorecard and an owner",
      text: "A QA lead owns the items and weights, accepts disputed scores, and reviews thresholds with the team once a month.",
      positive: true,
    },
    {
      title: "Poor recordings",
      text: "Noise, cut-offs, and narrow bandwidth lower recognition accuracy, so a clean channel and a normal codec come first.",
      positive: false,
    },
    {
      title: "Legal and HR work without a policy",
      text: "Disciplinary review and employee scoring need an agreed policy for recording, access, and storage, signed by legal and HR.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "Which languages and domains does analytics cover?",
      answer:
        "Russian and English at the start, with more languages added through a dictionary. The domain sets the term glossary and topic set: banking, telecom, delivery, and product support each run with their own dictionaries.",
    },
    {
      question: "How do you connect to telephony?",
      answer:
        "Through a recording export from your PBX or a stream from SIP recording. We set the file pickup schedule, formats, and reprocessing, while the number and routing stay yours.",
    },
    {
      question: "Where do recordings and transcripts live?",
      answer:
        "Inside your perimeter: audio and text sit in PostgreSQL and object storage, with role-based access. Your policy sets retention and pseudonymization, and we connect external services on your decision.",
    },
    {
      question: "How long does setup take and how does the work run?",
      answer:
        "Setup takes three weeks: audit, scorecard, pipeline, and a pilot on your stream. After that the work runs on a monthly retainer at 150k RUB, and setup costs 300k RUB.",
    },
  ],
  tradeoffs: [
    {
      title: "Recording quality",
      text: "Recording quality sets the scoring ceiling. Wideband audio and a clean microphone give the model more words to work with, so the audit starts with a codec check and a channel improvement plan.",
    },
    {
      title: "Language and domain",
      text: "Language and domain set the glossary and scoring rules. Russian and English run at the start, and industry terms join the glossary during the audit, so the model hears professional vocabulary with more precision.",
    },
    {
      title: "Recording policy",
      text: "Recording policy sets retention, access scope, and pseudonymization. Legal and HR sign the document before launch, so the team works to clear rules every day.",
    },
  ],
  deliverables: [
    {
      title: "QA scorecard",
      text: "Scorecard items with weights, thresholds, and phrase examples. The card covers greeting, needs discovery, argumentation, next step, and forbidden wording.",
    },
    {
      title: "Scoring pipeline",
      text: "Recognition, diarization, and scoring rules in one pipeline. It takes recordings from telephony, computes the score, and writes the result to the database.",
    },
    {
      title: "Quality dashboard",
      text: "A dashboard with scores by agent, topic, and shift, a flag list, and links to recordings. The QA lead sees monthly movement and reviews disputed calls.",
    },
  ],
  mechanism: [
    {
      title: "Recognition and diarization",
      text: "A call recording goes into recognition, diarization separates the agent from the customer, and the model adds timecodes. Text arrives with role labels, so scoring sees who said each phrase.",
    },
    {
      title: "Scoring against the scorecard",
      text: "Scoring rules match turns against scorecard items, award points, and keep a quote with a timecode. Every call gets a score, and disputed items go to the QA lead for manual review.",
    },
    {
      title: "Insights and compliance",
      text: "Analytics groups objections, topics, and next steps across all calls, while compliance rules mark forbidden phrases. A manager sees topic frequency and specific dialogs, and legal gets flags with quotes.",
    },
  ],
  outcomes: [
    {
      title: "Hours in the base",
      value: "1,000 h/mo",
      text: "The base covers 1,000 hours of recordings per month: recognition, diarization, and scoring run in one stream.",
    },
    {
      title: "Retainer in the base",
      value: "150k RUB/mo",
      text: "The monthly retainer in the base setup is 150k RUB/mo. It includes processing 1,000 hours, scorecard support, and scoring rule updates.",
    },
    {
      title: "Every call scored",
      value: "100%",
      text: "Scoring covers 100% of recordings. A manual QA sample is used for disputed items and threshold calibration.",
    },
  ],
};
