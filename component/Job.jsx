import React from 'react';
import "./card.css";
import { Link } from 'react-router';

const Job = ({ job }) => {
  const { category, coverImage, title, _id } = job;
  
  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card2">
          <img className="card-img" src={coverImage} alt={title} />
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-category">{category}</p>
            <Link to={`/jobdetail/${_id}`} className='btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-black font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105'>View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
