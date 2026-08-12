import API from "./api";

// =====================================================
// GET ALL JOBS
// Search + Filters + Pagination
// =====================================================
export const getAllJobs = async (
  keyword = "",
  location = "",
  jobType = "",
  page = 1
) => {
  const response = await API.get("/jobs", {
    params: {
      keyword,
      location,
      jobType,
      page,
    },
  });

  return response.data;
};

// =====================================================
// GET JOB BY ID
// =====================================================
export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);

  return response.data;
};

// =====================================================
// CREATE JOB
// Recruiter / Admin
// =====================================================
export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await API.post("/jobs", jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================================================
// UPDATE JOB
// Recruiter / Admin
// =====================================================
export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await API.put(`/jobs/${id}`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================================================
// DELETE JOB
// Recruiter / Admin
// =====================================================
export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token not found");
  }

  const response = await API.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};