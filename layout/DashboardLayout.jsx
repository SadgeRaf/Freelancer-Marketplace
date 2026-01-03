import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import { 
  FaHome, FaUser, FaCog, FaSignOutAlt, 
  FaChartBar, FaCaretDown, FaChartPie, 
  FaBell, FaEnvelope, FaCalendar, 
  FaMoneyBill, FaUsers, FaTasks, FaBriefcase 
} from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../src/api';

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEarnings: 0,
    completedJobs: 0,
    activeJobs: 0,
    pendingProposals: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Sample chart data (replace with real API data)
  const earningsData = [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 1900 },
    { month: 'Mar', earnings: 1500 },
    { month: 'Apr', earnings: 2200 },
    { month: 'May', earnings: 1800 },
    { month: 'Jun', earnings: 2500 },
  ];

  const jobCategoryData = [
    { name: 'Web Dev', value: 35 },
    { name: 'Design', value: 25 },
    { name: 'Writing', value: 20 },
    { name: 'Marketing', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user stats
      const statsRes = await api.get('/dashboard/stats');
      setStats(statsRes.data);

      // Fetch recent jobs
      const jobsRes = await api.get('/dashboard/recent-jobs');
      setRecentJobs(jobsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback data for demo
      setStats({
        totalEarnings: 12500,
        completedJobs: 24,
        activeJobs: 5,
        pendingProposals: 3
      });
      setRecentJobs([
        { id: 1, title: 'E-commerce Website', client: 'John Doe', amount: '$2500', status: 'Completed' },
        { id: 2, title: 'Logo Design', client: 'Jane Smith', amount: '$500', status: 'In Progress' },
        { id: 3, title: 'Blog Articles', client: 'Tech Corp', amount: '$1200', status: 'Pending' },
      ]);
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
              <label htmlFor="my-drawer-4" className="btn btn-ghost btn-circle drawer-button lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <div className="hidden lg:flex items-center ml-4">
                <FaChartBar className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">FM Dashboard</span>
              </div>
            </div>

            {/* Right: Profile & Notifications */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="btn btn-ghost btn-circle relative">
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Messages */}
              <button className="btn btn-ghost btn-circle relative">
                <FaEnvelope className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                    <img
                      src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.displayName}
                      alt={user?.displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">{user?.displayName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <FaCaretDown className={`text-gray-500 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
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
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaCog className="mr-3" />
                      Settings
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
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content p-4 lg:p-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Total Earnings</p>
                  <p className="text-2xl font-bold">${stats.totalEarnings.toLocaleString()}</p>
                </div>
                <FaMoneyBill className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Completed Jobs</p>
                  <p className="text-2xl font-bold">{stats.completedJobs}</p>
                </div>
                <FaTasks className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Active Jobs</p>
                  <p className="text-2xl font-bold">{stats.activeJobs}</p>
                </div>
                <FaBriefcase className="w-10 h-10 opacity-80" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Pending Proposals</p>
                  <p className="text-2xl font-bold">{stats.pendingProposals}</p>
                </div>
                <FaUsers className="w-10 h-10 opacity-80" />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Earnings Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Earnings</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="earnings" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Job Categories Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Job Categories</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {jobCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Jobs Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Jobs</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{job.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{job.client}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600 dark:text-green-400">{job.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          job.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : job.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                          Message
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Main Content */}
          <div className="mt-6">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="bg-base-200 dark:bg-gray-800 min-h-full w-64 pt-16">
            <ul className="menu p-4 space-y-2">
              <li>
                <Link to="/dashboard" className="flex items-center">
                  <FaChartBar className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/jobs" className="flex items-center">
                  <FaBriefcase className="w-5 h-5" />
                  <span>My Jobs</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/proposals" className="flex items-center">
                  <FaTasks className="w-5 h-5" />
                  <span>Proposals</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/earnings" className="flex items-center">
                  <FaMoneyBill className="w-5 h-5" />
                  <span>Earnings</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/messages" className="flex items-center">
                  <FaEnvelope className="w-5 h-5" />
                  <span>Messages</span>
                  <span className="badge badge-primary">5</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/settings" className="flex items-center">
                  <FaCog className="w-5 h-5" />
                  <span>Settings</span>
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