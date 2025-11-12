import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Loading from './Loading';
import Job from '../component/Job';

const MyJobs = () => {
    const {user} = use(AuthContext)
    const [job,setJob] = useState([])
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
      fetch(`http://localhost:3000/myjobs?email=${user.email}`, {
        headers: {
            authorization: `Bearer ${user.accessToken}`
        }
      })
      .then(res=> res.json())
      .then(data=>{
        console.log(data)
        setJob(data)
        setLoading(false)
      })
    },[user])

    if(loading){
        return <Loading></Loading>
    }
    
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-30 w-11/12 mx-auto">
        {job.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>
        </div>
    );
};

export default MyJobs;