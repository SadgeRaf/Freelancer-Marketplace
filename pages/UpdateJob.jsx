import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../src/api";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "./Loading";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`, {
          headers: { authorization: `Bearer ${user.accessToken}` },
        });
        setJob(response.data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title: e.target.title.value,
      category: e.target.category.value,
      summary: e.target.summary.value,
      coverImage: e.target.coverImage.value,
    };

    try {

      await api.put(
        `/jobs/${job._id}`,
        updatedJob,
        {
          headers: {
            authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      toast.success("Job updated successfully");
      navigate("/alljobs");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4 mt-20">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl w-full max-w-md text-white shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-400">
          Update Job
        </h2>


        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={job?.title || ""}
            placeholder="Job Title"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>


        <div>
          <label className="block mb-2 font-semibold">Posted By</label>
          <input
            type="text"
            name="postedBy"
            defaultValue={job?.postedBy || ""}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
          />
        </div>


        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            name="category"
            defaultValue={job?.category || ""}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Graphics Designing">Graphics Designing</option>
            <option value="Content Writing">Content Writing</option>
          </select>
        </div>


        <div>
          <label className="block mb-2 font-semibold">Summary</label>
          <textarea
            name="summary"
            defaultValue={job?.summary || ""}
            placeholder="Job Description"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="4"
          />
        </div>


        <div>
          <label className="block mb-2 font-semibold">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            defaultValue={job?.coverImage || ""}
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>


        <div>
          <label className="block mb-2 font-semibold">User Email</label>
          <input
            type="email"
            name="userEmail"
            defaultValue={job?.userEmail || ""}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
          />
        </div>


        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
