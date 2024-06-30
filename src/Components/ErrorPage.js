import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Something went wrong. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
