import express from "express";
import CareersPage from "../models/CareersPage.js";
import JobOpening from "../models/JobOpening.js";
import { requireAdmin } from "../middleware/requireAdmin.js";

const router = express.Router();

async function getPage() {
  return CareersPage.findOneAndUpdate(
    { key: "main" },
    { $setOnInsert: { key: "main" } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
}

// PUBLIC: page content
router.get("/", async (req, res) => {
  try {
    const page = await getPage();
    res.json({ page });
  } catch {
    res.status(500).json({ message: "Could not load careers page." });
  }
});

// PUBLIC: active jobs only (used by the public Careers page)
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await JobOpening.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ jobs });
  } catch {
    res.status(500).json({ message: "Could not load jobs." });
  }
});

// ADMIN: all jobs, including hidden ones
router.get("/jobs/all", requireAdmin, async (req, res) => {
  try {
    const jobs = await JobOpening.find().sort({ order: 1, createdAt: -1 });
    res.json({ jobs });
  } catch {
    res.status(500).json({ message: "Could not load jobs." });
  }
});

// ADMIN: save page content
router.put("/", requireAdmin, async (req, res) => {
  try {
    const { _id, key, createdAt, updatedAt, __v, ...updates } = req.body;
    const page = await CareersPage.findOneAndUpdate(
      { key: "main" },
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );
    res.json({ page });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN: create job
router.post("/jobs", requireAdmin, async (req, res) => {
  try {
    const job = await JobOpening.create(req.body);
    res.status(201).json({ job });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN: update job
router.put("/jobs/:id", requireAdmin, async (req, res) => {
  try {
    const { _id, createdAt, updatedAt, __v, ...updates } = req.body;
    const job = await JobOpening.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found." });
    res.json({ job });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ADMIN: delete job
router.delete("/jobs/:id", requireAdmin, async (req, res) => {
  try {
    await JobOpening.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch {
    res.status(400).json({ message: "Delete failed." });
  }
});

export default router;