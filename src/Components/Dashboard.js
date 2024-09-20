


import React, { useState, useEffect } from 'react';
import { fetchHurricaneTrackingData } from '../services/api.js'; // Import the API function to fetch hurricane data
import { useLocation } from 'react-router-dom'; // To get the zip code from signup redirection

const Dashboard = () => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Get the full location object
  const searchParams = new URLSearchParams(location.search); // Extract query parameters
  const zipCode = searchParams.get('zipCode') || ''; // Get the zipCode from the query string

  // Fetch hurricane tracking data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      if (zipCode) {
        try {
          const data = await fetchHurricaneTrackingData(zipCode);
          console.log(data); // Fetch data based on the zip code
          setTrackingData(data);
        } catch (error) {
          setError('Failed to fetch hurricane tracking data. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No zip code provided.');
        setLoading(false);
      }
    };

    fetchData();
  }, [zipCode]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>

      <div className="mt-6 p-4 bg-white rounded-md shadow-lg w-full max-w-lg">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : trackingData && trackingData.prediction ? ( // Check if prediction exists in the data
          <div>
            <h2 className="text-xl font-semibold mb-2">Hurricane Status</h2>
            <p className="text-sm text-gray-800">{trackingData.prediction}</p>
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;