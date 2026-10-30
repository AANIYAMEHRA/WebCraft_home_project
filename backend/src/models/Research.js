import mongoose from "mongoose";

// One document holds the whole Research page. Each field matches a key of
// src/pages/researchData.js, so the public page and the CMS use the same shape.
const researchSchema = new mongoose.Schema(
    {
        hero: { type: mongoose.Schema.Types.Mixed, default: {} },
        manifesto: { type: mongoose.Schema.Types.Mixed, default: {} },
        practicesIntro: { type: mongoose.Schema.Types.Mixed, default: {} },
        practices: { type: [mongoose.Schema.Types.Mixed], default: [] },
        method: { type: mongoose.Schema.Types.Mixed, default: {} },
        deliverablesIntro: { type: mongoose.Schema.Types.Mixed, default: {} },
        deliverables: { type: [mongoose.Schema.Types.Mixed], default: [] },
        chart: { type: mongoose.Schema.Types.Mixed, default: {} },
        engage: { type: mongoose.Schema.Types.Mixed, default: {} },
        cta: { type: mongoose.Schema.Types.Mixed, default: {} },
    },
    { timestamps: true }
);

export default mongoose.model("Research", researchSchema);
