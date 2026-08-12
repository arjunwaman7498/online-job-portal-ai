
import { useState } from "react";
import { createJob } from "../../services/jobService";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobType: "Full Time",
  });

  const [logo, setLogo] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================
  const handleChange = (e) => {
    if (e.target.type === "file") {
      setLogo(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // =====================================================
  // SUBMIT JOB
  // =====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("company", formData.company);
      data.append("location", formData.location);
      data.append("salary", formData.salary);
      data.append("description", formData.description);
      data.append("jobType", formData.jobType);

      if (logo) {
        data.append("logo", logo);
      }

      console.log("Posting Job...");

      const response = await createJob(data);

      console.log("Create Job Response:", response);

      alert("Job Posted Successfully!");

      // Go back to recruiter dashboard
      navigate("/recruiter/dashboard");

    } catch (error) {
      console.error("Post Job Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to post job"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 sm:p-8 rounded-xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <h2 className="text-3xl font-bold mb-2">
          Post New Job
        </h2>

        <p className="text-gray-600 mb-6">
          Create a new job opportunity for jobseekers.
        </p>

        {/* =================================================
            FORM
        ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Job Title */}
          <div>
            <label className="block font-medium mb-1">
              Job Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Software Developer"
              className="w-full border p-3 rounded-lg"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block font-medium mb-1">
              Company
            </label>

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="w-full border p-3 rounded-lg"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          {/* Company Logo */}
          <div>
            <label className="block font-medium mb-1">
              Company Logo
            </label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              className="w-full border p-3 rounded-lg"
              onChange={handleChange}
            />

            {logo && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {logo.name}
              </p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">
              Location
            </label>

            <input
              type="text"
              name="location"
              placeholder="e.g. Pune, Maharashtra"
              className="w-full border p-3 rounded-lg"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Salary */}
          <div>
            <label className="block font-medium mb-1">
              Salary
            </label>

            <input
              type="number"
              name="salary"
              placeholder="e.g. 600000"
              className="w-full border p-3 rounded-lg"
              value={formData.salary}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block font-medium mb-1">
              Job Type
            </label>

            <select
              name="jobType"
              className="w-full border p-3 rounded-lg"
              value={formData.jobType}
              onChange={handleChange}
            >
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

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Job Description
            </label>

            <textarea
              name="description"
              placeholder="Enter job description, requirements, responsibilities..."
              rows="6"
              className="w-full border p-3 rounded-lg"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-col sm:flex-row gap-3 pt-3">

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {submitting ? "Posting Job..." : "Post Job"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/recruiter/dashboard")}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default PostJob;

