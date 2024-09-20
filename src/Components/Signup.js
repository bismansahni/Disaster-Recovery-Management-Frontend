




import React, { useState } from 'react';
import { signup } from '../services/api.js'; // Import the signup function from api.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation after signup

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isManualZip, setIsManualZip] = useState(false); // Toggle for manual or automatic location
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const navigate = useNavigate(); // For redirecting to dashboard

  // Function to handle the signup process
  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page
    setIsLoading(true); // Show loader when signup starts
    try {
      const response = await signup(email, password, zipCode); // Call the signup function from api.js
      console.log("User signed up:", response);
      setSuccessMessage('User signed up successfully!');
      // Clear form fields
      setEmail('');
      setPassword('');
      setZipCode('');
      setErrorMessage('');
      setTimeout(() => {
        navigate(`/dashboard?zipCode=${zipCode}`); // Redirect to dashboard after a short delay
      }, 2000); // Delay to show success message before redirecting
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false); // Hide loader after signup is complete
    }
  };

  // Function to automatically get the user's location
  const fetchZipCodeAutomatically = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  // Success callback for geolocation
  const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
        params: {
          latitude,
          longitude,
          localityLanguage: 'en'
        }
      });
      const locationData = response.data;
      if (locationData && locationData.postcode) {
        setZipCode(locationData.postcode);
      } else {
        setErrorMessage('Could not retrieve zip code.');
      }
    } catch (error) {
      setErrorMessage('Error fetching location data.');
    }
  };

  // Error callback for geolocation
  const errorCallback = (error) => {
    setErrorMessage('Unable to retrieve location.');
    console.error('Error:', error.message);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form className="w-full max-w-xs" onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>

        {/* Zip Code Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
            Location
          </label>
          {!isManualZip ? (
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={fetchZipCodeAutomatically}
              >
                Automatically Fetch Zip Code
              </button>
              {zipCode && <p className="mt-2">Detected Zip Code: {zipCode}</p>}
              <p className="mt-2 text-blue-600 cursor-pointer" onClick={() => setIsManualZip(true)}>
                Enter manually
              </p>
            </div>
          ) : (
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="zipCode"
                type="text"
                placeholder="Enter Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)} // Update zip code state
                required
              />
              <p className="mt-2 text-blue-600 cursor-pointer" onClick={() => setIsManualZip(false)}>
                Detect automatically
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* Loader */}
      {isLoading && (
        <div className="mt-4">
          <p>Loading...</p>
        </div>
      )}

      {/* Display error or success messages */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
    </div>
  );
};

export default Signup;
