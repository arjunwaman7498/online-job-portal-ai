import API from "./api";

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await API.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

// Reset Password
export const resetPassword = async (token, password) => {
  const response = await API.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};