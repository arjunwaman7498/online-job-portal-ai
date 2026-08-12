import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobService";
import LatestJobCard from "./LatestJobCard";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

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
        console.log("Fetch Jobs Error:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [keyword, location, jobType, page]);

  // Reset page when filters change
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setPage(1);
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
    setPage(1);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    setPage(1);
  };

  return (
    <section className="py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-8">
          Latest Jobs
        </h2>

        {/* Search & Filters */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">

          <div className="grid md:grid-cols-3 gap-4">

            {/* Search */}
            <input
              type="text"
              placeholder="🔍 Search by Title or Company..."
              value={keyword}
              onChange={handleKeywordChange}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Location */}
            <select
              value={location}
              onChange={handleLocationChange}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
            </select>

            {/* Job Type */}
            <select
              value={jobType}
              onChange={handleJobTypeChange}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Job Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>

          </div>

          {/* Clear Filters */}
          {(keyword || location || jobType) && (
            <button
              onClick={handleClearFilters}
              className="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
            >
              Clear Filters
            </button>
          )}

        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-xl text-gray-600">
            Loading jobs...
          </p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              No jobs found.
            </p>

            {(keyword || location || jobType) && (
              <button
                onClick={handleClearFilters}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Job Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <LatestJobCard
                  key={job._id}
                  job={job}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10">

                <button
                  onClick={() =>
                    setPage((prev) => prev - 1)
                  }
                  disabled={page === 1 || loading}
                  className="px-5 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
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
                  disabled={
                    page === totalPages || loading
                  }
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  Next →
                </button>

              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
};

export default LatestJobs;