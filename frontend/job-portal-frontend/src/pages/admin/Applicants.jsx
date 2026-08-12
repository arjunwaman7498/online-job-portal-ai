import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getApplicants,
  updateApplicationStatus,
} from "../../services/recruiterService";

import {
  getAllApplications,
} from "../../services/adminService";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  // =====================================================
  // GET USER ROLE
  // =====================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isAdmin = user?.role === "admin";

  // =====================================================
  // FETCH APPLICATIONS
  // =====================================================

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        let data;

        // -----------------------------------------------
        // ADMIN - ALL APPLICATIONS
        // URL: /admin/applications
        // -----------------------------------------------

        if (isAdmin && !jobId) {
          data = await getAllApplications();
        }

        // -----------------------------------------------
        // JOB-SPECIFIC APPLICATIONS
        // URL: /admin/jobs/:jobId/applicants
        // OR recruiter job applicants
        // -----------------------------------------------

        else if (jobId) {
          data = await getApplicants(jobId);
        }

        else {
          data = {
            applications: [],
          };
        }

        console.log(
          "Applications Response:",
          data
        );

        setApplications(
          data.applications || []
        );
      } catch (error) {
        console.log(
          "Applicants Error:",
          error
        );

        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, isAdmin]);

  // =====================================================
  // ACCEPT / REJECT
  // =====================================================

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      setUpdating(applicationId);

      const data =
        await updateApplicationStatus(
          applicationId,
          status
        );

      setApplications(
        (prevApplications) =>
          prevApplications.map(
            (application) =>
              application._id === applicationId
                ? {
                    ...application,
                    status:
                      data.application.status,
                  }
                : application
          )
      );

      if (status === "Accepted") {
        alert(
          "Application accepted successfully. Email sent to applicant."
        );
      } else {
        alert(
          "Application rejected successfully. Email sent to applicant."
        );
      }
    } catch (error) {
      console.log(
        "Update Status Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdating(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center">
          Loading applicants...
        </h2>
      </div>
    );
  }

  // =====================================================
  // PAGE TITLE
  // =====================================================

  const pageTitle =
    isAdmin && !jobId
      ? "All Applications"
      : "Job Applicants";

  const pageDescription =
    isAdmin && !jobId
      ? "View and manage all applications submitted through the Job Portal."
      : "Review applicants and manage their application status.";

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold">
            {pageTitle}
          </h1>

          <p className="text-gray-600 mt-2">
            {pageDescription}
          </p>

        </div>

        {/* =================================================
            NO APPLICATIONS
        ================================================= */}

        {applications.length === 0 ? (

          <div className="bg-white shadow-md rounded-xl p-8 sm:p-12 text-center">

            <div className="text-5xl mb-4">
              👥
            </div>

            <p className="text-lg sm:text-xl text-gray-600">
              {isAdmin && !jobId
                ? "No applications found."
                : "No applicants for this job."}
            </p>

          </div>

        ) : (

          <>
            {/* =================================================
                APPLICATION COUNT
            ================================================= */}

            <div className="bg-white shadow-sm rounded-xl p-5 mb-6">

              <p className="text-gray-600">
                Total Applications
              </p>

              <p className="text-3xl font-bold mt-1">
                {applications.length}
              </p>

            </div>

            {/* =================================================
                APPLICATIONS
            ================================================= */}

            <div className="space-y-6">

              {applications.map(
                (application) => {

                  const status =
                    application.status ||
                    "Pending";

                  return (

                    <div
                      key={application._id}
                      className="bg-white shadow-md rounded-xl p-5 sm:p-6 border"
                    >

                      {/* =====================================
                          APPLICANT HEADER
                      ===================================== */}

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                        <div className="min-w-0">

                          <h2 className="text-xl sm:text-2xl font-bold break-words">
                            {application.user?.name ||
                              "Unknown Applicant"}
                          </h2>

                          <p className="text-gray-600 mt-1 break-all">
                            {application.user?.email ||
                              "No email"}
                          </p>

                        </div>

                        {/* STATUS */}

                        <span
                          className={`self-start px-3 py-1 rounded-full text-sm font-bold ${
                            status === "Accepted"
                              ? "bg-green-100 text-green-700"
                              : status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {status}
                        </span>

                      </div>

                      {/* =====================================
                          JOB INFORMATION
                      ===================================== */}

                      <div className="mt-5 bg-gray-50 rounded-lg p-4 space-y-2">

                        <p className="break-words">
                          <strong>
                            Job:
                          </strong>{" "}
                          {application.job?.title ||
                            "Unknown Job"}
                        </p>

                        <p className="break-words">
                          <strong>
                            Company:
                          </strong>{" "}
                          {application.job?.company ||
                            "Unknown Company"}
                        </p>

                        {application.job?.location && (
                          <p className="break-words">
                            <strong>
                              Location:
                            </strong>{" "}
                            {application.job.location}
                          </p>
                        )}

                      </div>

                      {/* =====================================
                          RESUME
                      ===================================== */}

                      {application.resume && (

                        <div className="mt-5">

                          <a
                            href={
                              application.resume
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold"
                          >
                            📄 View Resume
                          </a>

                        </div>

                      )}

                      {/* =====================================
                          COVER LETTER
                      ===================================== */}

                      {application.coverLetter && (

                        <div className="mt-5">

                          <strong>
                            Cover Letter:
                          </strong>

                          <p className="mt-2 bg-gray-50 border rounded-lg p-4 text-gray-700 whitespace-pre-wrap break-words">
                            {application.coverLetter}
                          </p>

                        </div>

                      )}

                      {/* =====================================
                          ACTION BUTTONS
                      ===================================== */}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

                        {/* ACCEPT */}

                        <button
                          onClick={() =>
                            handleStatusChange(
                              application._id,
                              "Accepted"
                            )
                          }
                          disabled={
                            updating ===
                              application._id ||
                            status === "Accepted"
                          }
                          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg font-semibold"
                        >
                          {updating ===
                          application._id
                            ? "Updating..."
                            : status === "Accepted"
                            ? "✅ Accepted"
                            : "✅ Accept"}
                        </button>

                        {/* REJECT */}

                        <button
                          onClick={() =>
                            handleStatusChange(
                              application._id,
                              "Rejected"
                            )
                          }
                          disabled={
                            updating ===
                              application._id ||
                            status === "Rejected"
                          }
                          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-lg font-semibold"
                        >
                          {updating ===
                          application._id
                            ? "Updating..."
                            : status === "Rejected"
                            ? "❌ Rejected"
                            : "❌ Reject"}
                        </button>

                      </div>

                    </div>

                  );
                }
              )}

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Applicants;