export const defect_detectionEn = {
  ctaBanner: {
    title: "Launch CV acceptance on one building",
    text: "Send apartment plans and 20–30 acceptance videos. We'll build a pilot on one entrance in 4 weeks and show the difference in time and repeat visits.",
    buttonLabel: "Discuss the pilot",
  },
  navTitle: "Construction defect detection",
  title: "CV acceptance: finding finish defects from video",
  tagline:
    "Defects are found before the handover act: the foreman films the apartment on a phone, AI pins them to the plan and generates a protocol.",
  description:
    "We bring computer vision into apartment acceptance from subcontractors: finish defects are found from phone video, pinned to the plan and turned into a protocol with photo and coordinates. The subcontractor gets a work order, fixes and closes the defect with a re-shoot. Acceptance time drops from 70 to 25 minutes, repeat visits by 50%, 90% of apartments get an auto-protocol.",
  features: [
    {
      title: "Defects from phone video",
      text: "The foreman walks the apartment following app prompts; the phone camera captures the finish, AI finds scratches, chips, unevenness and standard violations.",
    },
    {
      title: "Pinning to the plan",
      text: "Each defect is pinned to the apartment plan: coordinate, room, standard. The protocol is generated automatically with photo and comment.",
    },
    {
      title: "Work order to subcontractor",
      text: "The subcontractor receives a work order with photo and deadline; closing the defect means a re-shoot, AI verifies the fix.",
    },
    {
      title: "Analytics by property",
      text: "Summary of defects by property and building: types, frequency, contractors. Helps control quality and delivery dates.",
    },
  ],
  processSteps: [
    {
      title: "Acceptance audit",
      text: "We review the current acceptance process, apartment plans, videos and protocols for a month. We define defect types and acceptance criteria.",
      processType: "requirements",
    },
    {
      title: "Pilot on one building",
      text: "We run the model on one entrance: the foreman films per checklist, AI generates the protocol. 4-week pilot, we compare accuracy and time.",
      processType: "prototyping",
    },
    {
      title: "Integration with accounting",
      text: "We connect to the defect tracking and document flow: work orders, acts, re-shoots. Role-based access.",
      processType: "integration",
    },
    {
      title: "Scale-up",
      text: "We roll out to the remaining buildings, build a defect library and quality reports by contractor.",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "Flow of acceptances",
      text: "Dozens of apartments per month: the manual process can't keep up, automation is needed.",
      positive: true,
    },
    {
      title: "Subcontractors",
      text: "There are subcontractors and repeat visits for fixes — work orders and fix control save time.",
      positive: true,
    },
    {
      title: "Single apartments",
      text: "For one-off acceptances the automation effect is minimal.",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "CV apartment acceptance",
      text: "Acceptance time dropped from 70 to 25 minutes, repeat visits by 50%, 90% of apartments get an auto-protocol.",
      metricValue: "25 min",
      metricLabel: "acceptance time",
    },
  ],
  faqItems: [
    {
      question: "Are special cameras needed?",
      answer: "No, the foreman's phone is enough. The model works on mobile video.",
    },
    {
      question: "What defects does the system find?",
      answer: "Scratches, chips, unevenness, finish standard violations. The list expands during the pilot for your property.",
    },
    {
      question: "How is a defect closed?",
      answer: "The subcontractor fixes and re-shoots; AI verifies the fix and closes the defect in the protocol.",
    },
    {
      question: "How long is the pilot?",
      answer: "4 weeks on one entrance or building, then scale-up.",
    },
  ],
  sections: [
    {
      title: "What's included",
      items: [
        "Mobile app for the foreman with a checklist",
        "Finish defect recognition model",
        "Pinning defects to the apartment plan",
        "Auto-generation of protocol with photos and coordinates",
        "Work orders and fix control",
      ],
    },
    {
      title: "Limitations",
      items: [
        "Digital apartment plans are required",
        "Video quality affects recognition accuracy",
        "A pilot is needed to tune to defect types",
      ],
    },
  ],
  technologies: [
    {
      title: "Computer vision",
      text: "Recognising finish defects in mobile phone video.",
    },
    {
      title: "Plan pinning",
      text: "Defect coordinates on the apartment plan for precise localisation.",
    },
    {
      title: "Document flow",
      text: "Auto-generation of protocols, work orders and acts.",
    },
  ],
  businessCategories: [
    {
      title: "Developers",
      text: "Controlling finish quality from subcontractors at scale.",
    },
    {
      title: "Contractors",
      text: "Fast defect fixes via work orders.",
    },
    {
      title: "Quality control",
      text: "Automated acceptance and quality reporting.",
    },
  ],
  deliverables: [
    {
      title: "Mobile app",
      text: "Checklist walk-through and defect capture by the foreman.",
    },
    {
      title: "Acceptance protocol",
      text: "Photos, coordinates, standards — generated automatically.",
    },
    {
      title: "Work orders",
      text: "For the subcontractor with fix deadlines.",
    },
    {
      title: "Quality report",
      text: "Defect summary by property and contractor.",
    },
  ],
  niches: ["audiences.businessOwners", "audiences.manufacturers"],
  relevants: [
    { type: "service", slug: "computer-vision-systems", noteKey: "relevants.defect-detection.computer-vision-systems" },
    { type: "service", slug: "3d-design", noteKey: "relevants.defect-detection.3d-design" },
    { type: "service", slug: "document-processing", noteKey: "relevants.defect-detection.document-processing" },
    { type: "case", slug: "cv-acceptance-control", noteKey: "relevants.defect-detection.cv-acceptance-control" },
  ],
};