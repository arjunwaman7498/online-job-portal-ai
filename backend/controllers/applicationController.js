const Application = require("../models/application");
const Job = require("../models/job");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

// =====================================================
// APPLY FOR JOB
// =====================================================
const applyJob = async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Role:", req.user.role);

    const { jobId } = req.params;
    const { coverLetter } = req.body;

    console.log("req.file =", req.file);
    console.log("req.body =", req.body);

    const userId = req.user.id;

    // Resume uploaded to Cloudinary
    const resume = req.file ? req.file.path : "";

    console.log("Resume URL:", resume);

    // Only job seekers can apply
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        success: false,
        message: "Only job seekers can apply for jobs",
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Prevent duplicate applications
    const alreadyApplied = await Application.findOne({
      user: userId,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create application
    const application = await Application.create({
      user: userId,
      job: jobId,
      resume,
      coverLetter,
    });

    // Get applicant details
    const applicant = await User.findById(userId);

    // Send confirmation email
    if (applicant && applicant.email) {
      try {
        await sendEmail(
          applicant.email,
          "Application Submitted Successfully - Job Portal",
          `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>Hello ${applicant.name},</h2>

              <p>
                Your application has been successfully submitted.
              </p>

              <p>
                <strong>Job:</strong> ${job.title}
              </p>

              <p>
                <strong>Company:</strong> ${job.company}
              </p>

              <p>
                Thank you for applying through our Job Portal.
              </p>

              <p>
                We wish you the best of luck!
              </p>

              <br>

              <p>
                Regards,<br>
                <strong>Job Portal Team</strong>
              </p>
            </div>
          `
        );
      } catch (emailError) {
        console.log(
          "Application email failed:",
          emailError.message
        );
      }
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log("Apply Job Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET MY APPLICATIONS
// =====================================================
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).populate("job");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(
      "Get My Applications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET RECRUITER / ADMIN APPLICATIONS
// =====================================================
const getRecruiterApplications = async (req, res) => {
  try {
    let applications;

    // Admin can see all applications
    if (req.user.role === "admin") {
      applications = await Application.find()
        .populate("user", "name email")
        .populate("job", "title company location createdBy");
    }

    // Recruiter can see applications for their jobs only
    else if (req.user.role === "recruiter") {
      const recruiterJobs = await Job.find({
        createdBy: req.user.id,
      }).select("_id");

      const jobIds = recruiterJobs.map(
        (job) => job._id
      );

      applications = await Application.find({
        job: { $in: jobIds },
      })
        .populate("user", "name email")
        .populate(
          "job",
          "title company location createdBy"
        );
    }

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(
      "Get Recruiter Applications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// ACCEPT / REJECT APPLICATION
// =====================================================
const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // =================================================
    // VALIDATE STATUS
    // =================================================

    if (
      !["Pending", "Accepted", "Rejected"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // =================================================
    // FIND APPLICATION
    // =================================================

    const application =
      await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // =================================================
    // FIND JOB
    // =================================================

    const job = await Job.findById(
      application.job
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job associated with application not found",
      });
    }

    // =================================================
    // RECRUITER OWNERSHIP CHECK
    // =================================================

    if (req.user.role === "recruiter") {
      if (
        String(job.createdBy) !==
        String(req.user.id)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You are not authorized to update this application",
        });
      }
    }

    // =================================================
    // UPDATE STATUS
    // =================================================

    application.status = status;

    await application.save();

    // =================================================
    // GET APPLICANT
    // =================================================

    const applicant = await User.findById(
      application.user
    );

    // =================================================
    // ACCEPTED EMAIL
    // =================================================

    if (
      status === "Accepted" &&
      applicant?.email
    ) {
      try {
        await sendEmail(
          applicant.email,
          "Congratulations! Your Application Has Been Accepted",
          `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">

              <h2>Hello ${applicant.name},</h2>

              <h3 style="color: green;">
                Congratulations!
              </h3>

              <p>
                We are pleased to inform you that your application has been
                <strong style="color: green;">ACCEPTED</strong>.
              </p>

              <p>
                <strong>Job:</strong> ${job.title}
              </p>

              <p>
                <strong>Company:</strong> ${job.company}
              </p>

              <p>
                The recruiter may contact you soon with further details.
              </p>

              <br>

              <p>
                Regards,<br>
                <strong>Job Portal Team</strong>
              </p>

            </div>
          `
        );
      } catch (emailError) {
        console.log(
          "Accepted email failed:",
          emailError.message
        );
      }
    }

    // =================================================
    // REJECTED EMAIL
    // =================================================

    if (
      status === "Rejected" &&
      applicant?.email
    ) {
      try {
        await sendEmail(
          applicant.email,
          "Application Status Update - Job Portal",
          `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">

              <h2>Hello ${applicant.name},</h2>

              <p>
                Thank you for applying for the following position:
              </p>

              <p>
                <strong>Job:</strong> ${job.title}
              </p>

              <p>
                <strong>Company:</strong> ${job.company}
              </p>

              <p>
                Unfortunately, your application was
                <strong style="color: red;">not selected</strong>
                for this position.
              </p>

              <p>
                Don't be discouraged. We encourage you to explore and apply
                for other opportunities on our Job Portal.
              </p>

              <br>

              <p>
                Regards,<br>
                <strong>Job Portal Team</strong>
              </p>

            </div>
          `
        );
      } catch (emailError) {
        console.log(
          "Rejected email failed:",
          emailError.message
        );
      }
    }

    // =================================================
    // RESPONSE
    // =================================================

    res.status(200).json({
      success: true,
      message:
        "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.log(
      "Update Application Status Error:",
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
  applyJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus,
};