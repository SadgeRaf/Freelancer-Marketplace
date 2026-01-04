import React, { useEffect, useState } from 'react';
import { useNavigate, useNavigation } from 'react-router';
import Job from '../component/Job';
import Loading from './Loading';
import api from '../src/api';
import { toast } from 'react-toastify';

const AllJobs = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [sortOrder, setSortOrder] = useState('descending');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const limit = 6;

  const totalPages = Math.ceil(totalJobs / limit);

  useEffect(() => {
    // Debounce search - wait 500ms before fetching
    const timer = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPage, sortOrder, searchQuery]);

  const fetchJobs = async () => {
    setLoading(true);
    const skip = (currentPage - 1) * limit;
    
    try {
      // Build the URL with search query if present
      let url = `/jobs?limit=${limit}&skip=${skip}&order=${sortOrder}`;
      
      if (searchQuery.trim()) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
        setIsSearching(true);
      } else {
        setIsSearching(false);
      }
      
      const res = await api.get(url);
      setJobs(res.data.jobs);
      setTotalJobs(res.data.count);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  const handleNavigation = () => {
    navigate('/');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  if (loading || navigation.state === 'loading') {
    return <Loading />;
  }

  return (
    <div className="mt-32 w-11/12 mx-auto">
      <div className="relative flex flex-col items-center justify-center mb-14 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl mb-6">
          Explore All Available Jobs!
        </h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search jobs by title or category..."
                  className="w-full px-6 py-3 pl-12 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="ml-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
            
            {isSearching && (
              <div className="mt-3 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing results for: <span className="font-semibold text-indigo-600">"{searchQuery}"</span>
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="ml-3 text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear search
                  </button>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="sticky top-24 z-40 backdrop-blur-sm py-4 mb-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-lg font-semibold">
            <span className="text-gray-600 dark:text-gray-400">Showing:</span>
            <span className="ml-2 text-gray-900 dark:text-white">
              {isSearching ? (
                <>Search results: {totalJobs} job{totalJobs !== 1 ? 's' : ''} found</>
              ) : (
                <>Page {currentPage} of {totalPages} • {Math.min(currentPage * limit, totalJobs)} of {totalJobs} Jobs</>
              )}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {isSearching && (
              <span className="text-sm px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                Search Mode
              </span>
            )}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-sm md:btn-md">
                Sort: {sortOrder === 'descending' ? 'Latest First' : 'Oldest First'}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg">
                <li>
                  <button type="button" onClick={() => handleSort('descending')} className={sortOrder === 'descending' ? 'active' : ''}>
                    <span>Latest First</span>
                    {sortOrder === 'descending' && <span className="badge badge-success ml-auto">✓</span>}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleSort('ascending')} className={sortOrder === 'ascending' ? 'active' : ''}>
                    <span>Oldest First</span>
                    {sortOrder === 'ascending' && <span className="badge badge-success ml-auto">✓</span>}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {isSearching ? (
                <>No jobs found matching "<span className="font-semibold">{searchQuery}</span>"</>
              ) : (
                'No jobs found'
              )}
            </p>
            {isSearching && (
              <button
                onClick={clearSearch}
                className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                Clear search to see all jobs
              </button>
            )}
          </div>
        )}
      </div>

      {/* Show pagination if there are results */}
      {totalPages > 1 && jobs.length > 0 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {[...Array(Math.min(totalPages, 5)).keys()].map((i) => {
            // Show limited pagination (max 5 pages)
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 rounded-lg transition-colors ${currentPage === pageNum
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}

      <div className="flex justify-center mt-10 mb-10">
        <button
          onClick={handleNavigation}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AllJobs;