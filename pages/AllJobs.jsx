import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router';
import Job from '../component/Job';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import Loading from './Loading';

gsap.registerPlugin(ScrollTrigger);

const AllJobs = () => {
  const jobContainer = useRef();
  const loadData = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const [data,setData] = useState([]);
  const [loading, setLoading] = useState(true);
   
  useEffect(()=>{
    setData(loadData),
    setLoading(false);
  },[loadData])

  useGSAP(() => {
    gsap.to('.dot', {
      borderRadius: '50%',
      rotateY: 360,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut',
    });
  }, []);
 
  useGSAP(() => {
    gsap.from(jobContainer.current, {
      scrollTrigger: {
        trigger: jobContainer.current,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    });
  }, []);

  const handleNavigation = () => {
    navigate('/');
  };
 
  if(loading || navigation.state === 'loading'){
    return <Loading></Loading>
  }

  return (
    <div className="mt-32 w-11/12 mx-auto">
      <div className="relative flex flex-col items-center justify-center mb-14 text-center">
        <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl">
          Explore All Available J
          <span className="inline-block w-5 h-5 bg-white mx-2 dot align-middle"></span>
          bs!
        </h1>
      </div>

      <div
        ref={jobContainer}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {data.map((job) => (
          <Job key={job._id} job={job} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
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
