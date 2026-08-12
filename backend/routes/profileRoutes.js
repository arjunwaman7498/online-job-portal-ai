const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  changePassword,
  updateProfilePicture,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");
const profileUpload = require("../middleware/profileUploadMiddleware");

// Get profile
router.get("/", protect, getProfile);

// Update name and email
router.put("/", protect, updateProfile);

// Change password
router.put("/password", protect, changePassword);

// Upload/change profile picture
router.put(
  "/picture",
  protect,
  profileUpload.single("profilePicture"),
  updateProfilePicture
);

module.exports = router;