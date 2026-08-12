
const Job = require("../models/job");
const Application = require("../models/application");

// =====================================================
// GET RECRUITER JOBS
// =====================================================
// Recruiter → sees only their own jobs
// Admin → can see all jobs
const getRecruiterJobs = async (req, res) => {
  try {
    let jobs;

    if (req.user.role === "admin") {
      // Admin can see all jobs
      jobs = await Job.find()
        .sort({ createdAt: -1 });
    } else {
      // Recruiter can see only their own jobs
      jobs = await Job.find({
        createdBy: req.user.id,
      }).sort({ createdAt: -1 });
    }

    // Add applicant count to every job
    const jobsWithApplicantCount = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({
          job: job._id,
        });

        return {
          ...job.toObject(),
          applicantCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      jobs: jobsWithApplicantCount,
    });
  } catch (error) {
    console.log("Get Recruiter Jobs Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET APPLICANTS FOR ONE JOB
// =====================================================
// Recruiter → only applicants for their own job
// Admin → can view applicants for any job
const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find the job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Recruiter can only access their own job
    if (
      req.user.role === "recruiter" &&
      String(job.createdBy) !== String(req.user.id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view applicants for this job",
      });
    }

    // Get applications
    const applications = await Application.find({
      job: jobId,
    })
      .populate("user", "name email")
      .populate("job", "title company location");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log("Get Applicants Error:", error);

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
  getRecruiterJobs,
  getApplicants,
};

