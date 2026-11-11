import express from "express";
import mongoose from "mongoose";
import ContactEnquiry from "../models/ContactEnquiry.js";

const router = express.Router();

// POST: Save Contact Form Enquiry
router.post("/", async (req, res) => {
    try {
        const {
            fullName,
            workEmail,
            phoneNumber,
            companyName,
            interest,
            message,
        } = req.body;

        if (!fullName?.trim() || !workEmail?.trim() ||
            !interest?.trim() || !message?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(workEmail.trim())) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        const enquiry = await ContactEnquiry.create({
            fullName,
            workEmail,
            phoneNumber,
            companyName,
            interest,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Your enquiry has been submitted successfully.",
            enquiry,
        });
    } catch (error) {
        console.error("Contact enquiry submission error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to submit your enquiry.",
        });
    }
});

// GET: Fetch All Enquiries (Admin)
router.get("/", async (req, res) => {
    try {
        const enquiries = await ContactEnquiry.find()
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            success: true,
            enquiries,
        });
    } catch (error) {
        console.error("Contact enquiries fetch error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries.",
        });
    }
});

// PATCH: Update Enquiry Status (Admin)
router.patch("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = ["New", "In Progress", "Resolved"];

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enquiry ID.",
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid enquiry status.",
            });
        }

        const enquiry = await ContactEnquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Enquiry status updated successfully.",
            enquiry,
        });
    } catch (error) {
        console.error("Contact enquiry status update error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update enquiry status.",
        });
    }
});

export default router;