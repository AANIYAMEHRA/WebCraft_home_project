import mongoose from "mongoose";

const contactEnquirySchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        workEmail: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            default: "",
        },
        companyName: {
            type: String,
            trim: true,
            default: "",
        },
        interest: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["New", "In Progress", "Resolved"],
            default: "New",
        },
    },
    { timestamps: true }
);

export default mongoose.model("ContactEnquiry", contactEnquirySchema);