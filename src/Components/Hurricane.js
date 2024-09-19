



import React, { useState } from 'react';
import {fetchHurricaneTrackingData} from '../services/api.js';

const Hurricane = () => {
    const [location, setLocation] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setLocation(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await fetchHurricaneTrackingData(location);
            setTrackingData(data);
        } catch (error) {
            setError('Failed to fetch hurricane tracking data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Hurricane Tracker</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-lg">
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
                        Enter Location:
                    </label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a location"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Track Hurricane'}
                    </button>
                </div>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {trackingData && (
                <div className="mt-6 p-4 bg-white rounded-md shadow-lg w-full max-w-lg">
                    <h2 className="text-xl font-semibold mb-2">Hurricane Tracking Data</h2>
                    <pre className="text-sm text-gray-800">{JSON.stringify(trackingData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Hurricane;
