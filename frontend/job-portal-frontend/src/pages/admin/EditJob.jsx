import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../services/jobService";
import { updateJob } from "../../services/adminService";



const EditJob = () => {
    const { id } = useParams();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobType: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  const fetchJob = async () => {
    try {
      const data = await getJobById(id);

      setFormData({
        title: data.job.title,
        company: data.job.company,
        location: data.job.location,
        salary: data.job.salary,
        description: data.job.description,
        jobType: data.job.jobType,
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchJob();
}, [id]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await updateJob(id, formData);

    alert("Job Updated Successfully");

    navigate("/admin/jobs");
  } catch (error) {
    console.log(error);
    alert("Failed to update job");
  }
};

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          value={formData.jobType}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Job
        </button>

      </form>
    </div>
  );
};

export default EditJob;