export const computer_visionEn = {
  ctaBanner: {
    title: "We'll test the task on your footage",
    text: "Send sample images or line video. We'll estimate model accuracy, rollout time, and hardware cost for your throughput.",
    buttonLabel: "Get an estimate",
  },
  navTitle: "Computer Vision",
  title: "Computer Vision Implementation",
  tagline: 'Teach your system to "see" and automate quality control, security, and accounting.',
  description:
    "Computer vision recognizes objects, defects, and events in images and video in real time. We select and deploy ready-made models for your business tasks.",
  features: [
    {
      title: "Quality control",
      text: "Automated product inspection on the production line: defects, rejects, standard compliance.",
    },
    {
      title: "Document recognition",
      text: "OCR recognition of passports, waybills, and contracts with automatic entry into the database.",
    },
    {
      title: "Security video analytics",
      text: "Site monitoring, access control, incident and alarm event detection.",
    },
    {
      title: "Inventory and accounting",
      text: "Counting goods on shelves and in warehouses from photos – no manual recounts.",
    },
  ],
  processSteps: [
    {
      title: "Task breakdown",
      text: "We define what the system should see: defects, objects, events. We collect a sample of real frames from your cameras.",
    },
    {
      title: "Model selection",
      text: "We pick a ready model for the accuracy, speed, and cost that fit. We do not build from scratch if a ready one covers the job.",
    },
    {
      title: "Training and validation",
      text: "We fine-tune on your data and check metrics on a test set. We show where the model is strong and where it fails.",
    },
    {
      title: "Deployment and monitoring",
      text: "A pilot on one line or point, then scaling. We track production accuracy and retrain when data drifts.",
    },
  ],
  fitItems: [
    {
      title: "A flow of similar objects",
      text: "Products on a line, goods on shelves, documents in a stream. The more uniform the flow, the more accurate the result.",
      positive: true,
    },
    {
      title: "Complex visual inspection",
      text: "Defects that are hard to describe in words but easy to show in photos. The model learns from samples faster than a hand-written algorithm.",
      positive: true,
    },
    {
      title: "Unstable shooting conditions",
      text: "Harsh light, shadows, reflections, and angles keep changing. This needs weeks of data collection, not a one-day pilot.",
      positive: false,
    },
    {
      title: "A task without repetition",
      text: "There is nothing to generalize when every frame is unique and the answer depends on human context.",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "Quality control on the production line",
      text: "The system inspected products on the conveyor from camera photos: it caught rejects and marked defects before packaging. Operators switched to edge cases.",
      metricValue: "−60%",
      metricLabel: "defects that reached the client",
    },
  ],
  faqItems: [
    {
      question: "How much data do we need to start?",
      answer:
        "200–500 labeled images are enough for a pilot. After that the model improves on new cases you add to the set.",
    },
    {
      question: "Which cameras will work?",
      answer:
        "Most cameras with an API: industrial, IP cameras, phone cameras, and offline store frames. We keep your hardware if the signal is already there.",
    },
    {
      question: "What happens to accuracy over time?",
      answer:
        "Data drifts: light, assortment, and packaging change. We set up accuracy monitoring and retraining so results do not degrade.",
    },
    {
      question: "Does it work in real time?",
      answer:
        "Yes, inference takes tens of milliseconds per frame. Latency suits conveyors, checkpoints, and checkouts.",
    },
  ],
  sections: [
    {
      title: "First, decide what counts as a defect",
      items: [
        "Before training a model, we agree with your technologists on what counts as a defect: a scratch on the housing, a shift in packaging color, or a seam offset of two millimeters. The rule must be readable in a photo, not live only in an operator's head. A mismatch in describing a defect costs more than all the training stages.",
        "A model errs in two directions: it misses a defect or raises a false alarm. Tighten the trigger threshold, and a stream of faulty housings keeps moving down the line. Loosen it, and the line starts stopping for a harmless reflection. Both mistakes cost money, so we convert both into rubles before the pilot starts.",
        "Before launch we price each kind of error: a client claim for a missed defect, or a rework of a batch caused by extra stops. On a food conveyor the claim money decides, while at checkout areas it matters more not to stop the flow. We set the trigger threshold against whichever hits the budget harder.",
        "We report with metrics, not pictures full of green checkmarks: recall shows what share of defects the model found out of all of them, and precision says how many alarms were real. Target values go into the brief before work starts. A missing recall rate shows up in numbers at the very first validation, and we track it over iterations.",
        "Frames where the model hesitates are neither scrapped nor silently passed: an operator reviews them on a separate screen. In practice this clears most borderline cases at the cost of a few seconds of attention per hour. No automation where the outcome affects a customer claim runs without a human check.",
        "We never promise that one hundred percent of defects will be caught, that is fairy-tale talk from vendor decks. On a line with forty thousand parts per shift, even 99.9% recall leaves a tail of misses. We name beforehand where that tail stays across the whole flow and how often an operator will pick it up by hand after the shift.",
      ],
    },
    {
      title: "Where vision pays off within a quarter",
      items: [
        "The fastest payback comes from exit control before packaging: a faulty part is cut off before a price tag, a pair, and labeling are invested in it. Rework at the end costs many times more than retraining the model, so this is exactly where we start a pilot at nearly every plant.",
        "In a warehouse and on a shop floor, video analytics watches for helmets and vests and, on a violation, immediately sends a warning to the employee and the shift supervisor. We review the incident the same day, not from recordings a week later. Some insurance case on site usually turns out to be exactly that recording.",
        "Claims with photos from distributors are processed in one evening: the model automatically sorts incoming defects into categories, and the quality department immediately sees where the plant is weak. Instead of reading letters one by one, a specialist gets a table with seven typical causes and their shares.",
        "Short runs and frequent assortment changes do not scare the model: a few hundred shots are enough for a new SKU, and retraining happens overnight. Reconfiguring a mechanical sorter takes a week and two mechanics, and that repeats with every changing article. Retraining here turns out cheaper than weekly manual tuning.",
        "Warehouse inventory stops being a night shift: photographing the racks and recognizing containers takes an hour instead of eight hours of a storekeeper. The gap against actual stock stays within a couple of percent, and that accuracy is enough for purchase planning. A repeated run is free, so we count every week, not once a quarter.",
        "We honestly say when vision will not pay off: fewer than a thousand parts a day, a one-month order, or a line where the operator already manages to inspect everything. In such cases the deployment costs more than reworking the defects by hand, and we take no project, offering to return to it once volume grows.",
      ],
    },
    {
      title: "What you need for data and hardware",
      items: [
        "The real effort in a project is not the models but the data: a labeled set takes weeks to collect and gets corrected after the first runs. We budget for that from week one instead of remembering it at the pilot. A model without solid labeled data is a nice hypothesis, not a working tool.",
        "We run labeling together with your technologists, since they know defects better than any outside contractor. An employee who labels a couple of hours a day gives a clear gain in recall within a month, and their notes on unusual cases end up in the test set. So the knowledge base grows inside the plant.",
        "Before buying expensive cameras, we stabilize the light: lamps and diffusers on the line are often cheaper than a pair of GPUs and remove half of recognition errors. Light, not the model, makes most frames readable. A shadow from an operator cast on the conveyor causes more false alarms than the weakest model.",
        "You can run the model right on a camera or on a server with a GPU. Edge devices are cheap on a flow and do not depend on the network, but they fall short on complex scenes. A server setup is easier to update and scale, though it brings a steady cost line for rent, electricity, cooling, and maintenance.",
        "We put retraining in the budget from the very start: once a month the model is retrained on new examples that operators added over that period. The reserve for this is tiny, yet without it accuracy quietly slips down. Light, assortment, and packaging change faster than you would like.",
        "Vision needs constant care: someone has to add examples, answer operators' questions, and watch the metrics. If the team has no half-time engineer for support, it is more honest to discuss that before we start than to catch a drop in accuracy later and blame the system. Missing support is what most often kills a project within six months.",
      ],
    },
  ],
};
