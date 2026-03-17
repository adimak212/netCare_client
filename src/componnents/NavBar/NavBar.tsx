import { BrowserRouter as Routes, Route, Link, useLocation } from "react-router-dom";
import profileImg from "@/assets/icons/profile.png";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

function NavBar() {
  const location = useLocation();
  const userLocal = JSON.parse(localStorage.getItem("user") || "null");
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-gray-800 text-white shadow-md">
      <h1 className="text-xl font-bold">NetCare</h1>
      <div className="flex items-center gap-4">
        <Link
          to="/newProject"
          className={`px-3 py-2 rounded transition ${
            location.pathname === "/newProject" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          New Project
        </Link>
        <Link
          to="/projects"
          className={`px-3 py-2 rounded transition ${
            location.pathname === "/projects" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          My Projects
        </Link>
        <div
          className="space-x-1 flex justify-center items-center relative hover:bg-gray-700 px-3 py-2 rounded transition cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img className="w-7" src={profileImg} alt="" />
          <div className="text-white">{(userLocal)? userLocal?.userName: user?.userName}</div>
        </div>
        {isOpen && (
          <div className="absolute right-3 top-14 w-30 bg-background text-primary rounded shadow-lg overflow-hidden">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:text-red-700"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
