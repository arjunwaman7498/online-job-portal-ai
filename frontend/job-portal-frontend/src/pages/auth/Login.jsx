
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      console.log("Login Response:", data);

      // Save token and user information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful");

      // Role-based navigation
      if (data.user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-lg p-8">

      <h2 className="text-3xl font-bold text-center mb-6">
        Login
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border p-3 rounded"
          value={formData.password}
          onChange={handleChange}
        />

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Login
        </button>

      </form>

      <p className="text-center mt-6 text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Sign Up
        </Link>
      </p>

    </div>
  );
};

export default Login;

