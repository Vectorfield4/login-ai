export const aiRecruiterEn = {
  ctaBanner: {
    title: "Let's run a pilot on your vacancies",
    text: "Send 2-3 sample vacancies and read access to your ATS. In 3 weeks we'll launch screening, follow up with candidates, and show how many responses reached an interview.",
    buttonLabel: "Discuss a pilot",
  },
  navTitle: "AI recruiter",
  title: "AI recruiter: screening and candidate communications",
  tagline:
    "The AI recruiter reads responses, checks them against vacancy criteria, books interviews, and updates your ATS. You get a short candidate list with the conversation history.",
  description:
    "We set up an AI recruiter for HR teams with 10 or more open vacancies: the agent sorts responses, asks follow-up questions in chat, agrees interviews, and moves statuses into your ATS. A recruiter takes disputed dialogs with the full history.",
  features: [
    {
      title: "Screening against vacancy criteria",
      text: "The agent checks a candidate's answers against the scorecard: experience, stack, location, salary expectations. You get a score for each criterion and quotes from the conversation.",
    },
    {
      title: "Interview scheduling",
      text: "The agent offers slots from the recruiter's and interviewer's calendars, confirms the time in chat, and reminds the candidate the day before.",
    },
    {
      title: "Candidate chat follow-up",
      text: "The candidate gets an answer about terms, stages, and timing within a minute. The agent writes in Telegram and email, and passes hard questions to a recruiter.",
    },
    {
      title: "ATS updates",
      text: "Every step lands in the ATS: status, score, conversation link, and next step. The recruiter opens the card and sees what has already been asked.",
    },
  ],
  techStack: [
    {
      subtitle: "Response intake, dialog, and statuses",
      description:
        "The agent takes responses through [Telegram Bot API], puts events into [Kafka], stores cards in [PostgreSQL], holds dialog state in [Redis], and describes screening rules and model calls in [Python].",
      technologies: [
        {
          id: "telegram-bot-api",
          name: "Telegram Bot API",
          glossary:
            "Telegram's HTTP interface: the agent receives messages, buttons, and attachments, and a webhook delivers the event to the service.",
        },
        {
          id: "kafka",
          name: "Kafka",
          glossary:
            "An event queue: responses, messages, and status changes flow through, so the peak load is processed apart from the dialog.",
        },
        {
          id: "postgresql",
          name: "PostgreSQL",
          glossary:
            "Stores cards, criterion scores, and status history: the recruiter builds a short list with a query and sees the source of every score.",
        },
        {
          id: "redis",
          name: "Redis",
          glossary:
            "Holds dialog state and the message queue: the agent remembers the question asked and continues the conversation after a restart.",
        },
        {
          id: "python",
          name: "Python",
          glossary:
            "The language of screening rules and model calls: the scorecard, thresholds, and answer handling live in one repository with tests.",
        },
      ],
    },
  ],
  processSteps: [
    {
      title: "Vacancy and ATS audit",
      text: "We review 10-20 open vacancies, their criteria, and the response flow. We check which ATS statuses and fields are available through the API and note the bottlenecks.",
      processType: "discovery",
    },
    {
      title: "Scorecard and screening rules",
      text: "We build a scorecard for each vacancy: criteria, weights, and the pass threshold. We write the question rules and the boundaries for the dialog handoff.",
      processType: "system-design",
    },
    {
      title: "Integration and pilot",
      text: "We connect the ATS, calendar, and channels, then launch the agent on two vacancies. For three weeks we compare its scores with recruiter decisions and adjust the thresholds.",
      processType: "integration",
    },
    {
      title: "Launch",
      text: "We move the whole response flow for the agreed vacancies to the agent. Recruiters work from a short list and take disputed cards themselves.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "A high response volume",
      text: "Ten or more vacancies bring hundreds of responses a week. The agent sorts them in minutes and gives the recruiter a short list with scores.",
      positive: true,
    },
    {
      title: "An ATS with an open API",
      text: "Your ATS has an API for cards, statuses, and comments. The agent writes scores and conversation links into the candidate card.",
      positive: true,
    },
    {
      title: "Work without an ATS",
      text: "If cards live in spreadsheets and email, you need a tracking setup first. We help choose an ATS or build a simple base on PostgreSQL.",
      positive: false,
    },
    {
      title: "Automatic hiring decisions",
      text: "The final decision and the offer stay with a person. The agent prepares the score and the list, and a recruiter with the hiring manager decides.",
      positive: false,
    },
  ],
  faqItems: [
    {
      question: "How do you control bias?",
      answer:
        "The HR team approves the criteria and weights, and the agent scores answers against the scorecard. We remove name, age, and job-unrelated fields from the prompts and test scores on different candidate groups.",
    },
    {
      question: "Which ATS do you support?",
      answer:
        "We connect to ATS platforms with an API: Huntflow, SberPodbor, Talantix, and other systems with open methods. For closed systems we set up an exchange through an export or an intermediate database.",
    },
    {
      question: "Which channels does the agent use?",
      answer:
        "Telegram, email, and the chat on your career page. The candidate picks a convenient channel, and the conversation history stays in one card.",
    },
    {
      question: "How long does the pilot take?",
      answer:
        "The pilot takes 3-4 weeks: the first week covers the audit and integration, the next two cover screening of real responses. By the end you see the share of candidates who reach an interview.",
    },
  ],
  tradeoffs: [
    {
      title: "Candidate experience needs setup",
      text: "Your team sets the tone, response speed, and wording, and the agent keeps them in every dialog. For the first two weeks a recruiter reads the conversations and edits the templates so the candidate gets a clear answer.",
    },
    {
      title: "Legal policy and scoring",
      text: "Your lawyer approves the data rules, retention periods, and field list. The agent writes scores against the scorecard, and a person makes the decision, so disputed cases follow a written protocol.",
    },
    {
      title: "ATS data quality",
      text: "The more accurately you fill ATS fields and statuses, the more useful the report: data quality sets the funnel accuracy. In the audit we show gaps and close them before the pilot.",
    },
  ],
  deliverables: [
    {
      title: "Scorecard",
      text: "A scorecard for each vacancy: criteria, weights, pass thresholds, and example answers the agent uses to set a score.",
    },
    {
      title: "Pilot recruiter",
      text: "A recruiter who runs the pilot on your side: they check the agent's scores, take disputed cards, and collect edits to the rules.",
    },
    {
      title: "Pilot report",
      text: "A report with the funnel by vacancy: how many responses arrived, how many reached an interview, where the agent handed the dialog to a recruiter, and which rules to adjust.",
    },
  ],
  mechanism: [
    {
      title: "Candidate intake",
      text: "A candidate writes in Telegram, by email, or in the career page chat, and the agent builds a card right away: name, vacancy, contacts, and a link to the resume. The answer arrives within a minute, and the event goes to the queue and into the ATS.",
    },
    {
      title: "Scorecard screening",
      text: "The agent asks questions from the scorecard, checks the answers against the criteria, and sets a score for each item. The card keeps quotes from the conversation, so the recruiter sees the basis for the score and checks a disputed answer fast.",
    },
    {
      title: "Slots and handoff",
      text: "When the score passes the threshold, the agent offers calendar slots, confirms the time, and sends a reminder. The recruiter gets a card with the score, quotes, and next step, and the handoff carries the full history.",
    },
  ],
  outcomes: [
    {
      title: "10 vacancies in the base",
      value: "10",
      text: "The base setup covers 10 open vacancies and 2 communication channels. That is enough to handle the response flow of a mid-sized HR team and collect funnel statistics.",
    },
    {
      title: "2 channels in the base",
      value: "2",
      text: "In the base configuration the candidate writes in Telegram and by email. Both channels meet in one card, so the recruiter reads the history in one window.",
    },
    {
      title: "3 weeks to the pilot",
      value: "3 wks",
      text: "The audit, integration, and launch on two vacancies take 3 weeks. By then the agent handles real responses, and the recruiter sees the first scores and card handoffs.",
    },
  ],
};
