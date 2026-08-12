
import { useState } from "react";
import { registerUser } from "../../services/authService";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
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
      const data = await registerUser(formData);

      alert(data.message || "Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "jobseeker",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 shadow-lg p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        Signup
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Full Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="jobseeker">Jobseeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Register
        </button>

      </form>
    </div>
  );
};

export default Signup;

