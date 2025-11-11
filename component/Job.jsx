import React from 'react';
import "./card.css";

const Job = ({ job }) => {
  const { category, coverImage, postedBy, summary, title } = job;

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card2">
          <img className="card-img" src={coverImage} alt={title} />
          <div className="card-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-category">{category}</p>
            <p className="card-summary">{summary}</p>
            <p className="card-poster">Posted by <span>{postedBy}</span></p>
            <button className='btn'>View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
