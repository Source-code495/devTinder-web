import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constansts";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Navigation menu items with updated icons
  const navItems = [
    { path: "/", label: "Feed", icon: "📊" },
    { path: "/connections", label: "Connections", icon: "🌐" },
    { path: "/requests", label: "Requests", icon: "📨" },
    { path: "/premium", label: "Premium", icon: "🚀" }
  ];

  return (
    <div className="navbar bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-2xl border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1">
          <Link 
            to="/" 
            className="btn btn-ghost text-2xl font-bold tracking-wider hover:bg-gray-700 transition-all duration-300"
          >
            <span className="mr-2">💻</span>DevTinder
          </Link>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            {/* Navigation Menu */}
            <ul className="menu menu-horizontal px-1 bg-gray-800 rounded-full shadow-md">
              {navItems.map((item) => (
                <li key={item.path} className="px-1">
                  <Link 
                    to={item.path} 
                    className={`rounded-full text-sm px-3 py-2 transition-all duration-200 ${
                      location.pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div 
                tabIndex={0} 
                role="button" 
                className="btn btn-ghost btn-circle avatar hover:bg-gray-700 transition-all duration-300"
              >
                <div className="w-12 rounded-full ring-2 ring-blue-600 ring-offset-2 ring-offset-gray-900">
                  <img 
                    alt="User Profile" 
                    src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.firstName}&background=1a1a2e&color=ffffff`} 
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
              <ul 
                tabIndex={0} 
                className="menu menu-sm dropdown-content z-[50] p-2 shadow-xl bg-gray-800 rounded-xl w-72 mt-4 border border-gray-700"
              >
                <li className="menu-title bg-gray-900 rounded-t-lg text-white">
                  <span className="flex items-center">
                    <img 
                      alt="User Profile" 
                      src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.firstName}&background=1a1a2e&color=ffffff`} 
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    {user.firstName} {user.lastName}
                  </span>
                </li>
                <li className="hover:bg-gray-700 rounded-md transition-all duration-200">
                  <Link to="/profile" className="justify-between">
                    Edit Profile
                    <span className="badge badge-primary bg-blue-600 text-white">New</span>
                  </Link>
                </li>
                <li className="hover:bg-red-900/20 rounded-md transition-all duration-200">
                  <a 
                    onClick={handleLogout} 
                    className="text-red-400 hover:text-red-500 transition-colors"
                  >
                    🚪 Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;