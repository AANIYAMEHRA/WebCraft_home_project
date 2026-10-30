
import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    label: { type: String, default: "" },
    pos: { type: String, default: "" },
    border: { type: String, default: "" },
    shadow: { type: String, default: "" },
    iconBg: { type: String, default: "" },
    delay: { type: String, default: "0s" },
    icon: { type: String, default: "" },
  },
  { _id: false }
);

const manifestoItemSchema = new mongoose.Schema(
  {
    text: { type: String, default: "" },
    em: { type: Boolean, default: false },
  },
  { _id: false }
);

const panelSchema = new mongoose.Schema(
  {
    num: { type: String, default: "" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    numColor: { type: String, default: "" },
    linkColor: { type: String, default: "" },
    image: { type: String, default: "" },
    imageClass: { type: String, default: "" },
    imageLeft: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
  },
  { _id: false }
);

const philosophyStepSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    body: { type: String, default: "" },
    desc: { type: String, default: "" },
  },
  { _id: false }
);

const orbitItemSchema = new mongoose.Schema(
  {
    angle: { type: Number, default: 0 },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const orbitRingSchema = new mongoose.Schema(
  {
    radius: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
    items: { type: [orbitItemSchema], default: [] },
  },
  { _id: false }
);

const aiSolutionsSchema = new mongoose.Schema(
  {
    hero: {
      label: { type: String, default: "AI Solutions" },
      heading: {
        type: String,
        default: "Intelligent AI. Measurable Outcomes.",
      },
      description: { type: String, default: "" },
      button1Text: {
        type: String,
        default: "Book a Consultation",
      },
      button1Url: { type: String, default: "/contact" },
      button2Text: {
        type: String,
        default: "See Research Capabilities",
      },
      button2Url: { type: String, default: "/research" },
      badges: { type: [badgeSchema], default: [] },
    },

    manifesto: { type: [manifestoItemSchema], default: [] },

    panels: { type: [panelSchema], default: [] },

    techStack: {
      tags: { type: [String], default: [] },
      orbitRings: { type: [orbitRingSchema], default: [] },
    },

    philosophy: {
      heading: { type: String, default: "" },
      steps: { type: [philosophyStepSchema], default: [] },
    },

    cta: {
      heading: {
        type: String,
        default: "Ready to apply AI to your business?",
      },
      description: { type: String, default: "" },
      buttonText: {
        type: String,
        default: "Book a Consultation",
      },
      buttonUrl: { type: String, default: "/contact" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("AiSolutions", aiSolutionsSchema);
