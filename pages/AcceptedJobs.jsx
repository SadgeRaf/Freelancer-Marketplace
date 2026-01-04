import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../src/api";
import Loading from "./Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AcceptedJobs = () => {
  const { user } = useContext(AuthContext);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Get theme from localStorage
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    
    const fetchAcceptedJobs = async () => {
      try {
        const res = await api.get(`/acceptedjobs?email=${user.email}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        });
        setAcceptedJobs(res.data.result);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedJobs();
  }, [user]);

  const handleFinish = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Mark job as finished?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, finish it",
      cancelButtonText: "Cancel",
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/finishjob/${jobId}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        });
        setAcceptedJobs((prev) => prev.filter((item) => item._id !== jobId));
        toast.success("Job marked as finished!");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleDrop = async (jobId) => {
    const confirm = await Swal.fire({
      title: "Drop this job?",
      text: "You will no longer be assigned to this job.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, drop it",
      cancelButtonText: "Cancel",
      background: theme === 'dark' ? '#1f2937' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/dropjob/${jobId}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        });
        setAcceptedJobs((prev) => prev.filter((item) => item._id !== jobId));
        toast.info("Job dropped successfully.");
      } catch (err) {
        toast.error(err.message);
      }
    }
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
          <h2 className="text-3xl font-bold">My Accepted Jobs</h2>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Jobs you have accepted and are currently working on
          </p>
        </div>

        {acceptedJobs.length === 0 ? (
          <div className={`rounded-xl shadow-lg p-12 text-center ${tableBg}`}>
            <svg className={`w-16 h-16 mx-auto mb-4 ${placeholderText}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className={`text-lg font-medium ${placeholderText}`}>No accepted jobs yet</p>
            <p className={`mt-1 ${placeholderText}`}>
              Start by accepting available jobs from the job listings
            </p>
          </div>
        ) : (
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
                      Date Accepted
                    </th>
                    <th className={`px-6 py-4 text-center text-sm font-semibold ${tableHeaderText} uppercase tracking-wider`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${tableBorder}`}>
                  {acceptedJobs.map((item) => (
                    <tr key={item._id} className={`transition-colors duration-150 ${tableRowHover}`}>
                      <td className={`px-6 py-4 whitespace-nowrap ${textColor}`}>
                        <div className="font-medium">{item.job.title}</div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${textColor}`}>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          theme === 'dark' 
                            ? 'bg-blue-900 text-blue-200' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.job.category}
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${textColor}`}>
                        {item.job.postedBy}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {new Date(item.job.postedAt || Date.now()).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleFinish(item._id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                : 'bg-green-100 hover:bg-green-200 text-green-800'
                            }`}
                          >
                            Finish
                          </button>
                          <button
                            onClick={() => handleDrop(item._id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-red-100 hover:bg-red-200 text-red-800'
                            }`}
                          >
                            Drop
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AcceptedJobs;