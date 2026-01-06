import React from 'react';
import "./card.css";
import { Link } from 'react-router';
import { FaClock, FaUser, FaTag, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const Job = ({ job }) => {
  const { 
    category, 
    coverImage, 
    title, 
    _id,
    summary,
    postedBy,
    userEmail,
    postedAt
  } = job;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Truncate text for description
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card2">
          <img className="card-img" src={coverImage} alt={title} />
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            
            {/* Category badge */}
            <div className="flex items-center mb-3 text-sm">
              <FaTag className="text-blue-500 dark:text-blue-400 mr-2" />
              <span className="card-category bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                {category}
              </span>
            </div>
            
            {/* Description */}
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {truncateText(summary)}
              </p>
            </div>
            
            {/* Metadata */}
            <div className="space-y-2 mb-4 text-xs text-gray-500 dark:text-gray-400">
              {/* Posted By */}
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span className="font-medium">Posted by: </span>
                <span className="ml-1 text-gray-700 dark:text-gray-300">{postedBy}</span>
              </div>
              
              {/* Email */}
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>Email: {userEmail}</span>
              </div>
              
              {/* Posted Date */}
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>Posted: {formatDate(postedAt)}</span>
              </div>
              
              {/* Job ID (optional) */}
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span className="text-xs">ID: {_id.substring(0, 8)}...</span>
              </div>
            </div>
            
            <Link 
              to={`/jobdetail/${_id}`} 
              className='btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 block text-center'
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;