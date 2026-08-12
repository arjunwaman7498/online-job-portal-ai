import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const data = await resetPassword(token, password);

      setMessage(
        data.message || "Password reset successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Reset Password Error:", error);

      setError(
        error.response?.data?.message ||
          "Password reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-3">
        Reset Password
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Enter your new password below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="password"
          placeholder="New Password"
          required
          minLength="6"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          required
          minLength="6"
          className="w-full border p-3 rounded"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded font-semibold"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {error && (
        <p className="mt-5 text-center text-red-600 font-medium">
          {error}
        </p>
      )}

      {message && (
        <p className="mt-5 text-center text-green-600 font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;