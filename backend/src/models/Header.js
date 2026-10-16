import mongoose from "mongoose";

const headerLinkSchema = new mongoose.Schema(
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
  { _id: false }
);

const headerSchema = new mongoose.Schema(
  {
    logoUrl: {
      type: String,
      default: "/logo.svg",
    },
    links: {
      type: [headerLinkSchema],
      default: [
        { to: "/", label: "Home" },
        { to: "/about", label: "About Us" },
        { to: "/ai-solutions", label: "AI Solutions" },
        { to: "/research", label: "Research" },
        { to: "/products", label: "Products" },
        { to: "/services", label: "Services" },
      ],
    },
    contactText: {
      type: String,
      default: "Contact Us",
    },
    contactUrl: {
      type: String,
      default: "/contact",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Header", headerSchema);