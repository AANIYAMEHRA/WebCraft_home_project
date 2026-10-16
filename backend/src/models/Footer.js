
import mongoose from "mongoose";

const footerLinkSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: true }
);

const footerColumnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    items: {
      type: [footerLinkSchema],
      default: [],
    },
  },
  { _id: true }
);

const footerSchema = new mongoose.Schema(
  {
    kicker: { type: String, default: "Say Hello" },
    heading: { type: String, default: "Think first." },
    headingEmphasis: { type: String, default: "Ship well." },
    email: { type: String, default: "admin@webcraft.co.in" },
    brandTagline: {
      type: String,
      default: "Research-led, AI-enabled digital transformation for teams that ship.",
    },
    socials: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
      },
    ],
    columns: {
      type: [footerColumnSchema],
      default: [],
    },
    bottomText: {
      type: String,
      default: "Research · AI · Engineering",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Footer", footerSchema);
