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
  const navigate = useNavigate();

  useEffect(() => {
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
      confirmButtonText: "Yes, delete it!"
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

  return (
    <div className="p-4 mt-20">
      <h2 className="text-2xl font-bold mb-4 text-white">My Jobs</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-white rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Posted By</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {jobs.map(job => (
              <tr key={job._id} className="hover:bg-gray-800">
                <td className="px-6 py-4">{job.title}</td>
                <td className="px-6 py-4">{job.category}</td>
                <td className="px-6 py-4">{job.postedBy}</td>
                <td className="px-6 py-4">{new Date(job.postedAt || Date.now()).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => navigate(`/updateJob/${job._id}`)}
                    className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded-xl transition-all duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-4 rounded-xl transition-all duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">No jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyJobs;