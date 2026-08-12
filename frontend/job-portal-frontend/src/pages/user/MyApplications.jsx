import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../../services/applicationService";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();

        setApplications(data.applications || []);
      } catch (error) {
        console.log("My Applications Error:", error);

        alert(
          error.response?.data?.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusClass = (status) => {
    if (status === "Accepted") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <p className="text-xl sm:text-2xl text-gray-600 text-center">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4">
      <div className="max-w-6xl mx-auto pb-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Applications
          </h1>

          <p className="text-gray-600 mt-2">
            Track the status of jobs you have applied for.
          </p>
        </div>

        {/* Application Count */}
        {applications.length > 0 && (
          <div className="bg-white shadow-sm rounded-xl p-5 mb-6">
            <p className="text-gray-600">
              Total Applications
            </p>

            <p className="text-3xl font-bold mt-1">
              {applications.length}
            </p>
          </div>
        )}

        {/* No Applications */}
        {applications.length === 0 ? (
          <div className="bg-white shadow-md rounded-xl p-8 sm:p-12 text-center">

            <div className="text-5xl mb-4">
              📋
            </div>

            <p className="text-lg sm:text-xl text-gray-600">
              You haven't applied for any jobs yet.
            </p>

            <Link
              to="/jobs"
              className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Browse Jobs
            </Link>

          </div>
        ) : (
          <div className="space-y-6">

            {applications.map((application) => {
              const job = application.job;

              return (
                <div
                  key={application._id}
                  className="bg-white shadow-md rounded-xl p-5 sm:p-6 border"
                >

                  {/* Job + Status */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

                    {/* Job Information */}
                    <div className="min-w-0">

                      <h2 className="text-xl sm:text-2xl font-bold break-words">
                        {job?.title || "Job"}
                      </h2>

                      <p className="text-lg text-gray-700 mt-1 break-words">
                        {job?.company || "Company"}
                      </p>

                      <div className="mt-3 space-y-1 text-gray-600">

                        <p>
                          📍{" "}
                          {job?.location ||
                            "Location not available"}
                        </p>

                        {job?.salary && (
                          <p>
                            💰 ₹{job.salary}
                          </p>
                        )}

                        {job?.jobType && (
                          <p>
                            💼 {job.jobType}
                          </p>
                        )}

                      </div>

                    </div>

                    {/* Status */}
                    <span
                      className={`self-start px-4 py-2 rounded-full font-semibold whitespace-nowrap ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status ||
                        "Pending"}
                    </span>

                  </div>

                  <hr className="my-5" />

                  {/* Application Date */}
                  <div className="text-gray-600">
                    <strong>Applied:</strong>{" "}
                    {application.createdAt
                      ? new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </div>

                  {/* Cover Letter */}
                  {application.coverLetter && (
                    <div className="mt-5">

                      <strong>Cover Letter:</strong>

                      <p className="mt-2 bg-gray-50 border rounded-lg p-4 text-gray-700 whitespace-pre-wrap break-words">
                        {application.coverLetter}
                      </p>

                    </div>
                  )}

                  {/* Resume */}
                  {application.resume && (
                    <div className="mt-5">

                      <a
                        href={application.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
                      >
                        📄 View Resume
                      </a>

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyApplications;