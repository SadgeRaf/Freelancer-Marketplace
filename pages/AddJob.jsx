import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddJobForm = () => {
  const { user } = useContext(AuthContext);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
        title: e.target.title.value,
        postedBy: e.target.postedBy.value,
        category: e.target.category.value,
        summary: e.target.summary.value,
        coverImage: e.target.coverImage.value,
        userEmail: e.target.userEmail.value,
    }

    fetch('http://localhost:3000/jobs', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    }).then(res => res.json())
    .then(data=> {
        console.log(data);
        toast.success("Job added successfully");
        e.form.reset()
    })
    .catch(err=> {
        toast.error(err);
    })

  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 p-4 mt-20">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-2xl w-full max-w-md text-white shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-400">Add a Job</h2>

        {/* Job Title */}
        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Posted By */}
        <div>
          <label className="block mb-2 font-semibold">Posted By</label>
          <input
            type="text"
            name="postedBy"
            value={user?.displayName || ""}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <select
            name="category"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Graphics Designing">Graphics Designing</option>
          </select>
        </div>

        {/* Summary */}
        <div>
          <label className="block mb-2 font-semibold">Summary</label>
          <textarea
            name="summary"
            placeholder="Job Description"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            rows="4"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-2 font-semibold">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="block mb-2 font-semibold">User Email</label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            readOnly
            className="w-full p-3 rounded-lg bg-gray-700 text-gray-300 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
