import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-6">
        Welcome to Exprement! This platform allows freelancers and clients to
        connect, manage projects, and leave reviews after completing jobs. Our
        goal is to make project management and collaboration simple,
        transparent, and reliable.
      </p>
      <p className="text-gray-500 text-sm">
        © 2025 Exprement. All rights reserved.
      </p>
    </div>
  );
};

export default About;
