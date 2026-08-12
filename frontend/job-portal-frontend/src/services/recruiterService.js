
import API from "./api";

// =====================================================
// GET JOBS POSTED BY LOGGED-IN RECRUITER
// =====================================================
const getRecruiterJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/recruiter/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// =====================================================
// GET APPLICANTS FOR A SPECIFIC JOB
// =====================================================
const getApplicants = async (jobId) => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    `/recruiter/jobs/${jobId}/applicants`,
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
const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/applications/${applicationId}/status`,
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

export {
  getRecruiterJobs,
  getApplicants,
  updateApplicationStatus,
};



