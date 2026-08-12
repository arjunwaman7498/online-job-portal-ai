import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import {
  applyJob,
  getMyApplications,
} from "../services/applicationService";

const JobDescription = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] =
    useState(true);

  useEffect(() => {
    const fetchJobAndApplication = async () => {
      try {
        // Get job details
        const jobData = await getJobById(id);

        setJob(jobData.job);

        // Check whether user is logged in
        const token = localStorage.getItem("token");

        if (token) {
          try {
            const applicationData =
              await getMyApplications();

            const applications =
              applicationData.applications || [];

            const hasApplied = applications.some(
              (application) =>
                application.job?._id === id ||
                application.job === id
            );

            setAlreadyApplied(hasApplied);
          } catch (error) {
            console.log(
              "Check Application Error:",
              error
            );
          }
        }
      } catch (error) {
        console.log("Fetch Job Error:", error);
      } finally {
        setCheckingApplication(false);
      }
    };

    fetchJobAndApplication();
  }, [id]);

  // =====================================================
  // APPLY FOR JOB
  // =====================================================

  const handleApply = async () => {
    // Prevent duplicate application
    if (alreadyApplied) {
      alert("You have already applied for this job.");
      return;
    }

    // Check login
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply for this job.");
      return;
    }

    // Check resume
    if (!resume) {
      alert("Please upload your resume (PDF).");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("coverLetter", "");

      await applyJob(id, formData);

      // Immediately update UI
      setAlreadyApplied(true);

      // Increase applicant count
      setJob((prevJob) => ({
        ...prevJob,
        applicantCount:
          (prevJob.applicantCount || 0) + 1,
      }));

      alert("Application submitted successfully");
    } catch (error) {
      console.log("Apply Error:", error);

      // If backend says already applied,
      // update the UI as well
      if (
        error.response?.data?.message?.toLowerCase()
          .includes("already applied")
      ) {
        setAlreadyApplied(true);
      }

      alert(
        error.response?.data?.message ||
          "Failed to apply"
      );
    }
  };

  // =====================================================
  // SHARE JOB
  // =====================================================

  const handleShare = async () => {
    if (!job) return;

    const shareUrl = window.location.href;

    const shareData = {
      title: job.title,
      text: `Check out this job: ${job.title} at ${job.company}`,
      url: shareUrl,
    };

    // 1. Native phone sharing
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.log("Native Share Error:", error);
      }
    }

    // 2. Clipboard API
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);

        alert(
          "Job link copied! You can paste it into WhatsApp."
        );

        return;
      } catch (error) {
        console.log("Clipboard Error:", error);
      }
    }

    // 3. HTTP/local-network fallback
    const textArea =
      document.createElement("textarea");

    textArea.value = shareUrl;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";

    document.body.appendChild(textArea);

    textArea.focus();
    textArea.select();

    try {
      const copied =
        document.execCommand("copy");

      if (copied) {
        alert(
          "Job link copied! You can paste it into WhatsApp."
        );
      } else {
        throw new Error("Copy failed");
      }
    } catch (error) {
      console.log("Copy Error:", error);

      window.prompt(
        "Copy this job link:",
        shareUrl
      );
    }

    document.body.removeChild(textArea);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (!job) {
    return (
      <h2 className="text-center mt-20 text-2xl">
        Loading...
      </h2>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">

      {/* Company Logo */}
      {job.logo && (
        <div className="flex justify-center mb-6">
          <img
            src={job.logo}
            alt={job.company}
            className="w-24 h-24 object-contain rounded-lg border p-2"
          />
        </div>
      )}

      {/* Job Title */}
      <h1 className="text-4xl font-bold mb-6">
        {job.title}
      </h1>

      <div className="space-y-4">

        <p>
          <strong>Company:</strong>{" "}
          {job.company}
        </p>

        <p>
          <strong>Location:</strong>{" "}
          {job.location}
        </p>

        <p>
          <strong>Salary:</strong>{" "}
          ₹{job.salary}
        </p>

        <p>
          <strong>Job Type:</strong>{" "}
          {job.jobType}
        </p>

        {/* Applicant Count */}
        <p>
          <strong>Applicants:</strong>{" "}
          👥 {job.applicantCount || 0}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {job.description}
        </p>

        {/* Resume Upload */}
        {!alreadyApplied && (
          <div className="mt-6">
            <label className="block font-semibold mb-2">
              Upload Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(e.target.files[0])
              }
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">

          {/* Apply / Applied */}
          <button
            onClick={handleApply}
            disabled={
              alreadyApplied ||
              checkingApplication
            }
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              alreadyApplied
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {checkingApplication
              ? "Checking..."
              : alreadyApplied
              ? "✅ Applied"
              : "Apply Now"}
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            📌 Share Job
          </button>

        </div>
      </div>
    </div>
  );
};

export default JobDescription;