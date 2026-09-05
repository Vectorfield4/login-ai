import type { RuDict } from "./ru";

/** Английский словарь — структура должна совпадать с ru.ts (тип RuDict). */
export const en: RuDict = {
  ui: {
    menu: {
      home: "Home",
      solutions: "Solutions",
      services: "Services",
      cases: "Cases",
      contacts: "Contacts",
      openMenu: "Open menu",
      allServices: "All services",
    },
    theme: {
      toggleDark: "Enable dark theme",
      toggleLight: "Enable light theme",
    },
    lang: {
      switchTo: "Switch language",
    },
    footer: "© {{year}} Login AI",
  },

  home: {
    heroSubtitle: "AI solutions for business: from agentic systems to content generation.",
    heroText:
      "We automate processes, deploy computer vision, improve customer service, and accelerate content creation — fast, simple, and measurable.",
    heroCta: "Our services",
    heroSolutionsCta: "Solutions",
    servicesEyebrow: "What we do",
    servicesTitle: "Services",
    servicesSubtitle: "From software and websites to SEO, AEO and data monitoring — end to end.",
    servicesAll: "All services",
    solutionsEyebrow: "AI products",
    solutionsTitle: "Solutions",
    solutionsSubtitle: "Ready-made directions for bringing AI into your business.",
    filters: {
      audienceLabel: "For whom",
      technologyLabel: "Technology",
      empty: "Nothing matches the selected filters — try different ones.",
    },
    pagination: {
      prev: "Previous solutions page",
      next: "Next solutions page",
    },
    ctaTitle: "Ready to start?",
    ctaText: "Tell us about your task — we'll match a solution or service and prepare a quote.",
    ctaButton: "Discuss your task",
    metaTitle: "AI Solutions for Business",
    metaDescription:
      "Custom AI solutions: agentic systems, computer vision, content and video generation. We automate processes and accelerate business growth.",
  },

  audiences: {
    all: "For everyone",
    manufacturers: "Manufacturers",
    clinics: "Clinics",
    adAgencies: "Advertising agencies",
    businessOwners: "Business owners",
  },

  technologies: {
    any: "Any",
    computerVision: "Computer vision",
    agentic: "Agentic systems",
    content: "Content generation",
    video: "Video generation",
    reputation: "Reputation management",
    llm: "LLM & AI assistants",
  },

  crossSells: {
    title: "How we can help you",
    manufacturers: {
      "computer-vision": "Quality and defect control on the production line",
      "agentic-systems": "Automate requests, documents, and approvals on the shop floor",
      "reputation-management": "Monitor and manage reviews of your products",
    },
    "reputation-management": {
      "content-generation": "Content for social media and review responses",
      "customer-experience": "Service that retains customers and reduces negative feedback",
    },
  },

  servicesPage: {
    title: "Services",
    subtitle: "Development, promotion and data work — end to end.",
    text: "From software and websites to SEO, AEO and information monitoring. Choose a service to learn more.",
    sectionEyebrow: "Directions",
    sectionTitle: "What we do",
    sectionSubtitle: "Every service comes with a transparent process and measurable results.",
    ctaTitle: "Didn't find a suitable service?",
    ctaText: "Tell us about your task — we'll propose the best solution and a quote.",
    ctaButton: "Discuss your task",
    metaDescription:
      "Full-cycle services: software and corporate-site development, landing pages, SEO & AEO, information monitoring, AI training for teams. Transparent process, measurable results.",
  },

  servicePage: {
    back: "← All services",
    featuresEyebrow: "What's included",
    featuresTitle: "Capabilities",
    categoriesEyebrow: "Stack & technologies",
    categoriesTitle: "Software types and technologies",
    categoriesSubtitle: "We choose a best-practice stack for each product type.",
    alertInterest:
      "Interested in this service? Contact us and we'll prepare a quote for your task.",
    ctaTitle: "Ready to discuss your task?",
    ctaText: "Leave a request — we'll get back with a proposal and a preliminary estimate.",
    ctaButton: "Contact us",
  },

  solutionPage: {
    back: "← Home",
    featuresEyebrow: "What's included",
    featuresTitle: "Capabilities",
    alertInterest: "Interested in this solution? Contact us — we'll prepare a quote for your task.",
    techEyebrow: "Technologies",
    techTitle: "Generation methods",
    refsEyebrow: "References",
    refsTitle: "Working with references",
    catsEyebrow: "Business tasks",
    catsTitle: "By business task",
    portfolioEyebrow: "Portfolio",
    ctaTitle: "We bring AI into your business",
    ctaText: "Tell us about your processes — we'll propose a solution and an implementation plan.",
    ctaButton: "Discuss the project",
  },

  contactsPage: {
    title: "Contacts",
    subtitle: "Write to us — we'll discuss the task and prepare a quote.",
    text: "Tell us about your project or task: we'll pick a solution, estimate timelines, and get back with a proposal.",
    sectionEyebrow: "Get in touch",
    sectionTitle: "How to reach us",
    sectionSubtitle: "Our primary channel is email.",
    emailCardTitle: "Email",
    emailCardText: "For any questions: ideas, projects, quotes and partnerships.",
    fastCardTitle: "Fast response",
    fastCardText: "We usually reply within one business day.",
    personalCardTitle: "Personal approach",
    personalCardText: "We'll dig into your task and propose the best solution and quote.",
    metaDescription:
      "Tell us about your task — we will find the right AI solution and prepare a quote. Primary contact channel: sales@loginai.ru.",
  },

  casesPage: {
    title: "Cases",
    subtitle:
      "A selection of projects with measurable results — from agentic systems to video generation.",
    text: "Tell us about your task — we'll show how such a project looks for your business and prepare a quote.",
    sectionEyebrow: "Portfolio",
    sectionTitle: "Work examples",
    sectionSubtitle:
      "Each case is a typical implementation scenario: task, approach, and measurable result.",
    demoNotice:
      "The examples below are demo cases built from typical tasks. Real client material is coming at the next stage — request a demo and we'll show a project on your task.",
    cardSolutionLink: "More about the solution",
    ctaTitle: "Want a similar result?",
    ctaText:
      "Tell us about your task — we'll propose a solution in the spirit of the cases above and prepare a quote.",
    ctaButton: "Discuss your task",
    metaDescription:
      "AI implementation cases: agentic systems, computer vision, content and video generation, reputation management. Tasks, approaches, and measurable results.",
  },

  showcase: {
    demoTitle: "Want a demo?",
    demoText:
      "Category “{{title}}”. Video examples are coming in the next stage — request a demo and we'll show the possibilities on your task.",
    demoCta: "Yes, I want a demo",
    close: "Close",
    bannerText: "Enjoyed the example? Get a demo and a quote for your task.",
    bannerAction: "Leave a request",
  },

  solutions: {
    "agentic-systems": {
      navTitle: "Agentic Systems",
      title: "Business Process Modernization with Agentic Systems",
      tagline: "Automate routine operations and speed up decision-making with AI agents.",
      description:
        "Agentic systems are AI assistants that plan, execute, and control tasks on their own. We deploy them into your business processes so your team focuses on strategy instead of routine.",
      features: [
        {
          title: "Routine automation",
          text: "Agents handle lead processing, document filling and approvals — 24/7 without errors.",
        },
        {
          title: "CRM and ERP integration",
          text: "We connect agents to 1C, Bitrix24, amoCRM and other systems — data is always in one place.",
        },
        {
          title: "Smart employee assistants",
          text: "Internal assistants answer questions, prepare reports, and suggest next steps.",
        },
        {
          title: "Control and transparency",
          text: "Every agent action is logged: you always see what was done and why.",
        },
      ],
    },
    "computer-vision": {
      navTitle: "Computer Vision",
      title: "Computer Vision Implementation",
      tagline: "Teach your system to “see” and automate quality control, security, and accounting.",
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
          text: "Counting goods on shelves and in warehouses from photos — no manual recounts.",
        },
      ],
    },
    "customer-experience": {
      navTitle: "Customer Experience",
      title: "Improving Customer Experience",
      tagline: "Answer customers faster, anticipate their needs, and keep them loyal.",
      description:
        "We make customer service fast, personalized, and omnichannel: from chatbots to feedback analysis and personal recommendations.",
      features: [
        {
          title: "Chatbots and assistants",
          text: "Instant answers in chat, messengers, and on your website 24/7 — in Russian and other languages.",
        },
        {
          title: "Personal recommendations",
          text: "We match products and services to each customer based on their behavior and preferences.",
        },
        {
          title: "Feedback analysis",
          text: "We detect the sentiment of reviews and inquiries and find weak points in your service.",
        },
        {
          title: "Omnichannel",
          text: "A unified customer history across all channels: website, phone, messengers, offline stores.",
        },
      ],
    },
    "content-generation": {
      navTitle: "Content Generation",
      title: "Content Generation",
      tagline: "Create texts, images, and mailings many times faster with AI.",
      description:
        "AI content generation helps marketing and sales: texts for websites and social media, images, scripts, personalized mailings — all in a consistent brand style.",
      features: [
        {
          title: "Marketing copy",
          text: "Articles, posts, product descriptions, and ad creatives — per your brief and tone.",
        },
        {
          title: "Image generation",
          text: "Visuals for social media, banners, and illustrations from a text description.",
        },
        {
          title: "Personalized mailings",
          text: "Emails and messages that adapt to each recipient's segment and interests.",
        },
        {
          title: "Content localization",
          text: "Fast translation and adaptation of materials for other markets and audiences.",
        },
      ],
    },
    "app-development-systems": {
      navTitle: "App Development Systems",
      title: "Building Application Development Systems",
      tagline:
        "We build an AI development pipeline: agent workers, smart harnesses, and cost-efficient models.",
      description:
        "We build your own application development systems on top of leading agent harnesses — pi.dev, Hermes, and similar. The system writes code, runs checks, fixes errors, and delivers finished tasks under developer supervision.",
      features: [
        {
          title: "Leading agent harnesses",
          text: "We connect pi.dev, Hermes, and other top agent harnesses — the system works like an autonomous dev team: code, tests, review, and deploy.",
        },
        {
          title: "Smart cost-efficient model choice",
          text: "We pick the optimal models for each task: cheap fast models for routine, powerful ones for complex logic. Pay for results, not overpay.",
        },
        {
          title: "Integration with your stack",
          text: "We embed the system into your existing workflow: Git, CI/CD, code review, and task trackers — no team restructuring.",
        },
        {
          title: "Quality control and audit",
          text: "Every change passes automated checks and is recorded: you always see what the system did and why.",
        },
      ],
    },
    "medical-clinics": {
      navTitle: "Medical Clinics",
      title: "AI Solutions for Medical Clinics",
      tagline: "Reduce doctors' paperwork and improve patient care with AI.",
      description:
        "We bring AI into medical clinics: assistants help doctors run appointments and handle documentation, while patients get a digital helper to manage their treatment. The clinic reduces staff workload, improves diagnostic accuracy, and forecasts patient flow.",
      features: [
        {
          title: "Doctor's assistant",
          text: "An AI assistant for doctors: clinical protocol hints, notes and template preparation, automatic history summaries — less paperwork, more time for patients.",
        },
        {
          title: "Patient diary",
          text: "An app and chatbot for patients: symptom journal, medication reminders, and sharing progress with the doctor between visits.",
        },
        {
          title: "AI triage of initial complaints",
          text: "Automatic analysis of initial complaints and routing to the right specialist — patients reach the correct doctor faster, and admins are unloaded.",
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
          text: "Transcription and automatic summaries of online consultations — doctors don't get distracted by notes, and patients get clear recommendations.",
        },
      ],
    },
    "video-generation": {
      navTitle: "Video Generation",
      title: "Video Generation",
      tagline: "We create videos end to end: from script and references to final editing.",
      description:
        "We generate videos with cutting-edge AI models: text to video, image to video, and script to video. We run a process with validation and pre/post-processing — tailored to a specific business task, from advertising to corporate films.",
      sections: [
        {
          title: "Process",
          items: [
            "Brief and task definition — we define the video goal, audience, format, and platforms",
            "Script and storyboard — we write the script, split it into shots, and prepare prompts",
            "Reference gathering — we collect examples of style, rhythm, and mood",
            "Generation — we create draft shots and takes on the selected models",
            "Validation and iterations — we check alignment with the brief and refine problem shots",
            "Post-production and delivery — editing, sound, subtitles, and final versions per platform",
          ],
        },
        {
          title: "Models",
          items: [
            "Text to Video: Veo, Sora, Runway Gen-3, Kling, Luma Dream Machine, Pika",
            "Image to Video: animating frames and images — Runway, Kling, Luma",
            "Avatar models: HeyGen, Synthesia — virtual presenters and speakers",
            "Model selection per task: speed, cost, quality, and style",
          ],
        },
        {
          title: "Validation",
          items: [
            "Alignment with the brief — we check the story, meaning, and tone of voice",
            "Picture quality — artifacts, face and text distortion, frame stability",
            "Character and style consistency between frames",
            "Legal cleanliness: content rights and platform policy compliance",
            "Client sign-off and iterations until the final result",
          ],
        },
        {
          title: "Pre- and post-processing",
          items: [
            "Pre-processing: references, prompts, storyboard, avatars, and brand book",
            "Post-processing: editing, color grading, music, and subtitles",
            "Upscaling, stabilization, and frame refinement",
            "Final assembly for platforms: 16:9, 9:16, 1:1",
          ],
        },
      ],
      technologies: [
        {
          title: "Text to Video",
          text: "We generate video from a text description: scene, motion, style, and camera angle.",
        },
        {
          title: "Image to Video",
          text: "We bring images and frames to life: photos, illustrations, renders, and motion animation.",
        },
        {
          title: "Script to Video",
          text: "We turn a script into a finished video with voice-over, subtitles, and editing.",
        },
      ],
      referencesNote:
        "Working with references: we collect examples of style, lighting, editing, and rhythm — and feed them into generation so the result matches your expectations and brand book. References let models hit the right look from the first iteration.",
      businessCategories: [
        {
          title: "Advertising & marketing",
          text: "Ad videos, teasers, banner videos, and creatives for social media and media buying.",
        },
        {
          title: "Educational & explainer videos",
          text: "Instructions, product overviews, screencasts, and explainer videos that make complex topics clear.",
        },
        {
          title: "Virtual presenters (Avatars)",
          text: "Videos with AI presenters: news, courses, presentations, and personalized customer messages.",
        },
        {
          title: "Product & real estate visualization",
          text: "Product showcases, interiors and exteriors of properties, virtual tours.",
        },
        {
          title: "Cinematic & creative",
          text: "Music videos, teasers, art films, and creative experiments in any style.",
        },
        {
          title: "Brand & corporate",
          text: "Brand films, corporate movies, and event videos in your brand style.",
        },
      ],
      showcase: {
        title: "Video examples",
        note: "Example embeds are coming in the next stage — for now, a click opens a demo request.",
        items: [
          { title: "Advertising & marketing" },
          { title: "Educational & explainer videos" },
          { title: "Virtual presenters (Avatars)" },
          { title: "Product & real estate visualization" },
          { title: "Cinematic & creative" },
          { title: "Brand & corporate" },
        ],
      },
    },
    manufacturers: {
      navTitle: "Manufacturers",
      title: "AI Solutions for Manufacturers",
      tagline: "Improve quality, cut costs, and speed up production with AI.",
      description:
        "AI helps manufacturing companies at every stage: automatic quality control, predictive equipment maintenance, inventory and logistics optimization, and document and request automation. We deploy solutions that pay off fast and scale easily to new lines and sites.",
      features: [
        {
          title: "AI-powered quality control",
          text: "Automated product inspection on the line: defects, rejects, standard compliance — faster and more accurate than the human eye.",
        },
        {
          title: "Predictive equipment maintenance",
          text: "We analyze sensor data and predict machine failures — scheduled repairs instead of breakdowns, less downtime.",
        },
        {
          title: "Production process optimization",
          text: "We analyze line utilization, bottlenecks, and losses — find efficiency reserves and cut costs.",
        },
        {
          title: "Document flow automation",
          text: "AI agents handle requests, waybills, and approvals — your team focuses on production, not paperwork.",
        },
        {
          title: "Demand and inventory forecasting",
          text: "We forecast product demand and optimize raw material and finished goods inventory — less frozen capital.",
        },
        {
          title: "Reputation management",
          text: "We monitor product reviews on marketplaces and platforms, respond, and manage brand reputation.",
        },
      ],
    },
    "reputation-management": {
      navTitle: "Reputation Management",
      title: "AI-Powered Reputation Management",
      tagline: "Review monitoring, smart responses, and growing brand trust.",
      description:
        "We collect reviews from all platforms — marketplaces, maps, social media, review sites, press — analyze sentiment and topics, respond to reviews, and handle negative feedback. Reputation management builds trust, influences purchase decisions, and improves search visibility.",
      features: [
        {
          title: "All-platform monitoring",
          text: "Reviews from marketplaces, maps, social media, review sites, and press — in one dashboard.",
        },
        {
          title: "Sentiment and topic analysis",
          text: "We detect the sentiment of each review and cluster frequent topics: quality, service, delivery, price.",
        },
        {
          title: "Smart review responses",
          text: "We generate personalized replies in your brand tone — fast and at scale.",
        },
        {
          title: "Negative feedback handling",
          text: "We spot negative reviews first, analyze causes, and prevent crises.",
        },
        {
          title: "Reports for management",
          text: "Regular digests: rating dynamics, competitors, sales impact, and key issues.",
        },
      ],
    },
  },

  services: {
    "software-development": {
      navTitle: "Software Development",
      title: "Custom Software Development",
      tagline: "We build reliable software for your needs: from web services to AI platforms.",
      description:
        "We design and develop full-cycle software: requirements analysis, architecture, development, testing, and maintenance. We pick a best-practice stack for each product type — so the system is fast, secure, and scalable.",
      features: [
        {
          title: "Full-cycle development",
          text: "From prototype and architecture to release and support: you get a finished product, not a pile of code.",
        },
        {
          title: "Solid architecture",
          text: "We design modular, testable, and scalable systems — ready for load and business growth.",
        },
        {
          title: "Quality and security",
          text: "Automated tests, code review, security audits, and industry-standard compliance.",
        },
        {
          title: "Support and growth",
          text: "We maintain the product after launch: updates, new features, and optimization.",
        },
      ],
      categories: [
        {
          title: "Web apps & SaaS",
          items: [
            "TypeScript",
            "JavaScript",
            "React",
            "Next.js",
            "Vue.js",
            "Angular",
            "Node.js",
            "Python (Django, FastAPI)",
            "Go",
            "PHP (Laravel)",
          ],
        },
        {
          title: "Mobile apps",
          items: [
            "Swift (iOS)",
            "Kotlin (Android)",
            "Flutter (Dart)",
            "React Native",
            "Java (Android)",
          ],
        },
        {
          title: "Desktop apps",
          items: ["C# (.NET)", "C++", "Rust (Tauri)", "Electron (TypeScript)", "Python (Qt)"],
        },
        {
          title: "Backend & API",
          items: [
            "Go",
            "Rust",
            "TypeScript (Node.js)",
            "Python (FastAPI)",
            "Java (Spring Boot)",
            "C# (.NET)",
          ],
        },
        {
          title: "AI & machine learning",
          items: ["Python (TensorFlow, PyTorch)", "C++", "R", "CUDA", "JavaScript (ONNX Runtime)"],
        },
        {
          title: "Enterprise systems (ERP, CRM)",
          items: ["Java", "C# (.NET)", "Python", "TypeScript", "1C:Enterprise"],
        },
        {
          title: "E-commerce",
          items: ["TypeScript (Next.js)", "PHP (Laravel)", "Java", "Go", "Python (Django)"],
        },
        {
          title: "Bots & automation",
          items: ["Python", "TypeScript", "JavaScript", "Go"],
        },
        {
          title: "Embedded software & IoT",
          items: ["C", "C++", "Rust", "Python (MicroPython)"],
        },
      ],
    },
    "corporate-websites": {
      navTitle: "Corporate Websites",
      title: "Corporate Website Development",
      tagline: "A modern company website: presentation, trust, and a flow of leads.",
      description:
        "We create corporate websites that work for your business: thoughtful structure, brand design, an easy admin panel, and integrations with CRM, analytics, and payment systems.",
      features: [
        {
          title: "Structure & UX",
          text: "We design information architecture and user journeys — visitors find what they need fast.",
        },
        {
          title: "Brand design",
          text: "Design in your style: responsive layouts for all devices, a unified visual language.",
        },
        {
          title: "Easy admin panel",
          text: "Edit content without a developer: news, pages, catalog, and leads.",
        },
        {
          title: "Integrations",
          text: "CRM, telephony, analytics, maps, forms, and payment systems — everything works out of the box.",
        },
      ],
    },
    "landing-pages": {
      navTitle: "Landing Pages",
      title: "Landing Page Development",
      tagline: "High-converting one-pagers that turn visitors into customers.",
      description:
        "We build landing pages for ad campaigns and products: a sales-focused structure, fast loading, A/B tests, and funnel analytics. Launch in days.",
      features: [
        {
          title: "Sales-focused structure",
          text: "Offer, benefits, proof, call to action — every block works toward conversion.",
        },
        {
          title: "High speed",
          text: "We optimize loading and Core Web Vitals — the page opens instantly, even on mobile.",
        },
        {
          title: "A/B testing",
          text: "We test headlines, offers, and buttons — amplifying what brings more leads.",
        },
        {
          title: "CRM integration",
          text: "Leads go straight to amoCRM, Bitrix24, or email; notifications and trigger emails are set up.",
        },
      ],
    },
    "seo-aeo": {
      navTitle: "SEO & AEO",
      title: "SEO and AEO — Optimization for Search and AI Agents",
      tagline: "Be visible both in classic search and in AI assistant answers.",
      description:
        "SEO moves your site to the top of classic search results, while AEO (Agent Engine Optimization) makes your content understandable for AI agents — ChatGPT, Perplexity, and search AI. Together they drive traffic and trust.",
      features: [
        {
          title: "Technical SEO",
          text: "Indexing, speed, URL structure, microdata, and sitemap — the base for ranking growth.",
        },
        {
          title: "Content strategy",
          text: "Semantics, page structure, and texts that answer real user questions.",
        },
        {
          title: "AEO — AI optimization",
          text: "Structured data, FAQ, clear answers, and citable blocks — your content gets into AI answers.",
        },
        {
          title: "Monitoring and reports",
          text: "We track positions, traffic, and mentions in AI answers, showing measurable results.",
        },
      ],
    },
    "information-monitoring": {
      navTitle: "Information Monitoring",
      title: "Custom Data Collection and Monitoring",
      tagline:
        "Parsing, price, competitor, and mention monitoring — the right data at the right time.",
      description:
        "We collect information from open sources: websites, marketplaces, social media, and press. We set up regular monitoring with reports and alerts so you always know what's happening in the market.",
      features: [
        {
          title: "Data parsing",
          text: "Collecting data from websites and marketplaces by custom rules: catalogs, prices, specs, reviews.",
        },
        {
          title: "Competitor monitoring",
          text: "We track competitors' prices, promotions, assortment, and content — changes are captured automatically.",
        },
        {
          title: "Media & social monitoring",
          text: "Brand and topic mentions in news, Telegram, VK, and reviews — with sentiment and sources.",
        },
        {
          title: "Reports and alerts",
          text: "Regular digests, alerts on important changes, and data export to Excel, API, or your CRM.",
        },
      ],
    },
    "corporate-ai-training": {
      navTitle: "Corporate AI Training",
      title: "Corporate Training for Working with AI",
      tagline:
        "We teach teams and managers to use AI at work: from prompt engineering to process automation.",
      description:
        "We run corporate training on AI tools: large language models (LLM), prompt engineering, generative AI, and routine task automation. We help embed AI into company processes: programs for managers and teams, real-case reviews, plus safety and responsibility practices when working with AI.",
      features: [
        {
          title: "Hands-on AI tools",
          text: "We teach working with LLMs and generative AI: ChatGPT and similar, document processing, data analysis, and content creation.",
        },
        {
          title: "Prompt engineering",
          text: "We master effective prompting: structure, context, and iterations that produce accurate, useful answers.",
        },
        {
          title: "Embedding AI into processes",
          text: "We find tasks that can be handed to AI and automate them: from emails and reports to customer inquiry handling.",
        },
        {
          title: "Safety and responsibility",
          text: "We teach safe AI usage: data protection, confidentiality, fact-checking, and corporate policies.",
        },
      ],
    },
  },

  cases: {
    "retail-support-bot": {
      title: "Agentic support for an online store",
      tagline: "Requests, orders and documents — no operator involved",
      description:
        "An AI agent picks up inquiries from chat and email, clarifies details, places orders and pushes them to the CRM. Operators step in only for edge cases.",
      metrics: [
        { label: "Request handling time", value: "−70%" },
        { label: "Inquiries without an operator", value: "82%" },
        { label: "Availability", value: "24/7" },
      ],
    },
    "quality-vision-line": {
      title: "Quality control on a production line",
      tagline: "Computer vision catches defects before a human does",
      description:
        "Cameras inspect every unit in real time and stop the line when a defect appears. The model was trained on the plant's defect archive and keeps learning from new data.",
      metrics: [
        { label: "Escaped defects", value: "−90%" },
        { label: "Inspection speed", value: "5× faster" },
        { label: "Payback", value: "8 months" },
      ],
    },
    "clinic-ai-assistant": {
      title: "An AI assistant for clinic doctors",
      tagline: "Less paperwork — more time with patients",
      description:
        "The assistant drafts visit notes, suggests clinical protocols, and keeps the patient diary between visits. Documentation is filled in automatically — the doctor just reviews it.",
      metrics: [
        { label: "Doctor time on paperwork", value: "−40%" },
        { label: "Patients staying in treatment", value: "+25%" },
        { label: "Assistant availability", value: "24/7" },
      ],
    },
    "agency-content-pipeline": {
      title: "A content pipeline for an ad agency",
      tagline: "Posts, banners and mailings in brand style",
      description:
        "We generate material from briefs, validate it with an editor and a tone check, and publish on a calendar. The agency ships several times more content without growing the team.",
      metrics: [
        { label: "Publishing volume", value: "×3" },
        { label: "Time to prepare a post", value: "−60%" },
        { label: "Audience engagement", value: "+30%" },
      ],
    },
    "product-launch-video": {
      title: "A promo video for a product launch",
      tagline: "From script to final edit in a week",
      description:
        "We gathered references, generated shots and cut the video for every platform: 16:9, 9:16 and 1:1. Brand-book alignment took three iterations instead of the usual weeks.",
      metrics: [
        { label: "Production time", value: "7 days" },
        { label: "Platform versions", value: "5" },
        { label: "Cost per video", value: "−50%" },
      ],
    },
    "marketplace-reputation": {
      title: "Reputation management on marketplaces",
      tagline: "Review monitoring and on-brand replies",
      description:
        "We collect reviews across platforms, detect sentiment, and reply to every one: negative feedback is handled within the hour. Topic analysis shows what to improve in the product and the listing.",
      metrics: [
        { label: "Time to reply to a review", value: "< 1 hour" },
        { label: "Share of negative reviews", value: "−35%" },
        { label: "Store rating", value: "4.8 out of 5" },
      ],
    },
  },
};
