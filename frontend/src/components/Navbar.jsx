import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-gray-800 px-4 py-3 sm:px-8 text-white flex justify-between items-center shadow-md">
      <h1 className="font-bold text-lg sm:text-xl tracking-wide">
        AI Code Reviewer
      </h1>

      <div className="space-x-4 flex items-center">
        {!isAuthenticated ? (
          <>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded-full transition-all"
            >
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-sm rounded-full transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
