const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  createJob,
  getAllApplications,
  getAllJobs,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// =====================================================
// ADMIN DASHBOARD
// =====================================================

router.get(
  "/dashboard",
  protect,
  authorizeRoles("admin"),
  getDashboardStats
);

// =====================================================
// CREATE JOB
// =====================================================

router.post(
  "/jobs",
  protect,
  authorizeRoles("admin"),
  createJob
);

// =====================================================
// GET ALL APPLICATIONS
// =====================================================

router.get(
  "/applications",
  protect,
  authorizeRoles("admin"),
  getAllApplications
);

// =====================================================
// GET ALL JOBS
// =====================================================

router.get(
  "/jobs",
  protect,
  authorizeRoles("admin"),
  (req, res, next) => {
    console.log("✅ /api/admin/jobs route hit");
    next();
  },
  getAllJobs
);

module.exports = router;