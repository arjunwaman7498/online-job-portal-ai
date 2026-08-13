import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await API.post("/auth/forgot-password", {
        email,
      });
      if (response.data.resetLink) {
  window.location.href =
    response.data.resetLink;
}

      setMessage(
        response.data.message ||
          "Password reset link has been sent to your email."
      );

      setEmail("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-3">
        Forgot Password
      </h2>

      <p className="text-gray-600 text-center mb-6">
        Enter your email address and we'll send you a password reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded font-semibold"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && (
        <p className="mt-5 text-center text-green-600">
          {message}
        </p>
      )}

      <div className="text-center mt-6">
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;