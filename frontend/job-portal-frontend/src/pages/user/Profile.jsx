import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  changePassword,
  updateProfilePicture,
} from "../../services/profileService";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [uploadingPicture, setUploadingPicture] = useState(false);

  // =====================================================
  // GET PROFILE
  // =====================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        setUser(data.user);

        setProfileData({
          name: data.user.name || "",
          email: data.user.email || "",
        });
      } catch (error) {
        console.log("Profile Error:", error);

        alert(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================================================
  // PROFILE INPUT
  // =====================================================

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // UPDATE NAME + EMAIL
  // =====================================================

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      setSavingProfile(true);

      const data = await updateProfile(profileData);

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      alert("Profile updated successfully");
    } catch (error) {
      console.log("Update Profile Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSavingProfile(false);
    }
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      alert("Please enter both passwords");
      return;
    }

    if (newPassword.length < 6) {
      alert(
        "New password must be at least 6 characters"
      );
      return;
    }

    try {
      setChangingPassword(true);

      const data = await changePassword(
        currentPassword,
        newPassword
      );

      alert(
        data.message ||
          "Password changed successfully"
      );

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(
        "Change Password Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setChangingPassword(false);
    }
  };

  // =====================================================
  // SELECT PROFILE PICTURE
  // =====================================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please select a JPG, PNG, or WebP image"
      );

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB");

      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

  // =====================================================
  // UPLOAD PROFILE PICTURE
  // =====================================================

  const handlePictureUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    try {
      setUploadingPicture(true);

      const data = await updateProfilePicture(
        selectedFile
      );

      setUser(data.user);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setSelectedFile(null);

      alert(
        data.message ||
          "Profile picture updated successfully"
      );
    } catch (error) {
      console.log(
        "Profile Picture Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to upload profile picture"
      );
    } finally {
      setUploadingPicture(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <p className="text-xl sm:text-2xl text-gray-600 text-center">
          Loading profile...
        </p>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4">

      <div className="max-w-4xl mx-auto pb-10">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Profile
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your personal information and account.
          </p>
        </div>

        {/* =================================================
            PROFILE PICTURE
        ================================================= */}

        <div className="bg-white shadow-md rounded-xl p-5 sm:p-8 mb-6">

          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Profile Picture
          </h2>

          <div className="flex flex-col items-center">

            {/* Current Picture */}
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center text-5xl">
                👤
              </div>
            )}

            {/* File Input */}
            <div className="w-full max-w-md mt-6">

              <label className="block font-medium mb-2">
                Choose a new picture
              </label>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="w-full border rounded-lg p-2 text-sm"
              />

            </div>

            {/* Selected File */}
            {selectedFile && (
              <p className="mt-3 text-sm text-gray-600 text-center break-all">
                Selected: {selectedFile.name}
              </p>
            )}

            {/* Upload */}
            <button
              type="button"
              onClick={handlePictureUpload}
              disabled={
                uploadingPicture ||
                !selectedFile
              }
              className="w-full sm:w-auto mt-5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {uploadingPicture
                ? "Uploading..."
                : "Upload Profile Picture"}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              JPG, PNG or WebP • Maximum 5 MB
            </p>

          </div>
        </div>

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="bg-white shadow-md rounded-xl p-5 sm:p-8 mb-6">

          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Personal Information
          </h2>

          <form
            onSubmit={handleProfileUpdate}
            className="space-y-5"
          >

            {/* Name */}
            <div>
              <label className="block font-medium mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Save */}
            <button
              type="submit"
              disabled={savingProfile}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {savingProfile
                ? "Saving..."
                : "Save Changes"}
            </button>

          </form>
        </div>

        {/* =================================================
            CHANGE PASSWORD
        ================================================= */}

        <div className="bg-white shadow-md rounded-xl p-5 sm:p-8">

          <h2 className="text-xl sm:text-2xl font-semibold mb-6">
            Change Password
          </h2>

          <form
            onSubmit={handlePasswordChange}
            className="space-y-5"
          >

            {/* Current Password */}
            <div>
              <label className="block font-medium mb-2">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block font-medium mb-2">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                minLength="6"
                required
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <p className="text-xs text-gray-500 mt-2">
                Minimum 6 characters
              </p>
            </div>

            {/* Change Password */}
            <button
              type="submit"
              disabled={changingPassword}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {changingPassword
                ? "Changing..."
                : "Change Password"}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;