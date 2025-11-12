import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import api from "../src/api";
import Loading from "./Loading";
import Job from "../component/Job";

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
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedJobs();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="p-6 text-white mt-20">
      <h2 className="text-2xl font-bold mb-4">My Accepted Jobs</h2>
      {acceptedJobs.length === 0 ? (
        <p>No accepted jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {acceptedJobs.map((item) => (
            <Job key={item._id} job={item.job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedJobs;
