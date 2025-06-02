import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-blue-600 underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
