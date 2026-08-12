import API from "./api";

// Apply for a job
export const applyJob = async (jobId, formData) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    `/applications/${jobId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Get my applications
export const getMyApplications = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/applications/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};