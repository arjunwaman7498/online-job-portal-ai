import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

        {/* =================================================
            NAVBAR HEADER
        ================================================= */}

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl sm:text-3xl font-bold"
          >
            Job<span className="text-blue-600">Portal</span>
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden md:flex items-center gap-6 font-medium">

            <Link
              to="/"
              className="hover:text-blue-600 transition"
            >
              Home
            </Link>

            <Link
              to="/jobs"
              className="hover:text-blue-600 transition"
            >
              Jobs
            </Link>

            <Link
              to="/browse"
              className="hover:text-blue-600 transition"
            >
              Browse
            </Link>

            {user && (
              <Link
                to="/my-applications"
                className="hover:text-blue-600 transition"
              >
                My Applications
              </Link>
            )}

          </div>

          {/* =================================================
              DESKTOP AUTHENTICATION
          ================================================= */}

          <div className="hidden md:flex items-center gap-4">

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >

                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      👤
                    </div>
                  )}

                  <span className="font-semibold max-w-[150px] truncate">
                    {user.name}
                  </span>

                </Link>

                <button
                  onClick={logoutHandler}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Signup
                </Link>
              </>
            )}

          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {menuOpen && (
          <div className="md:hidden mt-3 border-t pt-4 pb-2">

            <div className="flex flex-col font-medium">

              <Link
                to="/"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                🏠 Home
              </Link>

              <Link
                to="/jobs"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                💼 Jobs
              </Link>

              <Link
                to="/browse"
                onClick={closeMenu}
                className="px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600"
              >
                🔍 Browse
              </Link>

              {user && (
                <>
                  <Link
                    to="/my-applications"
                    onClick={closeMenu}
                    className="px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                  >
                    📋 My Applications
                  </Link>

                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600"
                  >

                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                        👤
                      </div>
                    )}

                    <span className="truncate">
                      {user.name}
                    </span>

                  </Link>

                  <button
                    type="button"
                    onClick={logoutHandler}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg text-left"
                  >
                    🚪 Logout
                  </button>
                </>
              )}

              {!user && (
                <div className="grid grid-cols-2 gap-3 mt-3">

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="border border-blue-600 text-blue-600 px-4 py-3 rounded-lg text-center hover:bg-blue-50"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-center"
                  >
                    Signup
                  </Link>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;