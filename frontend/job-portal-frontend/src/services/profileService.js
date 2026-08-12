import API from "./api";

// Get logged-in user's profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update name and email
export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    "/profile",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Change password
export const changePassword = async (
  currentPassword,
  newPassword
) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    "/profile/password",
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Upload/change profile picture
export const updateProfilePicture = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("profilePicture", file);

  const response = await API.put(
    "/profile/picture",
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