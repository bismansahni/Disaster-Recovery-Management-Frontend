import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Hurricane from './Components/Hurricane.js';
import Signup from './Components/Signup.js';
import Location from './Components/Location.js';
import Dashboard from './Components/Dashboard.js';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/location" element={<Location />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     </div>
    </Router>
  );
}

export default App;
