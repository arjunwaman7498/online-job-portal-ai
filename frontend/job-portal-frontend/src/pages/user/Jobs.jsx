import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllJobs } from "../../services/jobService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const data = await getAllJobs(
          keyword,
          location,
          jobType,
          page
        );

        setJobs(data.jobs || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.log("Jobs Error:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword, location, jobType, page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [keyword, location, jobType]);

  return (
    <div className="min-h-screen bg-slate-100 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
          All Jobs
        </h1>

        {/* Search & Filters */}
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <input
              type="text"
              placeholder="Search title or company..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Location */}
            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">
                Bangalore
              </option>
              <option value="Hyderabad">
                Hyderabad
              </option>
              <option value="Chennai">
                Chennai
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Remote">Remote</option>
            </select>

            {/* Job Type */}
            <select
              value={jobType}
              onChange={(e) =>
                setJobType(e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                All Job Types
              </option>
              <option value="Full Time">
                Full Time
              </option>
              <option value="Part Time">
                Part Time
              </option>
              <option value="Internship">
                Internship
              </option>
              <option value="Remote">
                Remote
              </option>
            </select>

          </div>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">
              Loading jobs...
            </p>
          </div>
        ) : jobs.length === 0 ? (
          /* No Jobs */
          <div className="bg-white shadow-md rounded-xl p-10 text-center">
            <p className="text-xl text-gray-500">
              No jobs found.
            </p>
          </div>
        ) : (
          <>
            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white shadow-md rounded-xl p-6 border hover:shadow-xl transition"
                >

                  {/* Logo */}
                  {job.logo && (
                    <div className="mb-4">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 object-contain rounded-lg border p-2"
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    {job.title}
                  </h2>

                  {/* Company */}
                  <p className="text-gray-700">
                    <strong>Company:</strong>{" "}
                    {job.company}
                  </p>

                  {/* Location */}
                  <p className="text-gray-700">
                    <strong>Location:</strong>{" "}
                    {job.location}
                  </p>

                  {/* Salary */}
                  <p className="text-gray-700">
                    <strong>Salary:</strong>{" "}
                    ₹{job.salary}
                  </p>

                  {/* Type */}
                  <p className="text-gray-700">
                    <strong>Type:</strong>{" "}
                    {job.jobType}
                  </p>

                  {/* Applicants */}
                  <p className="mt-3 font-semibold text-gray-700">
                    👥 {job.applicantCount || 0} Applicants
                  </p>

                  {/* View Job */}
                  <Link
                    to={`/job/${job._id}`}
                    className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
                  >
                    View Job
                  </Link>

                </div>
              ))}

            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-10">

              <button
                onClick={() =>
                  setPage((prev) => prev - 1)
                }
                disabled={page === 1}
                className="px-5 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-40"
              >
                ← Previous
              </button>

              <span className="font-semibold">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setPage((prev) => prev + 1)
                }
                disabled={page === totalPages}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-40"
              >
                Next →
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Jobs;