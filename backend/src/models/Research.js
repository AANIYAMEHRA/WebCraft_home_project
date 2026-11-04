import mongoose from "mongoose";

const researchSchema = new mongoose.Schema(
  {
    hero: { type: mongoose.Schema.Types.Mixed },
    manifesto: { type: mongoose.Schema.Types.Mixed },
    practicesIntro: { type: mongoose.Schema.Types.Mixed },
    practices: { type: mongoose.Schema.Types.Mixed },
    method: { type: mongoose.Schema.Types.Mixed },
    deliverablesIntro: { type: mongoose.Schema.Types.Mixed },
    deliverables: { type: mongoose.Schema.Types.Mixed },
    chart: { type: mongoose.Schema.Types.Mixed },
    engage: { type: mongoose.Schema.Types.Mixed },
    cta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("Research", researchSchema);