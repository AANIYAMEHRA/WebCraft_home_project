
import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
    {
        heroChips: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        milestones: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        ways: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        values: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        philSteps: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        stats: {
            type: [mongoose.Schema.Types.Mixed],
            default: [],
        },
        sectionContent: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
