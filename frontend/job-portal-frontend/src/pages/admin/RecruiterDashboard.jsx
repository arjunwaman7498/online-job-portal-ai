import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecruiterJobs } from "../../services/recruiterService";

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET LOGGED-IN USER
  // =====================================================

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isAdmin = user?.role === "admin";

  // =====================================================
  // FETCH JOBS
  // =====================================================

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getRecruiterJobs();

        setJobs(data.jobs || []);
      } catch (error) {
        console.log(
          "Recruiter Dashboard Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // =====================================================
  // APPLICANTS URL
  // =====================================================

  const getApplicantsPath = (jobId) => {
    if (isAdmin) {
      return `/admin/jobs/${jobId}/applicants`;
    }

    return `/recruiter/jobs/${jobId}/applicants`;
  };

  // =====================================================
  // EDIT JOB URL
  // =====================================================

  const getEditJobPath = (jobId) => {
    if (isAdmin) {
      return `/admin/edit-job/${jobId}`;
    }

    return `/recruiter/edit-job/${jobId}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">
              Recruiter Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Manage your posted jobs and applicants
            </p>
          </div>

          <Link
            to={
              isAdmin
                ? "/admin/post-job"
                : "/recruiter/post-job"
            }
            className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            + Post a Job
          </Link>

        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">

            <p className="text-lg text-gray-600">
              Loading jobs...
            </p>

          </div>
        ) : jobs.length === 0 ? (

          /* =====================================================
              NO JOBS
          ===================================================== */

          <div className="bg-white shadow-md rounded-xl p-8 sm:p-12 text-center">

            <div className="text-5xl mb-4">
              💼
            </div>

            <p className="text-xl text-gray-600">
              No jobs posted yet.
            </p>

            <Link
              to={
                isAdmin
                  ? "/admin/post-job"
                  : "/recruiter/post-job"
              }
              className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Post a Job
            </Link>

          </div>

        ) : (

          <>
            {/* =====================================================
                JOB COUNT
            ===================================================== */}

            <div className="bg-white shadow-sm rounded-xl p-5 mb-6">

              <p className="text-gray-600">
                Total Posted Jobs
              </p>

              <p className="text-3xl font-bold mt-1">
                {jobs.length}
              </p>

            </div>

            {/* =====================================================
                JOBS
            ===================================================== */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {jobs.map((job) => (

                <div
                  key={job._id}
                  className="bg-white shadow-md rounded-xl p-5 sm:p-6 border hover:shadow-lg transition"
                >

                  {/* =================================================
                      JOB HEADER
                  ================================================= */}

                  <div className="flex items-start gap-4">

                    {job.logo ? (

                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-lg border p-1 flex-shrink-0"
                      />

                    ) : (

                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        💼
                      </div>

                    )}

                    <div className="min-w-0">

                      <h2 className="text-xl sm:text-2xl font-bold break-words">
                        {job.title}
                      </h2>

                      <p className="text-gray-600 mt-1 break-words">
                        {job.company}
                      </p>

                    </div>

                  </div>

                  {/* =================================================
                      JOB DETAILS
                  ================================================= */}

                  <div className="mt-5 space-y-2 text-gray-700">

                    <p>
                      <strong>📍 Location:</strong>{" "}
                      {job.location}
                    </p>

                    <p>
                      <strong>💰 Salary:</strong>{" "}
                      ₹{job.salary}
                    </p>

                    <p>
                      <strong>💼 Type:</strong>{" "}
                      {job.jobType}
                    </p>

                    <p className="font-semibold">
                      <strong>👥 Applicants:</strong>{" "}
                      {job.applicantCount || 0}
                    </p>

                  </div>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">

                    {/* View Applicants */}

                    <Link
                      to={getApplicantsPath(job._id)}
                      className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold"
                    >
                      👥 View Applicants
                    </Link>

                    {/* Edit Job */}

                    <Link
                      to={getEditJobPath(job._id)}
                      className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
                    >
                      ✏️ Edit Job
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </>
        )}

      </div>

    </div>
  );
};

export default RecruiterDashboard;
