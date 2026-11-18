import express from "express";
import ContactPage from "../models/ContactPage.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

// Exact content of the public Contact page (contact.html / screenshot)
const DEFAULTS = {
  hero: {
    titleLine1: "Let's",
    titleHighlight: "Talk",
    description:
      "Whether you're exploring AI adoption, need research to inform a decision, want a product demo, or are planning a digital initiative — we'd like to hear about it.",
  },
  form: {
    heading: "Tell us what's",
    headingHighlight: "on your mind.",
    description:
      "A sentence about the problem, a sentence about your timeline, a sentence about you. That's enough to start. We'll reply with questions, not a pitch.",
    submitText: "Send Message",
    interestOptions: [
      "AI Solutions",
      "Research & Advisory",
      "Product Demo (HRMS / TutorWand / WCSchool)",
      "Custom Product Development",
      "Digital Transformation",
      "Cloud & Data Engineering",
      "Engineering Services",
      "General Inquiry",
    ],
  },
  methods: [
    { kicker: "Sales & General", value: "admin@webcraft.co.in", note: "New projects, partnerships, general enquiries.", href: "mailto:admin@webcraft.co.in" },
    { kicker: "Careers", value: "hr@webcraftit.com", note: "Open roles, internships, applications.", href: "mailto:hr@webcraftit.com" },
    { kicker: "LinkedIn", value: "linkedin.com/company/webcraft-it", note: "Follow for research & case notes.", href: "https://www.linkedin.com/company/webcraft-it/" },
    { kicker: "Instagram", value: "instagram.com/webcraftitcompany", note: "Behind-the-scenes, culture & team.", href: "https://www.instagram.com/webcraftitcompany/" },
    { kicker: "Facebook", value: "facebook.com/webcraftit", note: "Updates, events & community.", href: "https://www.facebook.com/webcraftit/" },
    { kicker: "Pinterest", value: "pinterest.com/webcraftit0045", note: "Design inspiration & mood boards.", href: "https://in.pinterest.com/webcraftit0045/" },
  ],
  process: {
    label: "What Happens Next",
    heading: "After you",
    headingHighlight: "hit send.",
    description:
      "Three steps. No sales sequence. No \"just circling back\" follow-ups you didn't ask for.",
    steps: [
      { title: "You write.", body: "As much or as little as you like. A single paragraph is enough to start — we'll ask the rest over a call." },
      { title: "We reply.", body: "Within one business day — usually sooner. From a real person, not an automated acknowledgement." },
      { title: "We talk.", body: "A 45-minute first call, free, off the record. No presentation. No commitment. Just clarity for both of us." },
    ],
  },
};

// A value is "empty" when it is missing, blank, or an empty list
function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

// Uses the saved value, or the default when the saved value is empty
function fill(value, def) {
  if (Array.isArray(def)) {
    return Array.isArray(value) && value.length ? value : def;
  }
  if (def && typeof def === "object") {
    const out = {};
    for (const key of Object.keys(def)) {
      out[key] = fill(value?.[key], def[key]);
    }
    return out;
  }
  return isEmpty(value) ? def : value;
}

async function getPage() {
  return ContactPage.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: { key: "main" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

// PUBLIC: page content, with defaults filled in for any empty field
router.get("/", async (req, res) => {
  try {
    const doc = await getPage();
    res.json({ page: fill(doc.toObject(), DEFAULTS) });
  } catch {
    res.status(500).json({ message: "Could not load contact page." });
  }
});

// ADMIN: save page content
router.put("/", requireAdmin, async (req, res) => {
  try {
    const { _id, key, createdAt, updatedAt, __v, ...updates } = req.body;
    const doc = await ContactPage.findOneAndUpdate(
      { key: "main" },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    res.json({ page: fill(doc.toObject(), DEFAULTS) });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;