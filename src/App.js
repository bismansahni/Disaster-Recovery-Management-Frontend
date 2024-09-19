import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Hurricane from './Components/Hurricane.js';
import Signup from './Components/Signup.js';
import Location from './Components/Location.js';

function App() {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Hurricane />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/location" element={<Location />} />
      </Routes>
     </div>
    </Router>
  );
}

export default App;
