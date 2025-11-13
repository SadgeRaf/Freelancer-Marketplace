import React from 'react';
import { useNavigate } from 'react-router';

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white p-4">

      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 animate-pulse">
        404
      </h1>

      <p className="text-xl sm:text-2xl mt-4 text-gray-300 text-center">
        Oops! The page you are looking for does not exist.
      </p>

      <button
        onClick={() => navigate('/')}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-black font-bold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-green-400"
      >
        Go Back Home
      </button>
      
    </div>
  );
};

export default Error;
