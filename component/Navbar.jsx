import { useState } from "react";
import { Link } from "react-router";

export default function AnimatedNavbar() {
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  
  const paths = {
    1: "0 2 8 73.3 18 20.6",
    2: "0 8 10 56 12 20.6",
    3: "0 16 12 36 14 50",
    4: "0 28 15 1 20 76",
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "All Jobs", path: "/jobs" },
    { name: "Add a Job", path: "/addJob" },
    { name: "My Accepted Tasks", path: "/myJobs" },
  ];

  return (
    <nav className="w-full bg-[#bfe6f6]/90 backdrop-blur-sm shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-20 px-6 relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white tracking-wider z-50"
        >
          FM
        </Link>

        
        <div className="relative w-[500px] hidden md:flex justify-around items-center h-[60px]">
          <div className="absolute inset-0 flex justify-around items-center px-4">
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
                strokeDashoffset: hovered ? 0 : 5,
                strokeDasharray: hovered ? paths[hovered] : "10 40 10 40",
                transition: hovered ? "0.5s" : "999999s",
              }}
            />
          </svg>
        </div>

        
        <div className="hidden md:flex items-center gap-3">
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
        </div>

        
        <button
          className="md:hidden text-white text-3xl z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        
        <div
          className={`absolute top-20 left-0 w-full bg-[#bfe6f6]/95 backdrop-blur-md flex flex-col items-center gap-6 py-6 text-white font-medium transition-all duration-500 ${
            menuOpen
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
        </div>
      </div>
    </nav>
  );
}
