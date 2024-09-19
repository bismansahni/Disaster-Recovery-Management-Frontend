import React, { useState } from 'react';
import axios from 'axios'; // You may need this for the reverse geocoding API

const LocationPrompt = () => {
  const [zipCode, setZipCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to get the user's location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  // Success callback for geolocation
  const successCallback = async (position) => {
    const { latitude, longitude } = position.coords;
    console.log('Latitude:', latitude, 'Longitude:', longitude);
    
    // Call reverse geocoding API to get the zip code from latitude and longitude
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
      setErrorMessage('Error getting location data.');
    }
  };

  // Error callback for geolocation
  const errorCallback = (error) => {
    setErrorMessage('Unable to retrieve location.');
    console.error('Error:', error.message);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Get Zip Code from Location</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={getLocation}
      >
        Share Location
      </button>
      {zipCode && <p className="mt-4">Your Zip Code: {zipCode}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default LocationPrompt;
