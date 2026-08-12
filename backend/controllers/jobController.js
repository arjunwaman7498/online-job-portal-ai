
const Job = require("../models/job");
const Application = require("../models/application");

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

    // Cloudinary Logo URL
    const logo = req.file ? req.file.path : "";

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      jobType,
      logo,

      // Store the logged-in user's ID
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.log("Create Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL JOBS
// Search + Filter + Pagination + Applicant Count
// =====================================================
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const location = req.query.location || "";
    const jobType = req.query.jobType || "";

    const page = Number(req.query.page) || 1;

    // Keep 6 jobs per page
    const limit = 6;

    const skip = (page - 1) * limit;

    const query = {};

    // Search by title/company
    if (keyword) {
      query.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          company: {
            $regex: keyword,
            $options: "i",
          },
        },
      ];
    }

    // Location filter
    if (location) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Job type filter
    if (jobType) {
      query.jobType = jobType;
    }

    // Total jobs
    const totalJobs = await Job.countDocuments(query);

    // Get jobs
    const jobs = await Job.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    // Add applicant count to every job
    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount =
          await Application.countDocuments({
            job: job._id,
          });

        return {
          ...job,
          applicantCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      jobs: jobsWithApplicants,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      totalJobs,
    });
  } catch (error) {
    console.log("Get All Jobs Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET JOB BY ID
// Includes Applicant Count
// =====================================================
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).lean();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Count applications for this job
    const applicantCount =
      await Application.countDocuments({
        job: job._id,
      });

    const jobWithApplicants = {
      ...job,
      applicantCount,
    };

    res.status(200).json({
      success: true,
      job: jobWithApplicants,
    });
  } catch (error) {
    console.log("Get Job By ID Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE JOB
// =====================================================
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Recruiter can update only their own job
    if (
      req.user.role === "recruiter" &&
      String(job.createdBy) !== String(req.user.id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this job",
      });
    }

    // Update allowed fields
    const {
      title,
      company,
      location,
      salary,
      description,
      jobType,
    } = req.body;

    if (title !== undefined) {
      job.title = title;
    }

    if (company !== undefined) {
      job.company = company;
    }

    if (location !== undefined) {
      job.location = location;
    }

    if (salary !== undefined) {
      job.salary = salary;
    }

    if (description !== undefined) {
      job.description = description;
    }

    if (jobType !== undefined) {
      job.jobType = jobType;
    }

    // Don't allow changing createdBy
    await job.save();

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.log("Update Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE JOB
// =====================================================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Recruiter can delete only their own job
    if (
      req.user.role === "recruiter" &&
      String(job.createdBy) !== String(req.user.id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this job",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log("Delete Job Error:", error);

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
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};

