export const real_estateEn = {
  ctaBanner: {
    title: "We'll review the funnel on your property",
    text: "Send the property plan, three months of lead exports and the list of deal documents. We'll build a pilot on one lead queue and one visualisation set.",
    buttonLabel: "Discuss the pilot",
  },
  navTitle: "AI for Real Estate",
  title: "AI for real estate: sales, 3D presentation and documents",
  tagline:
    "We shorten the apartment sales cycle: the agent replies to a lead within minutes, a 3D viewing replaces a site visit, and deal documents fill without retyping.",
  description:
    "We bring AI into residential property sales: we qualify leads and run follow-up, build the 3D presentation with plans and interiors, parse deal documents and forecast demand and price. The pilot runs on one property in 4–6 weeks.",
  features: [
    {
      title: "Lead qualification and follow-up",
      text: "The agent reads the lead history in CRM, asks the script questions and records budget, purchase timing, room count and payment method. The first touch goes out within a minute, and a client reply cancels the reminders on day two and day five. A hot lead reaches the manager with a transcript and the next step, while a cold one stays in nurture.",
    },
    {
      title: "3D presentation of the property",
      text: "We build a 2D plan, a 3D whitebox with a top view and interior angles for one layout, then prepare a model for the browser. The buyer rotates the apartment, switches between plan and volume, and steps into the rooms. The set works in a presentation, on the property page and in print.",
    },
    {
      title: "Documents for properties and deals",
      text: "We recognise sale contracts, extracts, acceptance acts and statements, and pull the amounts, dates, areas and parties. Rules check the fields against reference data, and a document with a mismatch goes to a human. On clean printed scans field accuracy stays at 95–99%.",
    },
    {
      title: "Demand and price forecast",
      text: "We build the forecast on at least 12 months of sales history: demand by building, sales velocity and price per square meter. The error is measured on a backtest, and the three-month horizon comes with weekly detail. On stable categories MAPE stays between 10 and 15%.",
    },
  ],
  processSteps: [
    {
      title: "Funnel audit and data check",
      text: "We review deal stages, lead sources, CRM fields and calls from the last three months. We check how many cards are filled to the end and at which step the contact gets lost. The audit takes a lead export and 20–30 dialogues.",
    },
    {
      title: "Pilot on one property",
      text: "We launch the agent on one lead queue and build the 3D set for one layout up to 80 m². The pilot runs 4–6 weeks: two weeks for integration, two for data, the rest for scenario review. Every week we compare the share of qualified leads.",
    },
    {
      title: "CRM and website integration",
      text: "We connect amoCRM or Bitrix24 through the API, the website forms and stage-change webhooks. One lead gets one card, and duplicates close by phone and email. Access to fields and handover is set by role.",
    },
    {
      title: "Scaling to the portfolio",
      text: "We move the scenarios to the remaining properties and build a shared library of layouts and materials. The forecast updates on schedule, and the dashboard shows demand, price and sales team load. At this stage we add the remaining channels and deal documents.",
    },
  ],
  fitItems: [
    {
      title: "Three properties and a website with traffic",
      text: "You sell at least three properties, and the site gets from 1,000 visits a month. That flow is enough for a pilot on one property to show the difference in conversion and reply speed.",
      positive: true,
    },
    {
      title: "The sales team works in CRM",
      text: "Leads live in amoCRM or Bitrix24. The funnel has an owner, and fields are filled by rules. The agent works inside the existing process: the funnel and rules are already set.",
      positive: true,
    },
    {
      title: "One property without a website",
      text: "One property without a site and lead flow will not pay back a pilot: setup takes eight weeks and starts at 1.2 million rubles. A property page and paid traffic come first.",
      positive: false,
    },
  ],
  precedents: [
    {
      title: "3D presentation set for a developer",
      text: "We built an apartment plan, a top view and interior angles: five frames and three presentation formats for a deck, the website and print. The buyer saw the layout, volume and finish before visiting, and the sales team showed the apartment without a trip. After launch, apartment sales rose by 20%.",
      metricValue: "+20%",
      metricLabel: "apartment sales",
    },
    {
      title: "Visualisations from property photos under NDA",
      text: "We built the images from photos of the client's finished properties, floor plans and interiors. The images went to property pages and buyer presentations, with no photographer on site. Page conversion rose by 20%, and the client name stays under NDA.",
      metricValue: "+20%",
      metricLabel: "page conversion",
    },
  ],
  faqItems: [
    {
      question: "How long does the launch take?",
      answer:
        "A pilot on one property runs 4–6 weeks. The full scope starts at eight weeks: 0.3 weeks per property and 0.2 weeks per channel above the base. For a portfolio of three properties and two channels, plan for 9–10 weeks.",
    },
    {
      question: "What data should we prepare?",
      answer:
        "You need the property plan in DWG or PDF with dimensions, photos and a finish specification, the price list and three months of lead exports. For the forecast, add at least 12 months of sales history by building and apartment. For documents, 50–100 scans of each type are enough.",
    },
    {
      question: "Does 3D replace photography?",
      answer:
        "No. A render shows the layout and finish before handover, while a photo captures the finished apartment and the showroom. At the start of sales there is nothing to shoot, so 3D fills the gap. A photoreal 360 tour needs separate panoramas, and we do not pass a scene off as one.",
    },
    {
      question: "What happens to our CRM?",
      answer:
        "The agent works inside amoCRM or Bitrix24 through the API: it creates a task, writes fields and leaves a transcript. No second database appears, and the history stays in your card. If sales run in spreadsheets, the project starts with a move to CRM.",
    },
  ],
  sections: [
    {
      title: "What the buyer sees",
      items: [
        "The buyer opens an apartment card and sees three layers: a plan with areas, a 3D top view and interior angles. One layout up to 80 m² becomes five frames, enough to compare rooms and finish without a trip. The manager does not spend the viewing on explaining the layout: the buyer arrives with a ready question about a specific apartment.",
        "The browser scene gives the buyer a camera: the apartment rotates, zooms and switches between plan and volume. We build the model in GLB, clean the geometry and textures, and test loading on a phone. Weak devices get a still frame, so the page never hangs on a spinner.",
        "A render shows the design, not a survey result: dimensions come from the client's schedule, and assumptions go into a separate list. If the layout changes after approval, the set needs a revision. We do not present a visualisation as as-built documentation.",
        "Availability and price sit in the same window as the apartment view. The manager updates the status in CRM, the page pulls the data, and calls asking whether a unit is still free leave the queue. The freed hours go to viewings and deals.",
        "We test the scene on a phone and a mobile network, not only on an office monitor. The first screen serves a still image, and the heavy model loads on tap. The page opens on a weak connection too.",
      ],
    },
    {
      title: "How the sales team works",
      items: [
        "A lead from the website or a listing platform lands in CRM and gets a reply within minutes, including evenings and weekends. The agent clarifies budget, timing, room count and payment method, and the manager joins a ready dialogue. Reply speed matters more than the script: a buyer calls three developers in a row.",
        "Follow-up runs on a schedule: first touch, a reminder on day two and a final message on day five. A client reply closes the series, while silence leaves the lead in nurture. Without the series a warm request cools down within a week, as the buyer picks another property.",
        "One lead gets one card: duplicates close by phone and email, and the dialogue history stays in the deal. The manager sees the transcript, the collected fields and the next step, not a retelling from memory. The handover takes a minute, and the manager does not ask the same questions again.",
        "Deal documents follow the same loop: contracts, extracts and acts are recognised, fields are checked against reference data, and mismatches go to an operator. On clean scans field accuracy is 95–99%, and handwritten forms need review. Only disputed documents reach the operator.",
        "The demand and price forecast updates weekly, and the sales plan updates monthly. The model learns on at least 12 months of history; on new properties it relies on analogues and admits the error is higher there. Without history a forecast stays a guess, and we say so before the start.",
      ],
    },
  ],
};
