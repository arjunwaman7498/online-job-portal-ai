import { useNavigate } from "react-router-dom";

const LatestJobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">

      {/* Company Logo */}
      {job.logo && (
        <img
          src={job.logo}
          alt={job.company}
          className="w-16 h-16 object-contain mb-4 rounded"
        />
      )}

      <h3 className="text-xl font-semibold">
        {job.title}
      </h3>

      <p className="text-gray-500 mt-2">
        {job.company} • {job.location}
      </p>

      <div className="flex gap-2 mt-4">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {job.jobType}
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          ₹{job.salary}
        </span>
      </div>

      <button
        onClick={() => navigate(`/job/${job._id}`)}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
};

export default LatestJobCard;