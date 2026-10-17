import type { CalculatorSpec } from "@/shared/types/calculator";
import type { Solution } from "../solutions";

/**
 * Platform estimator: the implementation floor is `setup`, the channel mix is a
 * multiselect of one-off work, and monthly languages drive the recurring period.
 */
const calculator: CalculatorSpec = {
  unit: "month",
  horizon: 12,
  fields: [
    {
      kind: "multiselect",
      id: "channels",
      label: "calculator.fields.channels",
      options: [
        { value: "blog", label: "calculator.options.blog", icon: "article" },
        { value: "social", label: "calculator.options.social", icon: "support-agent" },
        { value: "email", label: "calculator.options.email", icon: "insights" },
      ],
      default: ["blog"],
    },
    {
      kind: "stepper",
      id: "languages",
      label: "calculator.fields.languages",
      min: 1,
      max: 5,
      default: 1,
    },
    {
      kind: "segmented",
      id: "integration",
      label: "calculator.fields.integration",
      options: [
        { value: "standard", label: "calculator.options.standard" },
        { value: "crm", label: "calculator.options.crm" },
      ],
      default: "standard",
    },

    {
      kind: "toggle",
      id: "videoEnabled",
      label: "calculator.fields.video",
      default: false,
    },
    {
      kind: "multiselect",
      id: "video",
      label: "calculator.fields.content-generation.videoModes",
      options: [
        { value: "text-to-video", label: "technologies.textToVideo" },
        { value: "image-to-video", label: "technologies.imageToVideo" },
        { value: "video-to-video", label: "technologies.videoToVideo" },
      ],
      default: ["text-to-video"],
      minSelected: 1,
      visibleWhen: { field: "videoEnabled", equals: "true" },
    },
    {
      kind: "toggle",
      id: "imageEnabled",
      label: "calculator.fields.content-generation.image",
      default: false,
    },
    {
      kind: "multiselect",
      id: "image",
      label: "calculator.fields.content-generation.imageModes",
      options: [
        { value: "text-to-image", label: "technologies.textToImage" },
        { value: "image-to-image", label: "technologies.imageToImage" },
        { value: "inpainting", label: "technologies.inpainting" },
      ],
      default: ["text-to-image"],
      minSelected: 1,
      visibleWhen: { field: "imageEnabled", equals: "true" },
    },
    {
      kind: "toggle",
      id: "voiceEnabled",
      label: "calculator.fields.content-generation.voice",
      default: false,
    },
    {
      kind: "multiselect",
      id: "voice",
      label: "calculator.fields.content-generation.voiceModes",
      options: [
        { value: "text-to-speech", label: "technologies.textToSpeech" },
        { value: "voice-cloning", label: "technologies.voiceCloning" },
        { value: "music-generation", label: "technologies.musicGeneration" },
      ],
      default: ["text-to-speech"],
      minSelected: 1,
      visibleWhen: { field: "voiceEnabled", equals: "true" },
    },
    {
      kind: "toggle",
      id: "localization",
      label: "calculator.fields.content-generation.localization",
      default: false,
    },
    {
      kind: "toggle",
      id: "presentations",
      label: "calculator.fields.content-generation.presentations",
      default: false,
    },
  ],
  terms: [
    { kind: "setup", amount: 1500000, weeks: 8 },
    { kind: "perSelection", field: "channels", rates: { blog: 0, social: 120000, email: 80000 } },
    { kind: "perUnit", field: "languages", rate: 60000, weeksPerUnit: 0.5 },
    {
      kind: "multiplier",
      field: "languages",
      factors: { "1": 1, "2": 1.2, "3": 1.4, "4": 1.6, "5": 1.8 },
    },

    { kind: "addon", field: "integration", equals: "crm", ref: "crm" },
    {
      kind: "addon",
      field: "video",
      equals: "text-to-video",
      ref: "text-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "video",
      equals: "image-to-video",
      ref: "image-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "video",
      equals: "video-to-video",
      ref: "video-to-video",
      when: { field: "videoEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "image",
      equals: "text-to-image",
      ref: "text-to-image",
      when: { field: "imageEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "image",
      equals: "image-to-image",
      ref: "image-to-image",
      when: { field: "imageEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "image",
      equals: "inpainting",
      ref: "inpainting",
      when: { field: "imageEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "voice",
      equals: "text-to-speech",
      ref: "text-to-speech",
      when: { field: "voiceEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "voice",
      equals: "voice-cloning",
      ref: "voice-cloning",
      when: { field: "voiceEnabled", equals: "true" },
    },
    {
      kind: "addon",
      field: "voice",
      equals: "music-generation",
      ref: "music-generation",
      when: { field: "voiceEnabled", equals: "true" },
    },
    { kind: "addon", field: "localization", ref: "localization" },
    { kind: "addon", field: "presentations", ref: "presentations" },
  ],
  included: [
    { kind: "capability", slug: "content" },
    { kind: "technology", slug: "llm" },
  ],
};

export const contentGeneration: Solution = {
  slug: "content-generation",
  navTitle: "solutions.content-generation.navTitle",
  title: "solutions.content-generation.title",
  tagline: "solutions.content-generation.tagline",
  description: "solutions.content-generation.description",
  price: { amount: 1500000, unit: "project" },
  calculator,
  packages: [
    { name: "pricing.packages.pilot", amount: 500000 },
    { name: "pricing.packages.implementation", amount: 1500000, from: true },
    { name: "pricing.packages.platform", amount: 3500000, from: true },
  ],
  ctaBanner: {
    title: "solutions.content-generation.ctaBanner.title",
    text: "solutions.content-generation.ctaBanner.text",
    buttonLabel: "solutions.content-generation.ctaBanner.buttonLabel",
  },
  audiences: ["audiences.clinics", "audiences.adAgencies", "audiences.businessOwners"],
  tags: ["capabilities.content", "technologies.video"],
  features: [
    {
      title: "solutions.content-generation.features.0.title",
      text: "solutions.content-generation.features.0.text",
    },
    {
      title: "solutions.content-generation.features.1.title",
      text: "solutions.content-generation.features.1.text",
    },
    {
      title: "solutions.content-generation.features.2.title",
      text: "solutions.content-generation.features.2.text",
    },
    {
      title: "solutions.content-generation.features.3.title",
      text: "solutions.content-generation.features.3.text",
    },
    {
      title: "solutions.content-generation.features.4.title",
      text: "solutions.content-generation.features.4.text",
    },
    {
      title: "solutions.content-generation.features.5.title",
      text: "solutions.content-generation.features.5.text",
    },
  ],
  processSteps: [
    {
      title: "solutions.content-generation.processSteps.0.title",
      text: "solutions.content-generation.processSteps.0.text",
      processType: "requirements",
    },
    {
      title: "solutions.content-generation.processSteps.1.title",
      text: "solutions.content-generation.processSteps.1.text",
      processType: "system-design",
    },
    {
      title: "solutions.content-generation.processSteps.2.title",
      text: "solutions.content-generation.processSteps.2.text",
      processType: "implementation",
    },
    {
      title: "solutions.content-generation.processSteps.3.title",
      text: "solutions.content-generation.processSteps.3.text",
      processType: "testing",
    },
    {
      title: "solutions.content-generation.processSteps.4.title",
      text: "solutions.content-generation.processSteps.4.text",
      processType: "analysis",
    },
    {
      title: "solutions.content-generation.processSteps.5.title",
      text: "solutions.content-generation.processSteps.5.text",
      processType: "deployment",
    },
  ],
  fitItems: [
    {
      title: "solutions.content-generation.fitItems.0.title",
      text: "solutions.content-generation.fitItems.0.text",
      positive: true,
    },
    {
      title: "solutions.content-generation.fitItems.1.title",
      text: "solutions.content-generation.fitItems.1.text",
      positive: true,
    },
    {
      title: "solutions.content-generation.fitItems.2.title",
      text: "solutions.content-generation.fitItems.2.text",
      positive: false,
    },
    {
      title: "solutions.content-generation.fitItems.3.title",
      text: "solutions.content-generation.fitItems.3.text",
      positive: false,
    },
  ],
  proofItems: [
    {
      title: "solutions.content-generation.proofItems.0.title",
      text: "solutions.content-generation.proofItems.0.text",
      metricValue: "solutions.content-generation.proofItems.0.metricValue",
      metricLabel: "solutions.content-generation.proofItems.0.metricLabel",
    },
    {
      title: "solutions.content-generation.proofItems.1.title",
      text: "solutions.content-generation.proofItems.1.text",
      metricValue: "solutions.content-generation.proofItems.1.metricValue",
      metricLabel: "solutions.content-generation.proofItems.1.metricLabel",
    },
  ],
  faqItems: [
    {
      question: "solutions.content-generation.faqItems.0.question",
      answer: "solutions.content-generation.faqItems.0.answer",
    },
    {
      question: "solutions.content-generation.faqItems.1.question",
      answer: "solutions.content-generation.faqItems.1.answer",
    },
    {
      question: "solutions.content-generation.faqItems.2.question",
      answer: "solutions.content-generation.faqItems.2.answer",
    },
    {
      question: "solutions.content-generation.faqItems.3.question",
      answer: "solutions.content-generation.faqItems.3.answer",
    },
    {
      question: "solutions.content-generation.faqItems.4.question",
      answer: "solutions.content-generation.faqItems.4.answer",
    },
    {
      question: "solutions.content-generation.faqItems.5.question",
      answer: "solutions.content-generation.faqItems.5.answer",
    },
  ],
  sections: [
    {
      title: "solutions.content-generation.sections.0.title",
      items: [
        "solutions.content-generation.sections.0.items.0",
        "solutions.content-generation.sections.0.items.1",
        "solutions.content-generation.sections.0.items.2",
        "solutions.content-generation.sections.0.items.3",
        "solutions.content-generation.sections.0.items.4",
      ],
    },
    {
      title: "solutions.content-generation.sections.1.title",
      items: [
        "solutions.content-generation.sections.1.items.0",
        "solutions.content-generation.sections.1.items.1",
        "solutions.content-generation.sections.1.items.2",
        "solutions.content-generation.sections.1.items.3",
        "solutions.content-generation.sections.1.items.4",
      ],
    },
    {
      title: "solutions.content-generation.sections.2.title",
      items: [
        "solutions.content-generation.sections.2.items.0",
        "solutions.content-generation.sections.2.items.1",
        "solutions.content-generation.sections.2.items.2",
        "solutions.content-generation.sections.2.items.3",
        "solutions.content-generation.sections.2.items.4",
      ],
    },
    {
      title: "solutions.content-generation.sections.3.title",
      items: [
        "solutions.content-generation.sections.3.items.0",
        "solutions.content-generation.sections.3.items.1",
        "solutions.content-generation.sections.3.items.2",
        "solutions.content-generation.sections.3.items.3",
        "solutions.content-generation.sections.3.items.4",
      ],
    },
    {
      title: "solutions.content-generation.sections.4.title",
      items: [
        "solutions.content-generation.sections.4.items.0",
        "solutions.content-generation.sections.4.items.1",
        "solutions.content-generation.sections.4.items.2",
        "solutions.content-generation.sections.4.items.3",
        "solutions.content-generation.sections.4.items.4",
      ],
    },
    {
      title: "solutions.content-generation.sections.5.title",
      items: [
        "solutions.content-generation.sections.5.items.0",
        "solutions.content-generation.sections.5.items.1",
        "solutions.content-generation.sections.5.items.2",
        "solutions.content-generation.sections.5.items.3",
        "solutions.content-generation.sections.5.items.4",
      ],
    },
  ],
  technologies: [
    {
      title: "solutions.content-generation.technologies.0.title",
      text: "solutions.content-generation.technologies.0.text",
    },
    {
      title: "solutions.content-generation.technologies.1.title",
      text: "solutions.content-generation.technologies.1.text",
    },
    {
      title: "solutions.content-generation.technologies.2.title",
      text: "solutions.content-generation.technologies.2.text",
    },
    {
      title: "solutions.content-generation.technologies.3.title",
      text: "solutions.content-generation.technologies.3.text",
    },
    {
      title: "solutions.content-generation.technologies.4.title",
      text: "solutions.content-generation.technologies.4.text",
    },
    {
      title: "solutions.content-generation.technologies.5.title",
      text: "solutions.content-generation.technologies.5.text",
    },
  ],
  referencesNote: "solutions.content-generation.referencesNote",
  businessCategories: [
    {
      title: "solutions.content-generation.businessCategories.0.title",
      text: "solutions.content-generation.businessCategories.0.text",
    },
    {
      title: "solutions.content-generation.businessCategories.1.title",
      text: "solutions.content-generation.businessCategories.1.text",
    },
    {
      title: "solutions.content-generation.businessCategories.2.title",
      text: "solutions.content-generation.businessCategories.2.text",
    },
    {
      title: "solutions.content-generation.businessCategories.3.title",
      text: "solutions.content-generation.businessCategories.3.text",
    },
    {
      title: "solutions.content-generation.businessCategories.4.title",
      text: "solutions.content-generation.businessCategories.4.text",
    },
    {
      title: "solutions.content-generation.businessCategories.5.title",
      text: "solutions.content-generation.businessCategories.5.text",
    },
  ],
  showcase: {
    title: "solutions.content-generation.showcase.title",
    note: "solutions.content-generation.showcase.note",
    items: [
      { title: "solutions.content-generation.showcase.items.0.title" },
      { title: "solutions.content-generation.showcase.items.1.title" },
      { title: "solutions.content-generation.showcase.items.2.title" },
      { title: "solutions.content-generation.showcase.items.3.title" },
      { title: "solutions.content-generation.showcase.items.4.title" },
      { title: "solutions.content-generation.showcase.items.5.title" },
    ],
  },
  relevants: [
    {
      type: "service",
      slug: "content-generation",
      noteKey: "relevants.content-generation.content-generation",
    },
    {
      type: "service",
      slug: "video-generation",
      noteKey: "relevants.content-generation.video-generation",
    },
    {
      type: "service",
      slug: "image-generation",
      noteKey: "relevants.content-generation.image-generation",
    },
    {
      type: "solution",
      slug: "reputation-management",
      noteKey: "relevants.content-generation.reputation-management",
    },
    {
      type: "service",
      slug: "seo-aeo",
      noteKey: "relevants.content-generation.seo-aeo",
    },
    {
      type: "case",
      slug: "agency-content-pipeline",
      noteKey: "relevants.content-generation.agency-content-pipeline",
    },
    {
      type: "case",
      slug: "product-launch-video",
      noteKey: "relevants.content-generation.product-launch-video",
    },
  ],
};
