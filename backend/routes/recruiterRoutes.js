const express = require("express");
const router = express.Router();

const {
  getRecruiterJobs,
  getApplicants,
} = require("../controllers/recruiterController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// =====================================================
// GET JOBS
// RECRUITER + ADMIN
// =====================================================

router.get(
  "/jobs",
  protect,
  authorizeRoles("recruiter", "admin"),
  getRecruiterJobs
);

// =====================================================
// GET APPLICANTS
// RECRUITER + ADMIN
// =====================================================

router.get(
  "/jobs/:jobId/applicants",
  protect,
  authorizeRoles("recruiter", "admin"),
  getApplicants
);

module.exports = router;
