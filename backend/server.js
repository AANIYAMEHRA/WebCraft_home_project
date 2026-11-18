import "dotenv/config";
import dns from "node:dns";
import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

import footerRoutes from "./src/routes/footerRoutes.js";
import headerRoutes from "./src/routes/headerRoutes.js";
import homeRoutes from "./src/routes/homeRoutes.js";
import aboutRoutes from "./src/routes/aboutRoutes.js";
import aiSolutionsRoutes from "./src/routes/aiSolutionsRoutes.js";
import researchRoutes from "./src/routes/researchRoutes.js";
import productsRoutes from "./src/routes/productsRoutes.js";
import servicesRoutes from "./src/routes/servicesRoutes.js";
import contactEnquiryRoutes from "./src/routes/ContactEnquiryRoutes.js";
import careersApplicationRoutes from "./src/routes/CareersApplicationRoutes.js";
import careersPageRoutes from "./src/routes/careersPageRoutes.js";
import contactPageRoutes from "./src/routes/contactPageRoutes.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
  })
);

app.use(express.json());

app.use("/api/footer", footerRoutes);
app.use("/api/header", headerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/ai-solutions", aiSolutionsRoutes);
app.use("/api/research", researchRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/contact-enquiries", contactEnquiryRoutes);

// Careers: applications (form submit with resume)
app.use("/api/careers", careersApplicationRoutes);

// Careers: CMS content and job openings
app.use("/api/careers-page", careersPageRoutes);
app.use("/api/contact-page", contactPageRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Webcraft backend is running" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  });