import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to Exprement
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        This is the home page. Navigate using the navbar to explore other pages.
      </p>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Get Started
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
