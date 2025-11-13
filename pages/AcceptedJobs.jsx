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

  useEffect(() => {
    if (!user?.email) return;

    const fetchAcceptedJobs = async () => {
      try {
        const res = await api.get(`/acceptedjobs?email=${user.email}`);
        setAcceptedJobs(res.data.result || []);
      } catch (err) {
        console.error("Failed to load accepted jobs:", err);
        toast.error("Failed to load accepted jobs");
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
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/finishjob/${jobId}`); 
        setAcceptedJobs((prev) => prev.filter((item) => item._id !== jobId));
        toast.success("Job marked as finished!");
      } catch (err) {
        console.error(err);
        toast.error("Failed to finish job");
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6 text-white mt-20">
      <h2 className="text-2xl font-bold mb-4">My Accepted Jobs</h2>
      {acceptedJobs.length === 0 ? (
        <p>No accepted jobs yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 bg-gray-900 rounded-lg">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Title</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Posted By</th>
                <th className="px-6 py-3 text-left font-semibold">Date</th>
                <th className="px-6 py-3 text-center font-semibold">Finished</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {acceptedJobs.map((item) => (
                <tr key={item._id} className="hover:bg-gray-800">
                  <td className="px-6 py-4">{item.job.title}</td>
                  <td className="px-6 py-4">{item.job.category}</td>
                  <td className="px-6 py-4">{item.job.postedBy}</td>
                  <td className="px-6 py-4">{new Date(item.job.postedAt || Date.now()).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      onChange={() => handleFinish(item._id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AcceptedJobs;
