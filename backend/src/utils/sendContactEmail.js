import nodemailer from "nodemailer";

const escape = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export async function sendContactEmail(lead) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 465,
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  });

  await transporter.sendMail({
    from: `"WebCraft Website" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: lead.workEmail,
    subject: `New enquiry: ${lead.interest} — ${lead.fullName}`,
    html: `
      <h2>New enquiry from WebCraft website</h2>
      <p><b>Name:</b> ${escape(lead.fullName)}</p>
      <p><b>Email:</b> ${escape(lead.workEmail)}</p>
      <p><b>Phone:</b> ${escape(lead.phoneNumber) || "-"}</p>
      <p><b>Company:</b> ${escape(lead.companyName) || "-"}</p>
      <p><b>Interest:</b> ${escape(lead.interest)}</p>
      <p><b>Message:</b></p>
      <p style="white-space:pre-wrap">${escape(lead.message)}</p>
    `,
  });
}
