import React from 'react';
import { useLoaderData } from 'react-router';
import Job from '../component/Job';

const AllJobs = () => {

    const data = useLoaderData();
    console.log(data);

    return (
        <div className='mt-30 w-11/12 mx-auto'>
            <h1 className='text-center font-extrabold text-6xl mb-10'>
                Explore All Avaliable J
                <div className='w-3 h-3 bg-white dot'>
                </div>
                bs!
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {data.map(job => <Job key={job._id} job={job}></Job>)}
            </div>
        </div> 
    );
};

export default AllJobs;