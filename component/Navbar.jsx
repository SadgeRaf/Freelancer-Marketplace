import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

export default function AnimatedNavbar() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const html = document.querySelector('html')
    html.setAttribute('data-theme', theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = (checked) => {
    setTheme(checked ? 'dark' : 'light')
  }

  const paths = {
    1: "0 1 8 73.3 18 18",
    2: "0 7 8 62 12 20.6",
    3: "0 13 10 48 10 50",
    4: "0 21 12 28 12 60",
    5: "0 30 20 1 14 80",
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/alljobs" },
    { name: "Add a Job", path: "/addJob" },
    { name: "My Accepted jobs", path: "/myJobs" },
    { name: "My Posted jobs", path: "/myaddedjobs" }
  ];

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav className="w-full bg-[#bef6]/90 backdrop-blur-sm shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6 relative">


        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-wider z-50"
        >
          FM
        </Link>


        <div className="relative w-[800px] hidden md:flex justify-around items-center h-[60px]">
          <div className="absolute inset-0 flex justify-around items-center px-4"
            onMouseLeave={() => setHovered(null)}>
            {links.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHovered(i + 1)}
                onMouseLeave={() => setHovered(null)}
                className="text-white font-medium px-4 py-2 rounded-md cursor-pointer transition hover:bg-white/20"
              >
                {link.name}
              </Link>
            ))}
          </div>

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
              stroke="#fff"
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

        <input onChange={(e) => handleTheme(e.target.checked)} type="checkbox"
          defaultChecked={localStorage.getItem('theme') === 'dark'}
          className="toggle" />

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="relative group">
                <img
                  className="w-12 h-12 rounded-full cursor-pointer border-2 border-white"
                  src={user.photoURL}
                  alt="Avatar"
                />
                <span className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity text-sm whitespace-nowrap">
                  {user.displayName}
                </span>
              </div>



              <button
                onClick={handleLogOut}
                className="btn bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-white border border-white/40 px-4 py-2 rounded-md hover:bg-white/20 hover:text-lg transition"
              >
                Log In
              </Link>
              <Link
                to="/auth/registration"
                className="bg-white text-[#222] font-semibold px-4 py-2 rounded-md hover:bg-gray-200 hover:text-lg transition"
              >
                Sign up for free
              </Link>
            </>
          )}
        </div>


        <button
          className="md:hidden text-white text-3xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>


        <div
          className={`absolute top-20 left-0 w-full bg-[#bfe6f6]/95 backdrop-blur-md flex flex-col items-center gap-6 py-6 text-white font-medium transition-all duration-500 ${menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#222] transition text-lg"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <div className="flex flex-col items-center gap-3">
                <span>{user.displayName}</span>
                <button
                  onClick={() => {
                    handleLogOut();
                    setMenuOpen(false);
                  }}
                  className="btn bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition"
                >
                  Log Out
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Link
                to="/auth/login"
                className="text-white border border-white/40 px-4 py-2 rounded-md hover:bg-white/20 transition"
                onClick={() => setMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/auth/registration"
                className="bg-white text-[#222] font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition"
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
