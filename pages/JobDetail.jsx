import React from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const JobDetail = () => {
    const job = useLoaderData();
    const navigate = useNavigate();
    const handleAcceptTask = () => {
        
        toast.success("Task added to your accepted tasks!");
        navigate('/alljobs');
    };

    const postedDate = new Date(job.postedAt || Date.now()).toLocaleDateString();

    return (
        <div className="min-h-screen bg-gray-900 p-4 md:p-6 mt-20 text-white max-w-5xl mx-auto">
            
            {/* Top row: user info and category */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
                
                <div className="flex items-center gap-4">
                    <img
                        src={job.userImg || "https://via.placeholder.com/50"}
                        alt={job.postedBy}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold text-lg">{job.postedBy}</p>
                        <p className="text-gray-400 text-sm">{postedDate}</p>
                    </div>
                </div>

                <span className="bg-green-500 text-black font-semibold px-3 py-1 rounded-full text-sm self-start sm:self-auto">
                    {job.category}
                </span>
            </div>

            {/* Job image */}
            <div className="mb-6">
                <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-full max-h-[400px] object-cover rounded-lg"
                />
            </div>

            {/* Job title */}
            <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">{job.title}</h1>

            {/* Job description */}
            <p className="text-gray-200 mb-6">{job.summary}</p>

            {/* Accept task button */}
            <button
                onClick={handleAcceptTask}
                className="w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
            >
                Accept Task
            </button>
        </div>
    );
};

export default JobDetail;
