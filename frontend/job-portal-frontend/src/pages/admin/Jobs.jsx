import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecruiterJobs,
  deleteJob,
} from "../../services/adminService";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getRecruiterJobs();
        setJobs(data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);

      setJobs(jobs.filter((job) => job._id !== id));

      alert("Job deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8">Posted Jobs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md rounded-lg p-5 border"
          >
            {/* Company Logo */}
            {job.logo && (
              <img
                src={job.logo}
                alt={job.company}
                className="w-16 h-16 object-contain mb-4 rounded"
              />
            )}

            <h2 className="text-2xl font-bold">{job.title}</h2>

            <p>
              <strong>Company:</strong> {job.company}
            </p>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong> ₹{job.salary}
            </p>

            <p>
              <strong>Type:</strong> {job.jobType}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Job
              </button>

              <button
                onClick={() => navigate(`/admin/edit-job/${job._id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;