import mongoose from "mongoose";

const { Schema } = mongoose;

// One document holds all Services page content. Each section is stored as Mixed
// so the shape can follow services.jsx without a schema change for every field.
const servicesSchema = new Schema(
  {
    hero: Schema.Types.Mixed,
    capabilitiesIntro: Schema.Types.Mixed,
    capabilities: Schema.Types.Mixed,
    techStack: Schema.Types.Mixed,
    engagementModels: Schema.Types.Mixed,
    cases: Schema.Types.Mixed,
    faq: Schema.Types.Mixed,
    servicesCta: Schema.Types.Mixed,
  },
  { timestamps: true }
);

export default mongoose.model("Services", servicesSchema);