import nodemailer from "nodemailer";
import "dotenv/config";

const t = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10000,
});

t.verify()
  .then(() => console.log("SMTP OK"))
  .catch((e) => console.error("SMTP FAIL:", e.message));