import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../../services/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    totalRecruiters: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardStats();

        console.log("Admin Dashboard Stats:", data);

        setStats({
          totalJobs: data.totalJobs || 0,
          totalApplications: data.totalApplications || 0,
          totalRecruiters: data.totalRecruiters || 0,
        });
      } catch (error) {
        console.error("Dashboard Stats Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard statistics"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            Manage and monitor your Job Portal
          </p>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* =====================================================
            DASHBOARD CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Jobs */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-600">
                  Total Jobs
                </h2>

                {loading ? (
                  <p className="text-3xl mt-4 font-bold">
                    Loading...
                  </p>
                ) : (
                  <p className="text-5xl mt-4 font-bold text-blue-600">
                    {stats.totalJobs}
                  </p>
                )}
              </div>

              <div className="text-4xl">
                💼
              </div>

            </div>
          </div>

          {/* Total Applications */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-600">
                  Applications
                </h2>

                {loading ? (
                  <p className="text-3xl mt-4 font-bold">
                    Loading...
                  </p>
                ) : (
                  <p className="text-5xl mt-4 font-bold text-green-600">
                    {stats.totalApplications}
                  </p>
                )}
              </div>

              <div className="text-4xl">
                📄
              </div>

            </div>
          </div>

          {/* Total Recruiters */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-600">
                  Active Recruiters
                </h2>

                {loading ? (
                  <p className="text-3xl mt-4 font-bold">
                    Loading...
                  </p>
                ) : (
                  <p className="text-5xl mt-4 font-bold text-purple-600">
                    {stats.totalRecruiters}
                  </p>
                )}
              </div>

              <div className="text-4xl">
                🧑‍💼
              </div>

            </div>
          </div>

        </div>

        {/* =====================================================
            ADMIN ACTIONS
        ===================================================== */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Admin Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            {/* Post Job */}
            <Link
              to="/admin/post-job"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              ➕ Post Job
            </Link>

            {/* Manage Jobs */}
            <Link
              to="/admin/jobs"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              📋 Manage Jobs
            </Link>

            {/* Applications */}
            <Link
              to="/admin/applications"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              👥 View Applications
            </Link>

            {/* Recruiter Dashboard */}
            <Link
              to="/admin/recruiter-dashboard"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              🧑‍💼 Recruiter Dashboard
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;