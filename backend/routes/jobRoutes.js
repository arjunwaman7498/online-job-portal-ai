
const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// IMPORTANT:
// Change this path/name if your upload middleware
// is located somewhere else.
const upload = require("../middleware/uploadMiddleware.js");

// =====================================================
// PUBLIC JOB ROUTES
// =====================================================

// Get all jobs
router.get("/", getAllJobs);

// Get single job
router.get("/:id", getJobById);

// =====================================================
// RECRUITER + ADMIN JOB ROUTES
// =====================================================

// Create Job
router.post(
  "/",
  protect,
  authorizeRoles("recruiter", "admin"),
  upload.single("logo"),
  createJob
);

// Update Job
router.put(
  "/:id",
  protect,
  authorizeRoles("recruiter", "admin"),
  upload.single("logo"),
  updateJob
);

// Delete Job
router.delete(
  "/:id",
  protect,
  authorizeRoles("recruiter", "admin"),
  deleteJob
);

module.exports = router;





