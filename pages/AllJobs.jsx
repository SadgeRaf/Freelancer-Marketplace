import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router';
import Job from '../component/Job';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import Loading from './Loading';
import api from '../src/api';
import { toast } from 'react-toastify';

gsap.registerPlugin(ScrollTrigger);

const AllJobs = () => {
  const loadData = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('descending')
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = data.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(data.length / jobsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setData(loadData),
      setLoading(false);
  }, [loadData])

  const handleSort = async (order) => {
    setLoading(true)
    setSort(order)

    try {
      const res = await api.get(`/sortjobs?order=${order}`)
      setData(res.data)
      setLoading(false)
    } catch (err) {
      toast.error(err.message)
    }
  }

  const handleNavigation = () => {
    navigate('/');
  };

  if (loading || navigation.state === 'loading') {
    return <Loading></Loading>
  }

  return (
    <div className="mt-32 w-11/12 mx-auto">

      <div className="relative flex flex-col items-center justify-center mb-14 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl">
          Explore All Available Jobs!
        </h1>
      </div>

      <div className="sticky top-24 z-40 backdrop-blur-sm py-4 mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            <span className="text-gray-600 dark:text-gray-400">Showing:</span>
            <span className="ml-2 text-gray-900 dark:text-white">{data.length} Jobs</span>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm md:btn-md">
              Sort: {sort === 'descending' ? 'Latest First' : 'Oldest First'}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg">
              <li><a onClick={() => handleSort('descending')} className={sort === 'descending' ? 'active' : ''}>
                <span>Latest First</span>
                {sort === 'descending' && <span className="badge badge-success ml-auto">✓</span>}
              </a></li>
              <li><a onClick={() => handleSort('ascending')} className={sort === 'ascending' ? 'active' : ''}>
                <span>Oldest First</span>
                {sort === 'ascending' && <span className="badge badge-success ml-auto">✓</span>}
              </a></li>
            </ul>
          </div>
        </div>
      </div>


      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {currentJobs.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-10 space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-4 py-2 rounded-lg ${currentPage === number
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200'}`}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex justify-center mt-10 mb-10">
        <button
          onClick={handleNavigation}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
