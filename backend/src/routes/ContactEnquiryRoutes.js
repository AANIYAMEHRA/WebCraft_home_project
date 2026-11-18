import express from "express";
import ContactEnquiry from "../models/ContactEnquiry.js";
import { sendContactEmail } from "../utils/sendContactEmail.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = {
      fullName: req.body.fullName?.trim(),
      workEmail: req.body.workEmail?.trim(),
      phoneNumber: req.body.phoneNumber?.trim() || "",
      companyName: req.body.companyName?.trim() || "",
      interest: req.body.interest,
      message: req.body.message?.trim(),
      ip: req.ip,
      userAgent: req.get("user-agent"),
    };

    const enquiry = await ContactEnquiry.create(data);

    // Email runs in the background so the user gets an instant response
    sendContactEmail(enquiry)
      .then(() => console.log("Contact email sent to", process.env.MAIL_TO))
      .catch((err) => console.error("Contact email failed:", err.message));

    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
    });
  } catch (err) {
    console.error("Contact enquiry failed:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});

export default router;