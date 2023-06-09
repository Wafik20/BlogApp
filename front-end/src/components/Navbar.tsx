import { Link } from "react-router-dom";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { SiBloglovin } from "react-icons/si";
import useAuth from "../context/auth-context";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="header sticky top-0 bg-white opacity-90 z-50 shadow-md flex items-center justify-between px-8 py-02 max-h-16 h-16">
      <h1 className="w-3/12">
        <SiBloglovin className="h-8 p-1 hover:text-green-500 duration-200 w-16" />
      </h1>

      <nav className="nav font-semibold text-lg">
        {isAuthenticated && (
          <div>
            <ul className="flex items-center">
              <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                <Link to="/#">Profile</Link>
              </li>
              <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                <Link to="/">Home</Link>
              </li>
              <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                <Link to="#">Feed</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      <div className="w-3/12 flex justify-end">
        <Link to="/login">
          {isAuthenticated ? (
            <button onClick={logout}>
              <FiLogOut className="h-8 p-1 hover:text-green-500 duration-200 w-16" />
            </button>
          ) : (
            <FiLogIn className="h-8 p-1 hover:text-green-500 duration-200 w-16" />
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
