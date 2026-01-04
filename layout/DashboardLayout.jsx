import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import {
  FaHome, FaUser, FaSignOutAlt,
  FaBriefcase, FaChartBar, FaCog
} from 'react-icons/fa';
import api from '../src/api';

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const headers = {
    authorization: `Bearer ${user.accessToken}`
  };

  const fetchDashboardData = async () => {
    try {
      // Fetch all dashboard data in parallel
      const [statsRes, jobsRes, categoriesRes] = await Promise.all([
        api.get('/dashboard/stats', { headers }),
        api.get('/dashboard/my-jobs?limit=5', { headers }),
        api.get('/dashboard/job-categories', { headers })
      ]);

      setStats(statsRes.data);
      setRecentJobs(jobsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left: Sidebar Toggle & Brand */}
            <div className="flex items-center">
              <label htmlFor="dashboard-sidebar" className="btn btn-ghost btn-circle drawer-button lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <div className="hidden lg:flex items-center ml-4">
                <FaChartBar className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
              </div>
            </div>

            {/* Right: Profile Dropdown */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                    <img
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=3B82F6&color=fff`}
                      alt={user?.displayName || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">{user?.displayName || 'User'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaUser className="mr-3" />
                      My Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaHome className="mr-3" />
                      Dashboard Home
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Layout */}
      <div className="drawer lg:drawer-open pt-16">
        <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />


        <div className="drawer-content p-4 lg:p-6">
          {/* Show stats only on dashboard home */}
          {location.pathname === '/dashboard' ? (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 mr-4">
                      <FaBriefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Jobs Posted</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stats.totalJobs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900 mr-4">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Active Jobs</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stats.activeJobs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900 mr-4">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stats.completedJobs}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Section - Using real category data */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Job Categories</h3>
                {loading ? (
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-gray-400">Loading chart data...</div>
                  </div>
                ) : categories.length > 0 ? (
                  <div className="space-y-4">
                    {categories.map((category, index) => {
                      // Calculate percentage for progress bars
                      const totalJobs = categories.reduce((sum, cat) => sum + cat.value, 0);
                      const percentage = totalJobs > 0 ? Math.round((category.value / totalJobs) * 100) : 0;
                      const colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-yellow-600', 'bg-red-600'];

                      return (
                        <div key={category.name}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {category.name}
                            </span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {category.value} job{category.value !== 1 ? 's' : ''} ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <p>No job categories found.</p>
                      <p className="text-sm mt-2">Post your first job to see category data here.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Jobs Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Job Posts</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Posted Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {loading ? (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            Loading recent jobs...
                          </td>
                        </tr>
                      ) : recentJobs.length > 0 ? (
                        recentJobs.map((job) => (
                          <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                {job.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(job.postedAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                            No jobs posted yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <Outlet /> // Show nested routes (Profile, Settings)
          )}
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="bg-base-200 dark:bg-gray-800 min-h-full w-64 pt-16">
            <ul className="menu p-4 space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center">
                  <FaHome className="w-5 h-5 mr-3" />
                  <span>Dashboard Home</span>
                </Link>
              </li>
              <li>
                <Link to="/myjobs" className="flex items-center">
                  <FaBriefcase className="w-5 h-5 mr-3" />
                  <span>My Jobs</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="flex items-center">
                  <FaUser className="w-5 h-5 mr-3" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/settings" className="flex items-center">
                  <FaCog className="w-5 h-5 mr-3" />
                  <span>Settings</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center">
                  <FaHome className="w-5 h-5 mr-3" />
                  <span>Home</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;