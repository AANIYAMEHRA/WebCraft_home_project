import mongoose from "mongoose";

const careersPageSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },

    hero: {
      chip: { type: String, default: "Careers at Webcraft" },
      titleLine1: { type: String, default: "Build what's next." },
      titleLine2: { type: String, default: "Build it with us." },
      description: {
        type: String,
        default:
          "Be part of work that brings research, technology, and thoughtful engineering together to solve real-world challenges.",
      },
      primaryButtonText: { type: String, default: "Explore Opportunities" },
      secondaryButtonText: { type: String, default: "Get in Touch" },
      secondaryButtonEmail: { type: String, default: "hr@webcraftit.com" },
    },

    stats: {
      type: [{ value: String, label: String, _id: false }],
      default: [
        { value: "2006", label: "Founded" },
        { value: "3000+", label: "Clients served" },
        { value: "230+", label: "Professionals" },
        { value: "96%", label: "Client retention" },
      ],
    },

    whyWebcraft: {
      label: { type: String, default: "The Work We Do" },
      heading: { type: String, default: "Technology with" },
      headingHighlight: { type: String, default: "purpose." },
      paragraph1: {
        type: String,
        default:
          "Webcraft has grown from a web development startup into a research-led, AI-enabled digital transformation partner.",
      },
      paragraph2: {
        type: String,
        default:
          "Our work spans research, practical AI and automation, software engineering, cloud solutions, and long-term product support. We believe in understanding problems before building solutions and delivering work that creates lasting value.",
      },
      linkText: { type: String, default: "Discover Webcraft" },
      linkUrl: { type: String, default: "/about" },
    },

    values: {
      label: { type: String, default: "What We Believe In" },
      heading: { type: String, default: "Principles behind" },
      headingHighlight: { type: String, default: "our work." },
      description: {
        type: String,
        default:
          "These values guide how we think, collaborate, make decisions, and deliver for our clients.",
      },
      items: {
        type: [
          {
            number: String,
            title: String,
            description: String,
            _id: false,
          },
        ],
        default: [
          { number: "01", title: "Clarity First", description: "We prioritize understanding over assumptions. Every recommendation is backed by evidence and honest assessment." },
          { number: "02", title: "Delivery Realism", description: "We commit to what we can deliver — and then deliver it. No inflated timelines, no scope surprises." },
          { number: "03", title: "Client Partnership", description: "We build with our clients, not just for them — shared ownership, collaboration, and shared success." },
          { number: "04", title: "Continuous Learning", description: "Technology evolves constantly. We invest in staying current and exploring better ways to solve problems." },
        ],
      },
    },

    openPositions: {
      label: { type: String, default: "Opportunities" },
      heading: { type: String, default: "Open Positions" },
      description: { type: String, default: "Explore opportunities to become part of the Webcraft journey." },
      emptyTitle: { type: String, default: "No open positions currently" },
      emptyDescription: { type: String, default: "There are no listed openings at the moment. Please check back later for future opportunities." },
      contactText: { type: String, default: "Contact our team" },
      contactEmail: { type: String, default: "hr@webcraftit.com" },
    },

    cta: {
      label: { type: String, default: "Stay Connected" },
      heading: { type: String, default: "Your next chapter" },
      headingHighlight: { type: String, default: "could start here." },
      description: {
        type: String,
        default: "Interested in working with Webcraft? Share your details and resume with our HR team.",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("CareersPage", careersPageSchema);