import mongoose from "mongoose";

const methodSchema = new mongoose.Schema(
  {
    kicker: { type: String, default: "" },
    value: { type: String, default: "" },
    note: { type: String, default: "" },
    href: { type: String, default: "" },
  },
  { _id: false }
);

const stepSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    body: { type: String, default: "" },
  },
  { _id: false }
);

const contactPageSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },

    hero: {
      titleLine1: { type: String, default: "Let's" },
      titleHighlight: { type: String, default: "Talk" },
      description: { type: String, default: "" },
    },

    form: {
      heading: { type: String, default: "Tell us what's" },
      headingHighlight: { type: String, default: "on your mind." },
      description: { type: String, default: "" },
      submitText: { type: String, default: "Send Message" },
      interestOptions: { type: [String], default: [] },
    },

    methods: { type: [methodSchema], default: [] },

    process: {
      label: { type: String, default: "What Happens Next" },
      heading: { type: String, default: "After you" },
      headingHighlight: { type: String, default: "hit send." },
      description: { type: String, default: "" },
      steps: { type: [stepSchema], default: [] },
    },
  },
  { timestamps: true }
);

export default mongoose.model("ContactPage", contactPageSchema);