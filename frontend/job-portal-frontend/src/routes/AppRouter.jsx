import { Routes, Route } from "react-router-dom";

// =====================================================
// USER PAGES
// =====================================================
import Home from "../pages/user/Home";
import UserJobs from "../pages/user/Jobs";
import Browse from "../pages/user/Browse";
import Profile from "../pages/user/Profile";
import MyApplications from "../pages/user/MyApplications";

// =====================================================
// AUTH PAGES
// =====================================================
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// =====================================================
// JOB DETAILS
// =====================================================
import JobDescription from "../components/JobDescription";

// =====================================================
// ROLE PROTECTION
// =====================================================
import RoleRoute from "../components/RoleRoute";

// =====================================================
// ADMIN / RECRUITER PAGES
// =====================================================
import Dashboard from "../pages/admin/Dashboard";
import RecruiterDashboard from "../pages/admin/RecruiterDashboard";
import PostJob from "../pages/admin/PostJob";
import AdminJobs from "../pages/admin/Jobs";
import EditJob from "../pages/admin/EditJob";
import Applicants from "../pages/admin/Applicants";

// =====================================================
// APP ROUTER
// =====================================================
const AppRouter = () => {
  return (
    <Routes>

      {/* =====================================================
          USER ROUTES
      ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/jobs"
        element={<UserJobs />}
      />

      <Route
        path="/browse"
        element={<Browse />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/my-applications"
        element={<MyApplications />}
      />

      {/* =====================================================
          AUTH ROUTES
      ===================================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* =====================================================
          JOB DETAILS
      ===================================================== */}

      <Route
        path="/job/:id"
        element={<JobDescription />}
      />

      {/* =====================================================
          RECRUITER ROUTES
      ===================================================== */}

      {/* Recruiter Dashboard */}
      <Route
        path="/recruiter/dashboard"
        element={
          <RoleRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </RoleRoute>
        }
      />

      {/* Recruiter Post Job */}
      <Route
        path="/recruiter/post-job"
        element={
          <RoleRoute allowedRoles={["recruiter"]}>
            <PostJob />
          </RoleRoute>
        }
      />

      {/* Recruiter Jobs */}
      <Route
        path="/recruiter/jobs"
        element={
          <RoleRoute allowedRoles={["recruiter"]}>
            <AdminJobs />
          </RoleRoute>
        }
      />

      {/* Recruiter Edit Job */}
      <Route
        path="/recruiter/edit-job/:id"
        element={
          <RoleRoute allowedRoles={["recruiter"]}>
            <EditJob />
          </RoleRoute>
        }
      />

      {/* Recruiter Applicants */}
      <Route
        path="/recruiter/jobs/:jobId/applicants"
        element={
          <RoleRoute allowedRoles={["recruiter"]}>
            <Applicants />
          </RoleRoute>
        }
      />

      {/* =====================================================
          ADMIN ROUTES
      ===================================================== */}

      {/* Admin Dashboard - NEW */}
      <Route
        path="/admin/dashboard"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Dashboard />
          </RoleRoute>
        }
      />

      {/* Keep /admin for compatibility */}
      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Dashboard />
          </RoleRoute>
        }
      />

      {/* Admin Recruiter Dashboard */}
      <Route
        path="/admin/recruiter-dashboard"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <RecruiterDashboard />
          </RoleRoute>
        }
      />

      {/* Admin Post Job */}
      <Route
        path="/admin/post-job"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <PostJob />
          </RoleRoute>
        }
      />

      {/* Admin Jobs */}
      <Route
        path="/admin/jobs"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminJobs />
          </RoleRoute>
        }
      />

      {/* Admin Edit Job */}
      <Route
        path="/admin/edit-job/:id"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <EditJob />
          </RoleRoute>
        }
      />

      {/* Admin Applications */}
      <Route
        path="/admin/applications"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Applicants />
          </RoleRoute>
        }
      />

      {/* Admin Job Applicants */}
      <Route
        path="/admin/jobs/:jobId/applicants"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <Applicants />
          </RoleRoute>
        }
      />

    </Routes>
  );
};

export default AppRouter;
