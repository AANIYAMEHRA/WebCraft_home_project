
import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
    },
    { _id: false }
);

const statSchema = new mongoose.Schema(
    {
        value: { type: String, default: "" },
        label: { type: String, default: "" },
    },
    { _id: false }
);

const productItemSchema = new mongoose.Schema(
    {
        num: { type: String, default: "" },
        productLabel: { type: String, default: "" },
        name: { type: String, default: "" },
        description: { type: String, default: "" },
        price: { type: String, default: "" },
        priceNote: { type: String, default: "" },
        buttonText: { type: String, default: "" },
        buttonUrl: { type: String, default: "" },
        features: { type: [featureSchema], default: [] },
        stats: { type: [statSchema], default: [] },
    },
    { _id: false }
);

const productsSchema = new mongoose.Schema(
    {
        hero: {
            label: { type: String, default: "" },
            headingLine1: { type: String, default: "" },
            headingLine2: { type: String, default: "" },
            description: { type: String, default: "" },
            buttonText: { type: String, default: "" },
            buttonUrl: { type: String, default: "" },
        },

        products: {
            type: [productItemSchema],
            default: [],
        },

        cta: {
            label: { type: String, default: "" },
            headingLine1: { type: String, default: "" },
            headingLine2: { type: String, default: "" },
            description: { type: String, default: "" },
            buttonText: { type: String, default: "" },
            buttonUrl: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

export default mongoose.model("Products", productsSchema);
