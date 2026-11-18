import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";

const router = express.Router();

const allowedMimeTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const allowedExtensions = [".pdf", ".doc", ".docx"];

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, callback) => {
        const extension = file.originalname
            .toLowerCase()
            .slice(file.originalname.lastIndexOf("."));

        if (
            allowedMimeTypes.includes(file.mimetype) &&
            allowedExtensions.includes(extension)
        ) {
            return callback(null, true);
        }

        callback(new Error("Only PDF, DOC, and DOCX files are allowed."));
    },
});

router.post("/", (req, res) => {
    upload.single("resume")(req, res, async (uploadError) => {
        if (uploadError) {
            const message =
                uploadError.code === "LIMIT_FILE_SIZE"
                    ? "Resume size must be 5 MB or less."
                    : uploadError.message;

            return res.status(400).json({ message });
        }

        const startedAt = Date.now();

        try {
            const { fullName, email, phone } = req.body;

            console.log(
                new Date().toLocaleTimeString(),
                "Application received:",
                fullName?.trim() || "(no name)"
            );

            if (!fullName?.trim() || !email?.trim()) {
                return res.status(400).json({
                    message: "Full name and email are required.",
                });
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.trim())) {
                return res.status(400).json({
                    message: "Please enter a valid email address.",
                });
            }

            if (!req.file) {
                return res.status(400).json({
                    message: "Please upload your resume.",
                });
            }

            const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"];
            const missingEnv = requiredEnv.filter((key) => !process.env[key]);

            if (missingEnv.length > 0) {
                console.error("Missing SMTP configuration:", missingEnv);

                return res.status(503).json({
                    message: "Email service is not configured yet. Please try again later.",
                });
            }

            const smtpPort = Number(process.env.SMTP_PORT);

            if (!Number.isInteger(smtpPort) || smtpPort <= 0) {
                return res.status(500).json({
                    message: "Invalid SMTP configuration.",
                });
            }

            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
                connectionTimeout: 15000,
                greetingTimeout: 15000,
                socketTimeout: 20000,
            });

            const recipient = process.env.CAREERS_EMAIL || "hr@webcraftit.com";
            const sender = process.env.SMTP_FROM || process.env.SMTP_USER;

            // Respond first so the user gets instant feedback
            res.status(200).json({
                message: "Your application has been submitted successfully.",
            });

            // Send the email in the background (not awaited)
            transporter
                .sendMail({
                    from: sender,
                    to: recipient,
                    replyTo: email.trim(),
                    subject: `New Career Application - ${fullName.trim()}`,
                    text: [
                        "New career application received.",
                        "",
                        `Name: ${fullName.trim()}`,
                        `Email: ${email.trim()}`,
                        `Phone: ${phone?.trim() || "Not provided"}`,
                    ].join("\n"),
                    attachments: [
                        {
                            filename: req.file.originalname,
                            content: req.file.buffer,
                            contentType: req.file.mimetype,
                        },
                    ],
                })
                .then(() =>
                    console.log(
                        new Date().toLocaleTimeString(),
                        `Career email sent to ${recipient} in ${Date.now() - startedAt} ms:`,
                        fullName.trim()
                    )
                )
                .catch((err) =>
                    console.error("Career email failed:", err.message)
                );

            return;
        } catch (error) {
            console.error("Career application failed:", error.message);

            // Don't send a second response if one was already sent
            if (res.headersSent) return;

            return res.status(500).json({
                message: "Unable to submit your application right now. Please try again later.",
            });
        }
    });
});

export default router;