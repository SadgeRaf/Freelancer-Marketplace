import React from 'react';

const Loading = () => {
return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">

      <div className="w-24 h-24 border-4 border-t-green-400 border-b-blue-500 border-gray-700 rounded-full animate-spin mb-8"></div>

      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse mb-4">
        Loading...
      </h1>

      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-300"></div>
      </div>
      
    </div>
  );
};


export default Loading;