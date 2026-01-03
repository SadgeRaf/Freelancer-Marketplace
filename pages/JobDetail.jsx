import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Loading from './Loading';
import { AuthContext } from '../provider/AuthProvider';
import api from '../src/api';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft } from 'react-icons/fa';

const JobDetail = () => {
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);
    const { user } = use(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                if (user?.accessToken) {
                    const res = await api.get(`/jobs/${id}`, {
                        headers: {
                            authorization: `Bearer ${user.accessToken}`,
                        },
                    });
                    setJob(res.data);
                } else {
                    // Simple static fallback using the ID
                    setJob({
                        _id: id,
                        title: `Job #${id.slice(0, 8)}`,
                        summary: "This is a demo job description. In a real scenario, this would be fetched from the server.",
                        postedBy: "Demo User",
                        userImg: "https://ui-avatars.com/api/?name=Demo+User&background=random",
                        category: "General",
                        postedAt: new Date().toISOString(),
                        coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                        userEmail: "demo@example.com"
                    });
                }
            } catch (err) {
                console.log('Using fallback data');
                // Fallback with ID-based data
                setJob({
                    _id: id,
                    title: `Job #${id.slice(0, 8)}`,
                    summary: "This job data is temporarily unavailable. Please try again later.",
                    postedBy: "Unknown",
                    category: "General",
                    postedAt: new Date().toISOString(),
                    userEmail: "unknown@example.com"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [user, id]);

    const handleAcceptTask = async () => {
        if (!user) {
            toast.error("Please log in to accept tasks");
            navigate('/auth/login');
            return;
        }

        if (job.userEmail === user.email) {
            toast.error("You cannot accept your own job!");
            return;
        }

        try {
            await api.post('/acceptjob', {
                job,
                email: user.email,
            }, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`,
                },
            });
            toast.success("Task added to your accepted tasks!");
            navigate('/alljobs');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const postedDate = new Date(job.postedAt || Date.now()).toLocaleDateString();

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 mt-20 max-w-4xl mx-auto">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition"
            >
                <FaArrowLeft />
                <span>Back to Jobs</span>
            </button>

            {/* Job header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <img
                            src={job.userImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(job.postedBy || 'User')}&background=random`}
                            alt={job.postedBy}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{job.postedBy}</p>
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                <FaCalendarAlt className="text-xs" />
                                <span>{postedDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        <FaTag className="text-gray-600 dark:text-gray-400 text-sm" />
                        <span className="font-medium text-gray-800 dark:text-gray-300">{job.category}</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{job.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{job.summary}</p>
            </div>

            {/* Cover image */}
            {job.coverImage && (
                <div className="mb-6">
                    <img
                        src={job.coverImage}
                        alt={job.title}
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-sm"
                    />
                </div>
            )}

            {/* Action button */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <button
                    onClick={handleAcceptTask}
                    disabled={job.userEmail === user?.email}
                    className={`
                        w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300
                        ${job.userEmail === user?.email
                            ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white hover:shadow-lg"
                        }
                    `}
                >
                    {job.userEmail === user?.email 
                        ? "You Posted This Job" 
                        : user 
                            ? "Accept Task" 
                            : "Log In to Accept Task"}
                </button>
                
                {job.userEmail === user?.email && (
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
                        You cannot accept your own posted job
                    </p>
                )}
            </div>
        </div>
    );
};

export default JobDetail;