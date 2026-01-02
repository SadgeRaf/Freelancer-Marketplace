import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FaUser, FaCaretDown, FaSun, FaMoon } from "react-icons/fa";

export default function AnimatedNavbar() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const paths = {
    1: "0 1 8 73.3 18 18",
    2: "0 6 8 64 10 20.6",
    3: "0 12 10 49 10 50",
    4: "0 21 12 28 12 60",
    5: "0 30 20 1 14 80",
  };

  // Links configuration based on authentication
  const allLinks = [
    { name: "Home", path: "/", showAlways: true },
    { name: "All Jobs", path: "/alljobs", showAlways: true },
    { name: "Add a Job", path: "/addJob", requireAuth: true },
    { name: "My Accepted Jobs", path: "/myJobs", requireAuth: true },
    { name: "My Posted Jobs", path: "/myaddedjobs", requireAuth: true },
  ];

  // Filter links based on authentication
  const links = allLinks.filter(link =>
    link.showAlways || (link.requireAuth && user)
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        setProfileDropdown(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Text color based on theme
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';
  const borderColor = theme === 'dark' ? 'border-white/40' : 'border-gray-300';
  const bgColor = theme === 'dark' ? 'bg-[#bef6]/90' : 'bg-white/90';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/20' : 'hover:bg-gray-100';
  const buttonBg = theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white';
  const buttonHover = theme === 'dark' ? 'hover:bg-gray-200' : 'hover:bg-gray-800';
  const mobileMenuBg = theme === 'dark' ? 'bg-[#bfe6f6]/95' : 'bg-white/95';

  return (
    <nav className={`w-full ${bgColor} backdrop-blur-sm shadow-md fixed top-0 left-0 z-50`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6 relative">
        {/* Logo */}
        <Link
          to="/"
          className={`text-2xl font-extrabold ${textColor} tracking-wider z-50`}
        >
          FM
        </Link>

        {/* Desktop Navigation */}
        <div className="relative w-[700px] hidden md:flex justify-around items-center h-[60px]">
          <div
            className="absolute inset-0 flex justify-around items-center px-4"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(null)}
                className={`${textColor} font-medium px-4 py-2 rounded-md cursor-pointer transition ${hoverBg}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Animated SVG Border */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
            viewBox="0 0 500 60"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0"
              y="0"
              width="500"
              height="60"
              rx="8"
              ry="8"
              fill="transparent"
              stroke={theme === 'dark' ? '#fff' : '#000'}
              strokeWidth="3"
              pathLength="100"
              style={{
                strokeDashoffset: 0,
                strokeDasharray: hovered ? paths[hovered] : "10 40 10 40",
                transition: "stroke-dasharray 0.5s ease-in-out",
              }}
            />
          </svg>
        </div>

        {/* Theme Toggle & User Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle with Icons */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={localStorage.getItem('theme') === 'dark'}
            />
            <FaSun className="swap-on text-yellow-500 text-xl" />
            <FaMoon className="swap-off text-gray-700 text-xl" />
          </label>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdown(!profileDropdown)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img
                      className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Avatar"
                    />
                    <FaCaretDown className={`${textColor}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdown && (
                    <div
                      className={`absolute right-0 top-full mt-2 w-48 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg py-2 z-50`}
                      onMouseLeave={() => setProfileDropdown(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className={`font-semibold ${textColor}`}>{user.displayName}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setProfileDropdown(false)}
                        className={`block px-4 py-2 ${textColor} hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} transition`}
                      >
                        <FaUser className="inline mr-2" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setProfileDropdown(false)}
                        className={`block px-4 py-2 ${textColor} hover:${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} transition`}
                      >
                        Settings
                      </Link>
                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          onClick={handleLogOut}
                          className={`w-full text-left px-4 py-2 ${theme === 'dark' ? 'text-red-400 hover:bg-gray-700' : 'text-red-600 hover:bg-gray-100'} transition`}
                        >
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className={`${textColor} ${borderColor} border px-4 py-2 rounded-md hover:${theme === 'dark' ? 'bg-white/20' : 'bg-gray-100'} transition`}
                >
                  Log In
                </Link>
                <Link
                  to="/auth/registration"
                  className={`${buttonBg} font-semibold px-4 py-2 rounded-md ${buttonHover} transition`}
                >
                  Sign up for free
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${textColor} text-3xl z-50`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute top-20 left-0 w-full ${mobileMenuBg} backdrop-blur-md flex flex-col items-center gap-6 py-6 ${textColor} font-medium transition-all duration-500 ${menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} transition text-lg`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col items-center gap-3">
              <div className="text-center mb-2">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`${textColor} hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} transition`}
              >
                <FaUser className="inline mr-2" />
                My Profile
              </Link>
              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className={`${textColor} hover:${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} transition mb-2`}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className={`${buttonBg} px-4 py-2 rounded-md ${buttonHover} transition`}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/auth/login"
                className={`${textColor} ${borderColor} border px-4 py-2 rounded-md hover:${theme === 'dark' ? 'bg-white/20' : 'bg-gray-100'} transition`}
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/auth/registration"
                className={`${buttonBg} font-semibold px-4 py-2 rounded-md ${buttonHover} transition`}
                onClick={() => setMenuOpen(false)}
              >
                Sign up for free
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}