import mongoose from "mongoose";

const jobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    department: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "Indore" },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      default: "Full-time",
    },
    description: { type: String, trim: true, default: "" },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("JobOpening", jobOpeningSchema);