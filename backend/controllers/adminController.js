const User = require("../models/user");
const Job = require("../models/job");
const Application = require("../models/application");

// =====================================================
// GET DASHBOARD STATS
// =====================================================
const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const totalRecruiters =
      await User.countDocuments({
        role: "recruiter",
      });

    res.status(200).json({
      success: true,
      totalJobs,
      totalApplications,
      totalRecruiters,
    });
  } catch (error) {
    console.log(
      "Admin Dashboard Stats Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// CREATE JOB
// =====================================================
const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      description,
      jobType,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      jobType,

      // Store admin who created the job
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log(
      "Admin Create Job Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL APPLICATIONS
// =====================================================
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email")
      .populate(
        "job",
        "title company location"
      );

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(
      "Get All Applications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL JOBS
// =====================================================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    console.log("Admin Jobs found:", jobs);

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(
      "Admin Get Jobs Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================
module.exports = {
  getDashboardStats,
  createJob,
  getAllApplications,
  getAllJobs,
};