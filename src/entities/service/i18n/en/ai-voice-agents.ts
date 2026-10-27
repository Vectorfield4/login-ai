export const aiVoiceAgentsEn = {
  ctaBanner: {
    title: "Let's test your line on real calls",
    text: "Send a recording of a typical call and your scenario outline. We'll set up SIP, ASR, and TTS and show the transcript and operator handoff in a four-week pilot.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "Voice AI agents",
  title: "Voice AI agents for inbound and outbound calls",
  tagline:
    "The agent answers and places calls, recognizes speech as it streams, replies with voice, and hands a hard conversation to an operator with the transcript.",
  description:
    "We put a voice agent into your contact center: it runs inbound and outbound calls by scenario, listens through streaming recognition, answers with synthesized speech, records the call, and hands the operator a transcript with the reason. We count minutes, cost, and the share of resolved requests.",
  features: [
    {
      title: "Calls in both directions",
      text: "The agent answers inbound calls and dials a list on a schedule, records each conversation, and keeps the transcript next to the number and the call outcome.",
    },
    {
      title: "Recognition in the stream",
      text: "Streaming ASR returns text as the customer speaks, so the agent replies in 300–700 ms and fills a long pause with a question.",
    },
    {
      title: "Handoff to an operator",
      text: "On a hard question the agent transfers the call and passes the transcript, the handoff reason, and the customer data it collected.",
    },
    {
      title: "Call analytics",
      text: "We measure duration, cost per minute, and the share of requests resolved without an operator, broken down by scenario, number, and hour.",
    },
  ],
  techStack: [
    {
      subtitle: "Telephony and speech loop",
      description:
        "A call lands on [Asterisk] over SIP, streaming recognition runs on [Whisper] and [Yandex SpeechKit], call events flow through [Kafka], while transcripts and metrics sit in [PostgreSQL].",
      technologies: [
        {
          id: "asterisk",
          name: "Asterisk",
          glossary:
            "An open-source PBX with SIP support: it takes calls, records audio, and transfers the call to an operator on the agent's command.",
        },
        {
          id: "whisper",
          name: "Whisper",
          glossary:
            "A speech recognition model: it transcribes call recordings in batches and serves as a fallback path for streaming ASR on difficult channels.",
        },
        {
          id: "yandex-speechkit",
          name: "Yandex SpeechKit",
          glossary:
            "A cloud service for Russian speech recognition and synthesis: it returns interim hypotheses and picks a voice that fits the brand.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "The event bus: it carries transcript fragments and call start and end events into analytics while keeping message order.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores transcripts, scenario scores, and call metrics: we build reports on them and review disputed dialogs.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Scenario and telephony audit",
      text: "We review call recordings, routing, and the channel codec. We fix which requests the agent closes and where an operator joins.",
      processType: "discovery",
    },
    {
      title: "Scenario and voice",
      text: "We build the step tree, the replies, and the escalation rules, then choose a voice and speaking rate for your audience and language.",
      processType: "system-design",
    },
    {
      title: "SIP, ASR, and TTS integration",
      text: "We connect the PBX, streaming recognition, and synthesis into one loop, and set recording, timeouts, and dropped-call handling.",
      processType: "integration",
    },
    {
      title: "Pilot on real calls",
      text: "Four weeks on live traffic: we check transcripts, edit replies, measure the share of resolved requests, and move the agent to production.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Repetitive inbound calls",
      text: "Requests, order status, and appointment booking follow one scenario, so the agent closes those calls and frees the line for hard questions.",
      positive: true,
    },
    {
      title: "SIP telephony with recordings",
      text: "You have a PBX, numbers, and an audio archive: we build the scenario from recordings and check recognition quality before launch.",
      positive: true,
    },
    {
      title: "Poor call recordings",
      text: "Noise, cut-offs, and a low bitrate lower ASR accuracy: a clean channel and a normal codec come first, or the scenario has to guess.",
      positive: false,
    },
    {
      title: "Complex legal consultations",
      text: "Contract review and money disputes stay with a person: the agent gathers the data and hands the dialog to a lawyer with the transcript.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How does the agent connect to telephony?",
      answer:
        "Through a SIP trunk to your PBX or to our gateway. The number stays yours, and recording and routing follow the contact center rules.",
    },
    {
      question: "Which languages and voices does it speak?",
      answer:
        "Russian and English at the start, with more languages added through the scenario dictionary. We pick a voice from the TTS library or clone your reference sample with the speaker's consent.",
    },
    {
      question: "How is a call transferred?",
      answer:
        "The agent detects the handoff reason, tells the customer, and transfers the call to a free operator. The call card keeps the transcript, collected fields, and a link to the recording.",
    },
    {
      question: "What does a minute cost and how long is the launch?",
      answer:
        "A minute combines telephony, ASR, TTS, and scenario support, with a reference of 40 RUB per minute in the base setup. A one-scenario pilot takes four weeks; we add a second scenario in two.",
    },
  ],
  tradeoffs: [
    {
      title: "Quality depends on the channel",
      text: "Recognition accuracy rests on the codec and channel bandwidth: on narrowband G.711 the agent hears less detail, so the audit checks recordings and widens the band where needed.",
    },
    {
      title: "The scenario keeps the dialog in steps",
      text: "The agent runs the conversation along a step tree and collects data in a set order: the scenario bounds set the dialog depth, and a step beyond them triggers an operator handoff.",
    },
    {
      title: "Synthesized speech gets editorial review",
      text: "An editor reads the synthesized speech: we set stress, pauses, and the pronunciation of brand names by hand, so the voice stays even and predictable on long replies.",
    },
  ],
  deliverables: [
    {
      title: "Voice scenario",
      text: "A step tree with replies, branches, and escalation rules. The scenario covers the opening, data capture, answers to common questions, and the operator handoff.",
    },
    {
      title: "Telephony and speech loop",
      text: "A SIP trunk, streaming recognition, and speech synthesis in one loop. We set call recording, timeouts, and dropped-call handling.",
    },
    {
      title: "Recordings, transcripts, and metrics",
      text: "Audio, call text, and a report on duration, cost per minute, and the share of resolved requests. The metrics update after every call.",
    },
  ],
  mechanism: [
    {
      title: "SIP and streaming recognition",
      text: "A call arrives on a SIP trunk, audio goes into streaming ASR, and text appears as the customer speaks. The agent gets each turn in fractions of a second, replies at conversation speed, and keeps the recording for review.",
    },
    {
      title: "Scenario and operator handoff",
      text: "The agent runs the dialog in steps, collects data, and checks the escalation condition. When a question leaves the scenario, an operator gets the call, the transcript, and the reason, so the conversation continues without repetition.",
    },
    {
      title: "Speech synthesis and recording",
      text: "The reply text goes to TTS, synthesized speech plays into the line, and audio and transcript are written to storage. The recording links to the number and the call card, so review runs on facts.",
    },
  ],
  precedents: [
    {
      title: "Minutes in the estimate",
      text: "The calculator covers one thousand to fifty thousand minutes per month. The price includes telephony, recognition, synthesis, and scenario support, so the budget is clear before the start.",
      metricValue: "1,000–50,000",
      metricLabel: "Minutes in the estimate",
    },
    {
      title: "A pilot in four weeks",
      text: "We launch one inbound scenario with telephony and operator handoff in four weeks. During that time we check transcripts, edit replies, and measure the share of resolved requests.",
      metricValue: "4 wks",
      metricLabel: "A pilot in four weeks",
    },
    {
      title: "ASR and TTS tuned separately",
      text: "Recognition and synthesis are tuned for the language and the domain separately. We fit the name dictionary, accents, and speaking rate on real recordings, so accuracy grows through the pilot.",
      metricValue: "ASR + TTS",
      metricLabel: "ASR and TTS tuned separately",
    },
  ],
};
