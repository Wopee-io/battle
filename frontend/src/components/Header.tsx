import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = !!api.getToken();

  const handleLogout = () => {
    api.logout();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Battle
          </Link>
          <nav className="flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
