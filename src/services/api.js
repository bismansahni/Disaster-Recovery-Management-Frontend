




import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL);

// Correct the export by placing it before the function keyword
export async function fetchHurricaneTrackingData(location) {
    const url = `${API_URL}/hurricane/tracking`;

    try {
        const response = await axios.post(url, { location }); // Pass location in the request body
        if (response.status !== 200) { // Corrected the condition
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("response received",response.data);
        return response.data; // Access the data directly from axios response
    } catch (error) {
        console.error('Error fetching hurricane tracking data:', error);
        throw error;
    }
}

export async function signup(email, password,zipcode) {
    const url = `${API_URL}/auth/signup`;
    console.log("zipcode received",zipcode);

    try {
        const response = await axios.post(url, { email, password ,zipcode});
        console.log("User signed up:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
}
