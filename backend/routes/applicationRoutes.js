const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  applyJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

// =====================================================
// JOBSEEKER - APPLY FOR JOB
// =====================================================

router.post(
  "/:jobId",
  protect,
  upload.single("resume"),
  applyJob
);

// =====================================================
// JOBSEEKER - MY APPLICATIONS
// =====================================================

router.get(
  "/my",
  protect,
  getMyApplications
);

// =====================================================
// RECRUITER + ADMIN - VIEW APPLICATIONS
// =====================================================

router.get(
  "/recruiter",
  protect,
  authorizeRoles("recruiter", "admin"),
  getRecruiterApplications
);

// =====================================================
// RECRUITER + ADMIN - ACCEPT / REJECT
// =====================================================

router.put(
  "/:applicationId/status",
  protect,
  authorizeRoles("recruiter", "admin"),
  updateApplicationStatus
);

module.exports = router;