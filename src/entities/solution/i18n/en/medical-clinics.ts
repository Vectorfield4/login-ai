export const medical_clinicsEn = {
  ctaBanner: {
    title: "We'll deploy AI in your clinic",
    text: "Describe the patient flow and bottlenecks. We'll account for medical data requirements and show scenarios for the front desk and doctors.",
    buttonLabel: "Discuss deployment",
  },
  navTitle: "Medical Clinics",
  title: "AI Solutions for Medical Clinics",
  tagline: "Reduce doctors' paperwork and improve patient care with AI.",
  description:
    "We bring AI into medical clinics: assistants help doctors run appointments and handle documentation, while patients get a digital helper to manage their treatment. The clinic reduces staff workload, improves diagnostic accuracy, and forecasts patient flow.",
  features: [
    {
      title: "Doctor's assistant",
      text: "An AI assistant for doctors: clinical protocol hints, notes and template preparation, automatic history summaries – less paperwork, more time for patients.",
    },
    {
      title: "Patient diary",
      text: "An app and chatbot for patients: symptom journal, medication reminders, and sharing progress with the doctor between visits.",
    },
    {
      title: "AI triage of initial complaints",
      text: "Automatic analysis of initial complaints and routing to the right specialist – patients reach the correct doctor faster, and admins are unloaded.",
    },
    {
      title: "Medical document recognition",
      text: "Scanning and structuring of discharge notes, referrals, and lab results with automatic entry into the patient's electronic record.",
    },
    {
      title: "Clinic load analytics",
      text: "Forecasting patient flow and room occupancy: plan doctor schedules, cut queues, and improve clinic efficiency.",
    },
    {
      title: "Telemedicine consultation notes",
      text: "Transcription and automatic summaries of online consultations – doctors don't get distracted by notes, and patients get clear recommendations.",
    },
  ],
  processSteps: [
    {
      title: "Clinic audit",
      text: "We review doctor workload, patient flow, and paper processes. We pick tasks with the largest impact.",
    },
    {
      title: "Pilot on one department",
      text: "We launch a doctor assistant or triage on one unit. Doctors give feedback and we tune scenarios.",
    },
    {
      title: "MIS integration",
      text: "We connect electronic records and schedules. Data stays in your perimeter with role-based access.",
    },
    {
      title: "Training and scaling",
      text: "We train staff, roll out to other departments and branches, and set up quality monitoring.",
    },
  ],
  fitItems: [
    {
      title: "High doctor workload",
      text: "Documentation eats appointment time, and records and schedules are assembled by hand.",
      positive: true,
    },
    {
      title: "Growth without more staff",
      text: "Patient flow grows while hiring doctors and admins is expensive. AI offloads part of the team.",
      positive: true,
    },
    {
      title: "No solid MIS in place",
      text: "Without electronic records and stable accounting, AI has nothing to rely on. The base comes first.",
      positive: false,
    },
    {
      title: "Strict paper-bound regulations",
      text: "If internal rules ban automated processing of patient data, implementation needs approvals and change.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Lower admin workload",
      text: "Unloaded primary scheduling and routing: an assistant took requests, clarified symptoms, and booked the right specialist.",
      metricValue: "−30%",
      metricLabel: "admin time on scheduling",
    },
  ],
  faqItems: [
    {
      question: "Is this legal for medical data?",
      answer:
        "We work inside your perimeter or a protected cloud; data never leaves it. Role-based access and logging. Regulations are reviewed during the audit.",
    },
    {
      question: "Who makes treatment decisions?",
      answer:
        "AI assists: it prepares notes, records, and reminders. Prescriptions and decisions stay with the doctor.",
    },
    {
      question: "How fast is the pilot?",
      answer: "The first scenario runs in 3–5 weeks: development, integration, and staff training.",
    },
    {
      question: "Is it compatible with MIS?",
      answer:
        "We integrate with mainstream MIS via API and exchange formats. The specific system is verified during the audit.",
    },
  ],
  sections: [
    {
      title: "Patient flow from the call to the visit",
      items: [
        "Almost 70% of bookings at private clinics come by phone, and it is exactly those calls that get lost at peak hours. An automated assistant answers around the clock, suggests free slots, and books the visit with no admin involved. Every unanswered call walks away with the patient and lands at a competitor, while an exam room sits empty.",
        "No-shows burn up to 15% of the schedule even in stable clinics, and the doctor learns about an empty slot only after a patient call. A reminder 24 hours ahead brings the person back to the visit or reports a cancellation in advance, and the freed slot immediately goes to someone from the waiting list. The slot does not stay empty.",
        "One-click booking via WhatsApp and Telegram removes the «call and check» step where new patients get lost. A person arranges a visit in 40 seconds right inside the chat, without opening the website or waiting for an operator, everything happens without extra clarifying questions. Fewer barriers, more first visits.",
        "If a patient reschedules a visit 20 minutes before it starts, the automation immediately rebuilds the schedule and warns the doctor about the change. You do not waste your time, and the client does not sit feeling they are being kept waiting for nothing. Both sides save 15-20 minutes that used to go into phone calls back and forth.",
        "Admins call through the confirmation list and spend up to two hours a day on it. The assistant takes over the bulk reminders, while a human employee answers the questions that a template cannot solve. The freed hours turn into polite replies and live conversations with the people who actually call.",
        "Some patients, especially older ones, still want to hear a live voice instead of an automated menu. A fully automatic booking will push them away faster than it saves the admin time. Keep a visible button or a voice menu that leads to an operator. Even with perfect automation, a human voice stays the safety net.",
      ],
    },
    {
      title: "Documents delivered ready for the doctor",
      items: [
        "A patient brings discharge notes from three different clinics, and the doctor has to rebuild the picture from the pieces. The model puts together one shared history: diagnoses, dosages, and dates in a single note with references to the sources. Building the history takes a minute instead of half an hour, and the appointment starts on time.",
        "Before the visit, AI checks lab results for completeness: an empty field, an expired result, a contradiction between the old and the new dosage. The doctor sees the warnings in advance, not at the moment of making the decision, when correcting the documents is already too late. Part of the conflicts gets cut off before the visit, and the patient does not retake tests.",
        "The doctor dictates the conclusion out loud, and the system turns speech into a structured record with a diagnosis and prescriptions. Typing stops eating 6-7 minutes out of every appointment, and over a day almost an hour of appointment time is freed per doctor. The idea is simple, but the effect builds up from the very first patient.",
        "The clinic mailbox gets dozens of attachments a day: referrals, contracts, reports from laboratories. The automation sorts them by patient, cross-checks them against the electronic record, and flags mismatches for a human to review. Nobody retypes anything, so typos in dosages and dates disappear. The file lands in the right record immediately.",
        "The archive of paper records stays a blind spot: a required discharge note takes fifteen minutes of page turning to find. A batch of documents gets digitized in a week and turns into full-text search across all patients. Old diagnoses no longer get lost when a patient moves between branches, and the doctor sees the whole picture in seconds.",
        "Mistaken transcriptions are rare, but they cost a lot: a mix-up between «mg» and «ml» or a rare abbreviation from an obscure protocol. That is why automated conclusions always go through a doctor's review before they enter the record. This rule is not dropped even when model accuracy reaches 99%.",
      ],
    },
    {
      title: "Service quality and patient return",
      items: [
        "After the visit, a patient gets a survey that takes thirty seconds, and 6 out of 10 people fill it in. You see a score for every point of the appointment: the front desk, the doctor, the booking process, the treatment outcome. A low score immediately reaches the shift supervisor and gets discussed the same day, while the emotions are still fresh.",
        "Patient return is built on impressions, not discounts. The system keeps a history of visits, and a week before a scheduled appointment it reminds the patient why coming in right now makes sense, before the symptoms fade. Clients come back two or three times more often when they are remembered: the date of the next visit, the name of the doctor, the usual type of exam.",
        "A complaint is often a signal: three similar messages in a week point to a systemic problem, not a random glitch. Analytics groups such cases and brings them to the morning meeting before a symptom turns into a reputation risk in the reviews. One such review saves a week of collecting information by hand.",
        "First visits decide the fate of revenue: a person who came once either comes back or describes the experience in reviews, which will be read by hundreds of people who are still choosing a clinic. The assistant collects feedback an hour after the appointment, while the impression is fresh. A reply to negative feedback is drafted in a minute and goes out with the admin's personal signature.",
        "Waiting in the lobby hits the scores directly, even when the appointment itself went well. The system warns the patient about the doctor's delay ten minutes in advance and moves the wait into messages, where it is easier to bear. A fair warning matters more than a perfect schedule. It keeps the people who were ready to leave.",
        "Automated surveys and reminders save hours of work, but they turn the service into a conveyor when a patient feels like one item in the flow. A personal call after a difficult case is worth more than any automated email. Leave at least a fifth of the contacts to real people, and the service stays human even at the biggest patient flow.",
      ],
    },
  ],
};
