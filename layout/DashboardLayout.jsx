import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';
import {
  FaHome, FaUser, FaSignOutAlt, FaBriefcase, 
  FaChartBar, FaFileAlt, FaCheckCircle, 
  FaPlus, FaEye, FaEdit,
  FaTachometerAlt, FaCalendarAlt,
  FaMapMarkerAlt, FaExclamationTriangle, FaUserTie, FaEnvelope
} from 'react-icons/fa';

// Import pie chart components
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

import api from '../src/api';

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({
    appliedJobs: 0,
    acceptedJobs: 0,
    myJobs: 0,
  });
  const [myJobs, setMyJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);
  
  const headers = {
    authorization: `Bearer ${user?.accessToken}`
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      let myJobsData = [];
      let acceptedJobsData = [];

      try {
        const myJobsRes = await api.get(`/myjobs?email=${user?.email}`, { headers });
        myJobsData = Array.isArray(myJobsRes?.data) ? myJobsRes.data : [];
        console.log('My Jobs Data:', myJobsData); // Debug log
      } catch (error) {
        console.warn('Error fetching my jobs:', error);
      }

      try {
        const acceptedJobsRes = await api.get(`/acceptedjobs?email=${user?.email}`, { headers });
        console.log('Accepted Jobs Raw Response:', acceptedJobsRes); // Debug log
        
        if (Array.isArray(acceptedJobsRes?.data)) {
          acceptedJobsData = acceptedJobsRes.data;
        } else if (acceptedJobsRes?.data && typeof acceptedJobsRes.data === 'object') {
          const data = acceptedJobsRes.data;
          if (data.jobs && Array.isArray(data.jobs)) {
            acceptedJobsData = data.jobs;
          } else if (data.data && Array.isArray(data.data)) {
            acceptedJobsData = data.data;
          } else if (data.result && Array.isArray(data.result)) {
            acceptedJobsData = data.result;
          } else {
            // If it's a single job object, wrap it in array
            if (data._id || data.jobId) {
              acceptedJobsData = [data];
            } else {
              acceptedJobsData = [];
            }
          }
        }
        console.log('Accepted Jobs Processed:', acceptedJobsData); // Debug log
      } catch (error) {
        console.warn('Error fetching accepted jobs:', error);
      }

      setMyJobs(myJobsData);
      setAcceptedJobs(acceptedJobsData);
      
      const acceptedArray = Array.isArray(acceptedJobsData) ? acceptedJobsData : [];
      const myJobsArray = Array.isArray(myJobsData) ? myJobsData : [];
      
      const acceptedCount = acceptedArray.filter(job => {
        const status = job?.status?.toLowerCase();
        return status === 'accepted' || status === 'completed';
      }).length;

      setStats({
        appliedJobs: acceptedArray.length,
        acceptedJobs: acceptedCount,
        myJobs: myJobsArray.length,
      });

    } catch (error) {
      console.error('Error in dashboard data fetch:', error);
      toast.error('Failed to load some dashboard data');
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Recently';
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  const getJobStatusColor = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    
    const statusLower = status.toLowerCase();
    switch(statusLower) {
      case 'accepted':
      case 'completed':
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
      case 'review':
      case 'under review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
      case 'declined':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  // Prepare data for pie chart
  const preparePieChartData = () => {
    const statusMap = {};
    
    // Combine both job arrays
    const myJobsArray = Array.isArray(myJobs) ? myJobs : [];
    const acceptedJobsArray = Array.isArray(acceptedJobs) ? acceptedJobs : [];
    const allJobs = [...myJobsArray, ...acceptedJobsArray];
    
    if (allJobs.length === 0) {
      return [
        { name: 'No Jobs', value: 1, percentage: 100 }
      ];
    }
    
    allJobs.forEach(job => {
      // Get status or default to 'Applied'
      let status = job?.status || 'applied';
      status = status.toLowerCase();
      
      // Normalize status names
      if (status === 'active') status = 'posted';
      if (status === 'under review') status = 'review';
      if (status === 'declined') status = 'rejected';
      
      statusMap[status] = (statusMap[status] || 0) + 1;
    });
    
    // Convert to array format for pie chart
    const data = Object.entries(statusMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      percentage: Math.round((value / allJobs.length) * 100)
    }));
    
    return data;
  };

  // Get job title from job object
  const getJobTitle = (job) => {
    if (!job) return 'Job Application';
    
    // Try different possible title fields
    return job.title || 
           job.jobTitle || 
           job.name || 
           job.position ||
           'Job Application';
  };

  // Get company/poster name from job object
  const getJobPoster = (job) => {
    if (!job) return 'Company';
    
    // Try different possible poster fields
    return job.postedBy || 
           job.company || 
           job.employer || 
           job.userEmail ||
           'Company';
  };

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const pieChartData = preparePieChartData();
  const displayAcceptedJobs = Array.isArray(acceptedJobs) ? acceptedJobs : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <label htmlFor="dashboard-sidebar" className="btn btn-ghost btn-circle drawer-button lg:hidden">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <div className="hidden lg:flex items-center ml-4">
                <FaTachometerAlt className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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

                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaTachometerAlt className="mr-3" />
                      Dashboard
                    </Link>
                    <Link
                      to="/myjobs"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaBriefcase className="mr-3" />
                      My Jobs
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
          {/* Dashboard Home Content */}
          {location.pathname === '/dashboard' ? (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Applied Jobs */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900 mr-4">
                      <FaFileAlt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Jobs Applied</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stats.appliedJobs}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total applications submitted
                    </p>
                  </div>
                </div>

                {/* Accepted Jobs */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900 mr-4">
                      <FaCheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Accepted Jobs</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stats.acceptedJobs}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Jobs you've been accepted for
                    </p>
                  </div>
                </div>

                {/* My Job Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900 mr-4">
                      <FaBriefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">My Job Posts</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {loading ? '...' : stats.myJobs}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link 
                      to="/myjobs"
                      className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline"
                    >
                      View my jobs →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie Chart Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Job Status Distribution</h3>
                  {loading ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-gray-400">Loading chart data...</div>
                    </div>
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} job${value !== 1 ? 's' : ''} (${props.payload.percentage}%)`,
                              props.payload.name
                            ]}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>

                {/* Recent Applications */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Applications</h3>
                    {displayAcceptedJobs.length > 0 && (
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                        {displayAcceptedJobs.length} total
                      </span>
                    )}
                  </div>
                  <div className="space-y-4">
                    {loading ? (
                      <div className="text-center py-8 text-gray-500">Loading applications...</div>
                    ) : displayAcceptedJobs.length > 0 ? (
                      displayAcceptedJobs.slice(0, 4).map((job, index) => (
                        <div key={job._id || job.jobId || index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-gray-900 dark:text-white">{getJobTitle(job)}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {getJobPoster(job)}
                              </p>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${getJobStatusColor(job.status)}`}>
                              {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : 'Applied'}
                            </span>
                          </div>
                          {job.summary && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                              {job.summary}
                            </p>
                          )}
                          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>
                              Applied {formatDate(job.postedAt || job.appliedAt || job.createdAt)}
                            </span>
                            {job._id ? (
                              <Link 
                                to={`/jobdetail/${job._id}`}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                View Details
                              </Link>
                            ) : job.jobId ? (
                              <Link 
                                to={`/jobdetail/${job.jobId}`}
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                View Details
                              </Link>
                            ) : (
                              <span className="text-gray-400">No details</span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <FaFileAlt className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p>No applications yet</p>
                        <p className="text-sm mt-1">Apply for jobs to see them here</p>
                        <button 
                          onClick={() => navigate('/alljobs')}
                          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                        >
                          Browse Jobs
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Recent My Job Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">My Recent Job Posts</h3>
                  {stats.myJobs > 0 && (
                    <Link to="/myjobs" className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      View All ({stats.myJobs})
                    </Link>
                  )}
                </div>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">Loading job posts...</div>
                ) : myJobs.length > 0 ? (
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
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {myJobs.slice(0, 5).map((job) => (
                          <tr key={job._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {getJobTitle(job)}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {job.summary ? `${job.summary.substring(0, 50)}...` : 'No description'}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                {job.category || 'General'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(job.postedAt)}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${getJobStatusColor(job.status)}`}>
                                {job.status ? job.status.charAt(0).toUpperCase() + job.status.slice(1) : 'Active'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                {job._id && (
                                  <>
                                    <Link
                                      to={`/jobdetail/${job._id}`}
                                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                                      title="View Details"
                                    >
                                      <FaEye className="w-4 h-4" />
                                    </Link>
                                    <Link
                                      to={`/edit-job/${job._id}`}
                                      className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
                                      title="Edit"
                                    >
                                      <FaEdit className="w-4 h-4" />
                                    </Link>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaBriefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>You haven't posted any jobs yet</p>
                    <button 
                      onClick={() => navigate('/post-job')}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                    >
                      Post Your First Job
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="bg-white dark:bg-gray-800 min-h-full w-64 pt-16 border-r border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=3B82F6&color=fff`}
                    alt={user?.displayName || 'User'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{user?.displayName || 'User'}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
            
            <ul className="menu p-4 space-y-1">
              <li>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center py-3 px-4 rounded-lg ${location.pathname === '/dashboard' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaTachometerAlt className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/myjobs" 
                  className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.includes('myjobs') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaBriefcase className="w-5 h-5 mr-3" />
                  <span>My Jobs</span>
                  {stats.myJobs > 0 && (
                    <span className="badge badge-primary ml-auto">{stats.myJobs}</span>
                  )}
                </Link>
              </li>
              <li>
                <Link 
                  to="/alljobs" 
                  className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.includes('alljobs') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaPlus className="w-5 h-5 mr-3" />
                  <span>Browse Jobs</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/post-job" 
                  className={`flex items-center py-3 px-4 rounded-lg ${location.pathname.includes('post-job') ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  <FaFileAlt className="w-5 h-5 mr-3" />
                  <span>Post a Job</span>
                </Link>
              </li>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <li>
                <Link 
                  to="/" 
                  className="flex items-center py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
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