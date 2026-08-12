import API from "./api";

// =====================================================
// GET ADMIN DASHBOARD STATS
// =====================================================
export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================================================
// GET ALL APPLICATIONS
// ADMIN ONLY
// =====================================================
export const getAllApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/admin/applications", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================================================
// GET ALL JOBS
// ADMIN ONLY
// =====================================================
export const getAllJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/admin/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================================================
// OLD FUNCTION NAME
// Kept for existing Jobs.jsx
// =====================================================
export const getRecruiterJobs = async () => {
  return getAllJobs();
};

// =====================================================
// CREATE JOB
// ADMIN ONLY
// =====================================================
export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/admin/jobs",
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================================
// DELETE JOB
// =====================================================
export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(
    `/jobs/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================================
// UPDATE JOB
// =====================================================
export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/jobs/${id}`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================================
// GET RECRUITER APPLICATIONS
// =====================================================
export const getRecruiterApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    "/applications/recruiter",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================================
// UPDATE APPLICATION STATUS
// =====================================================
export const updateApplicationStatus = async (
  id,
  status
) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/applications/${id}/status`,
    {
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};