// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MainMenu from './components/MainMenu';
import DepartmentPage from './components/DepartmentPage';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  const [departments] = useState([
    { id: 1, name: 'Department of Computer Studies', color: '#4CAF50' },
    { id: 2, name: 'Department of Hotel Management', color: '#2196F3' },
    { id: 3, name: 'Department of Teacher Education', color: '#F44336' },
    { id: 4, name: 'Department of Business Management', color: '#FFC107' }
  ]);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard departments={departments} />} 
            />
            <Route 
              path="/departments" 
              element={<MainMenu departments={departments} />} 
            />
            <Route 
              path="/department/:id" 
              element={<DepartmentPage />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;