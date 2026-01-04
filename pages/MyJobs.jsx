import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from './Loading';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import api from '../src/api';

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    // Get theme from localStorage
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    
    // Fetch jobs
    fetch(`https://freelancer-server-omega.vercel.app/myjobs?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        toast.error(err.message);
        setLoading(false);
      });
  }, [user]);

  const handleDelete = (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/jobs/${jobId}`, {
            headers: {
              authorization: `Bearer ${user.accessToken}`,
            },
          });
          toast.success("Job deleted successfully");
          setJobs(prev => prev.filter(job => job._id !== jobId));
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  if (loading) return <Loading />;

  // Theme-based styles
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const tableBg = theme === 'dark' ? 'bg-gray-800' : 'bg-white';
  const tableHeaderBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
  const tableHeaderText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const tableBorder = theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200';
  const tableRowHover = theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const placeholderText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} pt-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">My Jobs</h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage all the jobs you've posted
          </p>
        </div>

        <div className={`rounded-xl shadow-lg overflow-hidden ${tableBg}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className={tableHeaderBg}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${tableHeaderText} uppercase tracking-wider`}>
                    Job Title
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${tableHeaderText} uppercase tracking-wider`}>
                    Category
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${tableHeaderText} uppercase tracking-wider`}>
                    Posted By
                  </th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${tableHeaderText} uppercase tracking-wider`}>
                    Date Posted
                  </th>
                  <th className={`px-6 py-4 text-center text-sm font-semibold ${tableHeaderText} uppercase tracking-wider`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${tableBorder}`}>
                {jobs.map(job => (
                  <tr key={job._id} className={`transition-colors duration-150 ${tableRowHover}`}>
                    <td className={`px-6 py-4 whitespace-nowrap ${textColor}`}>
                      <div className="font-medium">{job.title}</div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${textColor}`}>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-blue-900 text-blue-200' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {job.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${textColor}`}>
                      {job.postedBy}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {new Date(job.postedAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex justify-center space-x-3">
                        <button
                          onClick={() => navigate(`/updateJob/${job._id}`)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            theme === 'dark'
                              ? 'bg-green-600 hover:bg-green-700 text-white'
                              : 'bg-green-100 hover:bg-green-200 text-green-800'
                          }`}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            theme === 'dark'
                              ? 'bg-red-600 hover:bg-red-700 text-white'
                              : 'bg-red-100 hover:bg-red-200 text-red-800'
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className={`w-16 h-16 mb-4 ${placeholderText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className={`text-lg font-medium ${placeholderText}`}>No jobs posted yet</p>
                        <p className={`mt-1 ${placeholderText}`}>
                          Start by posting your first job!
                        </p>
                        <button
                          onClick={() => navigate('/addJob')}
                          className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                            theme === 'dark'
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          Add New Job
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyJobs;