import { Navigate, useLocation } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  let user = null;

  try {
    user = userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Invalid user data in localStorage:", error);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  // =====================================================
  // NOT LOGGED IN
  // =====================================================

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // =====================================================
  // NORMALIZE ROLE
  // =====================================================

  const userRole = String(user.role || "")
    .trim()
    .toLowerCase();

  const roles = allowedRoles.map((role) =>
    String(role).trim().toLowerCase()
  );

  console.log("RoleRoute:", {
    path: location.pathname,
    userRole,
    allowedRoles: roles,
  });

  // =====================================================
  // ROLE NOT AUTHORIZED
  // =====================================================

  if (!roles.includes(userRole)) {
    console.log(
      `Access denied: ${userRole} cannot access ${location.pathname}`
    );

    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (userRole === "recruiter") {
      return <Navigate to="/recruiter/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // =====================================================
  // AUTHORIZED
  // =====================================================

  return children;
};

export default RoleRoute;
